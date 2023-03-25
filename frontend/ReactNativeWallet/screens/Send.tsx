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
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

import '@ethersproject/shims';
import {utils} from 'ethers';

// import {Enclave, UserOperation} from '../lib';

import {AppContext} from '../context/AppContext';

const Send = () => {
  const {displayData} = useContext(AppContext);

  const [amount, setAmount] = useState('100');
  const [address, setAddress] = useState(
    '0x81841c4648E17Db0F4Dc7e47195D19B19BA47a66',
  );

  const [selectedGasToken, setSelectedGasToken] = useState<string>('eth');
  const [selectedTransferToken, setSelectedTransferToken] = useState('');

  async function onSend() {
    // if (utils.isAddress(address) === false) {
    //   console.log('Invalid address');
    //   return;
    // }
    // const ERC20_IFACE = new utils.Interface([
    //   'function approve(address spender, uint256 amount) public returns (bool)',
    //   'function transfer(address to, uint256 amount) public returns (bool)',
    // ]);
    // const GOERLI_ADDRESSES = {
    //   account: '0x5154de6CC9bb544a1A12079018F628eF63456574',
    //   paymaster: '0x0bb7B5e7E3B7Da3D45fEa583E467D1c4944D7A1f',
    //   mockToken: '0xBB3E66eE258ef9Cc7b4e5d84F765071658A5215D',
    //   entryPoint: '0x7C2641de9b8ECED9C3796B0bf99Ead1BeD5407A5',
    // };
    // let nonce = await UserOperation.getNonce(
    //   '0x5154de6CC9bb544a1A12079018F628eF63456574',
    // );
    // const approveData = ERC20_IFACE.encodeFunctionData('approve', [
    //   GOERLI_ADDRESSES.paymaster,
    //   '10000000000000000000000000',
    // ]);
    // const transferData = ERC20_IFACE.encodeFunctionData('transfer', [
    //   address,
    //   String(amount),
    // ]);
    // const createOperation = async (
    //   data: UserOperation.TxData[],
    //   params?: Partial<UserOperation.Params>,
    // ): Promise<UserOperation.Operation> => {
    //   const opParams = await UserOperation.fillParamsBatch(
    //     data,
    //     params,
    //   );
    //   nonce += 1;
    //   const encodedOp = await UserOperation.encode(opParams);
    //   const signature = await Enclave.signMessage(encodedOp);
    //   return await UserOperation.create(opParams, signature);
    // };
    // const transferOp = await createOperation(
    //   [{dest: GOERLI_ADDRESSES.mockToken, data: transferData}],
    //   {
    //     sender: GOERLI_ADDRESSES.account,
    //     entryPoint: GOERLI_ADDRESSES.entryPoint,
    //     paymaster: GOERLI_ADDRESSES.paymaster,
    //     chainId: 420,
    //     nonce,
    //   },
    // );
    // try {
    //   const bundlerResponse: {jobId: string} = await axios
    //     .post('http://localhost:3001/broadcast-txs', {
    //       txs: [transferOp],
    //     })
    //     .then(resp => resp.data);
    //   console.log(bundlerResponse);
    //   // Handle Success
    // } catch (e) {
    //   console.error(e);
    //   // Handle Error
    // }
  }

  return (
    <View
      style={{
        backgroundColor: '#130c33',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: 25,
        alignItems: 'center',
      }}>
      {/* <View style={{position: 'relative'}}>
        <Image source={money} />
      </View> */}
      <View
        style={{
          padding: 15,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
        }}>
        <TextInput
          style={{
            borderRadius: 10,
            marginLeft: 5,
            borderWidth: 3,
            borderColor: 'silver',
            color: 'silver',
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 10,
            textAlign: 'right',
            fontFamily: 'AppleSDGothicNeo-Bold',
          }}
          onChangeText={setAddress}
          value={String(address)}
          placeholder="Recipient Address"
          placeholderTextColor={'silver'}
        />
      </View>
      <View
        style={{
          padding: 15,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'relative',
          justifyContent: 'space-between',
          width: '90%',
        }}>
        <TextInput
          style={{
            borderRadius: 10,
            marginLeft: 5,
            borderWidth: 3,
            borderColor: 'silver',
            width: 200,
            paddingVertical: 10,
            paddingHorizontal: 10,
            textAlign: 'right',
            color: 'silver',
          }}
          onChangeText={e => {
            if (e.endsWith('.') || e.endsWith('0')) {
              console.log(e);
              return setAmount(e);
            }
            if (isNaN(parseFloat(e)) || e.length === 0) {
              console.log(e);
              return setAmount('0');
            } else {
              setAmount(parseFloat(e).toString());
            }
          }}
          value={String(amount)}
          placeholder="Amount"
          keyboardType="numeric"
        />
        <View style={{marginLeft: 10}}>
          {/* <SelectList
            setSelected={(val: any) => setSelectedTransferToken(val)}
            data={displayData.tokens.map((i: any, index: number) => ({
              key: index,
              value: i.name,
            }))}
            save="value"
            defaultOption={
              displayData.tokens.map((i: any, index: number) => ({
                key: index,
                value: i.name,
              }))[0]
            }
            dropdownTextStyles={{color: 'silver'}}
            inputStyles={{color: 'silver'}}
          /> */}
        </View>
      </View>
      <View
        style={{
          zIndex: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '80%',
          maxWidth: '80%',
          position: 'relative',
        }}>
        <ScrollView
          style={{
            backgroundColor: 'rgba(66, 45, 55, 0.6)',
            paddingHorizontal: 10,
            overflow: 'hidden',
            borderRadius: 10,
            height: '50%',
            width: '30%',
            paddingVertical: 2,
            minHeight: '35%',
          }}>
          {/* {displayData.gasTokens.map((item: any, i: number) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedGasToken(item.name)}>
                <View
                  style={{
                    backgroundColor:
                      selectedGasToken === item.name
                        ? 'rgba(66, 45, 55, 1)'
                        : 'transparent',
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 5,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                    paddingHorizontal: 2,
                    borderRadius: 10,
                  }}>
                  <Image
                    style={{width: 25, height: 25}}
                    source={images[item.name]}
                  />
                  <Text
                    style={{
                      color: 'silver',
                    }}>
                    {item?.name.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })} */}
        </ScrollView>
        <Text
          style={{color: 'silver', marginLeft: 15, maxWidth: '50%'}}
          lineBreakMode="head">
          Choose your gas token to proceed
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={onSend}>
          <Text
            style={{
              backgroundColor: 'silver',
              color: 'black',
              padding: 10,
              paddingHorizontal: 15,
              borderRadius: 15,
              overflow: 'hidden',
              fontWeight: 'bold',
            }}>
            SEND
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Send;
