import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import {WebView} from 'react-native-webview';
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

const Webbroser = (props) => {
  return (
    <View style={Styles.qrcontain}>
      <View style={{width: '100%', height: '100%'}}>
        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              width: '30%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              resizeMode={'contain'}
              style={{
                height: height * 0.02,
                width: width * 0.08,
                borderRadius: 7,
              }}
              source={require('../../assets/img/arrowRBack.png')}></Image>
            <Text style={Styles.txtqrhead2}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.qrviews}>
          <View style={Styles.scancode}>
            <WebView
              style={{
                width: '100%',
                height: '100%',
                // backgroundColor: 'red'
              }}
              source={{
                uri: props.route.params.Url,
                headers: {Referer: props.route.params.Url},
              }}
            />
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Webbroser);
