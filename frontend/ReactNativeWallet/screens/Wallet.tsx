/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {tokens} from '../chain';
import {AppContext} from '../context/AppContext';
import {Colors, Fonts} from './style';

import profile from '../assets/profile.png';

const Wallet = ({navigation}: {navigation: any}) => {
  const {displayData} = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Image
        source={profile}
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'white',
          borderRadius: 25,
          marginBottom: 15,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          fontFamily: Fonts.regular,
          borderRadius: 5,
          overflow: 'hidden',
          borderWidth: 2,
          borderColor: Colors.dark.text,
          color: Colors.dark.text,
          padding: 5,
          paddingHorizontal: 15,
        }}>
        {displayData.username}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.amountInput}>{displayData.balance} ETH</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <WalletButton text="Send" onPress={() => navigation.navigate('Send')} />
        <WalletButton text="Swap" onPress={() => navigation.navigate('Swap')} />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <WalletButton
          text="Browser"
          onPress={() => Alert.alert('Not available yet!')}
        />
        <WalletButton
          text="Guardians"
          onPress={() => navigation.navigate('Guardians')}
        />
      </View>

      <Balances style={{marginTop: 20, width: '70%', height: '40%'}} />
    </View>
  );
};

const WalletButton = (props: {
  text: string;
  onPress: () => void;
  style?: any;
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...props.style,
      }}
      onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const Balances = (props: {style?: any}) => {
  return (
    <View style={{...props.style}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          color: 'white',
          fontFamily: Fonts.regular,
          marginBottom: 10,
        }}>
        Your Balances
      </Text>

      <ScrollView
        style={{
          backgroundColor: Colors.dark.accent,
          paddingHorizontal: 10,
          paddingVertical: 5,
          overflow: 'hidden',
          borderRadius: 10,
        }}>
        {tokens.map(({name, logo}, i: number) => {
          return (
            <View
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                marginVertical: 10,
                paddingBottom: 7,
              }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={logo}
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    shadowColor: 'black',
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                  }}
                />
                <Text
                  style={{
                    fontSize: 24,
                    color: 'white',
                    fontFamily: Fonts.regular,
                  }}>
                  {name}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 24,
                  color: 'white',
                  fontFamily: Fonts.regular,
                }}>
                0.0
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
  },
  amountInput: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    textAlign: 'left',
    overflow: 'hidden',
    borderRadius: 10,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    fontSize: 25,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: Colors.dark.accent,
    overflow: 'hidden',
    borderRadius: 5,
    marginHorizontal: 5,
    width: 120,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.bold,
    textAlign: 'center',
  },
  bigText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.bold,
    textAlign: 'center',
  },
});

export default Wallet;
