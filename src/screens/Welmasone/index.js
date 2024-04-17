import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
// import {Icon} from 'native-base';
import Styles from './Stayles';
// const {width, height} = Dimensions.get('screen');
import {
  BASE_URL_IMG,
  MyImage,
} from '../../component/services';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux';

const Welmasone = (props) => {
  useEffect(() => {
    WelcomMessage(props);
  }, []);
  const timers = async () => {
    try {
      const SplashAds = await AsyncStorage.getItem('SplashAds');
      if (SplashAds) {
        props.navigation.navigate('SplashAds');
      }else{
      props.navigation.navigate('MainScreenEvent');

      }
    } catch {
      props.navigation.navigate('MainScreenEvent');

    }

  };
  const [DWMassage, setDWMassage] = useState({
    Image: '',
    SplshText: '',
    Splash: '',
  });
  const WelcomMessage = async (props) => {
    // setModalVisible(true)
    // await AsyncStorage.setItem('Welmasoneee', 'yes')
    const Splash = await AsyncStorage.getItem('Splash');
    const SplshText = await AsyncStorage.getItem('SplshText');
    const tt = {
      Image: Splash,
      SplshText: SplshText,
      Splash: '',
    };
    setDWMassage(tt);
    props.chengsplashOrNot(true);
    setTimeout(() => {
      timers();
      props.chengsplashOrNot(false);
    }, 7000);
  };
  return (
    <View style={Styles.qrcontain}>
      <View style={{ width: '100%', height: '100%' }}>
        {/* <Text>aaa{JSON.stringify(props.splashOrNot)}ddd</Text> */}
        <MyImage
          style={{ width: '100%', height: '100%' }}
          source={{ uri: BASE_URL_IMG + DWMassage.Image }}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
    splashOrNot: state.Customer.splashOrNot,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    chengsplashOrNot: (splashOrNot) => {
      const action = {
        type: 'CHANGE_C_splashOrNot',
        splashOrNot,
      };
      dispatch(action);
    },
    chengToken: (Token) => {
      const action = {
        type: 'CHANGE_C_Token',
        Token,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Welmasone);
