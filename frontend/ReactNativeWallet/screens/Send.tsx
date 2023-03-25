/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import axios from 'axios';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Keyboard,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

import '@ethersproject/shims';
import {utils} from 'ethers';
import {Enclave, UserOperation} from '../lib';

import FaceIdLogo from '../assets/faceid-logo.png';
import SentIcon from '../assets/sent.png';
import FailedIcon from '../assets/failed.png';
import FollowLinkIcon from '../assets/follow-link-white.png';

import {Colors, Fonts} from './style';
import {deployments, tokens} from '../chain';
import {AppContext} from '../context/AppContext';

const ESTIMATE_FEE = 0.0000194;

const Container = (props: {children: any}) => {
  return (
    <View
      style={{
        margin: 15,
        width: '80%',
      }}>
      {props.children}
    </View>
  );
};

const FlexRow = (props: {children: any}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {props.children}
    </View>
  );
};

const VerticalSpacer = (props: {height: number}) => {
  return <View style={{height: props.height}} />;
};

const Picker = (props: {
  defaultItem: {key: number; value: string};
  items: {key: number; value: string}[];
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <SelectList
      defaultOption={props.defaultItem}
      data={props.items}
      setSelected={(val: number) => props.setSelected(val)}
      save="key"
      fontFamily={Fonts.bold}
      dropdownTextStyles={{color: 'white'}}
      dropdownStyles={{
        width: 75,
        backgroundColor: Colors.dark.accent,
        position: 'absolute',
        transform: [{translateY: 35}],
        borderRadius: 5,
        zIndex: 1,
        borderColor: 'transparent',
      }}
      search={false}
      arrowicon={<View />}
      inputStyles={{color: 'white', marginLeft: 5}}
      boxStyles={{
        borderRadius: 5,
        borderColor: 'transparent',
        backgroundColor: Colors.dark.accent,
        width: 75,
      }}
    />
  );
};

