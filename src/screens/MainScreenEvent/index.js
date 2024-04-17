import { View, Icon, Spinner } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  Alert,
  Animated,
  Dimensions,
  TextInput,
  Modal,
  Linking,
  Button,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
// import { copilot } from 'react-native-copilot';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Styles from './Stayles';
import Header from '../../component/Header/index';
import {
  request,
  BASE_URL_IMG,
  MyImage,
} from '../../component/services';
import { IconMainNonPDF } from './Iconmain';
import MapView, { Marker } from 'react-native-maps';
import Video from 'react-native-video';
import WelcomeChairmanMessage from '../../component/WelcomeChairmanMessage';
import WorkShoppage from '../WorkShoppage';
import NewsLetter from '../../component/NewsLetter';
import Social from '../../component/Social';
import LiveActivity from '../../component/LiveActivity';
import UserCommitees from '../../component/UserCommitees';
import { navigationList } from '../../component/navigationList';
const PackageInfo = require("../../../package.json");

const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const MainScreenEvent = (props) => {
  const [workshop, setworkshop] = useState('workshop');
  const [News, setNews] = useState('News');
  const [newsLetter, setNewsLetter] = useState([]);
  const [EventFaculty, setEventFaculty] = useState([
    {
      Name: 'ramin',
      Id: '1',
      UserPreFix: 'mr.',
      Image: '3.jpg',
      Biography: 'biografy',
    },
  ]);
  const [DWMassage, setDWMassage] = useState([]);
  const [workshops, setworkshops] = useState([]);
  const [Count, setCount] = useState(20);
  const [modalVisible, setModalVisible] = useState(true);
  const [Pages, setPages] = useState([]);
  const [Page, setPage] = useState(1);
  const [sponsorID, setsponsorID] = useState();
  const [Sponsers, setSponsers] = useState([]);
  const [Exhabitors, setExhabitors] = useState([]);
  const [Datas, setDatas] = useState([]);
  const [MembersCommiteh, setMembersCommiteh] = useState([]);
  const [membersincommitte, setMembersincommitte] = useState();
  const [IDState, setIDState] = useState(1);

  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const GetEventExhibitor = (Id) => {
    request(
      'POST',
      'GetSponsser',
      { Id },
      () => { },
      () => { },
      (response) => {
        // alert(JSON.stringify(response));
        if (response.Result == 'Success') {
          setSponsers(response.Answer);
          let sponsID = [];
          // let sponsID = {};
          for (let index = 0; index < response.Answer.length; index++) {
            const element = response.Answer[index].Id;
            sponsID.push(element);
            setsponsorID(sponsID[index]);
            // alert(JSON.stringify(sponsID[index]));
          }
          // setModalVisible(false)
        }
      },
      (err) => {
        console.log(JSON.stringify(err), 'GetSponsser');
      },
    );
  };
  const GetEventExhibitorList = (Id) => {
    request(
      'POST',
      'GetEventExhibitor',
      { Id: 82, Count, Page },
      () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify(response))
        if (response.Result == 'Success') {
          setExhabitors(response.Answer);
        }
        // setModalVisible(false);
      },
      (err) => {
        // console.log(JSON.stringify(err))
        setModalVisible(false);
      },
    );
  };
  const GetEventFaculty = (Id) => {
    // console.log(JSON.stringify(Id));
    request(
      'POST',
      'GetEventFaculty',
      { Id, Count, Page },
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

  // GetMembersCommitehCategory
  const GetMembersCommitehCategory = (Id) => {
    request(
      'POST',
      'GetMembersCommitehCategory',
      {
        Id: Id,
      },
      () => { },
      () => { },
      (e) => {
        // console.log(JSON.stringify(e), 'membercommittee');
        // setModalVisible(false)
        if (e.Result == 'Success') {
          setMembersCommiteh(e.Answer);
          // let memberid = [];
          // for (let index = 0; index < e.Answer.length; index++) {
          //   const element = e.Answer[index].Members;
          //   // memberid.push(element[index]);
          //   setMembersincommitte(element);
          //   // alert(JSON.stringify(element));
          // }
        }
      },
      (e) => {
        setModalVisible(false);
        // console.log(e)
      },
    );
  };

  const GetWorkShopAnyEvent = async () => {
    let EventId = await AsyncStorage.getItem('eventId');
    let Token = await AsyncStorage.getItem('Token');
    request(
      'POST',
      'GetWorkShopAnyEvent',
      {
        EventId,
        Token,
      },
      () => { },
      () => { },
      async (e) => {
        // console.log(JSON.stringify(e.Answer));
        // setModalVisible(false)
        if (e.Result == 'Success') {
          setworkshops(e.Answer);
        }
      },
      (e) => {
        setModalVisible(false);
        // console.log(e)
      },
    );
  };

  const GetMediaAnyEvent = async () => {
    let EventId = await AsyncStorage.getItem('eventId');
    let Token = await AsyncStorage.getItem('Token');
    request(
      'POST',
      'GetMediaAnyEvent',
      {
        EventId,
        Page: Page,
        Count: Count,
        Email: Token,
      },
      () => { },
      () => { },
      async (e) => {
        // alert(JSON.stringify(e), 'GetMediaAnyEventGetMediaAnyEvent');
        // setModalVisible(false)
        if (e.Result == 'Success') {
          // setmediaanyevent(e.Answer);
        }
      },
      (e) => {
        setModalVisible(false);
        // console.log(e)
      },
    );
  };
  const NavigateToExhabitors = async () => {
    let ID = await AsyncStorage.getItem('eventId');
    props.navigation.navigate('Exhabitors', { Id: ID })
  }

  const getData = async () => {
    let ID = await AsyncStorage.getItem('eventId');
    setIDState(ID)
    // alert(JSON.stringify(ID));
    // await AsyncStorage.setItem('MainOrWhat', 'false');
    GetEventDetails(parseInt(ID != null ? ID : 1));
    GetEventFaculty(parseInt(ID != null ? ID : 1));

    // GetEventConfigue(parseInt(ID != null ? ID : 1));
    GetMembersCommitehCategory(parseInt(ID != null ? ID : 1));
    GetNews(parseInt(ID != null ? ID : 1));
    GetEventExhibitor(parseInt(ID != null ? ID : 1));
    GetEventExhibitorList(parseInt(ID != null ? ID : 1));
  };
  const getSeewelcom = async () => {
    let seeWelcom = await AsyncStorage.getItem('Splash');
    if (seeWelcom) {
      props.navigation.navigate('Welmasone');
      setModalVisible(false);
    }
  };

  const Checklogin = async (page) => {
    const Token = await AsyncStorage.getItem('Token');
    // const Type = await AsyncStorage.getItem('Type');
    const Type = ''
    // console.log(JSON.stringify({ EmailFrom: Token, EmailTo }))
    if (Token !== null && Token !== undefined && Token !== '') {
      // alert(Type)
      if (Type == 'Physical') {
        Alert.alert(
          'You are registered as physical, you can not see the live session',
        );
        let ID = await AsyncStorage.getItem('eventId');
        // props.navigation.navigate('EventsTime2', {
        //   infoName: Datas.Name,
        //   infoDesc: Datas.Description,
        //   Id: ID,
        //   ImageGallery: Datas.Gallery,
        // });
      } else {
        let ID = await AsyncStorage.getItem('eventId');
        props.navigation.navigate(page, {
          infoName: Datas.Name,
          infoDesc: Datas.Description,
          Id: ID,
          ImageGallery: Datas.Gallery,
        });
      }
      // alert('hh')
    } else {
      setModalVisible(false);
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
              props.navigation.navigate('Qrcode', { PageNum: 0 }),
          },
        ],
        { cancelable: false },
      );
    }
  };

  const GetNews = (Id) => {
    // alert(JSON.stringify(Id));
    request(
      'POST',
      'GetNews',
      { EventId: Id },
      () => { },
      () => { },
      async (response) => {
        // alert(JSON.stringify(response.Answer), 'eventconfig');
        if (response.Result == 'Success') {
          // console.log(JSON.stringify(response.Answer, 'getnews'));
          setNewsLetter(response.Answer);
        }
      },
      (err) => {
        console.log(JSON.stringify(err), 'GetEventDetails');
      },
    );
  };

  const GetEventDetails = (Id) => {
    request(
      'POST',
      'GetEventDetails',
      { Id },
      () => { },
      () => { },
      async (response) => {
        // console.log(JSON.stringify(response), 'GetEventDetails');

        if (response.Result == 'Success') {
          if (response.Answer.Pages.length > 0) {
            setPages(response.Answer.Pages)

          }
          setModalVisible(false);

          // console.log(response.Answer.Pages);
          props.chengShortName(response.Answer.ShortName);
          // await AsyncStorage.setItem('ShortName', response.Answer.ShortName);
          // props.chengPages(response.Answer.Pages);
          await AsyncStorage.setItem(
            'EventName',
            JSON.stringify(response.Answer.Name),
          ).then(
            async () =>
              await AsyncStorage.setItem(
                'EventDescription',
                JSON.stringify(response.Answer.Description),
              ).then(
                async () =>
                  await AsyncStorage.setItem(
                    'EventGallery',
                    JSON.stringify(response.Answer.Gallery),
                  )
                    .then(
                      async () =>
                        await AsyncStorage.setItem(
                          'EventDatas',
                          JSON.stringify(response.Answer),
                        ),
                    )
                    .then(() => {
                      // console.log('ok');
                      setDatas(response.Answer);
                    }),
              ),
          );
        }
      },
      (err) => {
        console.log(JSON.stringify(err), 'GetEventDetails');
      },
    );
  };

  const WelcomMessage = async () => {
    // setModalVisible(true)
    const EventId = JSON.parse(await AsyncStorage.getItem('eventId'));
    request(
      'POST',
      'WelcomMessage',
      { EventId },
      () => { },
      () => { },
      async (response) => {
        // console.log(JSON.stringify(response), 'welcomeeeee');
        if (response.Result == 'Success') {
          setDWMassage(response.Answer);
          // alert(JSON.stringify(response.Answer));
        } else if (response.Result == 'Faild') {
        }
      },
      (err) => {
        // console.log(JSON.stringify(err))
        setModalVisible(false);
      },
    );
  };
  const checkAppVersion = async () => {
    // try {

    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };


  useEffect(() => {
    // console.log(props.Pages);
    const unsubscribe = props.navigation.addListener('focus', async () => {
      props.chengswitchas(true);
      props.chengInEvent(true);
    });
    // GetLastVersionGooglePlay();
    // sendFirebaseToken();
    // GetMembersCommitehCategory;
    getData();
    // WelcomMessage();
    // GetWorkShopAnyEvent();
    // GetMediaAnyEvent();
    // GetEventConfigue();
    return unsubscribe;
  }, [props.navigation]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // console.log(item.Id);

          props.navigation.navigate('Speakers', {
            data: {
              "Id": item.Id,
            }

          })
        }

        }
        style={Styles.facultypersonv}>
        <Image
          resizeMode={'cover'}
          style={Styles.facultypersonimg}
          source={{ uri: BASE_URL_IMG + item.Image }}></Image>
      </TouchableOpacity>
    );
  };

  const renderItemcommitee = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          props.navigation.navigate('DetailSubDiv', {
            // EventName: Datas.Name,
            // Id: item.Id,
            // UserPreFix: item?.UserPreFix,
            // Name: item.Name,
            // Image: item.Image,
            // Biography: item.Biography,
            item,
          })
        }
        style={Styles.facultypersonv}>
        <Image
          resizeMode={'cover'}
          style={Styles.facultypersonimg}
          source={{ uri: BASE_URL_IMG + item.Image }}></Image>
      </TouchableOpacity>
    );
  };
  function getPageWithNavNumber(navNumber) {
    navNumber = parseInt(navNumber)
    for (let i = 0; i < navigationList.length; i++) {
      if (navigationList[i].numberNavigation === navNumber) {
        return navigationList[i];
      }
    }
    return null; // در صورتی که عنصری با شماره گذاری داده شده وجود نداشته باشد
  }


  const PagesComponent = ({ PropsPages, ID }) => {

    // تابع مقایسه‌ای بر اساس فیلد Priority
    const comparePriority = (a, b) => {
      if (a.Priority < b.Priority) return -1;
      if (a.Priority > b.Priority) return 1;
      return 0;
    };
    // مرتب کردن داده‌ها بر اساس Priority
    const sortedPage = PropsPages.sort(comparePriority);
    return (
      <>
        {sortedPage.map(page => (
          <React.Fragment key={page.Id}>
            {page.Status && (
              IconMainNonPDF({
                Status: page.Status,
                onPress: () => {
//                   console.log(page);
//                     let navigatePage = getPageWithNavNumber(page.Priority)
// console.log(navigatePage);
                  if (page.Url) {
                    Linking.openURL(page.Url).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  } else {
                    let navigatePage = getPageWithNavNumber(page.Priority)
                    // console.log(navigatePage);
                    if (
                      navigatePage.page == 'CMEInfo' ||
                      navigatePage.page  == "Symposia" ||
                      navigatePage.page  == 'Courses' ||
                      navigatePage.page  == 'Abstrack' ||
                      navigatePage.page  == 'WorkshopList' ||
                      navigatePage.page  == 'SponsorList' ||
                      navigatePage.page  == 'NewEventsTime' ||
                      navigatePage.page  == 'Commitee' ||
                      navigatePage.page  == 'FaculityList'
                    ) {
                      // Alert.alert(ID)
                      props.navigation.navigate(navigatePage.page, {
                        infoName: Datas.Name,
                        infoDesc: Datas.Description,
                        Id: ID,
                        ImageGallery: Datas.Gallery,
                        Page: 3,
                        infoDesc: Datas.Description,

                      });
                    }
                    //  else if (navigatePage == 'Information') {
                    //   const Token = await AsyncStorage.getItem('Token');
                    //   const Types = await AsyncStorage.getItem('Type');
                    //   // console.log(JSON.stringify({EmailFrom: Token, EmailTo }))
                    //   if (
                    //     Token !== null &&
                    //     Token !== undefined &&
                    //     Token !== ''
                    //   ) {
                    //     const Datas = await AsyncStorage.getItem(
                    //       'EventDatas',
                    //     );
                    //     props.navigation.navigate('Information', {
                    //       Datas: JSON.parse(Datas),
                    //     });
                    //   } else {
                    //     setModalVisible(false);
                    //     Alert.alert(
                    //       'Log In to Register',
                    //       'Log in to your account to register for this event',
                    //       [
                    //         {
                    //           text: 'Cancel',
                    //           onPress: () => console.log('Cancel '),
                    //           style: 'cancel',
                    //         },
                    //         {
                    //           text: 'Log In',
                    //           onPress: () =>
                    //             props.navigation.navigate('Qrcode', {
                    //               PageNum: 0,
                    //             }),
                    //         },
                    //       ],
                    //       { cancelable: false },
                    //     );
                    //   }

                    // }
                    else if (navigatePage.page == 'MyBadge' ||
                      navigatePage.page == 'QuizScreen' ||
                      navigatePage.page == 'SocialMedia'
                    ) {

                      Checklogin(navigatePage.page);

                    }
                    else {
                      props.navigation.navigate(navigatePage.page, {
                        PdfUrl: page.File ? BASE_URL_IMG + page.File : '',
                      });
                    }
                  }
                },
                Name: page.Name,
                Image: page.Image,
              })

            )}
          </React.Fragment>
        ))}
      </>
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
        inform={() => props.navigation.navigate('Information', { Datas })}
        iconright={7}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}>
        <View>
          {/* Here, if there was only one photo in the gallery, the second part 
          of the condition will be implemented because it does not need a slideshow */}
          {
            Datas.Gallery?.length > 1 ?
              (<Carousel
                // ref={(c) => { this._carousel = c; }}
                autoplay={true}
                loop={true}
                autoplayInterval={5000}
                // onSnapToItem={(index) => setitemindex(index)}
                data={Datas.Gallery}
                renderItem={({ item, index }) => {
                  // console.log(BASE_URL_IMG + item.ImageName);
                  return (
                    <View key={index} style={Styles.headermainscr}>
                      <MyImage
                        style={Styles.imgbackheader}
                        source={{
                          uri: BASE_URL_IMG + item.ImageName,
                        }}
                        resizeMode={'stretch'}
                      />

                    </View>
                  );
                }}
                sliderWidth={width}
                // itemHeight={width * .1}
                itemWidth={width} />)
              :
              (
                <View style={Styles.headermainscr}>
                  <MyImage
                    style={Styles.imgbackheader}
                    source={{
                      uri: Datas.Gallery?.length > 0 ? BASE_URL_IMG + Datas.Gallery[0].ImageName : '',
                    }}
                    resizeMode={'stretch'}
                  />
                  {/* <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 0.4}}
                      colors={['#3f62a4', 'transparent']}
                      // style={Styles.linearGradient}
                      style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        zIndex: 2,
                      }}></LinearGradient> */}
                </View>
              )
          }
          {/* name event */}
          <View style={Styles.viewtxtinp}>
            {/* <TouchableOpacity onPress={() => {
              
            }}>
              <Text>test</Text>
            </TouchableOpacity> */}
            <Text numberOfLines={2} style={Styles.txtinp}>
              {Datas.Name}
            </Text>
            {/* live  */}
            <TouchableOpacity
              onPress={async () => {
                const Type = await AsyncStorage.getItem('Type');
                const Token = await AsyncStorage.getItem('Token');
                // console.log(JSON.stringify({ EmailFrom: Token, EmailTo }))
                if (Token !== null && Token !== undefined && Token !== '') {
                  // alert(Type)
                  if (Type == 'Physical') {
                    Alert.alert(
                      'You are registered as physical, you can not see the live session',
                    );
                    let ID = await AsyncStorage.getItem('eventId');
                    // props.navigation.navigate('EventsTime2', {
                    //   infoName: Datas.Name,
                    //   infoDesc: Datas.Description,
                    //   Id: ID,
                    //   ImageGallery: Datas.Gallery,
                    // });
                  } else {
                    let ID = await AsyncStorage.getItem('eventId');
                    props.navigation.navigate('LiveSelection', {
                      infoName: Datas.Name,
                      infoDesc: Datas.Description,
                      Id: ID,
                      ImageGallery: Datas.Gallery,
                    });
                  }
                  // alert('hh')
                } else {
                  setModalVisible(false);
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
                          props.navigation.navigate('Qrcode', { PageNum: 0 }),
                      },
                    ],
                    { cancelable: false },
                  );
                }
              }}
              style={Styles.txtinptouch2}>
              <Text
                onPress={async () => {
                  const Token = await AsyncStorage.getItem('Token');
                  const Types = await AsyncStorage.getItem('Type');
                  // console.log(JSON.stringify({ EmailFrom: Token, EmailTo }))
                  if (Token !== null && Token !== undefined && Token !== '') {
                    // alert(Types)
                    if (Types == 'Physical') {
                      alert(
                        'You are registered as physical, you can not see the live session',
                      );
                      // let ID = await AsyncStorage.getItem('eventId')
                      // props.navigation.navigate('EventsTime2', {
                      //   infoName: Datas.Name,
                      //   infoDesc: Datas.Description,
                      //   Id: ID,
                      //   ImageGallery: Datas.Gallery
                      // })
                    } else {
                      let ID = await AsyncStorage.getItem('eventId');
                      props.navigation.navigate('LiveSelection', {
                        infoName: Datas.Name,
                        infoDesc: Datas.Description,
                        Id: ID,
                        ImageGallery: Datas.Gallery,
                      });
                    }
                  } else {
                    setModalVisible(false);
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
                            props.navigation.navigate('Qrcode', { PageNum: 0 }),
                        },
                      ],
                      { cancelable: false },
                    );
                  }
                  // alert('hh')
                }}
                style={Styles.txtdate}>
                Live Sessions
              </Text>

              <Image
                resizeMode={'contain'}
                style={{ width: '40%', height: '100%' }}
                source={require('../../assets/img/2.gif')}></Image>
            </TouchableOpacity>
          </View>
        </View>
        {/* speakers */}
        {EventFaculty.length > 0 ? (
          <Text style={Styles.facultylist}>Speakers</Text>
        ) : (
          <View style={Styles.facultylist} />
        )}
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
              onPress={async () => {
                let ID = await AsyncStorage.getItem('eventId');
                props.navigation.navigate('FaculityList', {
                  EventName: Datas.Name,
                  Id: ID,
                });
              }}
              style={Styles.facultyaddnum}>
              <Text style={Styles.txtnum}>{EventFaculty.length}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={Styles.viewtopbox}>
          {/* <Text style={Styles.txttopbox}>{Datas.Name}</Text> */}
          {/* <View style={Styles.titletopbox}>
            <Text></Text>
          </View> */}

          {/* RenderPages */}
          <View style={Styles.bottomtbox}>
            {true && (
              <View
                style={{
                  width: '95%',
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                  // borderBottomLeftRadius: 0,
                  // borderBottomRightRadius: 0,
                  // backgroundColor: '#FFFF',
                }}>
                {/* <TouchableOpacity
                  onPress={async () => {
                    props.navigation.navigate('NewEventsTime', {
                      infoName: ' Datas.Name',
                      infoDesc: 'Datas.Description',
                      Id: 'ID',
                      ImageGallery: 'Datas.Gallery',
                      Page: '3',
                      infoDesc: 'Datas.Description',
                    });
                    // GetEventDetails(86)
                  }}>
                  <Text>sss</Text>
                </TouchableOpacity> */}
                {Pages.length > 0 && <PagesComponent PropsPages={Pages} ID={IDState} />}
              </View>)}
            {/* {
                  // event organaizer == CMEInfo
                  //app guide == CMEInfo
                  // cme information == CMEInfo
                  // my badge Checklogin();
                  // symposiom == Symposia
                  //course == Courses
                  // abstract == Abstrack
                  //workshop == WorkshopList
                  //exhabitors && sponsors == SponsorList
                  // scientific program == NewEventsTime
                  // EventsTime == NewEventsTime
                  // scientific program == ShowPdf
                  //posters ==  EPoster
                  //confrance book == TermsUse
                  // about == Information
                  // on-demand == Previose
                */}
            {/* <View style={{
              width: '90%',
              flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'space-around',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: '#FFFF',
            }}>
              <TouchableOpacity
                onPress={async () => {
                  let ID = await AsyncStorage.getItem('eventId')
                  props.navigation.navigate('MainChats', {
                    Id: ID
                  })
                  // props.setPosi(!props.posi)
                }}
                style={{
                  // flexDirection: 'row',
                  width: '33%', paddingHorizontal: 5
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    let ID = await AsyncStorage.getItem('eventId')
                    props.navigation.navigate('MainChats', {
                      Id: ID
                    })
                    props.setPosi(!props.posi)
                  }}
                  style={Styles.flatGrowB}>
                  <View style={{ width: 75, height: 75 }}>
                    <Image
                      resizeMode={'contain'}
                      style={{ width: '100%', height: '100%' }}
                      source={require('../../assets/img/W-M(2).png')}></Image>
                  </View>
                </TouchableOpacity>
                <Text style={Styles.txtgbuis}>Chat</Text>
              </TouchableOpacity>
            </View> */}

            {/* <View style={{
              width: '90%',
              flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'space-around',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: '#f6f6f6',
            }}>

              <TouchableOpacity
                onPress={async () => {
                  // alert('hh')
                  let ID = await AsyncStorage.getItem('eventId')
                  props.navigation.navigate('Maps', {
                    infoName: Datas.Name,
                    infoDesc: Datas.Description,
                    Id: ID,
                    ImageGallery: Datas.Gallery
                  })
                }}
                style={{
                  // flexDirection: 'row',
                  width: '33%', paddingHorizontal: 15
                }}>
                <TouchableOpacity
                  onPress={async () => {
                    // alert('hh')
                    let ID = await AsyncStorage.getItem('eventId')
                    props.navigation.navigate('Maps', {
                      infoName: Datas.Name,
                      infoDesc: Datas.Description,
                      Id: ID,
                      ImageGallery: Datas.Gallery
                    })
                  }}
                  style={Styles.flatGrowB}>
                  <View style={{ width: 75, height: 75 }}>
                    <Image
                      resizeMode={'contain'}
                      style={{ width: '100%', height: '100%' }}
                      source={require('../../assets/img/Map.png')}></Image>
                  </View>
                </TouchableOpacity>
                <Text style={Styles.txtgbuis}>Maps</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>

        {/* exhibitors */}
        {Sponsers.length > 0 && (
          <View style={Styles.textmainscrsec}>
            <Text
              onPress={async () => {
                let ID = await AsyncStorage.getItem('eventId');
                // alert(JSON.stringify(sponsorID));
                props.navigation.navigate('Sponsers', {
                  // infoName: Datas.Name,
                  // infoDesc: Datas.Description,
                  // Id: ID,
                  // ImageGallery: Datas.Gallery,
                  Id: sponsorID,
                });
              }}
              style={Styles.txtmscrhead}>
              Exhibitors & Sponsors
            </Text>
            <Text
              onPress={async () => {
                let ID = await AsyncStorage.getItem('eventId');
                // alert('hh')
                props.navigation.navigate('SponsorList', {
                  // infoName: Datas.Name,
                  // infoDesc: Datas.Description,
                  // Id: ID,
                  // ImageGallery: Datas.Gallery,
                  Id: sponsorID,
                });
              }}
              style={Styles.viewall}>
              View All
            </Text>
          </View>
        )}

        {Sponsers.length > 0 && (
          <View style={{ marginVertical: 10 }}>
            <Carousel
              // ref={(c) => { this._carousel = c; }}
              autoplay={false}
              loop={true}
              // onSnapToItem={(index) => setitemindex(index)}
              data={Sponsers}
              style={{ marginHorizontal: 1 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('ExhabitorsDetails', { Id: item.Id, item })
                    }
                    style={Styles.commitecar}>
                    <Image
                      resizeMode={'cover'}
                      style={Styles.imgcommite}
                      source={{ uri: BASE_URL_IMG + item.Image }}
                    />
                    <View style={Styles.addeventstitle}>
                      {item.Category && (
                        <Text style={Styles.txtreevents}>
                          {' '}
                          - {item.Category}
                        </Text>
                      )}
                      <View style={Styles.addeventsdatearrow}>
                        <Icon
                          name={'keyboard-arrow-right'}
                          type={'MaterialIcons'}
                          style={Styles.arrowright}></Icon>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              // layout={'tinder'}
              // layoutCardOffset={`18`}
              sliderWidth={width}
              itemWidth={width * 0.4}></Carousel>
          </View>
        )}
        {/* {Exhabitors.length > 0 &&
          <>
            <View style={Styles.textmainscrsec}>
              <Text
                onPress={async () => {
                  let ID = await AsyncStorage.getItem('eventId')
                  props.navigation.navigate('Exhabitors', {
                    Id: ID
                  })
                }}
                style={Styles.txtmscrhead}>
                Exhibitors
              </Text>
              <Text
                style={Styles.viewall}
                onPress={async () => {
                  let ID = await AsyncStorage.getItem('eventId')
                  props.navigation.navigate('Exhabitors', {
                    Id: ID
                  })
                }}>
                View All
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Carousel
                // ref={(c) => { this._carousel = c; }}
                autoplay={false}
                enableSnap={true}
                loop={true}
                // onSnapToItem={(index) => setitemindex(index)}
                data={Exhabitors}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('ExhabitorsDetails', { Id: item.Id })}
                      style={Styles.mainscrcarview}>
                      <Image
                        resizeMode={'stretch'}
                        style={Styles.imgcarmainscr}
                        source={{ uri: BASE_URL_IMG + item.Image }}
                      />
                      <View style={Styles.addeventstitle}>
                        <Text style={Styles.txtreevents}>{item.Title}</Text>

                      </View>
                      <View style={Styles.bottcarevents}>

                        <View style={Styles.addevedate}>
                          <View style={Styles.imglocview}>
                            <Image
                              style={Styles.imgbottcarevents}
                              resizeMode={'contain'}
                              source={require('../../assets/img/hallA.png')}></Image>
                          </View>
                          <Text style={Styles.txtcareventdate}>{item.HallName}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                sliderWidth={width}
                itemWidth={width * 0.4}></Carousel>
            </View>
          </>
        } */}
        {MembersCommiteh.length > 0 &&
          MembersCommiteh.map((item, index) => (
            <View>
              {item.Members.length > 0 && (
                <View>
                  <View style={Styles.textmainscrsec}>
                    <Text
                      onPress={async () => {
                        let ID = await AsyncStorage.getItem('eventId');
                        props.navigation.navigate('CommiteMemberList', {
                          // Id: item.Members[index].Id,
                          Members: item.Members,
                        });
                      }}
                      style={Styles.txtmscrheadc0mmitt}>
                      {`${item.Category}`}
                    </Text>
                    <Text
                      onPress={async () => {
                        let ID = await AsyncStorage.getItem('eventId');
                        props.navigation.navigate('CommiteMemberList', {
                          // Id: item.Members[index].Id,
                          // Id: ID,
                          item,
                        });
                      }}
                      style={Styles.viewall}>
                      View All
                    </Text>
                  </View>

                  <View style={Styles.profileimg}>
                    <FlatList
                      style={{
                        width: width * 0.85,
                      }}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={item.Members}
                      renderItem={renderItemcommitee}
                    // keyExtractor={(item, index) => `${index}`}
                    ></FlatList>
                    <TouchableOpacity
                      onPress={async () => {
                        let ID = await AsyncStorage.getItem('eventId');
                        props.navigation.navigate('CommiteMemberList', {
                          // Id: item.Members[index].Id,
                          // Id: ID,
                          item,
                        });
                      }}
                      style={Styles.facultyaddnum}>
                      <Text style={Styles.txtnum}>{item.Members.length}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}

        {/* C0mmitee */}

        {/* finish commitee */}



        {Datas.LinkAdsList?.length > 0 && (
          <View style={{ marginVertical: 10 }}>

            <Text
              style={[
                Styles.txtmscrhead,
                {
                  marginHorizontal: 20,
                },
              ]}>
              Media Partner
            </Text>
            <Carousel

              activeSlideAlignment={'start'}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              autoplay={false}
              data={Datas.LinkAdsList}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`https://${item.Link}`).then(() => {
                        Linking.openURL(item.Link);
                        // (error) => alert(error),}
                      });
                    }}
                    style={Styles.commercialview}>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: 10,

                        height: '100%',
                        backgroundColor: '#FFFF',
                      }}>
                      <Image
                        style={{ height: '100%', width: '100%' }}
                        resizeMode={'cover'}
                        source={{ uri: BASE_URL_IMG + item.Image }}
                      ></Image>

                    </View>
                  </TouchableOpacity>
                );
              }}
              activeSlideOffset={20}
              sliderWidth={width}
              itemWidth={width * 0.4}
            />
          </View>
        )}

        {Datas.Committee?.length > 0 && (
          <View style={Styles.textmainscrsec}>
            <Text
              onPress={async () => {
                let ID = await AsyncStorage.getItem('eventId');
                props.navigation.navigate('Commitee', { Id: ID });
              }}
              style={Styles.txtmscrhead}>
              Committee
            </Text>
            <Text
              onPress={async () => {
                let ID = await AsyncStorage.getItem('eventId');
                props.navigation.navigate('Commitee', { Id: ID });
              }}
              style={Styles.viewall}>
              View All
            </Text>
          </View>
        )}
        {Datas.Committee?.length > 0 && (
          <View style={{ marginVertical: 10 }}>
            <Carousel
              // ref={(c) => { this._carousel = c; }}
              autoplay={false}
              loop={true}
              // onSnapToItem={(index) => setitemindex(index)}
              data={Datas.Committee}
              style={{ marginHorizontal: 15 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('Subdivision', {
                        Title: item.Title,
                        Id: item.Id,
                      })
                    }
                    style={Styles.commitecar}>
                    <Image
                      resizeMode={'stretch'}
                      style={[Styles.imgcommite, { height: '70%' }]}
                      source={{ uri: BASE_URL_IMG + item.Image }}
                    />
                    <View style={Styles.addeventstitle}>
                      <Text style={Styles.txtreevents}>{item.Title}</Text>
                      <View style={Styles.addeventsdatearrow}>
                        <Icon
                          name={'keyboard-arrow-right'}
                          type={'MaterialIcons'}
                          style={Styles.arrowright}></Icon>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              // layout={'tinder'}
              // layoutCardOffset={`18`}
              sliderWidth={width}
              itemWidth={width * 0.4}></Carousel>
          </View>
        )}
        {Datas.Lat && Datas.Long && (
          <View style={Styles.mapviews}>
            <MapView
              zoomTapEnabled={true}
              zoomEnabled={true}
              // pitchEnabled={false}
              rotateEnabled={true}
              // scrollEnabled={false}
              style={{ width: '100%', height: '80%' }}
              region={{
                latitude: Datas.Lat ? Datas.Lat : 0,
                longitude: Datas.Long ? Datas.Long : 0,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
              initialRegion={{
                latitude: Datas.Lat ? Datas.Lat : 0,
                longitude: Datas.Long ? Datas.Long : 0,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}>
              <Marker
                coordinate={{
                  latitude: Datas.Lat ? Datas.Lat : 0,
                  longitude: Datas.Long ? Datas.Long : 0,
                }}
                // key={'000'}
                // onDragEnd={(e) =>
                //   this._updateMarkedLocation(e.nativeEvent.coordinate)
                // }
                pinColor="red"
              />
            </MapView>
            <Text style={Styles.maptxt}>{new Date().toLocaleString()}</Text>
          </View>
        )}
        {/* <Workshop Datas={Datas} mediaPartner={mediaPartner} /> */}

        {/* {DWMassage.Video &&
          <View style={[Styles.textmainscrsec, { marginBottom: 2 }]}>
            <Text
              onPress={async () => {
                let ID = await AsyncStorage.getItem('eventId');
                props.navigation.navigate('Commitee', { Id: ID });
              }}
              style={Styles.txtmscrhead}>
              Welcome Video
            </Text>
          </View>} */}


        {/* <Text>
            {console.log(
              JSON.stringify(DWMassage.Video),
              'videoooooooooooooooooooo',
            )}
          </Text> */}

        {/* {DWMassage.Video &&
          <View>
            <Video
              // source={require('../../assets/E-2.mp4')}
              source={{ uri: BASE_URL_IMG + DWMassage.Video }}
              style={Styles.video}
              muted={true}
              repeat={false}
              autoplay
              controls
              resizeMode={'cover'}
              rate={1.0}
              ignoreSilentSwitch={'obey'}
            />
            <WelcomeChairmanMessage DWMassage={DWMassage} />

          </View>
        } */}



        {/* <RateDate /> */}
        {/* {workshops.length > 1 &&
          <WorkShoppage
            Datas={workshops}
            workshop={workshop}
            navigation={props.navigation}
          />} */}
        {newsLetter?.length > 1 &&
          <NewsLetter
            Datas={newsLetter}
            News={News}
            newsLetter={newsLetter}
            navigation={props.navigation}
          />}
        {/* {Datas.Committee?.length > 1 &&
          <Social Datas={Datas} navigation={props.navigation} />} */}

        {Datas.LiveActivity?.length > 1 &&
          <LiveActivity Datas={Datas} navigation={props.navigation} />}

        {/* {Datas?.Committee?.length > 0 && (
          <UserCommitees
            Datas={Datas?.Committee}
            navigation={props.navigation}
          />
        )} */}
        {
          Datas.LinkAdsList && (
            <Carousel
              // ref={(c) => { this._carousel = c; }}
              autoplay={true}
              loop={true}
              autoplayInterval={5000}
              // onSnapToItem={(index) => setitemindex(index)}
              data={Datas.LinkAdsList}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`https://${item.Link}`).then(() => {
                        Linking.openURL(item.Link);
                        // (error) => alert(error),}
                      });
                    }}
                    key={index}
                    style={Styles.adsbottomslider}>
                    <MyImage
                      style={Styles.imgbackheader}
                      source={{
                        uri: BASE_URL_IMG + item.Image,
                      }}
                      resizeMode={'cover'}
                    />
                  </TouchableOpacity>
                );
              }}
              sliderWidth={width}
              // itemHeight={width * .1}
              itemWidth={width} />
          )
        }


        <View style={{ height: height * 0.1 }} />
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
          <Text style={{ color: 'white' }}>Loding ...</Text>
        </View>
      </Modal>
    </View>
  );
};

// export default MainScreenEvent;
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
    chengShortName: (ShortName) => {
      const action = {
        type: 'CHANGE_C_ShortName',
        ShortName,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  MainScreenEvent,
);
