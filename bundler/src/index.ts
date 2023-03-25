import express from "express";
import { Contract, ethers, utils } from "ethers";
import { abi, signer } from "./chain";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

/* POST: /broadcast-tx */

const BROADCAST_TX_REQUIRED_FIELDS = [
  "sender",
  "nonce",
  "initCode",
  "callData",
  "callGasLimit",
  "verificationGasLimit",
  "preVerificationGas",
  "maxFeePerGas",
  "maxPriorityFeePerGas",
  "paymasterAndData",
  "chainId",
  "entryPoint",
  "signature",
];

app.post("/broadcast-txs", async (req, res) => {
  try {
    if (req.body?.txs == null) {
      return res.status(400).send({
        status: false,
        error: "Missing field txs",
      });
    }

    for (const txIdx in req.body.txs as API.UserOperation[]) {
      const tx = req.body.txs[txIdx];
      for (const field of BROADCAST_TX_REQUIRED_FIELDS) {
        if (tx[field] == undefined) {
          return res.status(400).send({
            status: false,
            error: `Missing field ${field} on tx #${txIdx}`,
          });
        }
      }
    }

    const userOps: API.UserOperation[] = req.body.txs;

    const entryPointInterface = new utils.Interface(abi.ENTRYPOINT);
    const entryPointAddress = "0x7C2641de9b8ECED9C3796B0bf99Ead1BeD5407A5";
    const entryPoint = new Contract(entryPointAddress, entryPointInterface, signer);

    const handleTx = await entryPoint.handleOps(userOps, signer.address);
    const randomId = Buffer.from(ethers.utils.randomBytes(10)).toString("hex");

    console.log(`Handle transaction complete: ${handleTx.hash}`);

    res.send({
      status: true,
      jobId: randomId,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).send({
      status: false,
      error: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Bundler mock listening at http://localhost:${port}`);
});