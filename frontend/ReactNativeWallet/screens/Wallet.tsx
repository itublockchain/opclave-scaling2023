/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import profile from '../assets/profile.png';
import {AppContext} from '../context/AppContext';
import { Colors } from './style';

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
          color: 'pink',
          fontSize: 14,
          borderRadius: 10,
          overflow: 'hidden',
          borderWidth: 2,
          borderColor: 'pink',
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
        <Text style={styles.amountInput}>{displayData.balance}</Text>
        <Text style={{color: 'white', fontFamily: 'AppleSDGothicNeo-Bold'}}>
          ETH
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Send')}>
          <Text style={styles.bigText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Swap')}>
          <Text style={styles.bigText}>Swap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button3}
          onPress={() => Alert.alert('Not available yet!')}>
          <Text style={styles.bigText}>Browser</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button4}
          onPress={() => Alert.alert('Not available yet!')}>
          <Text style={styles.bigText}>Guardians</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: '40%',
          width: '70%',
          marginTop: 35,
        }}>
        {/* <ScrollView
          style={{
            backgroundColor: 'rgba(66, 45, 55, 0.6)',
            paddingHorizontal: 10,
            paddingVertical: 5,
            overflow: 'hidden',
            borderRadius: 10,
          }}>
          {displayData.tokens.map(
            (item: {name: string; amount: number}, i: number) => {
              return (
                <View
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    borderBottomColor: 'rgba(213, 185, 199, 0.33)',
                    borderBottomWidth: 1,
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
                      source={images[item.name]}
                      style={{width: 25, height: 25, marginRight: 5}}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'silver',
                        fontFamily: 'AppleSDGothicNeo-Bold',
                      }}>
                      {item.name.toUpperCase()}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'silver',
                      fontFamily: 'AppleSDGothicNeo-Bold',
                    }}>
                    {item.amount}
                  </Text>
                </View>
              );
            },
          )}
        </ScrollView> */}
      </View>
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
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '70%',
    textAlign: 'left',
    overflow: 'hidden',
    borderRadius: 15,
    color: 'white',
    borderColor: 'white',
    borderWidth: 5,
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
    backgroundColor: '#CB2477',
    color: 'white',
    overflow: 'hidden',
    borderRadius: 25,
    shadowColor: 'white',
    marginHorizontal: 5,
  },
  button2: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: '#5457EB',
    color: 'white',
    overflow: 'hidden',
    borderRadius: 25,
    shadowColor: 'white',
    marginHorizontal: 5,
  },
  button3: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: '#EF895D',
    color: 'white',
    overflow: 'hidden',
    borderRadius: 25,
    shadowColor: 'white',
    marginHorizontal: 5,
  },
  button4: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: '#22CBC7',
    color: 'white',
    overflow: 'hidden',
    borderRadius: 25,
    shadowColor: 'white',
    marginHorizontal: 5,
  },
  bigText: {color: 'white', fontSize: 14, fontFamily: 'AppleSDGothicNeo-Bold'},
});

export default Wallet;
