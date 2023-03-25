export type Token = {
  name: string;
  symbol: string;
  decimals: number;
  logo: any;
  address?: string;
  priceEth: number;
};

import EthLogo from '../assets/eth-logo.png';
import OpLogo from '../assets/op-logo.png';

export const deployments = {
  account: '0x5154de6CC9bb544a1A12079018F628eF63456574',
  paymaster: '0x0bb7B5e7E3B7Da3D45fEa583E467D1c4944D7A1f',
  opToken: '0xBB3E66eE258ef9Cc7b4e5d84F765071658A5215D',
  entryPoint: '0x7C2641de9b8ECED9C3796B0bf99Ead1BeD5407A5',
} as const;

export const tokens: Token[] = [
  {
    name: 'Ether',
    symbol: 'ETH',
    logo: EthLogo,
    decimals: 18,
    priceEth: 1
  },
  {
    name: 'OP Token',
    symbol: 'OP',
    logo: OpLogo,
    decimals: 18,
    address: deployments.opToken,
    priceEth: 775
  },
];
