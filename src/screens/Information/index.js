import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  Alert,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  MyImage,
} from '../../component/services';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import LinearGradient from 'react-native-linear-gradient';
import Rating from '../../component/Rating';
import AsyncStorage from  '@react-native-async-storage/async-storage'
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Information = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const renderItem = ({item}) => {
    return (
      <ImageBackground
        source={require('../../assets/img/backtouch.png')}
        style={Styles.backtouchimg}>
        <TouchableOpacity style={Styles.touchoricomm}>
          <Text style={Styles.touchtxt}>Organising Commitee</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          {height: HEADER_MIN_HEIGHT, opacity: headerOpacity},
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
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        notif={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      <ScrollView
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        {/* {
         props.route.params.Datas.Gallery.map((item)=>(<Text>{item.ImageName}</Text>))
       } */}
        <Carousel
          // ref={(c) => { this._carousel = c; }}
          autoplay={true}
          loop={true}
          autoplayInterval={5000}
          // onSnapToItem={(index) => setitemindex(index)}
          data={props.route.params.Datas?.Gallery}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={Styles.headermainscr}>
                <MyImage
                  style={Styles.imgbackheader}
                  source={{
                    uri: BASE_URL_IMG + item.ImageName,
                  }}
                  resizeMode={'cover'}
                />
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 0.5}}
                  colors={['#3f62a4', 'transparent']}
                  // style={Styles.linearGradient}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    zIndex: 2,
                  }}></LinearGradient>
              </View>
            );
          }}
          sliderWidth={width}
          // itemHeight={width * .1}
          itemWidth={width}></Carousel>
        <View style={Styles.bookview}>
          <View
            style={{
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Rating notpress={true} itm={props.route.params.Datas.Rate} />
            {/* <Text style={{ paddingHorizontal: 5 }}>{Math.round(props.route.params.Datas.Rate * 10) / 10}</Text> */}
          </View>
          <View style={Styles.addcomm}>
            <Text
              onPress={() =>
                props.navigation.navigate('AddComment', {
                  Datas: props.route.params.Datas,
                })
              }
              style={Styles.txtaddcomm}>
              add comment
            </Text>
          </View>
        </View>
        <View style={Styles.viewnamedetail}>
          {props.Pages[6]?.Status && (
            <TouchableOpacity
              onPress={async () => {
                let ID = await AsyncStorage.getItem('eventId');
                props.navigation.navigate('FaculityList', {
                  EventName: props.route.params.Datas.Name,
                  Id: ID,
                });
              }}
              style={Styles.imgview}>
              <Image
                resizeMode={'contain'}
                style={Styles.infoimg}
                source={require('../../assets/img/voice.png')}></Image>
              <Text style={Styles.txticon}>{props.Pages[6].Name}</Text>
            </TouchableOpacity>
          )}
          {!props.Pages[6]?.Status && props.Pages[20]?.Status && (
            <TouchableOpacity
              onPress={async () => {
                //  let ID = await AsyncStorage.getItem('eventId')
                props.navigation.navigate('ShowPdf', {
                  PdfUrl: BASE_URL_IMG + props.Pages[20].File,
                });
              }}
              style={Styles.imgview}>
              <Image
                resizeMode={'contain'}
                style={Styles.infoimg}
                source={require('../../assets/img/voice.png')}></Image>
              <Text style={Styles.txticon}>{props.Pages[20].Name}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={async () => {
              let Token = await AsyncStorage.getItem('Token');
              if (Token !== null && Token !== undefined && Token !== '') {
                props.navigation.navigate('RegisterChat');
              } else {
                // alert('Please login.')
                Alert.alert(
                  'Log In to Register',
                  'Log in to your account to register for this event',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel '),
                      style: 'cancel',
                    },
                    {
                      text: 'Log In',
                      onPress: () =>
                        props.navigation.navigate('Qrcode', {PageNum: 0}),
                    },
                  ],
                  {cancelable: false},
                );
              }
            }}
            style={Styles.imgview}>
            <Image
              resizeMode={'contain'}
              style={Styles.infoimg}
              source={require('../../assets/img/user.png')}></Image>
            <Text style={Styles.txticon}>Participant</Text>
          </TouchableOpacity>
          <View style={Styles.imgview}>
            <Image
              resizeMode={'contain'}
              style={Styles.infoimg}
              source={require('../../assets/img/time.png')}></Image>
            <Text style={Styles.txticon}>Hours</Text>
          </View>
          {/* <View style={Styles.imgview}>
            <Image
              resizeMode={'contain'}
              style={Styles.infoimg}
              source={require('../../assets/img/aractive.png')}></Image>
            <Text style={Styles.txticon}>AR Active</Text>
          </View> */}
        </View>
        <View style={Styles.descview}>
          <Text style={Styles.biotxt}>Information</Text>
          <Text style={Styles.biodestxt}>
            {props.route.params.Datas.Description}
          </Text>
        </View>
        <View style={{height: height * 0.1}} />
        {/* </ScrollView>
      </View> */}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
    idevents: state.Customer.idevents,
    Notifications: state.Customer.Notifications,
    InEvent: state.Customer.InEvent,
    Pages: state.Customer.Pages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    chengswitchas: (switchas) => {
      const action = {
        type: 'CHANGE_C_switchas',
        switchas,
      };
      dispatch(action);
    },
    chengPages: (Pages) => {
      const action = {
        type: 'CHANGE_C_Pages',
        Pages,
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
    chengInEvent: (InEvent) => {
      const action = {
        type: 'CHANGE_C_InEvent',
        InEvent,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Information);
