/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import * as enclave from './enclave';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

/*
  sender	address	The account making the operation
  nonce	uint256	Anti-replay parameter; also used as the salt for first-time account creation
  initCode	bytes	The initCode of the account (needed if and only if the account is not yet on-chain and needs to be created)
  callData	bytes	The data to pass to the sender during the main execution call
  callGasLimit	uint256	The amount of gas to allocate the main execution call
  verificationGasLimit	uint256	The amount of gas to allocate for the verification step
  preVerificationGas	uint256	The amount of gas to pay for to compensate the bundler for pre-verification execution and calldata
  maxFeePerGas	uint256	Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)
  maxPriorityFeePerGas	uint256	Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)
  paymasterAndData	bytes	Address of paymaster sponsoring the transaction, followed by extra data to send to the paymaster (empty for self-sponsored transaction)
  signature
*/

const RPC_URL = 'https://rpc.ankr.com/eth_goerli';
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

async function testEnclave() {
  const to = '0x0000000000000000000000000000000000004337';
  const amount = ethers.utils.parseEther('0.4337');
  const tx = {to, amount};

  const genericGasLimit = 50000;
  const genericGas = await provider.estimateGas(tx);

  const sender = '0x3831868CfdEFfee6e7b0b739B8c395f4FBa0fBbF';
  const nonce = 1;
  const initCode: string[] = [];
  const callData: string[] = [];
  const callGasLimit = genericGasLimit;
  const verificationGasLimit = genericGasLimit;
  const preVerificationGas = genericGas;
  const maxFeeForGas = ethers.utils.parseEther('0.004');
  const maxPriorityFeePerGas = ethers.utils.parseEther('0.004');
  const paymasterAndData: string[] = [];
  const chainId = 5;
  const entryPoint = '0x0576a174d229e3cfa37253523e645a78a0c91b57';

  const abiCoder = new ethers.utils.AbiCoder();

  const encodedTxData = abiCoder.encode(
    [
      'address',
      'uint256',
      'bytes',
      'bytes',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'uint256',
      'bytes',
      'address',
      'uint256',
    ],
    [
      sender,
      nonce,
      initCode,
      callData,
      callGasLimit,
      verificationGasLimit,
      preVerificationGas,
      maxFeeForGas,
      maxPriorityFeePerGas,
      paymasterAndData,
      entryPoint,
      chainId,
    ],
  );

  const tag = 'com.blockchain.itu.enclave.test';

  // try {
  //   // Try to get the keypair
  //   await enclave.getPublicKey(tag);
  // } catch {
  //   // Keypair not found, generate a new one
  //   await enclave.generateKeyPair(tag);
  // }

  const signature = await enclave.signMessage(encodedTxData, tag);

  console.log('encoded tx:', encodedTxData);
  // console.log('public key:', await enclave.getPublicKey(tag));
  console.log('signature:', signature);
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{ ...backgroundStyle, ...styles.sectionContainer }}>
      <Text style={styles.sectionTitle}>Opclave Wallet</Text>
      <View style={{ height: 20 }} />
      <Button title="Sign" color="#2222ff" onPress={testEnclave} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
