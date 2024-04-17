import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Modal,
  Alert,
} from 'react-native';
import {Icon, Spinner} from 'native-base';
import {connect} from 'react-redux';
import Styles from './Stayles';
const {width, height} = Dimensions.get('screen');
import {
  request,
  requestGET,
  BASE_URL_IMG,
  requestLogin,
} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import Welcome from '../Welcome';
import RNRestart from 'react-native-restart';
import styles from '../../component/ContactList/styles';
const Qrcode = (props) => {
  const [err, setErr] = useState('');
  const [pageIndex, setpageIndex] = useState(props.route.params.PageNum);
  const [Email, setEmail] = useState('');
  const [Code, setCode] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [DWMassage, setDWMassage] = useState({
    Image: '',
    Welcom1: '',
    Splash: '',
  });
  const WelcomMessage = () => {
    setModalVisible(true);
    requestGET(
      'WelcomMessage',
      () => {},
      () => {},
      async (response) => {
        // console.log(JSON.stringify(response));
        if (response.Result == 'Success') {
          setDWMassage(response.Answer);
          setModalVisible(false);
        } else if (response.Result == 'Faild') {
          // alert(response.Answer)
          setModalVisible(false);
          // props.navigation.goBack()
        }
      },
      (err) => {
        // console.log(JSON.stringify(err));
        setModalVisible(false);
      },
    );
  };
  const Login = async () => {
    // setModalVisible(true)

    const EventId =
      props.route.params.eventId !== undefined
        ? props.route.params.eventId
        : await AsyncStorage.getItem('eventId');
    // alert(EventId)

    if (
      EventId != undefined &&
      EventId != null &&
      EventId != 'undefined' &&
      EventId != undefined &&
      EventId != 'null'
    ) {
      requestLogin(
        'POST',
        {EventId: EventId, Email: Email},
        () => {},
        () => {},
        async (response) => {
          // console.log(JSON.stringify({EventId: EventId, Email: Email}));
          // console.log(JSON.stringify(response));
          setModalVisible(false);
          if (response.Result == 'Success') {
            // alert(JSON.stringify(response))
            // setDATA2(response.Answer)
            // alert('You are Login successful')
            await AsyncStorage.setItem('Type', response.Type); //Physical
            await AsyncStorage.setItem('Token', Email);
            props.chengToken(Email);
            if (typeof EventId == 'string') {
              await AsyncStorage.setItem('eventId', EventId);
            } else {
              await AsyncStorage.setItem('eventId', JSON.stringify(EventId));
            }
            // await AsyncStorage.setItem('', Email)
            // WelcomMessage()
            // setpageIndex(1)
            RNRestart.Restart();
            // props.navigation.replace('Welcome')
            // } else if (response.Result == 'Faild' && response.Type == 'Physical') {
            // // setDATA2(response.Answer)
            // // alert('You are Login successful')
            // await AsyncStorage.setItem('Type', response.Type)
            // await AsyncStorage.setItem('Token', Email)
            // props.chengToken(Email)
            // await AsyncStorage.setItem('eventId', EventId)
            // // await AsyncStorage.setItem('', Email)
            // setModalVisible(false)
            // // WelcomMessage()
            // // setpageIndex(1)
            // RNRestart.Restart();
            // props.navigation.replace('Welcome')
          } else {
            Alert.alert(response.Answer);
            setModalVisible(false);
            // props.navigation.goBack()
          }
        },
        (err) => {
          // console.log(JSON.stringify(err));
          setModalVisible(false);
        },
      );
    } else {
      setModalVisible(false);
    }
  };
  useEffect(() => {
    // WelcomMessage()
  });
  const login = () => {
    return (
      <View style={Styles.qrcontain}>
        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              width: '30%',
              height: '80%',
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
        <View style={Styles.qrviewf}>
          <Text style={Styles.txtqrhead}>Login</Text>
        </View>
        <View style={Styles.qrviews}>
          <View style={Styles.scancode}>
            <View style={[Styles.codeinput, {marginVertical: 10}]}>
              <TextInput
                onChangeText={(e) => setEmail(e)}
                value={Email}
                style={Styles.textinputlogin}
                placeholderTextColor={'#FFFF'}
                placeholder={'Enter Your Email Address'}></TextInput>
              {/* <TouchableOpacity style={Styles.touchvar}>
                <Text style={Styles.vartxt}>Validate</Text>
              </TouchableOpacity> */}
            </View>
            {/* <View style={[Styles.codeinput, { marginBottom: 20 }]}>
              <TextInput
                onChangeText={(e) => setCode(e)}
                value={Code}
                placeholderTextColor={'#FFFF'}
                style={Styles.textinputlogin}
                placeholder={'Enter Your Registration ID'}></TextInput>
              
            </View> */}
            <View style={Styles.linedott} />
            {/* <Text style={Styles.txtscdes}>
              Align the QR code within the {'\n'} frame to scan
            </Text> */}
            <View style={{height: height * 0.3}}>
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  alignSelf: 'center',
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode={'contain'}
                  source={{uri: props.route.params.Image}}></Image>
              </View>
            </View>
          </View>
          <Text
            style={[
              Styles.txtqrhead,
              {bottom: '20%', position: 'absolute', color: 'red'},
            ]}>
            {err}
          </Text>
        </View>
        <View style={Styles.qrviewth}>
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('Splashscr')}
            onPress={() => Login()}
            style={Styles.btnnext}>
            {/* <Text></Text> */}
            <Icon
              name={'arrowright'}
              type={'AntDesign'}
              style={Styles.arrow}></Icon>
            <Text style={Styles.next}>Login</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          // onRequestClose={() => {
          //   setModalVisible(false);
          // }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              width: '100%',
              height: '100%',
              alignSelf: 'center',
              backgroundColor: 'black',
              opacity: 0.5,
            }}>
            <Spinner color="#FFFF" />
            <Text style={{color: 'white'}}>Loding ...</Text>
          </View>
        </Modal>
      </View>
    );
  };
  const pages = () => {
    switch (pageIndex) {
      case 0:
        return login();
      case 1:
        return login();
      // <Welcome
      //   WelcomMessage={() => WelcomMessage()}
      //   DWMassage={DWMassage}
      //   navigation={props.navigation} setpageIndex={setpageIndex} />
      default:
        return login();
    }
  };
  return pages();
};

const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
    Notifications: state.Customer.Notifications,
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
export default connect(mapStateToProps, mapDispatchToProps)(Qrcode);
