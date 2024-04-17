import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Switch,
  Dimensions,
  Alert,
} from 'react-native';
// import iid from '@react-native-firebase/iid';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import { connect } from 'react-redux';
import Video from 'react-native-video';
// import messaging from '@react-native-firebase/messaging';
import {
  FindeEventDefault,
  OrganizationId,
  AppName,
  request,
  sendFirebaseToken,
} from '../../component/services';
var pkg = require('./../../../package.json');

const { width, height } = Dimensions.get('screen');
const Splash = (props) => {
  const requestUserPermission = async () => {
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   console.log('Authorization status:', authStatus);
    // }
  };
  // const WalkthroughableView = walkthroughable(View);
  const handleStepChange = (step) => {
    // console.log(`Current step is: ${step.name}`);
  };

  useEffect(() => {
    // requestUserPermission();
    // sendFirebaseToken();
    // sendFirebaseToken();
    // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //   Alert.alert('A new message arrived!', JSON.stringify(remoteMessage));
    // });

    // props.start?.();
    // setTimeout(() => Gettoken(), 1000);
    Gettoken(props);
    // return unsubscribe;
  }, []);

  const Gettoken = async (props) => {
    try {
      const Token = await AsyncStorage.getItem('Token');
      // Alert.alert('A new message arrived!', Token);
      if (Token !== null && Token !== undefined && Token !== '') {
        props.chengToken(Token);
        let seeWelcom = await AsyncStorage.getItem('Splash');
        if (seeWelcom) {
          props.navigation.navigate('Welmasone');
          // setModalVisible(false)
        } else {
          props.navigation.navigate('MainScreenEvent');
        }
      } else {
        request(
          'POST',
          'GetEvent',
          { CategoryId: 0, Count: 150, Page: 1, OrganizationId: OrganizationId },
          () => { },
          () => { },
          async (response) => {
            // alert(JSON.stringify(response))
            if (response.Result == 'Success') {
              // let ev = FindeEventDefault(response.Answer);
              // if (ev != 'nadare') {
              //   await AsyncStorage.setItem('eventId', JSON.stringify(ev.Id));
              //   props.navigation.replace('MainScreenEvent');
              // } else {
              props.chengToken('');
              GetApplicationSetting(response.Answer)
              // console.log(response);

              // props.navigation.replace('Mainscreen');
              // }
              // alert(JSON.stringify(response.Answer))
            }
          },
          (err) => {
            console.log(JSON.stringify(err));
          },
        );
      }

    } catch (error) {
      request(
        'POST',
        'GetEvent',
        { CategoryId: 0, Count: 150, Page: 1, OrganizationId: OrganizationId },
        () => { },
        () => { },
        async (response) => {
          // alert(JSON.stringify(response))
          if (response.Result == 'Success') {
            // let ev = FindeEventDefault(response.Answer);
            // if (ev != 'nadare') {
            //   await AsyncStorage.setItem('eventId', JSON.stringify(ev.Id));
            //   props.navigation.replace('MainScreenEvent');
            // } else {
            props.chengToken('');
            GetApplicationSetting(response.Answer)
            // }
            // alert(JSON.stringify(response.Answer))
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
      // خطایی در هنگام خواندن از AsyncStorage رخ داده است
      console.error('Error reading Token:', error);
    }
  };
  const setToken = async (id) => {
    await AsyncStorage.setItem('Token', '');
    await AsyncStorage.setItem('eventId', JSON.stringify(id));
    props.navigation.navigate('MainScreenEvent');
  }

  const GetApplicationSetting = async (data) => {
    // alert(JSON.stringify({CategoryId}));
    request(
      'POST',
      'ApplicationSetting',
      {
        OrganizationId: OrganizationId,
        AppName: AppName
      },
      () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify(response), 'jjj');
        if (response.Result == 'Success') {
          // setdatasettingApp(response.Answer)
          if (!response.Answer.LoginRequired) {
            setToken(response.Answer.LockEventId)
          } else {
            if (response.Answer.LockEvent) {
              const eventSelect = data.filter(event => {
                return event.Id === response.Answer.LockEventId;
              })
              // console.log(pkg.version);
              let currentVer = parseFloat(pkg.version);
              let lastVer = parseFloat(response.Answer.Version);
              let needUpdate = false;
              if (currentVer < lastVer) {
                needUpdate = true
              }
              // console.log(eventSelect);
              props.navigation.navigate('LoginNew', {
                PageNum: 0,
                eventId: eventSelect[0].Id,
                Image: eventSelect[0].Image,
                itemdata: eventSelect[0],
                needUpdate: needUpdate,
                locked: true
              });
            } else {
              props.navigation.replace('Mainscreen');
            }
          }

        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );

  };
  return (
    // <Video
    //   source={require('../../assets/E-2.mp4')}
    //   style={{ width, height: height + 50 }}
    //   // style={{
    //   //   justifyContent: 'center',
    //   //   alignItems: 'center',
    //   //   width: width,
    //   //   height: height,
    //   //   zIndex: 3,
    //   // }}
    //   muted={true}
    //   repeat={true}
    //   resizeMode={'stretch'}
    //   rate={1.0}
    //   ignoreSilentSwitch={'obey'}
    // />
    <View style={{width:'100%', height:'100%',alignItems:'center',justifyContent:'center'}}>
        <Image
    resizeMode={'stretch'}
    style={{ width: '50%', height: '25%' }}
    source={require('../../assets/img/playstore.png')}></Image>
    </View>
  
  );
};
//   <Text onPress={() => props.navigation.navigate('Mainscreen')}>
// <Text onPress={() => props.navigation.navigate('Mainscreen')}>

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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  Splash,
);
