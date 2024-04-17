import React, { useState, useEffect } from 'react';
import {
  // TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Picker,
  Animated,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';

// import {copilot} from 'react-native-copilot';
// import LOGOSVG from "../../assets/live.svg"
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import { TextInput } from 'react-native-gesture-handler';
import { Icon, Spinner } from 'native-base';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  convertMonth,
  convertDay,
} from '../../component/services';
import LinearGradient from 'react-native-linear-gradient';
import HeaderNew from '../../component/HeaderNew';
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const LiveSelection = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [Datas, setDatas] = useState({});
  const [Halls, setHalls] = useState([]);
  const [days, setDays] = useState([]);
  const [day, setday] = useState(0);
  const [imageHeader, setImageHeader] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // props.start?.();
    GetPrograms(props.route.params?.Id);

  }, [imageHeader]);

  const GetPrograms = (EventId) => {
    // console.log(JSON.stringify(EventId));
    // request(
    //   'POST',
    //   'LiveProgram',
    //   {EventId},
    //   () => {},
    //   () => {},
    //   (response) => {
    //     console.log(JSON.stringify(response), 'programha');
    //     if (response.Result == 'Success' && response.Result != null) {
    //       var arrayWithDuplicates = response.Answer;
    //       var lookupObject = {};
    //       for (var i in arrayWithDuplicates) {
    //         lookupObject[arrayWithDuplicates[i]['Day']] = [];
    //         // alert(JSON.stringify(lookupObject));
    //       }
    //       for (var i in arrayWithDuplicates) {
    //         let obj = {};
    //         obj['HalName'] = arrayWithDuplicates[i]['Hall'];
    //         obj['HalLink'] = arrayWithDuplicates[i]['LinkLive'];
    //         obj['Colore'] = arrayWithDuplicates[i]['Colore'];
    //         obj['SessionId'] = arrayWithDuplicates[i]['SessionId'];
    //         obj['Description'] = arrayWithDuplicates[i]['Description'];
    //         lookupObject[arrayWithDuplicates[i]['Day']].push(obj);
    //       }
    //       // alert(JSON.stringify(lookupObject), 'ramin1');
    //       for (var i in lookupObject) {
    //         lookupObject[i] = lookupObject[i].filter(
    //           (v, i, a) => a.findIndex((t) => t.HalName == v.HalName) === i,
    //         );
    //       }

    //       // alert(JSON.stringify(lookupObject), 'ramin2');
    //       let dayss = [];
    //       for (
    //         let index = 0;
    //         index < Object.keys(lookupObject).length;
    //         index++
    //       ) {
    //         dayss.push(Object.keys(lookupObject)[index]);
    //         // console.log(JSON.stringify(Object.keys(lookupObject)[index]));
    //       }
    //       setDatas(lookupObject);
    //       setDays(dayss);
    //       setHalls(lookupObject[Object.keys(lookupObject)[0]]);
    //       // setNameHall(response.Answer.HallName[0])
    //       setModalVisible(false);
    //     }
    //   },
    //   (err) => {
    //     console.log(JSON.stringify(err));
    //   },
    // );
    request(
      'POST',
      'GetLivestream',
      { 'Id': EventId },
      () => { },
      () => { },
      (response) => {
        if (response.Result === 'Success') {
          setHalls(response.Answer)
          setImageHeader(response.Image)
        }
       

      },
      (err) => {
        console.log(JSON.stringify(err));
        console.log(EventId);
      },
    );

    // console.log(JSON.stringify(lookupObject))
    // function removeDuplicates(originalArray, prop) {
    //     var newArray = [];
    //     var lookupObject = {};

    //     for (var i in originalArray) {
    //         lookupObject[originalArray[i][prop]] = originalArray[i];
    //         console.log(JSON.stringify(lookupObject))
    //     }

    //     for (i in lookupObject) {
    //         newArray.push(lookupObject[i]);
    //     }
    //     return newArray;
    // }

    // var uniqueArray = removeDuplicates(arrayWithDuplicates, "Day");
    // console.log("uniqueArray is: " + JSON.stringify(uniqueArray));

    // request('POST', 'LiveProgram', { EventId }, () => { },
    //     () => { },
    //     (response) => {
    //         console.log(JSON.stringify(response), 'programha')
    //         if (response.Result == 'Success' && response.Result != null) {
    //             // let a = response.Answer
    //             // let ses = {
    //             //     "Id": response.Answer.ChairMan.Id,
    //             //     "Day": response.Answer.ChairMan.Day,
    //             //     "Name": "Chairman Speech",
    //             //     "Start": response.Answer.ChairMan.Start,
    //             //     "Expire": response.Answer.ChairMan.Expire,
    //             //     "Hall": response.Answer.ChairMan.HallName,
    //             //     "Colore": "#b34180"
    //             // }
    //             // a.Sessions.splice(1, 0, ses)
    //             // setDatas(a)
    //             // setPrograms(response.Answer.DayList)
    //             // getsesion(response.Answer, 0, 0, Word)
    //             let a =[]
    //             response.Answer.map((item, indexs) => {

    //             })
    //             setDatas(response.Answer)

    //             // setNameHall(response.Answer.HallName[0])
    //             setModalVisible(false)
    //         }
    //     },
    //     (err) => { console.log(JSON.stringify(err)) })
  };

 
  const renderDate = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setday(index);
          setHalls(Datas[Object.keys(Datas)[index]]);
        }}>
        <LinearGradient
          key={index}
          style={Styles.seconddate}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.5 }}
          colors={[
            day == index ? '#29ccf7' : '#FFFF',
            day == index ? '#6162f8' : '#FFFF',
          ]}>
          <View style={Styles.seconddate}>
            <Text
              style={[
                Styles.txtdatese,
                { color: day == index ? '#FFFF' : 'black' },
              ]}>
              {convertDay(item)}
            </Text>
            <Text
              style={[
                Styles.txtmonthse,
                { color: day == index ? '#FFFF' : 'black' },
              ]}>
              {convertMonth(item)}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // alert(JSON.stringify(item));
          // item.HalLink != '' &&
          //   item.HalLink != null &&
          //   props.navigation.navigate('LiveScreen', {
          //     items: item,
          //     Liveindex: index + 1,
          //   });
          props.navigation.navigate('LiveScreen', {
            items: {
              'Id': item.Id,
              'eventId': props.route.params?.Id,
              'HalName': item.Title
            },
            Liveindex: index + 1,
          });
        }}
        key={index}
        style={[Styles.touchoricomm, { marginBottom: '3%' }]}>
        <View style={Styles.timeview}>
          {/* <Image
            resizeMode={'contain'}
            style={Styles.arrowimg}
            source={require('../../assets/img/hall.png')}
          /> */}
          <Icon
            name={'keyboard-arrow-right'}
            type={'MaterialIcons'}
          // style={Styles.arrowright}
          />
        </View>
        <View style={Styles.programtxt}>
          {/* offline.png */}
          <View style={{height:'30%',width:'100%'}}>
            <Text style={Styles.txttitledes}>{item.Title}</Text>
          </View>
          <View style={Styles.usersimgview}>
            <Image
              resizeMode={'contain'}
              style={Styles.usersimg}
              source={require('../../assets/img/usercomm.png')}
            />
            <Image
              resizeMode={'contain'}
              style={Styles.usersimg}
              source={require('../../assets/img/usercomm.png')}
            />
            <Image
              resizeMode={'contain'}
              style={Styles.usersimg}
              source={require('../../assets/img/usercomm.png')}
            />
          </View>
          <View style={Styles.dateview}>
            <Text style={Styles.datetxt}>{item.Time}</Text>
          </View>
        </View>

        <View style={Styles.arroeright}>
          <Image
            resizeMode={'contain'}
            style={Styles.arrowimg}
            source={
              item.HalLink != '' && item.HalLink != null
                ? require('../../assets/img/live.png')
                : require('../../assets/img/offline.png')
            }
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          { height: HEADER_MIN_HEIGHT, opacity: headerOpacity },
        ]}
      />
      <Header
        navigation={props.navigation}
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        notif={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}>
        <View style={Styles.headermainscr}>
          {/* <Video
            source={require('../../assets/sd.mp4')}
            style={{width: '100%', height: '100%'}}
            muted={false}
            repeat={false}
            controls={false}
            // fullscreenOrientation={false}
            fullscreen={false}
            resizeMode={'contain'}
            rate={1}
            ignoreSilentSwitch={'obey'}
          /> */}
          <Image
            source={{ uri: BASE_URL_IMG + imageHeader }}
            style={{ width: '100%', height: '90%' ,marginTop:'5%'}}
            resizeMode='stretch'
            resizeMethod='resize'
          />
        </View>



        <View style={Styles.descview}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={Halls}
            renderItem={renderItem}
          />
        </View>

        <View style={{ height: height * 0.05 }} />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}

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
  (LiveSelection),
);
