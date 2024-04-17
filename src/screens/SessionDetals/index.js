import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react';
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
import { Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../component/Header/index';
import { request, requestGET, BASE_URL_IMG } from '../../component/services';
import Styles from './Stayles';
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const SessionDetals = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  // const [Mycountry, setMycountry] = useState('');
  const [speakersState, setSpeakersState] = useState([
    {
      "Id": 2258,
      "SessionId": 1362,
      "SessionDetailsId": 1243,
      "UserName": "Gabriel Amir",
      "UserImage": "ee3029ed4a194cf1b667ca4625676a32.jpg",
      "Image": "eventsession2222.jpg",
      "Title": null,
      "File": null,
      "Description": "gfdgdfgdfg",
      "StartTime": null,
      "ExpireTime": null,
      "Bio": "gfdgdfgdfg",
      "IsMark": false,
      "LocationUser": "USA",
      "PossisionUser": "Speakers",
      "Modirate": true
    },
  ]);
  const [moderatorsState, setModeratorsState] = useState([
    {
      "Id": 2258,
      "SessionId": 1362,
      "SessionDetailsId": 1243,
      "UserName": "Gabriel Amir",
      "UserImage": "ee3029ed4a194cf1b667ca4625676a32.jpg",
      "Image": "eventsession2222.jpg",
      "Title": null,
      "File": null,
      "Description": "gfdgdfgdfg",
      "StartTime": null,
      "ExpireTime": null,
      "Bio": "gfdgdfgdfg",
      "IsMark": false,
      "LocationUser": "USA",
      "PossisionUser": "Speakers",
      "Modirate": true
    },
  ]);
  const [IsMarkState,setIsMarkState] = useState(props.route.params.session.IsMark);
  useEffect(() => {
    filterSpeakers();
    console.log(props.route.params,'logSesston');
  }, []);
  const filterSpeakers = () => {
    const speakers = props.route.params.session.Speakers;

    if (speakers.length > 0) {
      const speakersFilterd = speakers.filter(speaker => {
        return speaker.Modirate === false;
      })
      console.log(speakersFilterd);

      const moderators = speakers.filter(speaker => {
        return speaker.Modirate === true;
      })
      setSpeakersState(speakersFilterd)
      setModeratorsState(moderators);
    }
  }

  const BookMark = async () => {
    let Token = await AsyncStorage.getItem('Token');
    // console.log(JSON.stringify(Token))
    console.log(props.route.params.session.SessionId);
    if (Token !== null && Token !== undefined && Token !== '') {
      console.log(JSON.stringify({ Email: Token }))
      request(
        'POST',
        'BookMarkSeesion',
        { SessionId: props.route.params.session.SessionId, Email: Token },
        () => { },
        () => { },
        (response) => {
          // console.log(JSON.stringify(response))
          if (response.Result == 'Success') {
            // setProgramsSessionsDetails(response.Answer)
            // Alert.alert('Add to your Bookmarks');
            if (response.Answer == 'Success') {
            setIsMarkState(!IsMarkState)

              // Alert.alert('Add to your Bookmarks');
            } else {
              Alert.alert('Failed');
            }
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    } else {
      // props.navigation.navigate('Qrcode', {
      //     PageNum: 0
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
            onPress: () => {
              // props.navigation.navigate('Qrcode', { PageNum: 0 })
            },
          },
        ],
        { cancelable: false },
      );
    }
  };
  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={require('../../assets/img/backtouch.png')}
        style={Styles.backtouchimg}>
        <TouchableOpacity style={Styles.touchoricomm}>
          <Text style={Styles.touchtxt}>ramin</Text>
          {/* <Text style={Styles.dateintouch}>
            Tuesday - 03 Apr - 13:30 PM - UEA dubai
          </Text> */}
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  const RenderModerator = () => {
    return (
      <>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          height: height * 0.09
        }}>
          {moderatorsState.map(i => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Speakers',
                  {
                    data: i
                  })
              }}
              key={i.Id} style={{ margin: 5, width: '45%', height: '85%', flexDirection: 'row' }}>
              <View style={{ width: '30%', height: '88%', justifyContent: 'center' }}>
                <Image
                  resizeMode={'cover'}
                  style={{ width: '80%', height: '70%', borderRadius: width * 0.1, }}
                  source={{ uri: BASE_URL_IMG + i.UserImage }}></Image>
              </View>
              <View style={{ width: '70%', padding: 5, justifyContent: 'flex-start' }}>
                <View style={{ width: '100%' }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }} >{i.UserName}</Text>
                </View>
                <View>
                  <Text> {i.LocationUser} </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </>
    )
  }
  const RenderSpeaker = () => {
    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {speakersState.map(i => (
          <TouchableOpacity key={i.Id} style={{
            width: '100%',
            height: height * 0.2,
            flexDirection: 'row',
            backgroundColor: '#EFEFEF',
            borderBottomColor: '#BDBDBD',
            borderBottomWidth: 4,
            padding: 10
          }}
            onPress={() => {
              // console.log(i.Id);

              props.navigation.navigate('Speakers',
                {
                  data: i
                })
            }}>
            <View style={{ flexDirection: 'column', width: '96%' }}>
              <View>
                <Text>{i.StartTime} - {i.ExpireTime}</Text>
              </View>
              <View style={{}}>
                <Text style={{ fontWeight: 'bold' }}>{i.Title}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 0 }}>
                <View style={{ width: '15%', height: '60%', justifyContent: 'flex-end' }}>
                  <Image
                    resizeMode={'cover'}
                    style={{ width: '80%', height: '85%', borderRadius: 100, alignSelf: 'center' }}
                    source={{ uri: BASE_URL_IMG + i.UserImage }}></Image>
                </View>
                <View style={{ paddingLeft: '2%', paddingTop: 0, width: '90%', justifyContent: 'flex-start' }}>
                  <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }} >{i.UserName}</Text>
                  </View>
                  <View>
                    <Text> {i.LocationUser} </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Icon
                name={'chevron-right'}
                type={'FontAwesome'}
                style={Styles.iconStyle}
              />
            </View>


          </TouchableOpacity>
        ))}
      </View>

    )
  }
  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          { height: HEADER_MIN_HEIGHT, opacity: headerOpacity },
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
        style={{}}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}>
        <View style={{ flexDirection: 'column', height: height, backgroundColor: '#EFEFEF' }}>
          <View style={{ minHeight: '20%', }}>
            <View style={{ marginTop: '20%', backgroundColor: '#fff', width: '96%', alignSelf: 'center', borderLeftWidth: 5, borderLeftColor: '#000', borderRadius: 5 }}>
              {/* icon date row */}
              <View style={{ padding: 8, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {props.route.params.session.FormatDate}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => BookMark()}
                  >
                    <Icon
                        name={IsMarkState ? 'bookmark' : 'bookmark-o'}
                        type={'FontAwesome'}
                        style={[Styles.iconStyle, { paddingRight: 25 }]}
                      />
                   

                  </TouchableOpacity>

                  <Icon
                    name={'calendar-plus-o'}
                    type={'FontAwesome'}
                    style={Styles.iconStyle}
                  />
                </View>
              </View>
              <View style={{ marginTop: 0, marginLeft: 7 }}>
                <Text style={{ fontSize: 14 }}>
                  {props.route.params.session.Start} - {props.route.params.session.Expire}
                </Text>
              </View>
              <View style={{ marginTop: 5, marginLeft: 7 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {props.route.params.session.Name}
                </Text>
              </View>
              <View style={{ marginTop: 5, marginLeft: 7 }}>
                <Text style={{ fontSize: 14 }}>
                  {props.route.params.session.Description}
                </Text>
              </View>
              <View style={Styles.lineGery} />

              <View style={{ padding: 7, alignItems: 'center', flexDirection: 'row' }}>
                <Icon
                  name={'map-marker-alt'}
                  type={'FontAwesome5'}
                  style={{ fontSize: 20, color: 'grey', width: '8%', padding: 1 }}
                />
                <Text style={{ fontSize: 14 }}>
                  {props.route.params.session.Hall}
                </Text>
              </View>
            </View>

          </View>
          {/* information */}
          <View style={{ width: '100%', height: '7%', borderBottomWidth: 3, borderBottomColor: '#E0E0E0', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
            <View style={{ width: '35%', borderBottomColor: '#433EAB', borderBottomWidth: 5, position: 'absolute' }}>
              <Text style={{ padding: 15, fontSize: 18, color: '#433EAB', fontWeight: 'bold' }}>Information</Text>
            </View>
          </View>
          {/* moderator */}
          {moderatorsState.length > 0 &&
            <View style={{ width: '100%', height: '7%', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
              <View style={{}}>
                <Text style={{ padding: 10, fontSize: 18, color: '#000', fontWeight: 'bold' }}>Moderator</Text>
              </View>
            </View>
          }
          {moderatorsState.length > 0 &&

            <RenderModerator />

          }
          {speakersState.length > 0 &&
            <View style={{}}>
              <View style={{
                height: height * 0.03, width: width,
                backgroundColor: '#BDBDBD',
                paddingLeft: 8,
                paddingVertical: 1,
              }}>
                <Text style={{
                  fontSize: 14,
                  color: '#000',
                  fontWeight: 'normal'
                }}>Speakers</Text>
              </View>
            </View>

          }
          {/* بخاطر اینکه متغییره سایز صفحه باید ارتفاع اسپیکرز هم متغییر باشه با فرمول زیر */}
          {speakersState.length > 0 &&
            <View style={{}}>
              <ScrollView style={{

                maxHeight: moderatorsState.length > 0 ? (height / 1.9) - (moderatorsState.length / 2 * ((height * 18) / 100)) : (height * 51) / 100,
              }}>
                <RenderSpeaker />
                <View style={{ height: height / 11 }}></View>
              </ScrollView>
            </View>
          }

        </View>
      </ScrollView>
    </View>
  );
};

export default SessionDetals;
