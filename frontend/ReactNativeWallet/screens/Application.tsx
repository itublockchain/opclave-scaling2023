/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';

import {AppContext} from '../context/AppContext';

import UniLogo from "../assets/uni-logo.png";
import AaveLogo from "../assets/aave-logo.png";
import { Fonts } from './style';

const Application = () => {
  const [selected, setSelected] = React.useState('');
  const [amount, setAmount] = React.useState<string>('0');
  const {displayData} = useContext(AppContext);

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        backgroundColor: 'pink',
        padding: 10,
      }}>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          color: 'white',
          backgroundColor: '#AA336A',
          paddingVertical: 5,
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        {displayData.username}
      </Text>
      <View
        style={{
          borderColor: '#130c33',
          borderWidth: 3,
          borderRadius: 5,
          overflow: 'hidden',
          padding: 15,
          marginTop: 20,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={UniLogo}
            style={{width: 50, height: 50, marginRight: 10}}
          />
          <Text
            style={{
              color: '#AA336A',
              fontSize: 25,
              fontFamily: Fonts.bold,
              marginTop: 15,
            }}>
            Uniswap
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <View
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* <SelectList
              setSelected={(val: any) => setSelected(val)}
              data={appData.tokens.map((i: any, index: number) => ({
                key: index,
                value: i.name,
              }))}
              save="value"
              defaultOption={
                appData.tokens.map((i: any, index: number) => ({
                  key: index,
                  value: i.name,
                }))[0]
              }
            /> */}
            <TextInput
              style={{
                borderRadius: 10,
                marginLeft: 5,
                borderWidth: 1,
                borderColor: 'gray',
                width: 100,
                paddingVertical: 10,
                paddingHorizontal: 10,
                textAlign: 'right',
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
          </View>
          <View
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            {/* <SelectList
              setSelected={(val: any) => setSelected(val)}
              data={appData.tokens.map((i: any, index: number) => ({
                key: index,
                value: i.name,
              }))}
              save="value"
              defaultOption={
                appData.tokens.map((i: any, index: number) => ({
                  key: index,
                  value: i.name,
                }))[1]
              }
            /> */}
            <Text
              style={{
                borderRadius: 10,
                marginLeft: 5,
                borderWidth: 1,
                borderColor: 'gray',
                width: 100,
                paddingVertical: 10,
                paddingHorizontal: 10,
                textAlign: 'right',
              }}>
              {String((Number(amount) * 1.745).toFixed(2))}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  marginTop: 10,
                  padding: 15,
                  borderColor: 'pink',
                  borderWidth: 4,
                  backgroundColor: '#AA336A',
                  color: 'white',
                  fontFamily: 'AppleSDGothicNeo-Bold',
                }}>
                Swap
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{position: 'relative'}}>
        <Image
          source={AaveLogo}
          style={{position: 'absolute', top: 0, left: 0}}
        />
        {/* <Text
          style={{
            fontSize: 24,
            marginTop: 15,
            transform: [{rotate: '-45deg'}],
            fontStyle: 'italic',
          }}>
          AAVE coming soon!
        </Text> */}
      </View>
    </View>
  );
};

export default Application;
