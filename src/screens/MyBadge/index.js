import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  Animated,
  Modal,
} from 'react-native';
import Barcode from '../../component/react-native-barcode-builder';
// import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode-svg';

import Header from '../../component/Header/index';
import Styles from './Stayles';
// import DropDownPicker from 'react-native-dropdown-picker';
import {  Spinner } from 'native-base';
import {
  request,
  BASE_URL_IMG,
} from '../../component/services';
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const MyBadge = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const [modalVisible, setModalVisible] = useState(true);
  const [imageBaner, setimageBaner] = useState([{ Image: '' }]);
  const [Datas, setDatas] = useState({
    RegisterationId: 0,
    Email: '',
    FirstName: '',
    LastName: '',
    Country: '',
    Barcode: 0,
    BajColor: null,
    BajType: null,
  });

  useEffect(() => {
    UserInformation();
    ListSliderBarcode();
    // alert(JSON.stringify(props.route.params.Datas));
  }, []);

  const ListSliderBarcode = async () => {
    let ID = await AsyncStorage.getItem('eventId');

    request(
      'POST',
      'ListSliderBarcode',
      { Id: ID },
      () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify({ Id: ID }))
        // alert(JSON.stringify(response))
        if (response.Result == 'Success') {
          setimageBaner(response.Answer);
        }
        setModalVisible(false);
      },
      (err) => {
        // console.log(JSON.stringify(err))
        setModalVisible(false);
      },
    );
  };
  const UserInformation = async () => {
    const Token = await AsyncStorage.getItem('Token');
    const eventId = await AsyncStorage.getItem('eventId');

    request(
      'POST',
      'CreateQRCode',
      { Email: Token, eventId },
      () => { },
      () => { },
      (response) => {
        console.log(JSON.stringify(response), 'tests')
        // alert(JSON.stringify(response));
        if (response.Result == 'Success') {
          setDatas(response.Answer);
        }
        setModalVisible(false);
      },
      (err) => {
        // console.log(JSON.stringify(err))
        setModalVisible(false);
      },
    );
  };
  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          { height: HEADER_MIN_HEIGHT, opacity: headerOpacity },
        ]}></Animated.View>
      {/* <View style={Styles.arbtn}>
        <View style={Styles.arbtnimg}>
          <Image
            resizeMode={'cover'}
            style={Styles.arimgbtn}
            source={require('../../assets/img/artab.png')}></Image>
        </View>
      </View> */}
      <Header
        navigation={props.navigation}
        notif={() => props.navigation.navigate('Profile')}
        // infopress={() => props.navigation.navigate('Notifications')}
        iconright={8}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}>
        <Text
          style={{
            position: 'absolute',
            top: height * 0.055,
            color: '#FFFF',
          }}>
          MyBadge
        </Text>
      </Header>
      <View
        style={{
          width,
          // height: 270,
          paddingTop: height * 0.13,
          // backgroundColor: '#DB2227',
          zIndex: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: (width * 8) / 100,
          borderBottomRightRadius: (width * 8) / 100,
        }}></View>
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}>
        {/* <View style={Styles.headermainscr}> */}
        {/* <ImageBackground
            resizeMode={'cover'}
            style={Styles.imgbackheader}
            source={{ uri: BASE_URL_IMG + props.route.params.ImageName }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
              colors={['#3f62a4', 'transparent']}
              // style={Styles.linearGradient}
              style={{ height: '100%', width: '100%' }}></LinearGradient>
          </ImageBackground> */}
        {/* </View> */}
        {/* <View style={{ height: 50 }} /> */}
        <View
          style={{
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            // marginTop: 50,
          }}>
          {imageBaner.length > 0 && (
            <Image
              resizeMode={'cover'}
              style={{ width: '77%', borderRadius: 5, height: 80, marginTop: 10 }}
              source={{ uri: BASE_URL_IMG + imageBaner[0]?.Image }}></Image>
          )}
          <ImageBackground
            resizeMode={'stretch'}
            style={{
              // backgroundColor: '#FFFF',
              overflow: 'hidden',
              marginTop: 0,
              alignItems: 'center',
              width: width ,
              height: width * 1.4,
            }}
            // source={{ uri: BASE_URL_IMG + item.Image }}
            source={require('../../assets/img/M_B.png')}>
            {/* <View style={{
              backgroundColor: '#FFFF',
              overflow: 'hidden',
              alignItems: 'center',
            width: '80%',
            borderRadius: 10,
            bordercolor: 'grey',
            borderWidth: .3
          }}> */}
            <View style={{
              padding:'1%',
              // backgroundColor: 'red',
              height: '10%',
              width: '90%',
              marginTop: '8%',
              flexDirection:'row'
            }}>
              <View style={{ width: '70%',alignItems:'center' }}>
                <Text>
                  20th Emirates Critical Care Conference 10 - 12 May 2024
                </Text>
              </View>
              <View style={{width:'20%',alignItems:'flex-start',alignSelf:'flex-start',alignContent:'flex-end'}}>
                <Image
                  resizeMode={'stretch'}
                  style={{ width: '120%', height: '80%' }}
                  source={require('../../assets/img/LogoECCC2024.png')}></Image>
              </View>
            </View>
            <View style={{height:1,backgroundColor:'#bfc7cf',width:'85%',marginBottom: 10}}></View>
            <View
              // resizeMode={'contain'}
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: '2%',
                width: width * 0.62,
                height: width * 0.52,
                // backgroundColor: 'green'
              }}
            // source={{ uri: BASE_URL_IMG + item.Image }}
            // source={require('../../assets/img/Frame.png')}
            >

              <Text
                style={{
                  color: 'grey',
                }}>
                {Datas?.RegisterationId}
              </Text>
              {/* <Image
                resizeMode={'contain'}
                style={{ width: width * .28, height: width * .28, }}
                // source={{ uri: BASE_URL_IMG + item.Image }}
                source={require('../../assets/img/qrcod.png')}
              >
              </Image> */}

              <View
                style={{
                  width: width * 0.5,
                  height: width * 0.5,

                  // backgroundColor: 'red',
                  padding: 0,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                {/* {Datas.Barcode != 0 && ( */}
                {/* <QRCode
                  value={Datas.Barcode}
                  size={width * 1.2}
                  bgColor="black"
                  fgColor="white"
                /> */}
                {/* )} */}

                <QRCode
                  value={Datas?.RegisterationId.toString()}
                  size={170}

                  logoBackgroundColor='transparent'
                />
              </View>
            </View>
            {/* <Image
              resizeMode={'contain'}
              style={{ width: '70%', height: width * .29, }}
              // source={{ uri: BASE_URL_IMG + item.Image }}
              source={require('../../assets/img/barcode(1).png')}
            >
            </Image> */}
            <View
              style={{
                width: '80%',
                height: (height * 10) / 100,
                justifyContent: 'flex-start',
                alignItems: 'center',
                overflow: 'hidden',
                // backgroundColor:'red',
                marginBottom: '8%',
                marginTop: width * 0.02,
              }}>
              <View style={{ padding: '1%', justifyContent: 'center' }}>
                <Text>{Datas.Barcode}</Text>
              </View>
              <View style={{
                // backgroundColor: 'red',
                height: 100,
                // paddingTop: '20%'
              }}>
                {Datas.Barcode != 0 && (
                  <Barcode width={2} value={Datas.Barcode.toString()} format="CODE128" />
                )}
              </View>



            </View>
            <View style={{ paddingTop: 0 }}>
              <View style={Styles.badgname}>
                <View style={Styles.name}>
                  <Text style={{ color: '#FFFF', fontSize: 10 }}>Name</Text>
                </View>
                <Text style={Styles.namedetail}>
                  {/* {Datas.FirstName} {Datas.LastName}/ */}
                  {Datas.FirstName} {Datas.LastName}
                </Text>
              </View>
              <View style={Styles.badgname}>
                <View style={Styles.name}>
                  <Text style={{ color: '#FFFF', fontSize: 10 }}>Country</Text>
                </View>
                <Text style={Styles.namedetail}> {Datas.Country}</Text>
              </View>
            </View>

          </ImageBackground>
          {/* </View> */}
        </View>
        {/* <View style={{ height: height * 0.05 }} /> */}
        <View
          style={{
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: Datas.BajColor != null && Datas.BajColor,
              width: '78%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              padding: 10,
            }}>
            <Text style={{ color: '#FFFF', fontSize: 15 }}>
              {Datas.BajType != null && Datas.BajType}
            </Text>
          </View>
        </View>
        <View style={{ height: height /2 }} />
      </ScrollView>
      {/* </View> */}
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
          <Text style={{ color: 'white' }}>Loding ...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default MyBadge;
