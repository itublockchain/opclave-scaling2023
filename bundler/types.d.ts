export {};

/**
 * 
 * Inject   export type UserOperation = {
    sender: string;
    nonce: number;
    initCode: Uint8Array;
    callData: string;
    callGasLimit: number;
    verificationGasLimit: number;
    preVerificationGas: number;
    maxFeePerGas: number;
    maxPriorityPerGas: number;
    paymasterAndData: string;
    chainId: number;
    entryPoint: string;
    signature: string;
  };
  to the global namespace
 */
declare global {
  namespace API {
    export type UserOperation = {
      sender: string;
      nonce: number;
      initCode: string;
      callData: string;
      callGasLimit: number;
      verificationGasLimit: number;
      preVerificationGas: number;
      maxFeePerGas: number;
      maxPriorityPerGas: number;
      paymasterAndData: string;
      chainId: number;
      entryPoint: string;
      signature: string;
    };
  }
}
