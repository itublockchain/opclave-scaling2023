FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt update

# Install essentials to build the node
RUN apt install -y wget
RUN apt install -y curl
RUN apt install -y git
RUN apt install -y pkg-config
RUN apt install -y build-essential
RUN apt install -y vim

# Install make
RUN apt install -y make
# Install go
RUN apt update
RUN wget https://go.dev/dl/go1.20.linux-amd64.tar.gz
RUN tar xvzf go1.20.linux-amd64.tar.gz
RUN cp go/bin/go /usr/bin/go
RUN mv go /usr/lib
RUN rm /go1.20.linux-amd64.tar.gz

ENV GOROOT="/usr/lib/go"

# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Install yarn
RUN npm install -g yarn

# Install foundry
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH="$PATH:/root/.foundry/bin"
RUN foundryup

# Build optimism monorepo
COPY optimism /usr/optimism
WORKDIR /usr/optimism

RUN yarn
RUN make build

# Copy deployed contracts
COPY deployments /usr/optimism/packages/contracts-bedrock/deployments/getting-started

# Copy network config
COPY network-config.json /usr/optimism/packages/contracts-bedrock/deploy-config/getting-started.json

# Build op-geth
COPY op-geth /usr/op-geth
WORKDIR /usr/op-geth

RUN make geth

ENV L1_RPC_URL=https://goerli.infura.io/v3/5f6507414db54d61b6cfe765b8b231c1

# Generate L2 config
WORKDIR /usr/optimism/op-node

RUN go run cmd/main.go genesis l2 \
  --deploy-config ../packages/contracts-bedrock/deploy-config/getting-started.json \
  --deployment-dir ../packages/contracts-bedrock/deployments/getting-started/ \
  --outfile.l2 genesis.json \
  --outfile.rollup rollup.json \
  --l1-rpc $L1_RPC_URL
RUN openssl rand -hex 32 > jwt.txt
RUN cp genesis.json /usr/op-geth
RUN cp jwt.txt /usr/op-geth

# Init op-geth
WORKDIR /usr/op-geth
ARG SEQUENCER_KEY=8fe44e41d1c7fbbbe78f1a3c693bde6c39cd16b035e221f51042286e4fe44dea

RUN mkdir datadir
RUN echo "pwd" > datadir/password
RUN echo $SEQUENCER_KEY > datadir/block-signer-key
RUN ./build/bin/geth account import --datadir=datadir --password=datadir/password datadir/block-signer-key
RUN ./build/bin/geth init --datadir=datadir genesis.json