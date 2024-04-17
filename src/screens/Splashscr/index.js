import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
const Splashscr = () => {
  return (
    <View style={{width, height}}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/img/Splashscr.png')}></Image>
    </View>
  );
};

export default Splashscr;
