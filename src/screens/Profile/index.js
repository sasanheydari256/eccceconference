import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Modal,
  Animated,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../../component/Header/index';
// import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {Icon, Spinner} from 'native-base';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  BASE_URL,
  sendFirebaseToken,
} from '../../component/services';
import Styles from './Stayles';
import {IconSize} from '../../component/ContactList/styles';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Profile = (props) => {
  const [Datas, setDatas] = useState({
    Name: '',
    Familly: '',
    Company: '',
    Address: '',
    Phone: '',
    Mobile: '',
    RegisterId: '',
  });
  const [Exhabitors, setExhabitors] = useState([]);
  const [Sessions, setSessions] = useState([]);
  const [SessionsM, setSessionsM] = useState([]);
  const [ImageUri, setImageUri] = useState(null);
  const [SettingNotificationEmail, setSettingNotificationEmail] = useState(
    null,
  );
  const [IMG, setIMG] = useState(null);
  const [CommiteeM, setCommiteeM] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [isEnabled, setisEnabled] = useState(false);
  const [FacultyM, setFacultyM] = useState([]);
  const [pag, setPag] = useState(0);
  // const [navigateIcon, setNavigateIcon] = useState(false);
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const renderItemSessions = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Program', {
            Name: item.Name,
            Image: item.Image,
            SessionId: item.SessionId,
            StartTime: item.Start,
            StartDay: item.Date,
          });
        }}
        key={index}
        style={[Styles.touchoricomm, {marginBottom: 20}]}>
        <View
          style={[
            Styles.timeview,
            {backgroundColor: item.Colore ? item.Colore : '#b34180'},
          ]}>
          <Text style={[Styles.touchtxt]}>{item.Start}</Text>
          <Text style={[Styles.touchtxt]}>{item.Expire}</Text>
        </View>
        <View style={[Styles.programtxt, {paddingVertical: 10}]}>
          <Text
            // onPress={() => {
            //   item.Name != 'register' && props.navigation.navigate('Program', {
            //     Name: item.Name,
            //     Image: item.Image,
            //     SessionId: item.SessionId
            //   })
            // }}
            style={Styles.txttitle}>
            {item.Name}
          </Text>
          <Text numberOfLines={1} style={Styles.txttitledes}>
            {item.HallName}
          </Text>
        </View>

        <View style={Styles.arroeright}>
          <Image
            resizeMode={'contain'}
            style={Styles.arrowimg}
            source={require('../../assets/img/arrowleft.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemSessionDetails = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('SessionDetals', {
            namesession: item.Title,
            items: item,
          })
        }
        key={index}
        style={[Styles.touchoricomm, {marginBottom: 20}]}>
        <View
          style={[
            Styles.timeview,
            {backgroundColor: item.Colore ? item.Colore : '#b34180'},
          ]}>
          <Text style={[Styles.touchtxt]}>{item.StartTime}</Text>
          <Text style={[Styles.touchtxt]}>{item.ExpireTime}</Text>
        </View>
        <View style={[Styles.programtxt, {paddingVertical: 10}]}>
          <Text
            // onPress={() => {
            //   item.Name != 'register' && props.navigation.navigate('Program', {
            //     Name: item.Name,
            //     Image: item.Image,
            //     SessionId: item.SessionId
            //   })
            // }}
            style={Styles.txttitle}>
            {item.Title}
          </Text>
          <Text numberOfLines={1} style={Styles.txttitledes}>
            {item.LocationUser}
          </Text>
        </View>

        <View style={Styles.arroeright}>
          <Image
            resizeMode={'contain'}
            style={Styles.arrowimg}
            source={require('../../assets/img/arrowleft.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemExabitors = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ExhabitSubDev', {Id: item.Id})
        }
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          <View style={Styles.exhview}>
            <Image
              resizeMode={'cover'}
              style={{width: '100%', height: '100%'}}
              source={{uri: BASE_URL_IMG + item.Image}}
            />
          </View>
        </View>
        <View style={Styles.programtxt}>
          <Text style={Styles.txtprodes}>{item.Name}</Text>
          {/* <Text style={Styles.txtprodes}>
            {item.Description}
          </Text> */}
          <Text style={[Styles.txtproname, {color: 'grey'}]}>{item.Code}</Text>
          <Text style={[Styles.txtproname, {color: 'grey'}]}>
            {item.HallName}
          </Text>
        </View>
        <View style={Styles.arroeright}>
          <Image
            style={Styles.arrowimg}
            source={require('../../assets/img/arrowleft.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemCommitee = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('DetailSubDiv', {
            item,
            // Title: props.route.params.Title
          })
        }
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          <View style={Styles.imgview}>
            <Image
              resizeMode={'cover'}
              style={{width: '100%', height: '100%'}}
              source={{uri: BASE_URL_IMG + item.Image}}
            />
          </View>
        </View>
        <View style={Styles.programtxt}>
          <Text style={Styles.txtprodes}>{item.Name}</Text>
          {/* <Text style={Styles.txtprodes}>
            {item.Description}
          </Text> */}
          <Text style={[Styles.txtproname, {color: 'grey'}]}>{item.Code}</Text>
          <Text style={[Styles.txtproname, {color: 'grey'}]}>
            {item.HallName}
          </Text>
        </View>
        <View style={Styles.arroeright}>
          <Image
            style={Styles.arrowimg}
            source={require('../../assets/img/arrowleft.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemFacultyM = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Speakers', {
            item,
            EventName: item.EventName,
            Id: item.Id,
            Name: item.Name,
            Image: item.Image,
            Biography: item.Bio,
            // Title: props.route.params.Title
          })
        }
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          <View style={Styles.imgnameview}>
            <Image
              resizeMode={'cover'}
              style={{width: '100%', height: '100%'}}
              source={{uri: BASE_URL_IMG + item.Image}}
            />
          </View>
        </View>
        <View style={Styles.programtxt}>
          <Text style={Styles.txtprodes}>{item.Name}</Text>
          <Text style={Styles.txtprodes}>{item.Country}</Text>
          {/* <Text style={Styles.txtprodes}>
            {item.Description}
          </Text> */}
          {/* <Text style={[Styles.txtproname, { color: 'grey' }]}>{item.Code}</Text>
          <Text style={[Styles.txtproname, { color: 'grey' }]}>{item.HallName}</Text> */}
        </View>
        <View style={Styles.arroeright}>
          <Image
            style={Styles.arrowimg}
            source={require('../../assets/img/arrowleft.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const useefects = async () => {
    const Allow = await AsyncStorage.getItem('AllowFireBaseNotif');
    setisEnabled(!(Allow === 'no'));
  };

  useEffect(() => {
    SettingSendNotificationEmail();
    useefects();
    UserInformation();
    ListBookmarkSession();
    ListBookmarkExhabit();
    ListBookmarkCommiteMember();
    ListBookmarkSessionMember();
    ListBookmarkFacultyM();
    getProfileImage();
  }, [props.navigation]);
  const ListBookmarkCommiteMember = async () => {
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'ListBookmarkCommiteMember',
        {Email: Token},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({ Email: Token }))
          // console.log(JSON.stringify(response), 'ListBookmarkCommiteMember')
          if (response.Result == 'Success') {
            setCommiteeM(response.Answer);
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    } else {
      props.navigation.navigate('Qrcode', {
        PageNum: 0,
      });
    }
  };
  const SettingSendNotificationEmail = async () => {
    const Email = await AsyncStorage.getItem('Token');
    const EventId = await AsyncStorage.getItem('eventId');
    if (Email !== null && Email !== undefined && Email !== '') {
      request(
        'POST',
        'SettingSendNotificationEmail',
        {Email, EventId},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({ Email: Token }))
          // alert(JSON.stringify(response));
          if (response.Result == 'Success') {
            setSettingNotificationEmail(response.Answer);
            setisEnabled(response.Answer.Notification);
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    } else {
      props.navigation.navigate('Qrcode', {
        PageNum: 0,
      });
    }
  };
  const ListBookmarkFacultyM = async () => {
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'ListBookmarkFacillity',
        {Email: Token},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({ Email: Token }))
          // console.log(JSON.stringify(response), 'ListBookmarkFacultyM')
          if (response.Result == 'Success') {
            setFacultyM(response.Answer);
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    } else {
      props.navigation.navigate('Qrcode', {
        PageNum: 0,
      });
    }
  };
  const ListBookmarkSessionMember = async () => {
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'ListBookmarkSessionMember',
        {Email: Token},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({ Email: Token }))
          // console.log(JSON.stringify(response), 'ListBookmarkSessionMember')
          if (response.Result == 'Success') {
            setSessionsM(response.Answer);
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    } else {
      props.navigation.navigate('Qrcode', {
        PageNum: 0,
      });
    }
  };
  const ListBookmarkSession = async () => {
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'ListBookmarkSession',
        {Email: Token},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({ Email: Token }), 'ListBookmarkSession')
          // console.log(JSON.stringify(response))
          if (response.Result == 'Success') {
            setSessions(response.Answer);
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    } else {
      props.navigation.navigate('Qrcode', {
        PageNum: 0,
      });
    }
  };

  const ListBookmarkExhabit = async () => {
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'ListBookmarkExhabit',
        {Email: Token},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({ Email: Token }))
          // console.log(JSON.stringify(response), 'ListBookmarkExhabit')
          if (response.Result == 'Success') {
            setExhabitors(response.Answer);
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    } else {
      props.navigation.navigate('Qrcode', {
        PageNum: 0,
      });
    }
  };
  const UserInformation = async () => {
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'UserInformation',
        {Email: Token},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({ Email: Token }))
          console.log(JSON.stringify(response), 'myetelaat');
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
    } else {
      setModalVisible(false);
      props.navigation.replace('Qrcode', {
        PageNum: 0,
      });
    }
  };
  const switchscr = () => {
    switch (pag) {
      case 0:
        return prof();
      case 1:
        return exFlatlist();
      // case 2:
      //   return (SeFlatlist())
      default:
        return prof();
    }
  };
  const prof = () => {
    const Data = [
      {
        title: 'BookMarks',
        typeIcon: 'Ionicons',
        nameIcon: 'bookmarks-outline',
        onPress: () => {
          props.navigation.navigate('BookMarks', {});
        },
      },
      {
        title: 'Notifications',
        typeIcon: 'EvilIcons',
        nameIcon: 'share-google',
        onPress: () => {
          props.navigation.navigate('Notifications', {});
        },
      },
      {
        title: 'Terms of use',
        typeIcon: 'Octicons',
        nameIcon: 'note',
        typeIcongo: 'MaterialIcons',
        nameIcongo: 'keyboard-arrow-right',
        navigateIcon: 'true',
        onPress: () => {
          props.navigation.navigate('TermsUse', {});
        },
      },
      {
        title: 'Privacy Policy',
        typeIcon: 'SimpleLineIcons',
        nameIcon: 'lock',
        typeIcongo: 'MaterialIcons',
        nameIcongo: 'keyboard-arrow-right',
        navigateIcon: 'true',
        onPress: () => {
          props.navigation.navigate('PrivacyPolicy', {});
        },
      },
    ];

    const renderItems = ({item, index}) => {
      return (
        <TouchableOpacity
          style={Styles.ListItemsItems}
          onPress={item?.onPress}
          key={`index-${index}`}>
          <View style={Styles.bookmarkview}>
            <Icon
              name={item?.nameIcon}
              type={item?.typeIcon}
              style={Styles.listItemsIcon}
            />
            <Text style={Styles.ListItemsText}>{item?.title}</Text>
          </View>
          {item?.navigateIcon === 'true' && (
            <Icon
              name={item?.nameIcongo}
              type={item?.typeIcongo}
              style={Styles.listItemsIcongo}
              // color={'blue'}
            />
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <FlatList
          style={Styles.ListItemsView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={Data}
          renderItem={renderItems}
        />
        {/* <View style={Styles.descview}>
          <Text style={Styles.biotxt}>BIOGRAPHY</Text>
          <Text style={Styles.biodestxt}>
            RegisterationId : {Datas.RegisterId}
          </Text>
          <Text style={Styles.biodestxt}>Country : {Datas.Country}</Text>
          <Text style={Styles.biodestxt}>Email : {Datas.Email}</Text>
          <Text style={Styles.biodestxt}>Mobile : {Datas.Mobile}</Text>
        </View> */}
        <View style={{height: height * 0.05}} />
      </View>
    );
  };

  const exFlatlist = () => {
    return (
      <View>
        {/* <Text style={Styles.bck} onPress={() => setPag(0)}>Profile</Text> */}
        {Sessions.length > 0 && <Text style={Styles.biotxt}>Sessions</Text>}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={Sessions}
          renderItem={renderItemSessions}
        />
        {SessionsM.length > 0 && (
          <Text style={Styles.biotxt}>Session Details</Text>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={SessionsM}
          renderItem={renderItemSessionDetails}
        />
        {Exhabitors.length > 0 && <Text style={Styles.biotxt}>Exhabitors</Text>}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={Exhabitors}
          renderItem={renderItemExabitors}
        />
        {CommiteeM.length > 0 && <Text style={Styles.biotxt}>Commitee</Text>}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={CommiteeM}
          renderItem={renderItemCommitee}
        />
        {FacultyM.length > 0 && <Text style={Styles.biotxt}>Faculty</Text>}
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={FacultyM}
          renderItem={renderItemFacultyM}
        />
      </View>
    );
  };
  const SeFlatlist = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={Sessions}
        renderItem={renderItemSessions}
      />
    );
  };
  const renderItem = ({item}) => {
    return (
      <ImageBackground
        source={require('../../assets/img/backtouch.png')}
        style={Styles.backtouchimg}>
        <TouchableOpacity style={Styles.touchoricomm}>
          <Text style={Styles.touchtxt}>Grow Your Buisiness</Text>
          <Text style={Styles.dateintouch}>
            Tuesday - 03 Apr - 13:30 PM - UEA dubai
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  const _openCamera = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.6,
      includeBase64: true,
    })
      .then((image) => {
        // setImageUri(image.path);
        // setIMG(image);
        sendImage(image.data);
        // console.log(JSON.stringify(image.data));
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const getProfileImage = async () => {
    const Token = await AsyncStorage.getItem('Token');
    request(
      'POST',
      'GetProfileImage',
      {
        Email: Token,
      },
      () => {},
      () => {},
      (response) => {
        // alert(JSON.stringify(response));
        // console.log(`${BASE_URL_IMG}menu/${response.Answer}`);
        if (response.Result == 'Success') {
          setIMG(`${BASE_URL_IMG}${response.Answer}`);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };
  const sendImage = async (IMG) => {
    const Token = await AsyncStorage.getItem('Token');

    request(
      'POST',
      'TakeProfileImage',
      {
        Email: Token,
        ImageName: 'Imsged.png',
        ImageFile: IMG,
      },
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify({
        //   Email: Token,
        //   ImageName: 'Imsged', ImageFile: IMG
        // }))
        // alert(JSON.stringify(response))
        if (response.Result == 'Success') {
          if (response.Answer == 'Success') {
            getProfileImage();
          }
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };
  const Checklogin = async () => {
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      props.navigation.navigate('MyBadge', {
        // ImageName: Datas.Gallery[0].ImageName,
        Datas,
      });
      // alert('Please2')
    } else {
      // alert('Please')
      props.navigation.navigate('Qrcode', {
        PageNum: 0,
      });
    }
  };
  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          {height: HEADER_MIN_HEIGHT, opacity: headerOpacity},
        ]}
      />
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
        infopress={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <ScrollView
        // style={{backgroundColor: 'red'}}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={Styles.headermainscr}>
            {/* <ImageBackground
              resizeMode={'cover'}
              style={Styles.imgbackheader}
              blurRadius={3}
              source={
                IMG == null
                  ? require('../../assets/img/unnamed.png')
                  : {uri: IMG}
              }
              // source={{ uri: BASE_URL_IMG + props.route.params.Image }}
            >
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.5}}
                colors={['#3f62a4', 'transparent']}
                // style={Styles.linearGradient}
                style={{height: '100%', width: '100%'}}
              />
            </ImageBackground> */}
          </View>
          <View style={Styles.logotview}>
            <View style={Styles.userimgview}>
              <TouchableOpacity
                onPress={() => {
                  _openCamera();
                }}>
                <Image
                  source={
                    IMG == null
                      ? require('../../assets/img/unnamed.png')
                      : {uri: IMG}
                  }
                  style={Styles.userimg}
                />
                {/* <Text>{IMG}</Text> */}
              </TouchableOpacity>
              <View style={Styles.userinfoview}>
                <Text style={Styles.usernametxt}>
                  {Datas.Name} {Datas.Familly}
                </Text>
                <Text style={Styles.usermailtxt}>{Datas.Email}</Text>
                <Text style={Styles.usermailtxt}>
                  Registration ID: {Datas.RegisterId}
                </Text>
              </View>
            </View>
            <View style={Styles.badgeandcardview}>
              <TouchableOpacity
                style={Styles.badgeIconTouch}
                onPress={() => Checklogin()}>
                <Icon
                  name={'badge-account-outline'}
                  type={'MaterialCommunityIcons'}
                  style={Styles.badgeIcon}
                  color={Datas.BajColor}
                />
                <Text>My Badge</Text>
              </TouchableOpacity>
              {/* <View>
                <Image />
                <Text>MY Badge</Text>
              </View> */}
            </View>
          </View>
        </View>
        {/* <View style={Styles.bookview}>
          <View style={{ flexDirection: 'row' }}>
            <View style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/note.png')}></Image>
              <Text style={Styles.txtimg}>Write Note</Text>
            </View>
            <View
              style={[
                Styles.writenoteview,
                {
                  borderLeftWidth: 0.5,
                  borderLeftColor: '#e9e9e9',
                  borderRightColor: '#e9e9e9',
                  borderRightWidth: 0.5,
                },
              ]}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/bookmark.png')}></Image>
              <Text style={Styles.txtimg}>Add Bookmark</Text>
            </View>
            <View style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/reminder.png')}></Image>
              <Text style={Styles.txtimg}>remider</Text>
            </View>
          </View>
        </View> */}
        {/* <View style={{height: height * 0.6}}>
        <ScrollView> */}

        {/* <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>
            {Datas.Name} {Datas.Familly}
          </Text>
        </View> */}
        {switchscr()}
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('BookMarks', {});
          }}
          style={Styles.writenoteview}>
          <Image
            style={Styles.imgexhabitnote}
            resizeMode={'contain'}
            source={require('../../assets/img/bookmark.png')}
          />
          <Text style={Styles.txtimg}>Bookmarks</Text>
        </TouchableOpacity> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width,
            alignItems: 'center',
            padding: 10,
          }}>
          <Text>Push Notifications</Text>
          <Switch
            trackColor={{false: '#FFFF', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#FFFF' : '#FFFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={async () => {
              const EventId = await AsyncStorage.getItem('eventId');
              const Email = await AsyncStorage.getItem('Token');
              // const tokenFCM = await messaging().getToken();
              request(
                'POST',
                'ChangeFireBaseUserToken',
                {
                  FireBaseToken: 'tokenFCM',
                  Email,
                  EventId,
                  // Allow: true,
                },
                () => {},
                () => {},
                async (response) => {
                  if (response.Result == 'Success') {
                    SettingSendNotificationEmail();
                    // alert(JSON.stringify(response.Result));
                  }
                },
                (err) => {
                  console.log(JSON.stringify(err));
                },
              );
              setisEnabled(!isEnabled);
            }}
            value={isEnabled}
          />
        </View>
        <View style={{height: 50}} />
      </ScrollView>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem('Token');
          await AsyncStorage.removeItem('Type');
          await AsyncStorage.removeItem('eventId');
          props.chengToken('');
          props.navigation.goBack();
        }}
        style={[Styles.logotview2, {alignSelf: 'center'}]}>
        <Text style={Styles.namedetail2}>Logout</Text>
      </TouchableOpacity>
      <View style={{height: 50}} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   setModalVisible(false);
        // }}
      >
        <View style={Styles.loadview}>
          <Spinner color="#FFFF" />
          <Text style={{color: 'white'}}>Loding ...</Text>
        </View>
      </Modal>
    </View>
  );
};

// export default Profile;
const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
    idevents: state.Customer.idevents,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
