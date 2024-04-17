import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {Icon} from 'native-base';
import Styles from './Stayles';
const {width, height} = Dimensions.get('screen');
import {
  request,
  requestGET,
  BASE_URL_IMG,
  requestLogin,
} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import {connect} from 'react-redux';

const SplashAds = (props) => {
  useEffect(() => {
    WelcomMessage();
  }, []);
  const [DWMassage, setDWMassage] = useState({
    Image: '',
    SplshText: '',
    Splash: '',
  });
  const WelcomMessage = async () => {
    // setModalVisible(true)
    await AsyncStorage.setItem('Welmasoneee', 'yes');
    const Splash = await AsyncStorage.getItem('SplashAds');
    const SplshText = await AsyncStorage.getItem('SplashAdsLink');
    // alert(SplshText)
    const tt = {
      Image: Splash,
      SplshText: SplshText,
      Splash: '',
    };
    setDWMassage(tt);
    // setTimeout(() => {
    //   props.navigation.goBack()
    // }, 5000);
  };
  return (
    <View style={Styles.qrcontain}>
      <View style={{width: '100%', height: '100%'}}>
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode={'contain'}
          source={{uri: BASE_URL_IMG + DWMassage.Image}}></Image>
        <View style={Styles.qrviewth}>
          {DWMassage.SplshText != undefined &&
            DWMassage.SplshText != null &&
            DWMassage.SplshText != '' && (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Webbroser', {
                    Url: DWMassage.SplshText,
                  });
                }}
                style={Styles.btnnext}>
                <Text style={Styles.next}>Learn More</Text>
              </TouchableOpacity>
            )}
          <TouchableOpacity
            onPress={() => {
              props.navigation.replace('MainScreenEvent');
            }}
            style={Styles.btnnext}>
            <Icon
              name={'arrowright'}
              type={'AntDesign'}
              style={Styles.arrow}></Icon>
            <Text style={Styles.next}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    chengToken: (Token) => {
      const action = {
        type: 'CHANGE_C_Token',
        Token,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashAds);
