//
//  EnclaveModule.m
//  ReactNativeWallet
//
//  Created by zetsuboii on 14.03.2023.
//

#import <React/RCTBridgeModule.h>
#import <Foundation/Foundation.h>
#import <LocalAuthentication/LocalAuthentication.h>
#import <Security/Security.h>
#import <React/RCTConvert.h>

@interface RCT_EXTERN_MODULE(EnclaveModule, NSObject)

// getPublicKey
RCT_EXTERN_METHOD(getPublicKey:(NSString)alias
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

// generateKeyPair
RCT_EXTERN_METHOD(generateKeyPair:(NSString)alias
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

// deleteKeyPair
RCT_EXTERN_METHOD(deleteKeyPair:(NSString)alias
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

// signMessage
RCT_EXTERN_METHOD(signMessage:(NSString)alias
                  message:(NSString)message
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end

