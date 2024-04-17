import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  I18nManager,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import stringsoflanguages from '../pages/stringsoflanguages';
import {MyImage, TextR} from './services/index';
import styles from './TabButtom2/styles';
const {width, height} = Dimensions.get('screen');
const fontsizes =
  width < 680 ? [14, 16, 18, 20, 22, 12] : [16, 18, 20, 22, 24, 12];
const TabButtom2 = (props) => {
  const [tab, settab] = useState(0);
  return (
    <View style={{}}>
      <TouchableOpacity
        style={styles.touchsearch}
        onPress={() => {
          settab(1);
          props.navigation.replace('Search');
        }}>
        <View style={styles.txthome}>
          {tab == 1 ? (
            <View style={styles.vthome}>
              {/* <TextR>{stringsoflanguages.searchs}</TextR> */}
              <MyImage
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
                source={require('../assets/img/SearchCopy.png')}></MyImage>
              {/* <Icon
                style={{ fontsize: fontsizes[4] }}
                name={'dot-single'}
                type={'Entypo'}
              /> */}
            </View>
          ) : (
            <MyImage
              resizeMode={'contain'}
              style={{width: '100%', height: '100%'}}
              source={require('../assets/img/Search.png')}></MyImage>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchsearch}
        onPress={() => {
          settab(4);
          props.navigation.replace('Mapserach', {
            mydatas: [],
            isfromfirstpage: true,
          });
        }}>
        <View style={styles.txthome}>
          {tab == 4 ? (
            <View style={styles.vthome}>
              {/* <TextR style={{ fontSize: fontsizes[11] }}>
                {stringsoflanguages.profile}
              </TextR> */}
              <MyImage
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
                source={require('../assets/img/myMapCopy.png')}></MyImage>
              {/* <Icon
                style={{ fontsize: fontsizes[4] }}
                name={'dot-single'}
                type={'Entypo'}
              /> */}
            </View>
          ) : (
            <MyImage
              resizeMode={'contain'}
              style={{width: '110%', height: '110%'}}
              source={require('../assets/img/myMap.png')}></MyImage>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchtabbtn}
        onPress={() => {
          settab(0);
          props.navigation.replace('Main');
        }}>
        <View style={styles.txthome}>
          {tab == 0 ? (
            <View style={styles.vthome}>
              {/* <TextR>{stringsoflanguages.Home}</TextR> */}
              <MyImage
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
                source={require('../assets/img/HomeCopy.png')}></MyImage>
              {/* <Icon
                style={{ fontsize: fontsizes[4] }}
                name={'dot-single'}
                type={'Entypo'}
              /> */}
            </View>
          ) : (
            <MyImage
              resizeMode={'contain'}
              style={{width: '100%', height: '100%'}}
              source={require('../assets/img/Home.png')}></MyImage>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchsearch}
        onPress={() => {
          settab(2);
          props.navigation.replace('Favouirt');
        }}>
        <View style={styles.txthome}>
          {tab == 2 ? (
            <View style={styles.vthome}>
              {/* <TextR>{stringsoflanguages.Favourit}</TextR> */}
              <MyImage
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
                source={require('../assets/img/Saved-navigationCopy.png')}></MyImage>
              {/* <Icon
                style={{ fontsize: fontsizes[4] }}
                name={'dot-single'}
                type={'Entypo'}
              /> */}
            </View>
          ) : (
            <MyImage
              resizeMode={'contain'}
              style={{width: '100%', height: '100%'}}
              source={require('../assets/img/Saved-navigation.png')}></MyImage>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchsearch}
        onPress={() => {
          settab(3);
          props.navigation.navigate('Profile');
        }}>
        <View style={styles.txthome}>
          {tab == 3 ? (
            <View style={styles.vthome}>
              {/* <TextR style={{ fontSize: fontsizes[11] }}>
                {stringsoflanguages.profile}
              </TextR> */}
              <MyImage
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
                source={require('../assets/img/ProfCopy.png')}></MyImage>
              {/* <Icon
                style={{ fontsize: fontsizes[4] }}
                name={'dot-single'}
                type={'Entypo'}
              /> */}
            </View>
          ) : (
            <MyImage
              resizeMode={'contain'}
              style={{width: '100%', height: '100%'}}
              source={require('../assets/img/Prof.png')}></MyImage>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default TabButtom2;
