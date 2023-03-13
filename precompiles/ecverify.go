package ecverify

import (
	"github.com/itublockchain/opclave-scaling2023/crypto"

	"github.com/ethereum/go-ethereum/common"
)

// secp256r1 signature verification implemented as a native contract.
type ecverify struct{}

const ecVerifyGas uint64 = 3000 // ecVerifyGas gas price

func (c *ecverify) RequiredGas(input []byte) uint64 {
	return ecVerifyGas
}

func (c *ecverify) Run(input []byte) ([]byte, error) {
	const ecVerifyInputLength = 256
	input = common.RightPadBytes(input, ecVerifyInputLength)

	pubKey := make([]byte, 33)
	dataHash := make([]byte, 32)
	signature := make([]byte, 72)

	copy(pubKey, input[0:34])
	copy(dataHash, input[34:66])
	copy(signature, input[66:138])

	// signature size can vary from 70 to 72 bytes, so we are left-trimming
	signature = common.TrimLeftZeroes(signature)

	// custom signature verification for secp256r1
	return crypto.VerifySignatureR1(pubKey, dataHash, signature), nil
}
