# Bundler Mock

In order to send ERC4337 transactions we have to have a mechanism to 
bundle `UserOperation`s. For the purpose of the demo, this is a simple Express
server mocking its behaviour.

## Operations 

- POST `/broadcast-txs`: Broadcast a transaction

### Input:
```js
txs: {
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
  hash: string;
}[]
```

### Output:
```js
{
  status: boolean;
  jobId: string;
}
```

