import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from './style';

const NotAvailable = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 26, color: Colors.dark.text}}>
        This page is not available yet!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotAvailable;
