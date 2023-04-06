//
//  EnclaveModule.swift
//  ReactNativeWallet
//
//  Created by zetsuboii on 14.03.2023.
//

import Foundation

@objc(EnclaveModule)
class EnclaveModule: NSObject {
  
  /// Signing algorithm used by Enclave
  static var algorithm: SecKeyAlgorithm = .ecdsaSignatureMessageX962SHA256
    
  /// Internal function to get an enclave key handle using key alias
  private func getKeyHandle(alias: String) -> SecKey? {
    let tag = alias.data(using: .utf8)!
    
    // Build query to get security key
    let query: [String: Any] = [
      kSecClass as String               : kSecClassKey,
      kSecAttrApplicationTag as String  : tag,
      kSecAttrKeyType as String         : kSecAttrKeyTypeEC,
      kSecReturnRef as String           : true
    ]
    
    // Get key using the query
    var item: CFTypeRef?
    let status = SecItemCopyMatching(query as CFDictionary, &item)
    guard status == errSecSuccess else {
        print("[EnclaveModule] No key found")
        return nil
    }
    
    return (item as! SecKey)
  }
  
  /// Internal function to sign a message key handle
  private func sign(_ message: String, _ keyHandle: SecKey) throws -> String {
    let messageData = message.data(using: .utf8)! as CFData
    
    guard SecKeyIsAlgorithmSupported(
      keyHandle,
      .sign,
      EnclaveModule.algorithm
    ) else {
        throw EnclaveError.message("Algorithm not supported on this Device")
    }
    
    var error: Unmanaged<CFError>?
    
    let signedMessage = SecKeyCreateSignature(
      keyHandle,
      EnclaveModule.algorithm,
      messageData,
      &error
    )
    
    guard signedMessage != nil else {
        print(error!)
        throw EnclaveError.message("Can't sign message")
    }
    
    return (signedMessage! as Data).base64EncodedString()
  }
  
  /// Returns public key if alias exists, throws otherwise
  @objc(getPublicKey:resolver:rejecter:)
  func getPublicKey(
    _ alias: NSString,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    print("[EnclaveModule] getPublicKey called")
    let keyHandle = getKeyHandle(alias: alias as String)
    
    // Check if key handle is not nil
    guard keyHandle != nil else {
      reject(nil, "Can't get the key handle", nil)
      return
    }
    
    // Try to copy public key
    var error: Unmanaged<CFError>?
    guard let pubKey = SecKeyCopyPublicKey(keyHandle!) else {
        reject(nil, "Can't copy public key", nil)
        return
    }
    
    // Get the external representation of the public key
    guard let pubExt = SecKeyCopyExternalRepresentation(pubKey, &error) else {
        reject(nil, "Can't export public key", nil)
        print(error!)
        return
    }
    
    let publicKeyDER = prependCurveHeader(pubKeyData: pubExt as Data)
    
    print("[EnclaveModule] Loaded keypair")
    resolve(publicKeyDER.base64EncodedString());
  }
  
  /// Generates a new key pair
  @objc(generateKeyPair:resolver:rejecter:)
  func generateKeyPair(
    _ alias: NSString,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    print("[EnclaveModule] generateKeyPair called")
    let flags: SecAccessControlCreateFlags = .biometryAny;
    
    let access = SecAccessControlCreateWithFlags(
      kCFAllocatorDefault,
      kSecAttrAccessibleWhenUnlockedThisDeviceOnly,
      flags,
      nil
    )!
    
    let tag = (alias as String).data(using: .utf8)!
    let attributes: [String: Any] = [
      kSecClass as String             : kSecClassKey,
      kSecAttrKeyType as String       : kSecAttrKeyTypeEC,
      kSecAttrKeySizeInBits as String : 256,
      kSecAttrTokenID as String       : kSecAttrTokenIDSecureEnclave,
      kSecPrivateKeyAttrs as String   : [
        kSecAttrIsPermanent as String     : true,
        kSecAttrApplicationTag as String  : tag,
        kSecAttrAccessControl as String   : access,
        kSecUseAuthenticationUI as String : kSecUseAuthenticationUIAllow
      ]
    ]
    
    var error: Unmanaged<CFError>?
    
    guard let privateKey = SecKeyCreateRandomKey(
      attributes as CFDictionary,
      &error
    ) else {
        let err = error!.takeRetainedValue() as Error
        reject(nil, "Can't generate keypair", err)
        print(err)
        return
    }
    
    guard let publicKey = SecKeyCopyPublicKey(privateKey) else {
        reject(nil, "Can't get public key", nil)
        return
    }
    
    guard let pubExt = SecKeyCopyExternalRepresentation(
      publicKey,
      &error
    ) else {
        reject(nil, "Can't export public key", nil)
        return
    }
    
    let publicKeyDER = prependCurveHeader(pubKeyData: pubExt as Data)
    
    print("[EnclaveModule] Created keypair")
    resolve(publicKeyDER.base64EncodedString());
  }
  
  @objc(deleteKeyPair:resolver:rejecter:)
  func deleteKeyPair(
    _ alias: NSString,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    print("[EnclaveModule] deleteKeyPair called")
    let tag = (alias as String).data(using: .utf8)!
    
    let query: [String: Any] = [
      kSecClass as String               : kSecClassKey,
      kSecAttrApplicationTag as String  : tag,
      kSecAttrKeyType as String         : kSecAttrKeyTypeEC,
      kSecReturnRef as String           : true
    ]

    let status = SecItemDelete(query as CFDictionary)
    
    guard status == errSecSuccess else {
        reject(status.description, "Can't delete keypair", nil)
        return;
    }
    
    print("[EnclaveModule] Deleted keypair")
    resolve(true);
  }
    
  /// Signs a message using Enclave
  @objc(signMessage:message:resolver:rejecter:)
  func signMessage(
    _ alias: NSString,
    _ message: NSString,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    print("[EnclaveModule] signMessage called")
    
    // Get the key handle
    let keyHandle = getKeyHandle(alias: alias as String)!
    
    // Try to sign the message
    do {
      let signature = try sign(message as String, keyHandle)
      resolve(signature)
      print("[EnclaveModule] Signed message")
    } catch EnclaveError.message(let message) {
      reject(nil, message, nil)
    } catch {
      reject(nil, "Unknown error", nil)
    }
  }
}

/// Adds SECP256R1 curve header to the public key
func prependCurveHeader(pubKeyData: Data) -> Data {
    let secp256r1Header = Data(_: [
        0x30, 0x59, 0x30, 0x13, 0x06, 0x07, 0x2a,
        0x86, 0x48, 0xce, 0x3d, 0x02, 0x01, 0x06,
        0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03,
        0x01, 0x07, 0x03, 0x42, 0x00
    ])
  
    return secp256r1Header + pubKeyData
}
