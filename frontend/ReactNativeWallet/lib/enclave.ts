import {NativeModules} from 'react-native';
import {Buffer} from 'buffer';
import elliptic from 'elliptic';

const LINKING_ERROR = 'Enclave Module is not linked';

const EnclaveModule = NativeModules.EnclaveModule
  ? NativeModules.EnclaveModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

const ALIAS: string = 'com.itu.blockchain.enclave';
const CURVE = new elliptic.ec('p256');

const formatPublicKey = (publicKeyBase64: string): string => {
  const publicKeyBuffer = Buffer.from(publicKeyBase64, 'base64');
  const publicKeyWithoutHeader = Uint8Array.prototype.slice.call(
    publicKeyBuffer,
    26,
  );
  return CURVE.keyFromPublic(publicKeyWithoutHeader).getPublic(true, 'hex');
};

export async function getPublicKey(): Promise<string> {
  const publicKeyBase64 = await EnclaveModule.getPublicKey(ALIAS);
  return formatPublicKey(publicKeyBase64);
}

export async function generateKeyPair(): Promise<string> {
  const publicKeyBase64 = await EnclaveModule.generateKeyPair(ALIAS);
  return formatPublicKey(publicKeyBase64);
}

export async function deleteKeyPair(): Promise<void> {
  return await EnclaveModule.deleteKeyPair(ALIAS);
}

export async function signMessage(data: string): Promise<string> {
  try {
    await getPublicKey();
  } catch {
    await generateKeyPair();
  }

  const signatureBase64 = await EnclaveModule.signMessage(ALIAS, data);
  return Buffer.from(signatureBase64, 'base64').toString('hex');
}