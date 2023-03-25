import {BigNumber, Contract, utils} from 'ethers';
import {provider} from './provider';

export type TxData = {
  dest: string;
  value?: number;
  data?: string;
};

export type Params = {
  sender: string;
  nonce: number;
  initCode: string;
  callData: string;
  callGasLimit: number;
  verificationGasLimit: number;
  preVerificationGas: number;
  maxFeePerGas: number;
  maxPriorityFeePerGas: number;
  paymaster: string;
  chainId: number;
  entryPoint: string;
};

const USER_OPERATION_DEFAULTS: Params = {
  sender: '0x2e234DAe75C793f67A35089C9d99245E1C58470b',
  nonce: 0,
  initCode: '0x',
  callGasLimit: 100000,
  verificationGasLimit: 100000,
  preVerificationGas: 100000,
  maxFeePerGas: 4,
  maxPriorityFeePerGas: 2,
  entryPoint: '0x5615dEB798BB3E4dFa0139dFa1b3D433Cc23b72f',
  chainId: 420,
  callData: '0x',
  paymaster: '0x',
};

export type Operation = Omit<Params, 'paymaster'> & {
  signature: string;
  paymasterAndData: string;
};

const ACCOUNT_INTERFACE = new utils.Interface([
  'function nonce() public view returns(uint256)',
  'function execute(address target, uint256 value, bytes calldata data)',
  'function executeBatch(address[] calldata dest, bytes[] calldata func) external',
]);

function encodeCalldata(params: TxData): string {
  const value = utils.parseEther(String(params.value ?? 0));
  const data = params.data ?? '0x';

  return ACCOUNT_INTERFACE.encodeFunctionData('execute', [
    params.dest,
    value,
    data,
  ]);
}

function encodeCalldataBatch(params: TxData[]): string {
  const dest = params.map(p => p.dest);
  const data = params.map(p => p.data ?? '0x');

  return ACCOUNT_INTERFACE.encodeFunctionData('executeBatch', [dest, data]);
}

export async function getNonce(sender: string): Promise<number> {
  const accountContract = new Contract(sender, ACCOUNT_INTERFACE, provider);
  return await accountContract.nonce().then((n: BigNumber) => Number(n));
}

export async function fillParams(
  data: TxData,
  params?: Partial<Params>,
): Promise<Params> {
  const sender = params?.sender ?? USER_OPERATION_DEFAULTS.sender;

  let nonce: number;

  if (params?.nonce != null) {
    nonce = params.nonce;
  } else {
    nonce = await getNonce(sender);
  }

  return {
    ...USER_OPERATION_DEFAULTS,
    ...params,
    callData: encodeCalldata(data),
    nonce,
  };
}

export async function fillParamsBatch(
  data: TxData[],
  params?: Partial<Params>,
): Promise<Params> {
  const sender = params?.sender ?? USER_OPERATION_DEFAULTS.sender;

  let nonce: number;

  if (params?.nonce != null) {
    nonce = params.nonce;
  } else {
    nonce = await getNonce(sender);
  }

  return {
    ...USER_OPERATION_DEFAULTS,
    ...params,
    callData: encodeCalldataBatch(data),
    nonce,
  };
}

export async function encode(params: Params): Promise<string> {
  const {
    sender,
    nonce,
    initCode,
    callGasLimit,
    verificationGasLimit,
    preVerificationGas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    paymaster,
    chainId,
    entryPoint,
    callData: calldata,
  } = params;

  return utils.keccak256(
    utils.defaultAbiCoder.encode(
      [
        'address',
        'uint256',
        'bytes',
        'bytes',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'uint256',
        'bytes',
        'address',
        'uint256',
      ],
      [
        sender,
        nonce,
        initCode,
        calldata,
        callGasLimit,
        verificationGasLimit,
        preVerificationGas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        paymaster,
        entryPoint,
        chainId,
      ],
    ),
  );
}

export async function create(
  params: Params,
  signature: string,
): Promise<Operation> {
  const {paymaster, ...rest} = params;
  const paymasterAndData = paymaster;

  if (!rest.initCode.startsWith('0x')) rest.initCode = '0x' + rest.initCode;
  if (!rest.callData.startsWith('0x')) rest.callData = '0x' + rest.callData;
  if (!signature.startsWith('0x')) signature = '0x' + signature;

  return {...rest, paymasterAndData, signature};
}
