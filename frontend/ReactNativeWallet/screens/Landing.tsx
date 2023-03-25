import React from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Logo from '../assets/logo.png';
import FaceIdLogo from '../assets/faceid-logo.png';

import {Colors, Fonts} from './style';

const Landing = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <View>
          <Image
            source={Logo}
            style={{width: 120, height: 120, marginBottom: 10}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.bold,
              color: Colors.dark.text,
              fontSize: 24,
            }}>
            OPCLAVE
          </Text>
        </View>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.bigText}>Let's set up your wallet</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Menu');
          }}>
          <View
            style={{
              marginTop: 10,
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
            <Text style={{
              fontSize: 24,
              fontFamily: Fonts.bold,
              color: 'black',
              paddingHorizontal: 10
            }}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerSection}>
        <TouchableOpacity onPress={() => Alert.alert('Not available yet!')}>
          <Text style={styles.smallThin}>Already have a wallet?</Text>
          <Text style={styles.smallRegular}>
            Recover wallet using Guardians
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: Colors.dark.background},
  upperSection: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleSection: {
    flex: 2,
    alignItems: 'center',
  },
  lowerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: Colors.dark.accent,
    color: Colors.dark.text,
    overflow: 'hidden',
    borderRadius: 3,
    shadowColor: 'white',
  },
  bigText: {
    color: Colors.dark.text,
    fontSize: 32,
    fontFamily: Fonts.regular,
  },
  smallThin: {
    textAlign: 'center',
    color: Colors.dark.text,
    fontSize: 16,
    fontFamily: Fonts.thin,
  },
  smallRegular: {
    textAlign: 'center',
    color: Colors.dark.text,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});

export default Landing;
