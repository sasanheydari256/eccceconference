import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
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
import Styles from './Stayles';
import LinearGradient from 'react-native-linear-gradient';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  convertMonth,
  convertDay,
} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Program = (props) => {
  // SessionId
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const [ProgramsSessionsDetails, setProgramsSessionsDetails] = useState([]);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  useEffect(() => {
    // props.start?.();
    GetProgramsSessionsDetails(props.route.params.SessionId);
  }, []);
  const AddReminder = async () => {
    // let days = props.route.params.StartDay.split("-")
    // // alert(JSON.stringify(days[2] + '-' + days[1] + '-' + days[0] + ' ' + props.route.params.StartTime + ':00'))
    // // const fireDate = '19-02-2021 17:38:00';
    // const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));
    // alert(fireDate)
    // const alarmNotifData = {
    //   title: "My Notification Title",
    //   message: "My Notification test ramin",
    //   channel: "my_channel_id",
    //   small_icon: "ic_launcher",
    //   // You can add any additional data that is important for the notification
    //   // It will be added to the PendingIntent along with the rest of the bundle.
    //   // e.g.
    //   data: { foo: "bar" },
    // };
    // const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
    // console.log(alarm);
  };
  const BookMark = async () => {
    let Token = await AsyncStorage.getItem('Token');
    // console.log(JSON.stringify(Token))
    if (Token !== null && Token !== undefined && Token !== '') {
      // console.log(JSON.stringify({ SessionId: props.route.params.SessionId, Email: Token }))
      request(
        'POST',
        'BookMarkSeesion',
        {SessionId: props.route.params.SessionId, Email: Token},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify(response))
          if (response.Result == 'Success') {
            // setProgramsSessionsDetails(response.Answer)
            if (response.Answer == 'Success') {
              alert('Add to your Bookmarks');
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
  const GetProgramsSessionsDetails = (Session) => {
    // console.log(JSON.stringify(props.route.params.SessionId));
    request(
      'POST',
      'GetProgramsSessionsDetails',
      {Session, Email: 'a@gmail.com'},
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response), 'sessiondetail');
        if (response.Result == 'Success') {
          setProgramsSessionsDetails(response.Answer);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('SessionDetals', {
            namesession: props.route.params.Name,
            items: item,
          })
        }
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          <Text style={Styles.touchtxt}>{item.StartTime}</Text>
          <Text style={Styles.touchtxt}>{item.ExpireTime}</Text>
        </View>
        <View style={Styles.programtxt}>
          <Text style={Styles.txtprodes}>{item.Title}</Text>
          {/* <Text style={Styles.txtprodes}>
            {item.Description}
          </Text> */}
          <Text style={Styles.txtproname}>{item.UserName}</Text>
        </View>
        <View style={Styles.arroeright}>
          <Image
            style={Styles.arrowimg}
            source={require('../../assets/img/arrow.png')}></Image>
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
        <View style={Styles.headermainscr}>
          <ImageBackground
            resizeMode={'cover'}
            style={Styles.imgbackheader}
            source={{uri: BASE_URL_IMG + props.route.params.Image}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.5}}
              colors={['#3f62a4', 'transparent']}
              // style={Styles.linearGradient}
              style={{height: '100%', width: '100%'}}></LinearGradient>
          </ImageBackground>
        </View>
        <View style={Styles.bookview}>
          <View style={{flexDirection: 'row'}}>
            {/* <View style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/note.png')}></Image>
              <Text style={Styles.txtimg}>Write Note</Text>
            </View> */}
            <TouchableOpacity
              onPress={() => BookMark()}
              style={[
                Styles.writenoteview,
                {
                  // borderLeftWidth: 0.5,
                  // borderLeftColor: '#e9e9e9',
                  // borderRightColor: '#e9e9e9',
                  // borderRightWidth: 0.5,
                },
              ]}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/bookmark.png')}></Image>
              <Text style={Styles.txtimg}>Bookmark</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => AddReminder()}
              style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/reminder.png')}></Image>
              <Text style={Styles.txtimg}> remider </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>{props.route.params.Name}</Text>
          <Text style={Styles.namedetail}>
            {props.route.params.Description}
          </Text>
        </View>
        {/* <View style={{height: height * 0.6}}>
        <ScrollView> */}
        <View style={Styles.descview}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={ProgramsSessionsDetails}
            renderItem={renderItem}></FlatList>
        </View>
        <View style={{height: height * 0.05}} />
        {/* </ScrollView>
      </View> */}
      </ScrollView>
    </View>
  );
};

export default Program;
