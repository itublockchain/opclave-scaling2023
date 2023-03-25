import { providers, Wallet } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const PROVIDER_REQUIRED_ENVS = ["PROVIDER_URL", "SIGNER_PRIVATE_KEY"];
for (const env of PROVIDER_REQUIRED_ENVS) {
  if (!process.env[env]) {
    throw new Error(`Missing env: ${env}`);
  }
}

const PROVIDER_URL = process.env.PROVIDER_URL || "";
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY || "";

const provider = new providers.JsonRpcProvider(PROVIDER_URL);
const signer = new Wallet(SIGNER_PRIVATE_KEY, provider);

export { provider, signer };
