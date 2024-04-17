import AsyncStorage from  '@react-native-async-storage/async-storage'
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../component/Header/index';
import {connect} from 'react-redux';
import {Spinner} from 'native-base';
import {request, requestGET, BASE_URL_IMG} from '../../component/services';
import Styles from './Stayles';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const MyAgendaBookMark = (props) => {
  const [Datas, setDatas] = useState({
    Name: '',
    Familly: '',
    Company: '',
    Address: '',
    Phone: '',
    Mobile: '',
  });
  const [Exhabitors, setExhabitors] = useState([]);
  const [Sessions, setSessions] = useState([]);
  const [Epost, setEpost] = useState([]);
  const [SessionsM, setSessionsM] = useState([]);
  const [CommiteeM, setCommiteeM] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [FacultyM, setFacultyM] = useState([]);
  const [pag, setPag] = useState(0);
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
            source={require('../../assets/img/arrowleft.png')}></Image>
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
            source={require('../../assets/img/arrowleft.png')}></Image>
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
          <View
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              marginRight: 1,
            }}>
            <Image
              resizeMode={'cover'}
              style={{width: '100%', height: '100%'}}
              source={{uri: BASE_URL_IMG + item.Image}}></Image>
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
            source={require('../../assets/img/arrowleft.png')}></Image>
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
          <View
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              marginRight: 1,
            }}>
            <Image
              resizeMode={'cover'}
              style={{width: '100%', height: '100%'}}
              source={{uri: BASE_URL_IMG + item.Image}}></Image>
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
            source={require('../../assets/img/arrowleft.png')}></Image>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemEpost = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('EPosterDetails', {
            Datas: Epost[index],
          });
        }}
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginRight: 1,
            }}>
            <Image
              resizeMode={'contain'}
              style={{width: '70%', height: '70%'}}
              source={require('../../assets/img/pdf-file.png')}></Image>
          </View>
        </View>
        <View style={Styles.programtxt}>
          <Text style={Styles.txtprodes}>{item.FileName}</Text>
          {/* <Text style={Styles.txtprodes}>
            {item.Description}
          </Text> */}
          <Text style={[Styles.txtproname, {color: 'grey'}]}>
            {item.FileGuid}
          </Text>
          {/* <Text style={[Styles.txtproname, { color: 'grey' }]}>3</Text> */}
        </View>
        <View style={Styles.arroeright}>
          <Image
            style={Styles.arrowimg}
            source={require('../../assets/img/arrowleft.png')}></Image>
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
            UserPreFix: item?.UserPreFix,
            Name: item.Name,
            Image: item.Image,
            Biography: item.Bio,
            // Title: props.route.params.Title
          })
        }
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          <View
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              marginRight: 1,
            }}>
            <Image
              resizeMode={'cover'}
              style={{width: '100%', height: '100%'}}
              source={{uri: BASE_URL_IMG + item.Image}}></Image>
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
            source={require('../../assets/img/arrowleft.png')}></Image>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      // UserInformation()
      ListBookMarkEpostEventList();
      ListBookmarkSession();
      ListBookmarkExhabit();
      ListBookmarkCommiteMember();
      ListBookmarkSessionMember();
      ListBookmarkFacultyM();
    });
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
          setModalVisible(false);
        },
        (err) => {
          // console.log(JSON.stringify(err))
          setModalVisible(false);
        },
      );
    } else {
      props.navigation.navigate('Qrcode', {
        PageNum: 0,
      });
      setModalVisible(false);
    }
  };

  const ListBookMarkEpostEventList = async () => {
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'ListBookMarkEpostEventList',
        {Email: Token},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({ Email: Token }))
          // console.log(JSON.stringify(response), 'ListBookMarkEpostEventList')
          if (response.Result == 'Success') {
            setEpost(response.Answer);
          }
          setModalVisible(false);
        },
        (err) => {
          // console.log(JSON.stringify(err))
          setModalVisible(false);
        },
      );
    } else {
      props.navigation.navigate('Qrcode', {
        PageNum: 0,
      });
      setModalVisible(false);
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

  // const UserInformation = async () => {
  //   const Token = await AsyncStorage.getItem('Token');
  //   if (Token !== null && Token !== undefined && Token !== '') {

  //     request('POST', 'UserInformation', { Email: Token }, () => { },
  //       () => { },
  //       (response) => {
  //         // console.log(JSON.stringify({ Email: Token }))
  //         console.log(JSON.stringify(response), 'myetelaat')
  //         if (response.Result == 'Success') {
  //           setDatas(response.Answer)
  //         }
  //         setModalVisible(false)
  //       },
  //       (err) => {
  //         console.log(JSON.stringify(err))
  //         setModalVisible(false)
  //       })
  //   } else {
  //     setModalVisible(false)
  //     props.navigation.replace('Qrcode', {
  //       PageNum: 0
  //     })
  //   }
  // }

  const switchscr = () => {
    switch (pag) {
      case 0:
        return exFlatlist();
      case 1:
        return exFlatlist();
      // case 2:
      //   return (SeFlatlist())
      default:
        return exFlatlist();
    }
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
          renderItem={renderItemSessions}></FlatList>
        
      </View>
    );
  };

  const SeFlatlist = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={Sessions}
        renderItem={renderItemSessions}></FlatList>
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
        notif={() => props.navigation.navigate('Profile')}
        // infopress={() => props.navigation.navigate('Notifications')}
        iconright={8}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}>
        <Text style={Styles.txtbookmark}>My Agenda</Text>
      </Header>
      <View style={Styles.topview}></View>
      <ScrollView
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        {switchscr()}

        <View style={{height: 50}} />
      </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyAgendaBookMark);
