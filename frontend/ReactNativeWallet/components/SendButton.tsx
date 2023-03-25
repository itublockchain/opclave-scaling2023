/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {Fonts} from '../screens/style';

const TransferButton = () => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#130c33',
        borderBottomColor: 'pink',
        borderBottomWidth: 1,
        borderRadius: 14,
      }}>
      <Text
        style={{
          color: 'silver',
          fontSize: 20,
          fontFamily: Fonts.bold,
        }}>
        Transfer
      </Text>
    </View>
  );
};

export default TransferButton;
