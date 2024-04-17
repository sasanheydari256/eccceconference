import React, {useState, useEffect, useMemo} from 'react';
import {
  Alert,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Stayles from './Stayles.js';
const {width, height} = Dimensions.get('screen');
import {connect} from 'react-redux';
import AsyncStorage from  '@react-native-async-storage/async-storage'
// import {request, requestGET, BASE_URL_IMG} from '../../../component/services';
// import {ScrollView} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
const FotterBar = (props) => {
  const [showbar, setShowbar] = useState(false);
  const checkLogin = () => {
    if (props?.Token != '' && !props?.splashOrNot) {
      setShowbar(true);
    } else {
      setShowbar(false);
    }
  };
  useMemo(() => checkLogin(), [props?.Token, props?.splashOrNot]);
  return (
    <View
      style={{
        height,
      }}>
      <View style={{height: showbar ? height - ((height * 10) / 100) : height, width}}>
        {props.children}
      </View>
      {showbar && (
        <View
          style={{
            zIndex: 100,
            width,
            height: (height * 20 ) / 100,
            flexDirection: 'row',
            justifyContent:'space-evenly',
            backgroundColor: '#FFFF',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('MainScreenEvent');
            }}
            style={Stayles.foter}>
            <Icon name={'home'} type={'Entypo'} style={Stayles.Icons}></Icon>
            <Text style={Stayles.text}>Home</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SocialMedia');
            }}
            style={Stayles.foter}>
            <Icon
              name={'md-share-social-sharp'}
              type={'Ionicons'}
              style={Stayles.Icons}></Icon>
            <Text style={Stayles.text}>Social</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('MyBadge');
            }}
            style={Stayles.foter}>
            <Icon
              name={'qrcode-scan'}
              type={'MaterialCommunityIcons'}
              style={Stayles.Icons}></Icon>
            <Text style={Stayles.text}>Scan</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={async () => {
              let ID = await AsyncStorage.getItem('eventId');
              props.navigation.navigate('FaculityList', {
                Id: ID,
              });
            }}
            style={Stayles.foter}>
            <Icon
              name={'microphone'}
              type={'FontAwesome'}
              style={Stayles.Icons}></Icon>
            <Text style={Stayles.text}>Speakers</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SponsorList', {
                // infoName: Datas.Name,
                // infoDesc: Datas.Description,
                // Id: ID,
                // ImageGallery: Datas.Gallery,
                // Id: sponsorID,
              });
            }}
            style={Stayles.foter}>
            <Icon
              name={'lightbulb'}
              type={'FontAwesome5'}
              style={Stayles.Icons}></Icon>
            <Text style={Stayles.text}>Partners</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
    Notifications: state.Customer.Notifications,
    InEvent: state.Customer.InEvent,
    switchas: state.Customer.switchas,
    Pages: state.Customer.Pages,

    splashOrNot: state.Customer.splashOrNot,
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
    chengswitchas: (switchas) => {
      const action = {
        type: 'CHANGE_C_switchas',
        switchas,
      };
      dispatch(action);
    },
    chengidevents: (idevents) => {
      const action = {
        type: 'CHANGE_C_idevents',
        idevents,
      };
      dispatch(action);
    },
    chengNotifications: (Notifications) => {
      const action = {
        type: 'CHANGE_C_Notifications',
        Notifications,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FotterBar);
