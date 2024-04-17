import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  Animated,
  TextInput,
} from 'react-native';
// import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import Carousel from 'react-native-snap-carousel';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import {connect} from 'react-redux';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import {Icon} from 'native-base';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  OrganizationId,
} from '../../component/services';
import PrevListChange from '../../component/PrevListChange';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const ListEvents = (props) => {
  const [DATA, setDATA] = useState([{Id: 0, Name: 'All'}]);
  const [DATA2, setDATA2] = useState([]);
  const [facuil2, setfacuil2] = useState([]);
  const [dat, setdat] = useState([]);
  const [hour, sethour] = useState([]);
  const [yearr, setyearr] = useState([]);
  const [SearchResault, seSearchResault] = useState([]);
  const [CategoryId, setCategoryId] = useState(0);
  const [Count, setCount] = useState(300);
  const [Word, setWord] = useState('');
  const [issearsh, setissearsh] = useState(false);
  const [indexProgramType, setIndexProgramType] = useState(0);
  const [Page, setPage] = useState(1);
  const [end, setend] = useState(false);
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const _handleLoadMore = () => {
    if (!end) {
      GetEvent(CategoryId);
    }
  };
  // const WalkthroughableView = walkthroughable(View);
  useEffect(() => {
    // props.start?.();
    // alert(JSON.stringify(props.route.params.tarikh));
    GetEvent(CategoryId);
    GetCategory();
  }, []);
  const GetCategory = () => {
    requestGET(
      'GetCategory',
      () => {},
      () => {},
      (response) => {
        // console.log(response);
        if (response.Result == 'Success') {
          setDATA(DATA.concat(response.Answer));
        }
      },
      () => {},
    );
  };
  const checkDats = (dat) => {
    let newdat = '';
    let dateArr = dat.split('-');
    if (dateArr[0] != '2021' && dateArr[0] != '2023') {
      newdat = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
      // alert(newdat)
      return newdat;
    } else {
      newdat = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
      // alert(newdat)
      return newdat;
    }
  };

  const PastOrPresent = (data) => {
    const newData = [];
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() < 10 && '0') +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    if (props.route.params?.tarikh == 'Upcoming') {
      // alert(JSON.stringify(date.split('-')[0]))
      // alert(JSON.stringify(data[1].Day.split('-')[0]))
      // alert(JSON.stringify(new Date(date).getTime()))
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (
          Math.round(today.getTime() / 100000) * 100000 <=
          new Date(checkDats(element.End)).getTime()
        ) {
          newData.push(element);
        }
      }
      return newData;
    } else if (props.route.params?.tarikh == 'Previous') {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (today.getTime() > new Date(checkDats(element.Day)).getTime()) {
          newData.push(element);
        }
      }

      return newData;
    } else {
      return data;
    }
  };

  const GetEvent = (CategoryId) => {
    request(
      'POST',
      'GetEvent',
      {CategoryId, Count, Page, OrganizationId: OrganizationId},
      () => {},
      () => {},
      (response) => {
        // Alert.alert(JSON.stringify(response, 'eventlistlogin'));
        if (response.Result == 'Success') {
          if (response.Answer.length !== 0) {
            setPage((prevState) => prevState + 1);
            // alert(Page)
            setDATA2(DATA2.concat(PastOrPresent(response.Answer)));
            let facuil = [];
            let datess = [];
            let houres = [];
            let years = [];
            for (let index = 0; index < response.Answer.length; index++) {
              facuil.push(response.Answer[index].Fucilties[index].Image);
              datess.push(response.Answer[index].EventDates[index].Day);
              houres.push(response.Answer[index].EventDates[index].Hour);
              years.push(response.Answer[index].EventDates[index].Year);
              // alert(JSON.stringify(facuil));
              setfacuil2(facuil);
              setdat(datess);
              sethour(houres);
              setyearr(years);
              // console.log(datess);
            }
          } else {
            setend(true);
          }
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };

  const SearchEvent = () => {
    request(
      'POST',
      'SearchEvent',
      {Word},
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response));
        if (response.Result == 'Success') {
          seSearchResault(response.Answer);
          // setPage(1)
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
        onPress={() => {
          setIndexProgramType(index);
          setCategoryId(item.Id);
          GetEvent(item.Id);
        }}
        style={[
          Styles.touchflatmain,
          {backgroundColor: indexProgramType == index ? '#26cff6' : '#FFFF'},
        ]}>
        <Text
          style={[
            Styles.flathorizmscr,
            {color: indexProgramType == index ? '#FFFF' : '#000000'},
          ]}>
          {item.Name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItemsec = ({item}) => {
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
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
            source={require('../../assets/img/mainflatone.png')}></Image>
        </View>
      </View>
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
    // alert(JSON.stringify(item));
    const Token = await AsyncStorage.getItem('Token');
    const eventId = await AsyncStorage.getItem('eventId');

    if (Token) {
      if (eventId == Id) {
        props.navigation.navigate('MainScreenEvent', {
          Id,
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
          {cancelable: false},
        );
      }
    } else {
      if (Splash) {
        await AsyncStorage.setItem('Splash', Splash);
      } else {
        await AsyncStorage.removeItem('Splash');
      }
      if (SplshText) {
        await AsyncStorage.setItem('SplshText', SplshText);
      } else {
        await AsyncStorage.removeItem('SplshText');
      }
      if (SplashAds) {
        await AsyncStorage.setItem('SplashAds', SplashAds);
      } else {
        await AsyncStorage.removeItem('SplashAds');
      }
      if (SplashAdsLink) {
        await AsyncStorage.setItem('SplashAdsLink ', SplashAdsLink);
      } else {
        await AsyncStorage.removeItem('SplashAdsLink');
      }
      props.navigation.navigate('LoginNew', {
        PageNum: 0,
        eventId: Id,
        Image: Image,
        itemdata,
      });
      // Alert.alert(
      //   'New event',
      //   'Login or register to this event',
      //   [
      //     {
      //       text: 'Register',
      //       onPress: () =>
      //         props.navigation.navigate('RegisterEvent', {
      //           PageNum: 0,
      //           eventId: Id,
      //           Image: Image,
      //         }),
      //     },
      //     {
      //       text: 'Log In',
      //       onPress: () =>
      //         // props.navigation.navigate('Qrcode', {
      //         //   PageNum: 0,
      //         //   eventId: Id,
      //         //   Image: Image,
      //         // }),
      //         props.navigation.navigate('LoginNew', {
      //           PageNum: 0,
      //           eventId: Id,
      //           Image: Image,
      //         }),
      //     },
      //   ],
      //   {cancelable: false},
      // );
    }
  };

  return (
    // <SafeAreaView style={Styles.mainscrview}>
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          {height: HEADER_MIN_HEIGHT, opacity: headerOpacity},
        ]}
      />
      <Header
        navigation={props.navigation}
        homepress={() => props.navigation.navigate('Mainscreen')}
        notif={() => props.navigation.navigate('Notifications')}
        iconright={5}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <ScrollView
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        <View style={Styles.headermainscr}>
          <View style={{paddingHorizontal: 10}}>
            <View style={Styles.txtview}>
              <Text style={Styles.toptextheader}>ECCC Conference</Text>
              <Text style={Styles.secondtextheader}>
                Middle East North Africa Conference Company LLC
              </Text>
            </View>
            <View style={Styles.viewtxtinp}>
              <View style={Styles.txtinpheader}>
                <TextInput
                  onSubmitEditing={() => SearchEvent()}
                  onChangeText={(e) => {
                    if (e == '') {
                      setissearsh(false);
                    } else {
                      seSearchResault([]);
                      setissearsh(true);
                    }
                    setWord(e);
                  }}
                  style={Styles.txtinp}
                  placeholderTextColor={'#bbbdc5'}
                  placeholder={'Find Events'}
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
          </View>
        </View>
        {/* <View style={Styles.headermainscr}></View> */}

        {/* <View style={Styles.bodymainscr}> */}
        <View>
          <ScrollView>
            <View style={Styles.gapview} />
            {/* <View style={{ flexDirection: 'row' }}>

              <FlatList
                style={{
                  marginLeft: 10,
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={DATA}
                renderItem={renderItem}
              // keyExtractor={(item, index) => `${index}`}
              ></FlatList>
            </View> */}
            {/* <View style={Styles.textmainscrsec}>

            </View> */}
            <View style={{marginVertical: 10}}>
              {/* <FlatList
                // data={data}
                // renderItem={({item})=><Comment data={item}/>}
                keyExtractor={(_, index) => `${index}`}
                contentContainerStyle={{ paddingBottom: hp("10%") }}
                ListEmptyComponent={<Image source={require("./../../assets/images/noCM.jpg")} style={styles.noCMImg} resizeMode="contain" />}
                onRefresh={() => this._getList(active)}
                refreshing={loading}
                style={{ flex: 1 }}
              /> */}

              {/* <FlatList
                initialNumToRender={5}
                keyExtractor={(item, index) => `${index}`}
                style={{
                  marginLeft: 10,
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
             
                data={!issearsh ? DATA2 : SearchResault}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
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
                      style={Styles.mainscrcarview}>
                      <Image
                        resizeMode={'contain'}
                        style={Styles.imgcarmainscr}
                        source={{uri: BASE_URL_IMG + item.Image}}
                      />
                      <View style={Styles.reeventscar}>
                        <Text style={Styles.txtreevents}>{item.Name}</Text>
                        <View style={Styles.reeventscardate}>
                          <Text style={Styles.txtcarnum}>{item.Day}</Text>
                        </View>
                      </View>
                      <View style={Styles.bottcarevents}>
                        <View style={Styles.reeventbott}>
                          <View style={Styles.imgbottcarview}>
                            <Image
                              style={Styles.imgbottcarevents}
                              resizeMode={'contain'}
                              source={require('../../assets/img/location.png')}
                            />
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
                              source={require('../../assets/img/date.png')}
                            />
                          </View>
                          <Text style={Styles.txtcareventdate}>
                            {item.Hour}
                          </Text>
                        </View>
                      </View>
                      <View style={Styles.bottomfacuilview}>
                        <View style={Styles.facuilimgview}>
                          {facuil2.map((item, index) => (
                            <Image
                              style={Styles.facuilityimg}
                              source={{
                                uri: BASE_URL_IMG + item,
                              }}
                            />
                          ))}
                        </View>
                        <View style={Styles.facuilimgview}>
                          <Text> {dat[index]}</Text>
                          <Text> {hour[index]}</Text>
                          <Text> {yearr[index]}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              /> */}
              {DATA2.length > 0 && (
                <PrevListChange
                  checkLogin={checkLogin}
                  DATA2={!issearsh ? DATA2 : SearchResault}
                />
              )}
            </View>
            <View style={{height: height * 0.05}} />
          </ScrollView>
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

// export default Mainscreen;

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
  ListEvents
);
