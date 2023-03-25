https://goerli.infura.io/v3/5f6507414db54d61b6cfe765b8b231c1

Mnemonic: public despair debris whip door tourist assume document frown crucial gap city

Admin: 0xa5f24b0bf7211c7751d024c2d7503b0f9e8e409e
Private Key: 2ea41d68643f95225af873d5acea41d3d1eaf1bf11c4da0ad15d115b6a5c4424

Proposer: 0x7c14c7c5760ed296b9f50137b5020cac24244edc
Private Key: 1adaca393738f4fcc95d08ecdfe21e2f959eb9ea5eee3b4d881b8d8978e68e89

Batcher: 0xcd2e9e0375eeee42a9de7bdb25cc6e93106407dc
Private Key: cdf35f135a71f22bd8eadf7fb76c30d02f7d5d480861d1eeba006f8612959c93

Sequencer: 0x6824bcdc10de5718d0f4d35b42288219144db666
Private Key: 8fe44e41d1c7fbbbe78f1a3c693bde6c39cd16b035e221f51042286e4fe44dea

hash                 0xb6386454730cc120d79c7a1956e4b64f9c1917a02145c6d52b8b73bcfd718fe4
number               8661082
timestamp            1678912608

sed -i s/ADMIN/0xa5f24b0bf7211c7751d024c2d7503b0f9e8e409e/g deploy-config/getting-started.json
sed -i s/PROPOSER/0x7c14c7c5760ed296b9f50137b5020cac24244edc/g deploy-config/getting-started.json
sed -i s/BATCHER/0xcd2e9e0375eeee42a9de7bdb25cc6e93106407dc/g deploy-config/getting-started.json
sed -i s/SEQUENCER/0x6824bcdc10de5718d0f4d35b42288219144db666/g deploy-config/getting-started.json
sed -i s/BLOCKHASH/0xb6386454730cc120d79c7a1956e4b64f9c1917a02145c6d52b8b73bcfd718fe4/g deploy-config/getting-started.json
sed -i s/\”TIMESTAMP\”/1678912608/g deploy-config/getting-started.json

./build/bin/geth \
	--datadir ./datadir \
	--http \
	--http.corsdomain="*" \
	--http.vhosts="*" \
	--http.addr=0.0.0.0 \
	--http.api=web3,debug,eth,txpool,net,engine \
	--ws \
	--ws.addr=0.0.0.0 \
	--ws.port=8546 \
	--ws.origins="*" \
	--ws.api=debug,eth,txpool,net,engine \
	--syncmode=full \
	--gcmode=full \
	--nodiscover \
	--maxpeers=0 \
	--networkid=42069 \
	--authrpc.vhosts="*" \
	--authrpc.addr=0.0.0.0 \
	--authrpc.port=8551 \
	--authrpc.jwtsecret=./jwt.txt \
	--rollup.disabletxpoolgossip=true \
	--password=./datadir/password \
	--allow-insecure-unlock \
	--mine \
	--miner.etherbase=0x6824bcdc10de5718d0f4d35b42288219144db666 \
	--unlock=0x6824bcdc10de5718d0f4d35b42288219144db666


./bin/op-node \
	--l2=http://localhost:8551 \
	--l2.jwt-secret=./jwt.txt \
	--sequencer.enabled \
	--sequencer.l1-confs=3 \
	--verifier.l1-confs=3 \
	--rollup.config=./rollup.json \
	--rpc.addr=0.0.0.0 \
	--rpc.port=8547 \
	--p2p.listen.ip=0.0.0.0 \
	--p2p.listen.tcp=9003 \
	--p2p.listen.udp=9003 \
	--rpc.enable-admin \
	--p2p.sequencer.key=8fe44e41d1c7fbbbe78f1a3c693bde6c39cd16b035e221f51042286e4fe44dea \
	--l1=$L1_RPC_URL \
	--l1.rpckind=basic \
	—-l1.trustrpc=true
      
./bin/op-batcher \
    --l2-eth-rpc=http://localhost:8545 \
    --rollup-rpc=http://localhost:8547 \
    --poll-interval=1s \
    --sub-safety-margin=6 \
    --num-confirmations=1 \
    --safe-abort-nonce-too-low-count=3 \
    --resubmission-timeout=30s \
    --rpc.addr=0.0.0.0 \
    --rpc.port=8548 \
    --target-l1-tx-size-bytes=2048 \
    --l1-eth-rpc=$L1_RPC_URL \
    --private-key=cdf35f135a71f22bd8eadf7fb76c30d02f7d5d480861d1eeba006f8612959c93
