import React from 'react';
import {Image, View} from 'react-native';

import AppIcon from '../assets/apps.png';

const AppsButton = () => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#130c33',
        padding: 10,
      }}>
      <Image
        source={AppIcon}
        style={{width: 30, height: 30, resizeMode: 'cover'}}
      />
    </View>
  );
};

export default AppsButton;
