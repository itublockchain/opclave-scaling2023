package ecverify

import (
	"encoding/hex"
	"testing"

	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/assert"
)

const (
	pubKey    string = "03acdd696a4c5b603f7115db9baa5fc58b14fb2fa133b9c1f472465e4718bfb98d"
	dataHash  string = "62fe8625fd33bd7f48ca4561fed3c80d5d82e6c41ef0f0122d594b35924bf04e"
	signature string = "304502200f62a197ceb328bfcacc42d4118e19823a1f281e3ff2eda1c87f2464437cc3b3022100bbcda922818ba7ee43369a71db1b9c53a5981bff39300aded68ba51b99ced6dc"

	data string = "03acdd696a4c5b603f7115db9baa5fc58b14fb2fa133b9c1f472465e4718bfb98d62fe8625fd33bd7f48ca4561fed3c80d5d82e6c41ef0f0122d594b35924bf04e00304502200f62a197ceb328bfcacc42d4118e19823a1f281e3ff2eda1c87f2464437cc3b3022100bbcda922818ba7ee43369a71db1b9c53a5981bff39300aded68ba51b99ced6dc"
)

var input []byte
var inputx []byte

func init() {
	in := make([]byte, 256)
	inx := make([]byte, 256)

	pkh, _ := hex.DecodeString(pubKey)
	dhh, _ := hex.DecodeString(dataHash)
	sh, _ := hex.DecodeString(signature)
	sh = common.LeftPadBytes(sh, 72)

	copy(in[0:33], pkh)
	copy(in[33:65], dhh)
	copy(in[65:137], sh)

	dh, _ := hex.DecodeString(data)
	copy(inx, dh)

	input = in
	inputx = inx
}

func TestRunEcverify(t *testing.T) {
	one := common.LeftPadBytes([]byte{1}, 32)
	ecv := &ecverify{}
	ok, _ := ecv.Run(input)
	assert.Equal(t, one, ok)

	ok, _ = ecv.Run(inputx)
	assert.Equal(t, one, ok)
}
