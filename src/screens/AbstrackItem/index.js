import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  Linking,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Alert,
  Animated,
} from 'react-native';
import Header from '../../component/Header/index';
// import ReactNativeAN from 'react-native-alarm-notification';
import Styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  convertMonth,
  convertDay,
} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import {connect} from 'react-redux';
import Rating from '../../component/Rating';
import Video from 'react-native-video';
import AutoHeightWebView from '../../component/services/autoHeightWebview';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const index = (props) => {
  const {MediaFile} = props.route.params.Datas;
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const [ProgramsSessionsDetails, setProgramsSessionsDetails] = useState([
    {title: '1'},
  ]);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [Rate, setRate] = useState(0);
  useEffect(() => {
    // console.log(JSON.stringify(props.route.params.Datas))
  }, []);
  const BookMark = async () => {
    let Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      //   console.log(JSON.stringify({ Id: props.route.params.Id, Email: Token }))
      request(
        'POST',
        'AddBookmarkWorkShop',
        {
          Id: props.route.params.Datas.WorkShopId,
          Email: Token,
        },
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify(response))
          if (response.Result == 'Success') {
            // setProgramsSessionsDetails(response.Answer)
            if (response.Answer == 'Add') {
              alert('Add to your Bookmarks');
            } else if (response.Answer == 'Deleted') {
              alert('Delete from your Bookmarks');
            }
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    } else {
      // props.navigation.navigate('Qrcode', {
      //   PageNum: 0
      // })
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
            onPress: () => props.navigation.navigate('Qrcode', {PageNum: 0}),
          },
        ],
        {cancelable: false},
      );
    }
  };
  const SendRate = async () => {
    const Token = await AsyncStorage.getItem('Token');
    // console.log(JSON.stringify({ EmailFrom: Token, EmailTo }))
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'GetRateWorkShop',
        {
          Email: Token,
          Id: props.route.params.Datas.WorkShopId,
          Point: Rate,
        },
        () => {},
        () => {},
        (response) => {
          console.log(response);
          if (response.Result == 'Success') {
            if (response.Answer == 'Success') {
              alert(`Your Rate (${Rate}) was successfully registered`);
            }
          }
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
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
            onPress: () => props.navigation.navigate('Qrcode', {PageNum: 0}),
          },
        ],
        {cancelable: false},
      );
    }
  };
  const _downloadFile = (item) => {
    props.navigation.navigate('ShowPdf', {PdfUrl: BASE_URL_IMG + item});
    // Linking.openURL(BASE_URL_IMG + item).catch((err) =>
    //  console.error('An error occurred', err));
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => alert('download!')}
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          <Image
            resizeMode={'contain'}
            style={{width: '100%', height: '100%'}}
            source={require('../../assets/img/pdf-file.png')}></Image>
        </View>
        <View style={Styles.programtxt}>
          <Text style={Styles.txtprodes}>bia berim dasht</Text>

          <Text style={Styles.txtproname}>Safa</Text>
        </View>
        <View style={Styles.arroeright}>
          <Image
            style={Styles.arrowimg}
            source={require('../../assets/img/download.png')}></Image>
        </View>
      </TouchableOpacity>
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
        <View>
          <View style={Styles.headermainscr}>
            <ImageBackground
              resizeMode={'cover'}
              style={Styles.imgbackheader}
              source={{uri: BASE_URL_IMG + props.route.params.Datas?.Image}}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.5}}
                colors={['#3f62a4', 'transparent']}
                // style={Styles.linearGradient}
                style={{height: '100%', width: '100%'}}></LinearGradient>
            </ImageBackground>
          </View>

          <View style={Styles.viewtxtinp}>
            <TouchableOpacity
              onPress={() => BookMark()}
              style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/bookmark.png')}></Image>
              <Text style={Styles.txtimg}>Add Bookmark</Text>
            </TouchableOpacity>
            <View style={Styles.viewinRate}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <Text style={{}}>Rate : {props.route.params.Datas.AvgRate}/5</Text> */}
                <Rating notpress={false} itm={Rate} setitm={setRate} />
              </View>
            </View>
            <TouchableOpacity onPress={SendRate} style={Styles.txtinptouch}>
              <Text onPress={SendRate} style={Styles.txtdate}>
                Rate
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>
            Details:{'\n'}
            {/* {props.route.params.Datas.Information} */}
          </Text>

          <AutoHeightWebView
            scrollEnabled={false}
            // automaticallyAdjustContentInsets={false}
            source={{
              html:
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                props.route.params.Datas.Information,
            }}
            style={{width: '90%', margin: 5, marginTop: 4}}
          />
        </View>

        <Text style={Styles.TxtHeder}>Document and Media</Text>
        <View style={Styles.descview}>
          {/* <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={props.route.params.Datas}
                        renderItem={renderItem}></FlatList> */}
          <TouchableOpacity
            onPress={() => _downloadFile(props.route.params.Datas?.File)}
            style={[Styles.touchoricomm, {height: height * 0.1}]}>
            <View style={Styles.timeview}>
              <Image
                resizeMode={'contain'}
                style={{width: '100%', height: '60%'}}
                source={require('../../assets/img/pdf-file.png')}></Image>
            </View>
            <View style={Styles.programtxt2}>
              <Text style={Styles.txtprodes}>
                {/* {props.route.params.Datas.FileLink} */}
                File
              </Text>

              {/* <Text style={Styles.txtproname}>{props.route.params.Datas.FileGuid}</Text> */}
            </View>
            <View style={Styles.arroeright}>
              <Image
                style={Styles.arrowimg}
                source={require('../../assets/img/download.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _downloadFile(props.route.params.Datas?.PdfFile)}
            style={[Styles.touchoricomm, {height: height * 0.1}]}>
            <View style={Styles.timeview}>
              <Image
                resizeMode={'contain'}
                style={{width: '100%', height: '60%'}}
                source={require('../../assets/img/pdf-file.png')}></Image>
            </View>
            <View style={Styles.programtxt2}>
              <Text style={Styles.txtprodes}>
                {/* {props.route.params.Datas.FileLink} */}
                File
              </Text>

              {/* <Text style={Styles.txtproname}>{props.route.params.Datas.FileGuid}</Text> */}
            </View>
            <View style={Styles.arroeright}>
              <Image
                style={Styles.arrowimg}
                source={require('../../assets/img/download.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {MediaFile && (
            <Video
              //   source={require('../../assets/E-2.mp4')}
              source={{uri: BASE_URL_IMG + MediaFile}}
              style={Styles.video}
              muted={true}
              repeat={false}
              autoplay
              controls
              resizeMode={'cover'}
              rate={1.0}
              ignoreSilentSwitch={'obey'}
            />
          )}
        </View>

        <View style={{height: height * 0.05}} />
      </ScrollView>
    </View>
  );
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
export default connect(mapStateToProps, mapDispatchToProps)(index);