const TransferSuccess = (props: {onPress: () => void}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.dark.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={SentIcon}
        style={{width: 100, height: 100, marginBottom: 20}}
      />

      <TouchableOpacity
        onPress={async () => {
          const URL =
            'https://goerli-optimism.etherscan.io/address/0xc6a2FBCFad2F45960cbfe876c26D3Eb342A98D18';

          const supported = await Linking.canOpenURL(URL);

          if (supported) {
            await Linking.openURL(URL);
          }
        }}>
        <FlexRow>
          <Text style={{fontSize: 30, color: 'white', fontFamily: Fonts.bold}}>
            Transfer successful
          </Text>
          <Image
            source={FollowLinkIcon}
            style={{width: 20, height: 20, alignSelf: 'flex-start'}}
          />
        </FlexRow>
      </TouchableOpacity>

      <VerticalSpacer height={20} />
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          backgroundColor: Colors.dark.accent,
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontFamily: Fonts.bold}}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const TransferError = (props: {onPress: () => void}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.dark.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={FailedIcon}
        style={{width: 100, height: 100, marginBottom: 20}}
      />

      <Text style={{fontSize: 30, color: 'white', fontFamily: Fonts.bold}}>
        Transfer failed
      </Text>
      <VerticalSpacer height={20} />
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          backgroundColor: Colors.dark.accent,
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontFamily: Fonts.bold}}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const PrepareTransfer = (props: {
  onSuccess: (successData: {txHash: string}) => void;
  onError: () => void;
}) => {
  // These are for the convenience in the demo, otherwise we'd have to wait for balanceOf calls
  const {dummyData, setDummyData} = useContext(AppContext);

  const [amount, setAmount] = useState('1');
  const [address, setAddress] = useState(
    '0x81841c4648E17Db0F4Dc7e47195D19B19BA47a66',
  );
  const [clicked, setClicked] = useState(false);

  const [selectedGasToken, setSelectedGasToken] = useState(0);
  const [selectedTransferToken, setSelectedTransferToken] = useState(0);

  async function onSend() {
    if (utils.isAddress(address) === false) {
      console.log('Invalid address');
      return;
    }

    const ERC20_IFACE = new utils.Interface([
      'function approve(address spender, uint256 amount) public returns (bool)',
      'function transfer(address to, uint256 amount) public returns (bool)',
    ]);

    let nonce = await UserOperation.getNonce(deployments.account);

    const parsedAmount = utils.parseUnits(
      amount,
      tokens[selectedTransferToken].decimals,
    );

    // We are approving more than we want in reality
    const approveData = ERC20_IFACE.encodeFunctionData('approve', [
      deployments.paymaster,
      utils.parseEther(amount),
    ]);

    const transferData = ERC20_IFACE.encodeFunctionData('transfer', [
      address,
      parsedAmount,
    ]);

    const createOperation = async (
      data: UserOperation.TxData[],
      params?: Partial<UserOperation.Params>,
    ): Promise<UserOperation.Operation> => {
      const opParams = await UserOperation.fillParamsBatch(data, params);
      nonce += 1;
      const encodedOp = await UserOperation.encode(opParams);
      const signature = await Enclave.signMessage(encodedOp);

      // Sleep 5 seconds to simulate the time it takes to send the transaction
      await new Promise((resolve) => setTimeout(resolve, 5000));

      return await UserOperation.create(opParams, signature);
    };

    const transferOp = await createOperation(
      [{dest: deployments.opToken, data: transferData}],
      {
        sender: deployments.account,
        entryPoint: deployments.entryPoint,
        paymaster: deployments.paymaster,
        chainId: 420,
        nonce,
        callGasLimit: Math.floor(Math.random() * 90000 + 10000),
        verificationGasLimit: Math.floor(Math.random() * 90000 + 10000),
        preVerificationGas: Math.floor(Math.random() * 90000 + 10000),
        maxFeePerGas: 10,
        maxPriorityFeePerGas: 10,
      },
    );

    // DEBUG
    if (selectedGasToken === 0) {
      setDummyData({
        ...dummyData,
        ethBalance: dummyData.ethBalance - ESTIMATE_FEE,
      });
    } else {
      setDummyData({
        ...dummyData,
        opBalance:
          dummyData.opBalance -
          ESTIMATE_FEE * tokens[selectedGasToken].priceEth,
      });
    }

    // DEBUG
    if (selectedTransferToken === 0) {
      setDummyData({
        ...dummyData,
        ethBalance: dummyData.ethBalance - parseFloat(amount),
      });
    } else {
      setDummyData({
        ...dummyData,
        opBalance: dummyData.opBalance - parseFloat(amount),
      });
    }

    try {
      const bundlerResponse: {jobId: string} = await axios
        .post('http://localhost:3000/broadcast-txs', {
          txs: [transferOp],
        })
        .then(resp => resp.data);
      console.log(bundlerResponse);

      // Handle Success
      props.onSuccess({txHash: bundlerResponse.jobId});
    } catch (e) {
      console.error(e);

      // Handle Error
      props.onError();
    }
  }

  return (
    <View
      style={{
        backgroundColor: Colors.dark.background,
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: '10%',
        alignItems: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: Fonts.bold,
          fontSize: 32,
          color: Colors.dark.text,
          marginBottom: '15%',
        }}>
        Send Funds
      </Text>

      <Container>
        <Text style={styles.labelText}>Recipient:</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            onBlur={Keyboard.dismiss}
            style={styles.input}
            onChangeText={setAddress}
            value={String(address)}
            placeholder="Recipient Address"
            placeholderTextColor={'white'}
          />
        </View>

        <VerticalSpacer height={20} />

        <Text style={styles.labelText}>Amount:</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            onBlur={Keyboard.dismiss}
            style={styles.input}
            onChangeText={e => {
              setAmount(parseFloat(e).toString());
            }}
            value={amount}
            placeholder="Amount"
            keyboardType="numeric"
            placeholderTextColor={'white'}
          />

          <Picker
            defaultItem={{key: 0, value: tokens[0].symbol}}
            setSelected={setSelectedTransferToken}
            items={tokens.map(({symbol}, index: number) => ({
              key: index,
              value: symbol,
            }))}
          />
        </View>

        <View
          style={{
            marginTop: 100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{...styles.labelText, flex: 1}}>Fee:</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: Fonts.bold,
                marginRight: 20,
              }}>
              {ESTIMATE_FEE * tokens[selectedGasToken].priceEth}
            </Text>

            <Picker
              defaultItem={{key: 0, value: tokens[0].symbol}}
              setSelected={setSelectedGasToken}
              items={tokens.map(({symbol}, index: number) => ({
                key: index,
                value: symbol,
              }))}
            />
          </View>
        </View>
      </Container>

      <VerticalSpacer height={20} />

      {clicked ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <TouchableOpacity
          onPress={async () => {
            setClicked(true);
            await onSend();
          }}>
          <View
            style={{
              backgroundColor: 'white',
              opacity: 0.8,
              borderRadius: 10,
              paddingHorizontal: 5,
              paddingVertical: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={FaceIdLogo}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                fontFamily: Fonts.bold,
                color: 'black',
                paddingHorizontal: 10,
              }}>
              Send
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: Colors.dark.text,
    fontSize: 24,
    fontFamily: Fonts.regular,
    marginBottom: 5,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginRight: 20,
    textAlign: 'right',
    borderColor: 'white',
    color: 'white',
    flex: 1,
  },
});

const Send = ({navigation}: {navigation: any}) => {
  const [transferState, setTransferState] = useState(0);

  switch (transferState) {
    case 0:
      return (
        <PrepareTransfer
          onSuccess={() => {
            setTransferState(1);
          }}
          onError={() => {
            setTransferState(1);
          }}
        />
      );
    case 1:
      return (
        <TransferSuccess
          onPress={() => {
            navigation.navigate('Menu');
          }}
        />
      );
    case 2:
      return (
        <TransferError
          onPress={() => {
            navigation.navigate('Menu');
          }}
        />
      );
  }

  return <View />;
};

export default Send;
