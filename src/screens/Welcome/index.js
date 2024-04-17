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
import Styles from './Stayles';
const {width, height} = Dimensions.get('screen');
import {
  request,
  requestGET,
  BASE_URL_IMG,
  requestLogin,
  MyImage,
} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import {connect} from 'react-redux';
import AutoHeightWebView from '../../component/services/autoHeightWebview';

const Welcome = (props) => {
  // const gobackPage=() => {
  //   props.navigation.goBack()
  // }
  const [pageSplash, setPageSplash] = useState(false);
  useEffect(() => {
    WelcomMessage();
    async () => await AsyncStorage.setItem('SeeWelcom', 'yes');
  }, []);
  const [DWMassage, setDWMassage] = useState({
    // Image: '',
    // Welcom1: '',
    // Splash: '',
  });
  const WelcomMessage = async () => {
    // setModalVisible(true)
    const EventId = JSON.parse(await AsyncStorage.getItem('eventId'));
    request(
      'POST',
      'WelcomMessage',
      {EventId},
      () => {},
      () => {},
      async (response) => {
        // alert(JSON.stringify(response));
        if (response.Result == 'Success') {
          setDWMassage(response.Answer);
        } else if (response.Result == 'Faild') {
        }
      },
      (err) => {
        // console.log(JSON.stringify(err))
        setModalVisible(false);
      },
    );
  };
  return (
    <View style={Styles.qrcontain}>
      {pageSplash ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
          }}>
          <MyImage
            style={{width, height}}
            source={{
              uri: BASE_URL_IMG + DWMassage.Splash,
            }}
            resizeMode={'contain'}
          />
          {/* <Image
              resizeMode={'contain'}
              style={{ width, height }}
              // source={require('../../assets/img/Splashscr.png')}
              source={{ uri: BASE_URL_IMG + props.DWMassage.Splash }}
            ></Image> */}
        </View>
      ) : (
        <View style={{width: '100%', height: '100%'}}>
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
            {/* <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.removeItem('Token')
                  props.chengToken('')
                  props.setpageIndex(0)
                }}
                style={{
                  width: '30%', height: '80%',
                  justifyContent: 'center',
                  alignItems: 'center', flexDirection: 'row',

                }}
              >

                <Text style={Styles.txtqrhead2}>Logout</Text>
              </TouchableOpacity> */}
          </View>
          <View style={Styles.qrviewf}>
            {/* <Text style={Styles.txtqrhead}>Login Page</Text> */}
          </View>
          <View style={Styles.qrviews}>
            <View style={Styles.scancode}>
              {/* <View style={Styles.linedott} /> */}
              {/* <Text style={Styles.txtscdes}>
            Align the QR code within the {'\n'} frame to scan
          </Text> */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  zIndex: 20,
                  width: width * 0.9,
                  height: height * 0.15,
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode={'contain'}
                  source={{uri: BASE_URL_IMG + DWMassage.Image}}></Image>
                {/* </View> */}
              </View>
              <View style={{height: height * 0.15}}></View>
              {/* <Text style={[Styles.txtqrhead2]}>MANAGMENT</Text> */}

              <ScrollView>
                <AutoHeightWebView
                  scrollEnabled={false}
                  // automaticallyAdjustContentInsets={false}
                  source={{
                    html:
                      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                      DWMassage.Welcom1
                        ? DWMassage.Welcom1
                        : DWMassage.Welcom2,
                  }}
                  style={{width: '90%', margin: 5, marginTop: 4}}
                />

                {/* <Text style={[Styles.txtqrhead, {marginTop: 10}]}>
                  {DWMassage.Welcom1 ? DWMassage.Welcom1 : DWMassage.Welcom2}
                </Text> */}
              </ScrollView>
            </View>
          </View>
          <View style={Styles.qrviewth}>
            <TouchableOpacity
              onPress={() => {
                // props.route.params.formqr &&
                //   props.route.params.formqr == 'yes' ?
                props.navigation.goBack();
                // : props.navigation.navigate('Welcome')
              }}
              // onPress={() => Login()}
              style={Styles.btnnext}>
              {/* <Text></Text> */}
              <Icon
                name={'arrowright'}
                type={'AntDesign'}
                style={Styles.arrow}></Icon>
              <Text style={Styles.next}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
