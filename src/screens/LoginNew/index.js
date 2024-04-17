import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
  Linking,
  Platform,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import Carousel from 'react-native-snap-carousel';
import {
  getListComment,
  BASE_URL_IMG,
  AddMyComment,
  requestLogin,
  request,
  getReminTime,
  MyImage,
  getDay,
  getTime,
  CompareWithToday,
} from '../../component/services';
import MapView, { Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
// import About from '../../src/assets/img/About.png';
// import Rating from '../../component/Rating';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import ContactListEvent from '../../component/ContactListEvent/index';

// import styles from '../../component/ContactList/styles';
import Header from '../../component/Header';
import HeaderNew from '../../component/HeaderNew';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import styles from '../../component/ContactListEvent/styles';
// import Maps from '../../src/screens/Maps';


const { width, height } = Dimensions.get('screen');

const LoginNew = (props) => {
  // console.log(props);

  const { itemdata } = props.route.params;
  const [itm, setitm] = useState(0);
  const [timetrack, setTimetrack] = useState(
    getReminTime(
      getTime(itemdata.Day) ? getTime(itemdata.Day) : itemdata.Hour,
      getDay(itemdata.Day),
    ),
  );
  const [EventFaculty, setEventFaculty] = useState([
    {
      Name: 'ramin',
      Id: '1',
      UserPreFix: 'mr.',
      Image: '3.jpg',
      Biography: 'biografy',
    },
    {
      Name: 'ramin',
      Id: '2',
      UserPreFix: 'mr.',
      Image: '3.jpg',
      Biography: 'biografy',
    },
    {
      Name: 'ramin',
      Id: '3',
      UserPreFix: 'mr.',
      Image: '3.jpg',
      Biography: 'biografy',
    },
    {
      Name: 'ramin',
      Id: '4',
      UserPreFix: 'mr.',
      Image: '3.jpg',
      Biography: 'biografy',
    },
  ]);
  const [registerbtn, setregisterbtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Email, setemail] = useState('');
  const [loading, setLoading] = useState(false);
  const [Erorre, setErorre] = useState('');
  const [RegisterId, setRegisterId] = useState('');
  const [dataconfig, setdataconfig] = useState();
  const [Datas, setDatas] = useState({
    Id: 2,
    Name: '',
    Description: '',
    LinkAdsList: [{ Link: '', Image: '' }],
    Gallery: [{ ImageName: '' }],
    Faculties: [{ Image: '', Id: 0 }],
    Features: [{ Image: '', Title: '' }],
    ImageAds: null,
    LinkAds: null,
    Exhibitor: [
      {
        Image: '',
        Title: '',
        Id: 0,
        HallName: '',
        Code: 0,
      },
    ],
    Committee: [{ Image: '', Title: '', Id: 0 }],
  });
  // const handleemail = (e) => {
  //   setemail(e);
  // };

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year; //format: d-m-y;
  };

  const configevent = () => {
    // setModalVisible(true)

    // const EventId =
    //   props.route.params.eventId !== undefined
    //     ? props.route.params.eventId
    //     : await AsyncStorage.getItem('eventId');
    // alert(EventId)

    // if (
    //   EventId != undefined &&
    //   EventId != null &&
    //   EventId != 'undefined' &&
    //   EventId != undefined &&
    //   EventId != 'null'
    // ) {
    request(
      'POST',
      'EventConfig',
      { EventId: props.route.params.eventId },
      () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify(response), 'configggggggggg');

        // setModalVisible(false);
        if (response.Result == 'Success') {
          setdataconfig(response.Answer);
          // await AsyncStorage.setItem('Type', response.Type); //Physical
          // await AsyncStorage.setItem('Token', Email);
          // props.chengToken(Email);
          // if (typeof EventId == 'string') {
          //   await AsyncStorage.setItem('eventId', EventId);
          // } else {
          //   await AsyncStorage.setItem('eventId', JSON.stringify(EventId));
          // }
        } else {
          // alert(response.Answer);
        }
      },
      (err) => {
        // setModalVisible(false);
      },
    );
    // } else {
    //   setModalVisible(false);
    // }
  };
  const GetEventFaculty = (Id) => {
    request(
      'POST',
      'GetEventFaculty',
      { Id },
      () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify(response), 'facilti');
        if (response.Result == 'Success') {
          setEventFaculty(
            response.Answer.sort((a, b) =>
              a.Name.charAt(0).toUpperCase() > b.Name.charAt(0).toUpperCase()
                ? 1
                : b.Name.charAt(0).toUpperCase() >
                  a.Name.charAt(0).toUpperCase()
                  ? -1
                  : 0,
            ),
          );
          // setEventFaculty(response.Answer)
        }
      },
      (err) => {
        console.log(JSON.stringify(err), 'GetEventFaculty');
      },
    );
  };
  const Login = async () => {
    // setModalVisible(true)

    const EventId =
      itemdata.Id !== undefined
        ? itemdata.Id
        : await AsyncStorage.getItem('eventId');

    if (
      EventId != undefined &&
      EventId != null &&
      EventId != 'undefined' &&
      EventId != undefined &&
      EventId != 'null'
    ) {
      requestLogin(
        'POST',
        { EventId: EventId, Email: Email, RegisterId },
        () => {
          setLoading(true);
        },
        () => { },
        async (response) => {
          // setLoading(false);
          // console.log(JSON.stringify({EventId: EventId, Email: Email}));
          // console.log(JSON.stringify(response));
          if (response.Result == 'Success') {
            setModalVisible(false);
            // alert(JSON.stringify(response))
            // setDATA2(response.Answer)
            if (itemdata?.Splash) {
              await AsyncStorage.setItem('Splash', itemdata?.Splash);
            }
            // alert('You are Login successful')
            await AsyncStorage.setItem('Type', response.Type); //Physical
            await AsyncStorage.setItem('Token', response.Answer);
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
            setLoading(false);
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
            setErorre(response.Answer);
            // setModalVisible(false);
            // setLoading(false);
            // props.navigation.goBack()
          }
          setLoading(false);
        },
        (err) => {
          // console.log(JSON.stringify(err));
          setModalVisible(false);
          setLoading(false);
        },
      );
    } else {
      setModalVisible(false);
      setLoading(false);
    }
  };
  const typeOfInput = () => {
    switch (itemdata.LoginType) {
      case '1':
        return (
          <View style={{ width: '100%' }}>
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholderTextColor={'#bbbdc5'}
              placeholder={'Please enter your email address'}
              onChangeText={(e) => setemail(e)}
              value={Email}
              style={Styles.textinputlogin}
            />
          </View>
        );
      case '2':
        return (
          <View style={{ width: '100%' }}>
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholderTextColor={'#bbbdc5'}
              placeholder={'Please enter your email address'}
              onChangeText={(e) => setemail(e)}
              value={Email}
              style={Styles.textinputlogin}
            />
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholderTextColor={'#bbbdc5'}
              placeholder={'Please enter your Registration ID'}
              onChangeText={(e) => setRegisterId(e)}
              value={RegisterId}
              style={Styles.textinputlogin}
            />
          </View>
        );
      case '3':
        return (
          <View style={{ width: '100%' }}>
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholderTextColor={'#bbbdc5'}
              placeholder={'Please enter your Registration ID'}
              onChangeText={(e) => setRegisterId(e)}
              value={RegisterId}
              style={Styles.textinputlogin}
            />
          </View>
        );

      default:
        return <View style={{ width: '100%' }}></View>;
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        // onPress={() =>
        //   props.navigation.navigate('Speakers', {
        //     EventName: Datas.Name,
        //     Image: item.Image,
        //     Name: item.Name,
        //     Id: item.Id,
        //     Biography: item.Biography,
        //     NameExtention: item.NameExtention,
        //     Country: item.Country,
        //     Position: item.Position,
        //     UserPreFix: item?.UserPreFix,
        //   })
        // }
        style={Styles.facultypersonv}>
        <Image
          resizeMode={'cover'}
          style={Styles.facultypersonimg}
          source={{ uri: BASE_URL_IMG + item.Image }}></Image>
      </TouchableOpacity>
    );
  };
  const getData = async () => {
    let ID = await AsyncStorage.getItem('eventId');
    // console.log(props.route.params.eventId, 'in login new');
    GetEventFaculty(parseInt(props.route.params.eventId));

  };
  const goToMap = (lat, lng) => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'Show on map';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
  };
  useEffect(() => {
    // console.log(props.route.params.needUpdate);
    if (props.route.params.needUpdate) {
      Alert.alert(
        'There is new vertion available !',
        'Do you want to update?',
        [
          {
            text: 'cancel',
            style: 'cancel',
          },
          {
            text: 'update now',
            onPress: () => {
              // کدی که باید اجرا شود هنگامی که دکمه "آپدیت" فشار داده شود
              console.log('آپدیت انجام شد!');
            },
          },
        ],
        { cancelable: true }
      );
    }



    getData();
    // alert(JSON.stringify(itemdata));


    configevent();
    const intervalM = setInterval(() => {
      timetrack.remine &&
        setTimetrack((pas) => ({
          ...pas,
          sec: pas.sec === 0 ? pas.sec + 59 : pas.sec - 1,
          minut:
            pas.sec === 0
              ? pas.minut === 0
                ? pas.minut + 59
                : pas.minut - 1
              : pas.minut,
          hour:
            pas.sec === 0 && pas.minut === 0
              ? pas.hour > 0
                ? pas.hour - 1
                : pas.hour
              : pas.hour,
          day:
            pas.sec === 0 && pas.minut === 0 && pas.hour === 0
              ? pas.day > 0
                ? pas.day - 1
                : pas.day
              : pas.day,
        }));
    }, 1000);
    return () => clearInterval(intervalM);
  }, []);

  const lati =
    itemdata?.LatLong?.split(',')[0] &&
    parseFloat(itemdata?.LatLong?.split(',')[0]);
  const longi =
    itemdata?.LatLong?.split(',')[1] &&
    parseFloat(itemdata?.LatLong?.split(',')[1]);

  return (
    <View>
      <View style={{}}>

        {/* <Header
            displaytopheader={1}
            navigation={props.navigation}
            arrowin
            arrowinmenue={1}
            homepress={() => props.navigation.goBack()}
          /> */}
        <HeaderNew
        locked={itemdata.locked}
          navigation={props.navigation}
          EventDetails={'Event Details'}
          Events={'Events'}
        />
        {/* header baner top */}
        <View style={Styles.headermainscr}>
          {
            itemdata.Galleries.length > 0 ? (
              <Carousel
                // ref={(c) => { this._carousel = c; }}
                autoplay={true}
                loop={true}
                autoplayInterval={5000}
                data={itemdata?.Galleries}
                renderItem={({ item, index }) => {
                  return (
                    <View key={index} style={Styles.headermainscr}>
                      <MyImage
                        style={Styles.imgbackheader}
                        source={{
                          uri: BASE_URL_IMG + item.ImageName,
                        }}
                        resizeMode={'stretch'}
                      />
                      {CompareWithToday(getDay(itemdata?.Day)) === 'upcoming' && (
                        <View style={Styles.upcomingtouch}>
                          <Text style={Styles.upcomingtxt}>Upcomoming Event</Text>
                        </View>
                      )}
                      {/* like and share */}
                      {/* <View style={Styles.likeAndShare}>
                        <View style={Styles.likeAndShareViewIcon}>
                          <Icon
                            name={'share-social-sharp'}
                            type={'Ionicons'}
                            style={[Styles.likeAndShareIcon, { color: 'white' }]}
                          />
                          <Icon
                            name={'calendar-sharp'}
                            type={'Ionicons'}
                            style={[Styles.likeAndShareIcon, { color: 'white' }]}
                          />
                          <Icon
                            name={'heart'}
                            type={'Ionicons'}
                            style={[Styles.likeAndShareIcon, { color: 'red' }]}
                          />
                        </View>
                      </View> */}
                    </View>
                  );
                }}
                sliderWidth={width}
                itemWidth={width}
              />
            ) : (
              <View style={Styles.headermainscr}>
                <MyImage
                  style={Styles.imgbackheader}
                  source={{
                    uri: BASE_URL_IMG + itemdata.Image,
                  }}
                  resizeMode={'stretch'}
                />
                {CompareWithToday(getDay(itemdata?.Day)) === 'upcoming' && (
                  <View style={Styles.upcomingtouch}>
                    <Text style={Styles.upcomingtxt}>Upcomoming Event</Text>
                  </View>
                )}
                {/* like and share */}
                {/* <View style={Styles.likeAndShare}>
                        <View style={Styles.likeAndShareViewIcon}>
                          <Icon
                            name={'share-social-sharp'}
                            type={'Ionicons'}
                            style={[Styles.likeAndShareIcon, { color: 'white' }]}
                          />
                          <Icon
                            name={'calendar-sharp'}
                            type={'Ionicons'}
                            style={[Styles.likeAndShareIcon, { color: 'white' }]}
                          />
                          <Icon
                            name={'heart'}
                            type={'Ionicons'}
                            style={[Styles.likeAndShareIcon, { color: 'red' }]}
                          />
                        </View>
                      </View> */}
              </View>
            )

          }

        </View>

        {/* details */}
        <View style={Styles.details}>
          {/* title */}
          <View style={Styles.titleview}>
            <Text style={Styles.titletxt}>{itemdata?.Name}</Text>
            <View style={Styles.lineGery} />
          </View>
          {/* left element...  - date */}
          <View style={{ flexDirection: 'row' }}>
            <View style={Styles.detailsDateAndLocation}>
              <View style={Styles.dateview}>
                <Icon
                  name={'date'}
                  type={'Fontisto'}
                  style={{ fontSize: 10, color: 'grey', width: '8%' }}
                />
                <Text style={Styles.datetxt}>{getDay(itemdata?.Day)}</Text>
              </View>
              <TouchableOpacity onPress={() => goToMap(lati, longi)} style={Styles.dateview}>
                <Icon
                  name={'map-marker-alt'}
                  type={'FontAwesome5'}
                  style={{ fontSize: 10, color: 'grey', width: '8%', padding: 1 }}
                />
                <Text style={Styles.datetxt}>{getDay(itemdata?.Location)}</Text>
              </TouchableOpacity>
            </View>
            {/* website */}
            <View style={{ paddingTop: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    itemdata?.WebSite,
                  ).catch((err) => console.error('An error occurred', err))
                }
                style={Styles.websiteview}>
                <Image
                  resizeMode='contain'
                  style={{ width: '30%', height: '25%' }}
                  source={require('../../assets/icon/web.png')}></Image>
                <Text style={Styles.websitetxt}>Event Website</Text>
              </TouchableOpacity>
              {/* picture event website */}

            </View>
          </View>
        </View>


        <View style={Styles.mainview}>
          {/* time  */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', height: '17%', width: '100%' }}>
            <View style={Styles.mainviewCount}>
              <View style={Styles.countview}>
                <Text style={Styles.counttxt}>{timetrack.day}</Text>
                <Text style={Styles.countDaytxt}>Days</Text>
              </View>
              <View style={Styles.countview}>
                <Text style={Styles.counttxt}>{timetrack.hour}</Text>
                <Text style={Styles.countDaytxt}>Hours</Text>
              </View>
              <View style={Styles.countview}>
                <Text style={Styles.counttxt}>{timetrack.minut}</Text>
                <Text style={Styles.countDaytxt}>Minuts</Text>
              </View>
              <View style={Styles.countview}>
                <Text style={Styles.counttxt}>{timetrack.sec}</Text>
                <Text style={Styles.countDaytxt}>sec</Text>
              </View>
            </View>
            {/* stars */}
            {/* <View style={{ width: '31%' }}>
                <View style={{ paddingRight: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Text style={{ color: '#FCC200', alignSelf: 'center', padding: 2 }}> 4.8</Text>
                  <Icon
                    name={'star'}
                    type={'FontAwesome'}
                    style={{ color: 'gold', width: '30%', padding: 3 }}
                  />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: '#000' }}>320+ Reviews</Text>
                </View>
              </View> */}
          </View>
          <View style={Styles.lineGery} />
          <ScrollView style={Styles.aboutTextFull}>
            {/* about  */}

            <View style={Styles.about}>

              <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: 15 }}>
                <Text style={Styles.aboutText}>About</Text>
              </View>
              {/* <View style={Styles.line} /> */}
            </View>

            <View>
              <Text style={Styles.texttxt}>{itemdata?.Description}</Text>
            </View>
            {/* speakers */}
            <View style={Styles.about}>
              {EventFaculty.length > 0 ? (
                <View style={Styles.lineGery} />
              ) : (
                <View />
              )}

              <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: 15 }}>
                {EventFaculty.length > 0 ? (
                  <View>

                    <Text style={Styles.aboutText}>Speakers</Text>
                  </View>

                ) : (
                  <View style={Styles.facultylist} />
                )}
              </View>
            </View>

            {EventFaculty.length > 0 && (
              <View style={Styles.profileimg}>
                <FlatList
                  style={{
                    width: width * 0.85,
                  }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={EventFaculty}
                  renderItem={renderItem}
                // keyExtractor={(item, index) => `${index}`}
                ></FlatList>
                <TouchableOpacity
                  // onPress={async () => {
                  //   let ID = await AsyncStorage.getItem('eventId');
                  //   props.navigation.navigate('FaculityList', {
                  //     EventName: Datas.Name,
                  //     Id: ID,
                  //   });
                  // }}
                  style={Styles.facultyaddnum}>
                  <Text style={Styles.txtnum}>{EventFaculty.length}</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={Styles.lineGery} />
            {/* map */}
            <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: 15 }}>
              <Text style={Styles.aboutText}>Location</Text>
            </View>
            <View style={{ padding: 10 }}>
              {JSON.stringify(lati) != 'null' &&
                JSON.stringify(lati) != 'null' &&
                lati &&
                longi && (
                  <View style={Styles.mapviews}>
                    <MapView
                      onPress={() => goToMap(lati, longi)}
                      scrollEnabled={false}
                      pitchEnabled={false}
                      zoomTapEnabled={false}
                      zoomEnabled={true}
                      // pitchEnabled={false}
                      rotateEnabled={false}
                      // scrollEnabled={false}
                      style={{ width: '100%', height: '80%' }}
                      region={{
                        latitude: lati,
                        longitude: longi,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2,
                      }}
                      initialRegion={{
                        latitude: lati,
                        longitude: longi,
                        latitudeDelta: 0.2,
                        longitudeDelta: 0.2,
                      }}>
                      <Marker
                        coordinate={{
                          latitude: lati,
                          longitude: longi,
                        }}
                        // key={'000'}
                        // onDragEnd={(e) =>
                        //   this._updateMarkedLocation(e.nativeEvent.coordinate)
                        // }
                        pinColor="red"
                      />
                    </MapView>
                  </View>
                )}
            </View>
          </ScrollView>
          <View>

          </View>
        </View>

        <View
          style={[
            Styles.btnview,
            { justifyContent: !registerbtn ? 'space-around' : 'center' },
          ]}>
          {!registerbtn ? (
            <TouchableOpacity
              style={[Styles.btnTouchview, { width: !registerbtn ? '45%' : 0 }]}>
              <Text style={Styles.btnTouchtxt}>Register</Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
          <TouchableOpacity
            style={[Styles.btnTouchview, { width: !registerbtn ? '45%' : '90%' }]}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={Styles.btnTouchtxt}>Login</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={Styles.ModalBack}>
            <View style={Styles.madalRezvpinfo}>
              <View style={Styles.modalvpinfo} />
              <Icon
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                name={'close'}
                type={'AntDesign'}
                style={Styles.modalipinfo}
              />
            </View>
            <View style={Styles.ModalWith}>
              <Image
                // resizeMode={'contain'}
                source={{ uri: BASE_URL_IMG + itemdata?.Icon }}
                style={Styles.moadalimg}
              />
              <Text style={Styles.mpltxt}>{itemdata.Name}</Text>
              <Text style={{ textAlign: 'justify' }}>Welcome</Text>
              {/* <View style={Styles.container}>
                <ActivityIndicator
                  size="large"
                  color="#000"
                  animating={loading}
                  style={Styles.activityIndicator}
                />
              </View> */}
              {typeOfInput()}
              {itemdata.LoginType &&
                (itemdata.LoginType == 1 ||
                  itemdata.LoginType == 2 ||
                  itemdata.LoginType == 3) ? (
                !loading ? (
                  <TouchableOpacity
                    onPress={() => {
                      Login();
                    }}
                    style={Styles.continuebtn}>
                    <Text style={Styles.continuetxt}>Continue</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={Styles.continuebtn}>
                    <ActivityIndicator
                      size="small"
                      color="#FFFF"
                      // animating={loading}
                      style={Styles.continuetxt}
                    />
                  </View>
                )
              ) : null}
              {Erorre.length > 0 && <Text>{Erorre}</Text>}
            </View>
          </View>
          <View style={Styles.ModalBackBlure} />
        </Modal>
      </View >
    </View >
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
    chengsplashOrNot: (splashOrNot) => {
      const action = {
        type: 'CHANGE_C_splashOrNot',
        splashOrNot,
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
    chengitemdata: (itemdata) => {
      const action = {
        type: 'CHANGE_C_itemdata',
        itemdata,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginNew);
