FROM ubuntu:20.04

# This signals apt to not prompt while installing packages,
# required to install pkg-config
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update

# Install essentials 
RUN apt install -y wget
RUN apt install -y curl
RUN apt install -y git
RUN apt install -y pkg-config      # For building node.js projects
RUN apt install -y build-essential # For g++
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

# Copy the project files and build
WORKDIR /usr/app/
COPY . .

RUN yarn
RUN make build

