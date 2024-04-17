import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  Animated,
  Modal,
  TextInput,
  TouchableHighlight,
  Linking,
  Alert,
} from 'react-native';
import { Spinner } from 'native-base';
// import { copilot } from 'react-native-copilot';
import Carousel from 'react-native-snap-carousel';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  FindeEventDefault,
  getReminTime,
  MyImage,
  getTime,
  getDay,
  OrganizationId,
  AppName,
} from '../../component/services';
import AsyncStorage from '@react-native-async-storage/async-storage'

import PrevListChange from '../../component/PrevListChange';
import { Colors } from '../../component/services/Colors';
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Mainscreen = (props) => {
  const [DATA, setDATA] = useState([{ Id: 0, Name: 'All' }]);
  const [DATA1, setDATA1] = useState([]);
  const [DATA2, setDATA2] = useState([]);
  const [searchresault, setSearchresault] = useState([]);
  const [IsSearch, setIsSearch] = useState(false);
  const [CategoryId, setCategoryId] = useState(0);
  const [selectType, setSelectType] = useState(0);
  const [Count, setCount] = useState(10);
  const [Word, setWord] = useState('');
  const [indexProgramType, setIndexProgramType] = useState(0);
  const [Page, setPage] = useState(1);
  const [EventAdds, setEventAdds] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [datasettingApp, setdatasettingApp] = useState();
  const [idanytype, setidanytype] = useState();
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });


  const CloseSearch = () => {
    setWord('');
    setSearchresault([]);
    setIsSearch(false);
  };
  const clearShortName = async () => await AsyncStorage.setItem('ShortName', '');
  useEffect(() => {
    clearShortName
    GetEvent(0, 0);

    GetCategory();
    EventAds2();
  }, [props.navigation]);

  const GetCategory = () => {
    request(
      'POST',
      'GetCategory',
      { Id: OrganizationId },
      () => { },
      () => { },
      (response) => {
        // console.log(response);
        if (response.Result == 'Success') {
          setDATA(DATA.concat(response.Answer));
        }
      },
      () => { },
    );
  };

  const EventAds2 = () => {
    requestGET(
      'EventAds2',
      () => { },
      () => { },
      (response) => {
        // console.log(response);
        if (response.Result == 'Success') {
          setEventAdds(response.Answer);
        }
      },
      () => { },
    );
  };



  const PastOrPresent = (data, PastOrPer) => {
    {/* 
            select type
            1 is Past
            0 is Current
            2 is Future
            */}
    const newData = [];
    var today = new Date();
    if (PastOrPer == 0) {
      // alert(1);
      // alert(
      //   JSON.stringify(
      //     data[0].EventDates.length > 0 &&
      //       data[0].EventDates[data[0].EventDates.length - 1].Day,
      //   ),
      // );
      // alert(JSON.stringify(date.split('-')[0]))
      // alert(JSON.stringify(data[1].Day.split('-')[0]))
      // alert(JSON.stringify(new Date(date).getTime()))
      // for (let i = 0; i < data.length; i++) {
      //   const element = data[i];
      //   // if (element.EventDates.length > 0)
      //   if (
      //     Math.round(today.getTime() / 100000) * 100000 <=
      //     new Date(checkDats(element.Day)).getTime()
      //   ) {
      //     newData.push(element);
      //   }
      // }
      // console.log('Current');
      let newData = data.filter(obj => obj.TypeTime === 'Current');
      // console.log(newData);

      return newData;
    } else if (PastOrPer == 1) {
      // alert(2);
      // for (let i = 0; i < data.length; i++) {
      //   const element = data[i];
      //   if (
      //     element.Day &&
      //     today.getTime() > new Date(checkDats(element.Day)).getTime()
      //   ) {
      //     newData.push(element);
      //   }
      // }
      // alert(JSON.stringify(newData));
      let newData = data.filter(obj => obj.TypeTime === 'Past');
      // console.log('Past');
      // console.log(newData);
      return newData;
    } else if (PastOrPer == 2) {
      let newData = data.filter(obj => obj.TypeTime === 'Future');
      // console.log('Future');
      // console.log(data, 'ooo');

      return newData;
    }
  };

  const GetEvent = (CategoryId, typePastOrPer) => {
    // alert(JSON.stringify({CategoryId}));
    request(
      'POST',
      'GetEvent',
      { CategoryId, Count, Page, OrganizationId: OrganizationId },
      () => { },
      () => { },
      (response) => {
        // console.log(response);
        if (response.Result == 'Success') {
          // alert(JSON.stringify(response));
          // GetApplicationSetting(response.Answer);

          setModalVisible(false);
          setDATA2(PastOrPresent(response.Answer, typePastOrPer));
          setDATA1(response.Answer);

          // let idforany = [];
          for (let index = 0; index < response.Answer.length; index++) {
            const element = response.Answer[index].Parts;
            // idforany.push(element);
            // alert(JSON.stringify(element));
            setidanytype(element);
          }

          // let ev = FindeEventDefault(response.Answer);
          // // alert(JSON.stringify(ev));
          // if (ev != 'nadare') {
          //   props.navigation.navigate('MainScreenEvent', {
          //     Id: ev.Id,
          //     itemdata: ev,
          //   });
          // }
          //alert(JSON.stringify(response.Answer))
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };



  const GetApplicationSetting = async (data) => {
    // alert(JSON.stringify({CategoryId}));
    setModalVisible(true);

    request(
      'POST',
      'ApplicationSetting',
      {
        OrganizationId: OrganizationId,
        AppName: AppName
      },
      () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify(response, 'jjj'));
        if (response.Result == 'Success') {
          setdatasettingApp(response.Answer)
          if (response.Answer.LockEvent) {
            const eventSelect = data.filter(event => {
              return event.Id === response.Answer.LockEventId;
            })
            // console.log(eventSelect);
            // props.navigation.navigate('LoginNew', {
            //   PageNum: 0,
            //   eventId: eventSelect[0].Id,
            //   Image: eventSelect[0].Image,
            //   itemdata: eventSelect[0]
            // });
          }else{

          }
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );

  };

  const SearchEvent = () => {
    // alert('s');
    setIsSearch(true);
    request(
      'POST',
      'SearchEvent',
      { Word, OrganizationId: OrganizationId, CategoryId },
      () => { },
      () => { },
      (response) => {
        // alert(JSON.stringify(response));
        if (response.Result == 'Success') {
          setSearchresault(response.Answer);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };

  const checkLogin = async (
    Id,
    Image,
    Splash,
    SplshText,
    SplashAds,
    SplashAdsLink,
    itemdata,
  ) => {
    try {
      const Token = await AsyncStorage.getItem('Token');
      const eventId = await AsyncStorage.getItem('eventId');
      if (Token !== null && Token !== undefined && Token !== '') {

        if (eventId == Id) {
          props.navigation.navigate('MainScreenEvent', {
            Id,
            itemdata,
          });
        } else {
          Alert.alert(
            '',
            'Do you want to log out from the previous event to join another event?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Logout',
                onPress: async () => {
                  const rem = [
                    'Token',
                    'Type',
                    'eventId',
                    'Splash',
                    'SplshText',
                    'SplashAdsLink',
                    'SplashAds',
                  ];
                  await AsyncStorage.multiRemove(rem);
                  props.chengToken('');
                },
              },
            ],
            { cancelable: false },
          );
        }
      } else {

        props.navigation.navigate('LoginNew', {
          PageNum: 0,
          eventId: Id,
          Image: Image,
          itemdata,
        });
        if (itemdata.ShortName) {

          await AsyncStorage.setItem('ShortName', itemdata.ShortName);

        }
        // alert('hh');
      }
    } catch (error) {
      // Error saving data
    }


  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIndexProgramType(index);
          setCategoryId(item.Id);
          GetEvent(item.Id, selectType);
        }}
        style={[
          Styles.touchflatmain,
          { backgroundColor: indexProgramType == index ? '#005EAB' : '#FFFF' },
        ]}>
        <Text
          style={[
            Styles.flathorizmscr,
            { color: indexProgramType == index ? '#FFFF' : '#000000' },
          ]}>
          {item.Name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItemsec = ({ item }) => {
    return (
      <View style={Styles.touchmscrsec}>
        <View
          style={{
            width: '100%',
            // height: '100%',
            marginHorizontal: 10,
            backgroundColor: 'blue',
          }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode={'cover'}
            source={require('../../assets/img/mainflatone.png')}
          />
        </View>
      </View>
    );
  };

  const renderLastEvent = (item, index) => {
    // console.log(BASE_URL_IMG + item[0]?.Galleries[0]?.ImageName);
    // console.log('last item');
    // console.log(item);
    // alert(item.Day);
    const timetrack = getReminTime(
      getTime(item.Day) ? getTime(item.Day) : item.Hour,
      getDay(item.Day),
    );
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          checkLogin(
            item.Id,
            BASE_URL_IMG + item.Image,
            item.Splash,
            item.SplshText,
            item.SplashAds,
            item.SplashAdsLink,
            item,
          )
        }

        }
        style={Styles.mainscrcarview}>
        <MyImage
          style={Styles.imgcarmainscr}
          source={{
            // uri: BASE_URL_IMG + item?.Galleries[0]?.ImageName,
            uri: BASE_URL_IMG + item?.Image,
          }}
          resizeMode={'stretch'}
        />
        {/* <Image
        resizeMode={'contain'}
        style={Styles.imgcarmainscr}
        source={{ uri: BASE_URL_IMG + item.Image }}
      /> */}
        <View style={{ paddingHorizontal: 15 }}>
          <View style={Styles.reeventscar}>
            <View style={{ width: '70%' }}>
              <Text style={Styles.txtreevents}>{item.ShortName}</Text>
              <Text style={Styles.txtreevents}>{item.Location}</Text>
            </View>
            <View style={Styles.reeventscardate}>
              <Image
                style={Styles.imgbottcareventssec}
                resizeMode={'contain'}
                source={require('../../assets/img/date.png')}
              />
              <Text style={Styles.txtcarnum}>{getDay(item.Day)}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
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
            <View style={{ flexDirection: 'row' }}>
              {idanytype?.Login.length > 0 &&
                idanytype?.Login.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      Styles.firstlastname,
                      {
                        backgroundColor: datasettingApp?.Theme,
                      },
                    ]}>
                    <Text style={{ color: '#FFFF' }}>
                      {item?.FirstName.charAt(0)}
                    </Text>
                  </View>
                ))}
              <View
                style={[
                  Styles.firstlastname,
                  {
                    backgroundColor: datasettingApp?.Theme,
                  },
                ]}>
                <Text style={{ color: '#FFFF' }}>{idanytype?.LoginNumber}</Text>
              </View>
            </View>
            <View></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // <SafeAreaView style={Styles.mainscrview}>
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          {
            height: HEADER_MIN_HEIGHT,
            opacity: headerOpacity,
            backgroundColor: datasettingApp?.Theme,
          },
        ]}
      />
      <Header
        navigation={props.navigation}
        backcolor={1}
        iconright={2}
        // mainscreen={1}
        login={true}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}>
        {/* tab bala */}
        <View
          style={[
            Styles.headermainscr,
            {
              backgroundColor: datasettingApp?.Theme,
            },
          ]}>
          {/* search */}
          <View style={{ paddingHorizontal: 10 }}>
            <View>
              {/* <TouchableHighlight onPress={() => {
                props.navigation.navigate('Exhabitors', {
                  Id: 23
                })
              }}>
                <Text>test</Text>
              </TouchableHighlight> */}
            </View>
            <View style={Styles.txtview}>
              <Text style={Styles.toptextheader}>{datasettingApp?.Name}</Text>
              <Text style={Styles.secondtextheader}>
                {datasettingApp?.Description}
              </Text>
            </View>
            <View style={Styles.viewtxtinp}>
              <View style={Styles.txtinpheader}>
                {IsSearch ? (
                  <Icon
                    onPress={() => CloseSearch()}
                    name={'close'}
                    type={'AntDesign'}
                    style={Styles.menutxtinpIcon}
                  />
                ) : (
                  <View style={{ width: 30 }} />
                )}
                <TextInput
                  onSubmitEditing={() => SearchEvent()}
                  style={Styles.txtinp}
                  onChangeText={(e) => {
                    setIsSearch(true);
                    setWord(e);
                  }}
                  value={Word}
                  placeholderTextColor={'#bbbdc5'}
                  placeholder={'Search Events'}
                />
                <TouchableOpacity style={Styles.txtinptouch}>
                  <Icon
                    onPress={() => SearchEvent()}
                    name={'search1'}
                    type={'AntDesign'}
                    style={Styles.menutxtinpIcon}
                  />
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity style={Styles.touchfilter}>
                <Image
                  resizeMode={'contain'}
                  style={Styles.filterpng}
                  source={require('../../assets/img/filter.png')}></Image>
              </TouchableOpacity> */}
            </View>
            <View style={Styles.viewtxtinptoast}>
              {/* tab current Previous */}
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: Colors.lightGrey,
                  borderRadius: 5,
                }}>
                <TouchableHighlight
                  onPress={() => {
                    // setBackcolor(true);
                    setSelectType(0);
                    setDATA2(PastOrPresent(DATA1, 0));
                  }}
                  style={[
                    Styles.txtinptouchtoast,
                    {
                      backgroundColor:
                        selectType === 0 ? '#FFFF' : Colors.lightGrey,
                    },
                  ]}>
                  <Text
                    onPress={() => {
                      setDATA2(PastOrPresent(DATA1, 0));
                      setSelectType(0);
                    }}
                    style={Styles.txtdatetoast}>
                    Current && Upcoming
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    setSelectType(1);
                    setDATA2(PastOrPresent(DATA1, 1));
                    // props.navigation.navigate('LoginNew');
                    // props.navigation.navigate('ListEvents', {
                    //   tarikh: 'Previous',
                    // });
                  }}
                  style={[
                    Styles.txtinptouchtoast,
                    {
                      backgroundColor:
                        selectType === 1 ? '#FFFF' : Colors.lightGrey,
                    },
                  ]}>
                  <Text
                    onPress={() => {
                      setSelectType(1);
                      setDATA2(PastOrPresent(DATA1, 1));
                    }}
                    style={Styles.txtdatetoast}>
                    Previous
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    setSelectType(2);
                    setDATA2(PastOrPresent(DATA1, 2));
                  }}
                  style={[
                    Styles.txtinptouchtoast,
                    {
                      backgroundColor:
                        selectType === 2 ? '#FFFF' : Colors.lightGrey,
                    },
                  ]}>
                  <Text
                    onPress={() => {
                      setSelectType(2);
                      setDATA2(PastOrPresent(DATA1, 2));
                    }}
                    style={Styles.txtdatetoast}>
                    On Demand
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={Styles.headermainscr}></View> */}

        {/* <View style={Styles.bodymainscr}> */}
        <View>
          <ScrollView>
            <View style={Styles.gapview} />
            <View style={{ flexDirection: 'row' }}>
              <FlatList
                style={{ marginLeft: 10 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={DATA}
                renderItem={renderItem}
              // keyExtractor={(item, index) => `${index}`}
              />
            </View>
            {/* 
            select type
            1 is Past
            0 is Current
            2 is Future
            */}
            <View style={Styles.textmainscrsec}>
              {selectType == 0 && (
                <Text style={Styles.txtmscrhead}>
                  Current & Upcoming Events
                </Text>
              )}
              {selectType == 1 && (
                <Text style={Styles.txtmscrhead}>Previous Events</Text>
              )}
              {selectType == 2 && (
                <Text style={Styles.txtmscrhead}>On Demand Events</Text>
              )}
              {/* <Text
                onPress={() =>
                  props.navigation.navigate('ListEvents', {tarikh: 'Upcoming'})
                }
                style={Styles.txtviewall}>
                View All
              </Text> */}
            </View>

            {/* top baner  */}
            <View style={{ marginVertical: 10 }}>
              {!IsSearch
                ? DATA2.length > 0 &&
                renderLastEvent(DATA2[DATA2.length - 1], 0)
                : searchresault.length > 0 &&
                renderLastEvent(searchresault[0], 0)}
              {/* <Text>{JSON.stringify(searchresault)}</Text> */}
            </View>
            {/* {EventAdds.length > 0 && (
              <View style={Styles.textmainscrsec}>
                <Text style={Styles.txtmscrhead}>Future Events</Text>
              
              </View>
            )} */}
            <PrevListChange
              idanytype={idanytype}
              checkLogin={checkLogin}
              DATA2={!IsSearch ? DATA2 : searchresault}
            />
            {/* ads */}
            <View style={{ marginVertical: 10 }}>
              <Carousel
                // ref={(c) => { this._carousel = c; }}
                autoplay={false}
                // onSnapToItem={(index) => setitemindex(index)}
                data={EventAdds}
                removeClippedSubviews={false}
                // [{"Id":1,"Image":"a869e9f014ce43eab54e9543b63a3f52.png","Name":"first Event","Day":"2021-02-12","Hour":"22:07","Country":"Iran","City":"Tehran"}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      // onPress={() => checkLogin(item.Id)}
                      onPress={() =>
                        Linking.openURL(item.Link).catch((err) =>
                          console.error('An error occurred', err),
                        )
                      }
                      style={Styles.mainscrcarview2}>
                      <MyImage
                        style={Styles.imgcarmainscr}
                        source={{
                          uri: BASE_URL_IMG + item?.Galleries[0]?.ImageName,
                        }}
                        resizeMode={'contain'}
                      />
                      {/* <Image
                        resizeMode={'contain'}
                        style={Styles.imgcarmainscr}
                        source={{ uri: BASE_URL_IMG + item.Image }}
                      /> */}
                      <View style={Styles.reeventscar}>
                        <Text style={Styles.txtreevents}>{item.Name}</Text>
                        {/* <View style={Styles.reeventscardate}> */}
                        {/* <Text style={Styles.txtcarnum}>{item.Day}</Text> */}
                        {/* <Text style={Styles.txtcarmainloc}></Text> */}
                        {/* </View> */}
                      </View>
                      {/* <View style={Styles.bottcarevents}>
                        <View style={Styles.reeventbott}>
                          <View style={Styles.imgbottcarview}>
                            <Image
                              style={Styles.imgbottcarevents}
                              resizeMode={'contain'}
                              source={require('../../assets/img/location.png')}></Image>
                          </View>
                          <Text style={Styles.txtcareventdate}>
                            {item.Country}, {item.City}
                          </Text>
                        </View>
                        <View style={Styles.reeventbott}>
                          <View style={Styles.imgbottcarview}>
                            <Image
                              style={Styles.imgbottcareventssec}
                              resizeMode={'contain'}
                              source={require('../../assets/img/date.png')}></Image>
                          </View>
                          <Text style={Styles.txtcareventdate}>{item.Hour}</Text>
                        </View>
                      </View> */}
                    </TouchableOpacity>
                  );
                }}
                sliderWidth={width}
                keyExtractor={(item, index) => `${index}`}
                itemWidth={width * 0.8}
              />
            </View>
            <View style={{ height: height * 0.05 }} />
          </ScrollView>
        </View>
        {/* </View> */}
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
    // </SafeAreaView>
  );
};

// export default Mainscreen;

const mapStateToProps = (state) => {
  return {
    Notifications: state.Customer.Notifications,
    Token: state.Customer.Token,
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
    chengitemdata: (itemdata) => {
      const action = {
        type: 'CHANGE_C_itemdata',
        itemdata,
      };
      dispatch(action);
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Mainscreen)
