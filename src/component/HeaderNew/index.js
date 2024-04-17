import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Styles from './Styles';

const { width, height } = Dimensions.get('screen');
const HeaderNew = (props) => {
  return (
    <View>
      <View
        style={[
          Styles.NewHmainview,
          { backgroundColor: props.backgrd == 1 ? '' : '#F8F8F8' },
        ]}>
        {
          props.locked &&
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <View style={Styles.NewHleftview}>
              <Text>{props.Events}</Text>
              <Image
                resizeMode={'contain'}
                style={Styles.NewHarrowbackimg}
                source={require('../../assets/img/arrowRBack.png')}></Image>
            </View>
          </TouchableOpacity>
        }

        <View>
          {/* <View style={Styles.viewheadericon}>
            <ImageBackground
              source={require('../../assets/img/Back.png')}
              style={{
                height: 30,
                width: 30,
                justifyContent: 'center',
                borderRadius: 60,
                overflow: 'hidden',
              }}>
              <TouchableOpacity
                onPress={() => props.homepress && props.homepress()}>
                <Image
                  style={Styles.NewHHomeIcon}
                  resizeMode={'contain'}
                  source={require('../../assets/img/BackHome.png')}></Image>
              </TouchableOpacity>
            </ImageBackground>
          </View> */}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          // props.navigation.goBack()
        }}
        style={Styles.NewHpagename}>
        <Text>{props.EventDetails}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderNew;