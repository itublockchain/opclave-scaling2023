import "@ethersproject/shims";
import { providers } from 'ethers';

const RPC_URL = "https://optimism-goerli.public.blastapi.io";

export const provider = new providers.JsonRpcProvider(RPC_URL); 
