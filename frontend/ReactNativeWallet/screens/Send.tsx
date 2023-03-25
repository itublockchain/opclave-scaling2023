/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import axios from 'axios';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

import '@ethersproject/shims';
import {utils} from 'ethers';
import {Enclave, UserOperation} from '../lib';

import FaceIdLogo from '../assets/faceid-logo.png';

import {AppContext} from '../context/AppContext';
import {Colors, Fonts} from './style';
import {deployments, tokens} from '../chain';

const ESTIMATE_FEE = 0.0000194;

const Send = () => {
  const {displayData} = useContext(AppContext);

  const [amount, setAmount] = useState('100');
  const [address, setAddress] = useState(
    '0x81841c4648E17Db0F4Dc7e47195D19B19BA47a66',
  );

  const [selectedGasToken, setSelectedGasToken] = useState(0);
  const [selectedTransferToken, setSelectedTransferToken] = useState(tokens[0]);

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

    // We are approving more than we want in reality
    const approveData = ERC20_IFACE.encodeFunctionData('approve', [
      deployments.paymaster,
      utils.parseEther(String(amount)),
    ]);

    const transferData = ERC20_IFACE.encodeFunctionData('transfer', [
      address,
      String(amount),
    ]);

    const createOperation = async (
      data: UserOperation.TxData[],
      params?: Partial<UserOperation.Params>,
    ): Promise<UserOperation.Operation> => {
      const opParams = await UserOperation.fillParamsBatch(data, params);
      nonce += 1;
      const encodedOp = await UserOperation.encode(opParams);
      const signature = await Enclave.signMessage(encodedOp);
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
      },
    );

    try {
      const bundlerResponse: {jobId: string} = await axios
        .post('http://localhost:3001/broadcast-txs', {
          txs: [transferOp],
        })
        .then(resp => resp.data);
      console.log(bundlerResponse);
      // Handle Success
    } catch (e) {
      console.error(e);
      // Handle Error
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

      <View
        style={{
          margin: 15,
          width: '80%',
        }}>
        <Text style={styles.labelText}>Recipient:</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={String(address)}
            placeholder="Recipient Address"
            placeholderTextColor={'white'}
          />
        </View>
      </View>

      <View
        style={{
          margin: 15,
          width: '80%',
        }}>
        <Text style={styles.labelText}>Amount:</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={styles.input}
            onChangeText={e => {
              if (e.endsWith('.') || e.endsWith('0')) {
                return setAmount(e);
              } else if (isNaN(parseFloat(e)) || e.length === 0) {
                return setAmount('0');
              } else {
                setAmount(parseFloat(e).toString());
              }
            }}
            value={String(amount)}
            placeholder="Amount"
            keyboardType="numeric"
            placeholderTextColor={'white'}
          />
          <SelectList
            setSelected={(val: any) => setSelectedTransferToken(val)}
            data={tokens.map(({symbol}, index: number) => ({
              key: index,
              value: symbol,
            }))}
            save="value"
            defaultOption={{
              key: 0,
              value: tokens[0].symbol,
            }}
            fontFamily={Fonts.bold}
            dropdownTextStyles={{color: 'white'}}
            dropdownStyles={{
              width: 75,
              backgroundColor: Colors.dark.accent,
              position: 'absolute',
              transform: [{translateY: 35}],
              borderRadius: 5,
              zIndex: 100,
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
        </View>
      </View>

      <View
        style={{
          height: '15%',
        }}
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
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

          <SelectList
            setSelected={(val: any) => setSelectedGasToken(val)}
            data={tokens.map(({symbol}, index: number) => ({
              key: index,
              value: symbol,
            }))}
            save="key"
            defaultOption={{
              key: 0,
              value: tokens[0].symbol,
            }}
            dropdownTextStyles={{color: 'white'}}
            dropdownStyles={{
              width: 75,
              backgroundColor: Colors.dark.accent,
              position: 'absolute',
              transform: [{translateY: 35}],
              borderRadius: 5,
              zIndex: 100,
              borderColor: 'transparent',
            }}
            search={false}
            fontFamily={Fonts.bold}
            arrowicon={<View />}
            inputStyles={{color: 'white', marginLeft: 5}}
            boxStyles={{
              borderRadius: 5,
              backgroundColor: Colors.dark.accent,
              width: 75,
              zIndex: 0,
              borderColor: 'transparent',
            }}
          />
        </View>
      </View>

      <TouchableOpacity onPress={onSend}>
        <View
          style={{
            marginTop: 30,
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

export default Send;
