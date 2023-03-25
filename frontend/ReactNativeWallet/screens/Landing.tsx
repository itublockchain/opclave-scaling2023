import React from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Logo from '../assets/logo.png';
import {Colors, Fonts} from './style';

const Landing = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <Image source={Logo} />
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.bigText}>Lets setup your wallet!</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Menu');
          }}>
          <Text style={styles.button}>OPEN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerSection}>
        <TouchableOpacity onPress={() => Alert.alert('Not available yet!')}>
          <Text style={styles.smallText}>Click to recover any wallet</Text>
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
    justifyContent: 'center',
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
    borderRadius: 15,
    shadowColor: 'white',
  },
  bigText: {
    color: Colors.dark.text,
    fontSize: 24,
    fontFamily: Fonts.bold,
  },
  smallText: {
    color: Colors.dark.text,
    fontSize: 20,
    fontFamily: Fonts.bold,
  },
});

export default Landing;
