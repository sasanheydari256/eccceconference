import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  // Text,
  // Dimensions,
  Image,
  // StatusBar,
} from 'react-native';
// import { Icon, ListItem, CheckBox, Label, Input, Item } from 'native-base';
// import { connect } from 'react-redux';
// import styles from './styles';
// const { height, width } = Dimensions.get('window');
const Rating = (props) => {
  const [raits, setraits] = useState(0);
  const Ratingstar = (value) => {
    const stars = [];
    for (let index = 0; index < 5; index++) {
      stars.push(
        !props.notpress ? (
          <TouchableOpacity
            onPress={() =>
              props.setitm ? props.setitm(index + 1) : setraits(index + 1)
            }>
            {index < value ? (
              <Image
                style={{width: 20, height: 20, marginHorizontal: 2}}
                source={require('../../src/assets/icon/BStar.png')}></Image>
            ) : (
              <Image
                style={{width: 20, height: 20, marginHorizontal: 2}}
                source={require('../../src/assets/icon/DStar.png')}></Image>
            )}
          </TouchableOpacity>
        ) : (
          <View>
            {index < value ? (
              <Image
                style={{width: 20, height: 20, marginHorizontal: 2}}
                source={require('../../src/assets/icon/BStar.png')}></Image>
            ) : (
              <Image
                style={{width: 20, height: 20, marginHorizontal: 2}}
                source={require('../../src/assets/icon/DStar.png')}></Image>
            )}
          </View>
        ),
      );
    }
    return stars;
  };
  return (
    <View style={{flexDirection: 'row'}}>
      {Ratingstar(props.itm ? props.itm : raits)}
    </View>
  );
};

export default Rating;
