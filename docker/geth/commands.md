``` bash
make geth

cd build/bin

./geth --datadir ../geth-test init genesis.json

geth account new --datadir ../geth-test

./geth --datadir ../geth-test --networkid 42069 --http --http.port 8545 --http.corsdomain '*' --http.vhosts '*' console

```

``` javascript
miner.setEtherbase(eth.accounts[0])
miner.start(1)
```