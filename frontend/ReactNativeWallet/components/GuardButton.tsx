import React from 'react';
import {Image, View} from 'react-native';
import GuardIcon from '../assets/guard.png';

const GuardLogo = () => {
  return (
    <View
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={GuardIcon}
        style={{width: 30, height: 30, resizeMode: 'cover'}}
      />
    </View>
  );
};

export default GuardLogo;
