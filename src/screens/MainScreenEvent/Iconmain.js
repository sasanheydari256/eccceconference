import {View, Icon, Spinner} from 'native-base';
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  Alert,
  ImageBackground,
  Animated,
  Dimensions,
  TextInput,
  Modal,
  Linking,
} from 'react-native';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  MyImage,
} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import Styles from './Stayles';
export const IconMainNonPDF = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        // flexDirection: 'row',
        width: '33%',
        // flex: 4,
        paddingHorizontal: 5,
      }}>
      <TouchableOpacity onPress={props.onPress} style={Styles.flatGrowB}>
        <View style={{width: 75, height: 75}}>
          <MyImage
            style={{width: '100%', height: '100%'}}
            source={{
              uri: BASE_URL_IMG + props.Image,
            }}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
      <Text style={Styles.txtgbuis}>{props.Name}</Text>
    </TouchableOpacity>
  );
};
