import React from 'react';
import {Image, View} from 'react-native';

import BrowserIcon from '../assets/browser.png';

const BrowserLogo = () => {
  return (
    <View
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={BrowserIcon}
        style={{width: 40, height: 40, resizeMode: 'cover'}}
      />
    </View>
  );
};

export default BrowserLogo;
