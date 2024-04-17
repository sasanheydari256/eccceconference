import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Styles from './Stayles';
const { width, height } = Dimensions.get('screen');
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { request, requestGET, BASE_URL_IMG } from '../../component/services';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../ContactList/styles';
import { Icon } from 'native-base';
import RNRestart from 'react-native-restart';

const NewMenue = (props) => {
  const [ShortName, setShortName] = useState('')
  // console.log(props);

  const [IMG, setIMG] = useState(null);
  useEffect(() => {

    // props.start?.();
    Notifications();
    checkLoginusers();
    getProfileImage();
    // GetMembers(props.route.params.Id)
  }, [props.Token,props.ShortName]);

  const checkLoginusers = async () => {

    const Token = await AsyncStorage.getItem('Token');
    
    let ShortName1 = await AsyncStorage.getItem('ShortName');
    // console.log(ShortName1);
    // setShortName(ShortName1);
    if (Token !== null && Token !== undefined && Token !== '') {
      props.chengToken(Token);
      // alert('Please2')
    } else {
      // alert('Please')
      props.chengToken('');
    }
  };

  const getProfileImage = async () => {
    const Token = await AsyncStorage.getItem('Token');
    request(
      'POST',
      'GetProfileImage',
      {
        Email: Token,
      },
      () => { },
      () => { },
      (response) => {
        // alert(JSON.stringify(response));
        // console.log(`${BASE_URL_IMG}menu/${response.Answer}`);
        if (response.Result == 'Success') {
          setIMG(`${BASE_URL_IMG}${response.Answer}`);
        }
      },
      (err) => {
        // console.log(JSON.stringify(err));
      },
    );
  };

  const Notifications = () => {
    // console.log(JSON.stringify(props))
    requestGET(
      'Notifications',
      () => { },
      () => { },
      (response) => {
        // alert(JSON.stringify(response));
        // if (response.Result == 'Success') {
        // setDatas(response.Answer)
        props.chengNotifications(response.Answer);
        // }
      },
      (err) => {
        // console.log(JSON.stringify(err));
      },
    );
  };

  const Checklogin2 = async () => {
    props.navigation.navigate('Notifications');
  };

  const Checklogin = async () => {
    props.navigation.navigate('Profile');
    // alert('Please2')
  };

  const Exhabitors = async () => {
    props.navigation.navigate('Exhabitors', {
      Id: 1,
    });
  };

  const confGaid = async () => {
    const Datas = await AsyncStorage.getItem('EventDatas');

    props.navigation.navigate('Information', { Datas: JSON.parse(Datas) });
  };

  const Committee = async () => {
    let ID = await AsyncStorage.getItem('eventId');
    props.navigation.navigate('Commitee', { Id: ID });
    // alert('Please2')
  };

  const welcomemessage = async () => {
    props.navigation.navigate('Welcome');
  };

  const logout = async () => {
    const rem = [
      'Token',
      'Type',
      'eventId',
      'Splash',
      'SplshText',
      'SplashAdsLink',
      'SplashAds',
      'ShortName',
    ];
    await AsyncStorage.multiRemove(rem);

    props.chengToken('');
    props.navigation.navigate('Splash');
    RNRestart.Restart();
  };

  return (
    <View style={Styles.mainview}>
      <View style={Styles.mainLeftview}>
        <View style={Styles.verticalview}>
          <Text style={Styles.verticaltxt}>{props.ShortName}</Text>
          {/* <View style={Styles.verticalline} /> */}
        </View>
        <View style={{ marginBottom: 10 }}>
          {/* <TouchableOpacity style={Styles.Touchicons}>
            <Icon
              name={'question'}
              type={'SimpleLineIcons'}
              style={Styles.iconbottomques}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={Styles.Touchicons}
            onPress={() => {
              props.setPosi(!props.posi);
              props.navigation.navigate('Notifications');
            }}>
            <Icon
              name={'notifications-outline'}
              type={'Ionicons'}
              style={Styles.iconbottomques}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={Styles.Touchicons}>
            <Icon
              name={'edit'}
              type={'MaterialIcons'}
              style={Styles.iconbottomques}
            />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.Touchicons}>
            <Icon
              name={'cycle'}
              type={'Entypo'}
              style={Styles.iconbottomques}
            />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.Touchicons}>
            <Icon
              name={'logout'}
              type={'MaterialCommunityIcons'}
              style={Styles.iconbottomques}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <SafeAreaView>
        <View style={Styles.mainRightview}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {props.switchas && (
              <View>
                <View style={Styles.topmenueview}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        // props.setPosi(!props.posi);
                        // Checklogin();
                      }}
                      style={Styles.touchimg}
                    // onPress={() => {
                    //   props.clickmenu();
                    //   props.navigation.navigate('Qrcode');
                    // }}
                    >
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        resizeMode={'cover'}
                        source={
                          IMG !== null
                            ? require('../../assets/img/Profile-2.png')
                            : { uri: IMG }
                        }
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={Styles.tablogintouch}>
                    <Text style={Styles.tablogintxt}>Tap To Login</Text>
                  </TouchableOpacity> */}
                  </View>
                  <View style={Styles.nameprofileview}>
                    <Text style={Styles.nameprofile}>welcome</Text>
                    <TouchableOpacity
                      onPress={() => {
                        // props.setPosi(!props.posi);
                        // props.navigation.navigate('Profile');
                      }}>
                      <Text style={Styles.viewprofile}>View Profile</Text>
                    </TouchableOpacity>
                    {/* <Text style={Styles.logintime}>Check In: 12:34</Text>
                    <Text style={Styles.logintime}>Ckeck Out: 12:34</Text> */}
                  </View>
                </View>
                <View style={Styles.topprofileview}>
                  <TouchableOpacity
                    onPress={() => {
                      props.setPosi(!props.posi);
                      props.navigation.navigate('MyAgendaBookmark');
                    }}
                    style={Styles.toptouchicon}>
                    {/* <Image
                      source={require('../../assets/img/instagram.png')}
                      style={Styles.imgicons}
                    /> */}
                    <View style={Styles.backgroandToptouchicon}>
                      <Icon
                        name={'layers-triple'}
                        type={'MaterialCommunityIcons'}
                        style={Styles.listItemsIcon}
                      />
                    </View>

                    <Text style={Styles.topicontxt}>My Agenda</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      props.setPosi(!props.posi);
                      props.navigation.navigate('BookMarks');
                    }}
                    style={Styles.toptouchicon}>
                    {/* <Image
                      source={require('../../assets/img/instagram.png')}
                      style={Styles.imgicons}
                    /> */}
                    <View style={Styles.backgroandToptouchicon}>

                      <Icon
                        name={'bookmark-multiple-outline'}
                        type={'MaterialCommunityIcons'}
                        style={Styles.listItemsIcon}
                      />
                    </View>
                    <Text style={Styles.topicontxt}>Bookmarks</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      props.setPosi(!props.posi);
                      props.navigation.navigate('Notifications');
                    }}
                    style={Styles.toptouchicon}>
                    {/* <Image
                      source={require('../../assets/img/instagram.png')}
                      style={Styles.imgicons}
                    /> */}
                    <View style={Styles.backgroandToptouchicon}>

                      <Icon
                        name={'notifications-none'}
                        type={'MaterialIcons'}
                        style={Styles.listItemsIcon}
                      />
                    </View>
                    <Text style={Styles.topicontxt}>Notifications</Text>
                  </TouchableOpacity>
                  {props.Token != '' && (
                    <TouchableOpacity
                      onPress={() => {
                        props.setPosi(!props.posi);
                        logout();
                      }}
                      style={Styles.toptouchicon}>
                      {/* <View style={Styles.iconmenu}> */}
                      {/* <Image
                        style={Styles.imgicons}
                        // resizeMode={'contain'}
                        source={require('../../assets/img/F2.png')}
                      /> */}
                      <View style={Styles.backgroandToptouchicon}>

                        <Icon
                          name={'logout'}
                          type={'MaterialCommunityIcons'}
                          style={Styles.listItemsIcon}
                        />
                      </View>
                      {/* </View> */}
                      <Text style={Styles.topicontxt}>Logout</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            <View style={Styles.switchasview}>
              {/* {props.switchas && (
                <TouchableOpacity
                  onPress={() => {
                    props.setPosi(!props.posi);
                    props.navigation.replace('Mainscreen');
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Swich.png')}
                    />
                  </View>
                  <Text style={{marginHorizontal: 15}}>Switch Event</Text>
                </TouchableOpacity>
              )} */}
              {props.InEvent && (
                <Text style={{ marginTop: 25, marginBottom: 10, fontSize: 16 }}>
                  My Conference
                </Text>
              )}
              {props.InEvent && props.Pages[0]?.Status && (
                <TouchableOpacity
                  onPress={async () => {
                    // alert('hh')
                    const Token = await AsyncStorage.getItem('Token');
                    // console.log(JSON.stringify({ EmailFrom: Token, EmailTo }))
                    if (Token !== null && Token !== undefined && Token !== '') {
                      try {
                        const ID = JSON.parse(
                          await AsyncStorage.getItem('eventId'),
                        );
                        const Name = JSON.parse(
                          await AsyncStorage.getItem('EventName'),
                        );
                        const Description = JSON.parse(
                          await AsyncStorage.getItem('EventDescription'),
                        );
                        const Gallery = JSON.parse(
                          await AsyncStorage.getItem('EventGallery'),
                        );
                        const Types = await AsyncStorage.getItem('Type');
                        if (Types == 'Physical') {
                          alert(
                            'You are registered as physical, you can not see the live session',
                          );
                        } else {
                          props.navigation.navigate('LiveSelection', {
                            infoName: Name,
                            infoDesc: Description,
                            Id: ID,
                            ImageGallery: Gallery,
                          });
                          props.setPosi(!props.posi);
                        }
                      } catch (e) {
                        // error reading value
                      }
                    } else {
                      props.setPosi(!props.posi);
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
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/LiverStream.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[0].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {props.InEvent && (
                <TouchableOpacity
                  onPress={async () => {
                    let ID = await AsyncStorage.getItem('eventId');
                    props.navigation.navigate('MainChats', {
                      Id: ID,
                    });
                    props.setPosi(!props.posi);
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/chat.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>Chat</Text>
                </TouchableOpacity>
              )}
              {props.InEvent && props.Pages[1]?.Status && (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const ID = JSON.parse(
                        await AsyncStorage.getItem('eventId'),
                      );
                      const Name = JSON.parse(
                        await AsyncStorage.getItem('EventName'),
                      );
                      const Description = JSON.parse(
                        await AsyncStorage.getItem('EventDescription'),
                      );
                      const Gallery = JSON.parse(
                        await AsyncStorage.getItem('EventGallery'),
                      );

                      props.navigation.navigate('SponsorList', {
                        infoName: Name,
                        infoDesc: Description,
                        Id: ID,
                        ImageGallery: Gallery,
                      });
                      props.setPosi(!props.posi);
                    } catch (e) {
                      // error reading value
                    }
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Exhbitor.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[1].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {/* {
            props.InEvent &&
            <TouchableOpacity
              onPress={async () => {
                let ID = await AsyncStorage.getItem('eventId')
                props.navigation.navigate('EPoster')
                props.setPosi(!props.posi)
              }}

              style={Styles.menuview}>
              <View style={Styles.iconmenu}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={'contain'}
                  source={require('../../assets/img/library.png')}></Image>
              </View>
              <Text style={{ marginHorizontal: 15 }}>Virtual Abstracts</Text>
            </TouchableOpacity>
          } */}
              {props.InEvent && props.Pages[2]?.Status && (
                <TouchableOpacity
                  onPress={() => {
                    props.setPosi(!props.posi);
                    Checklogin2();
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/ActivityFeed.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[2].Name}
                  </Text>
                </TouchableOpacity>
              )}

              {props.InEvent && (
                <Text style={{ marginTop: 25, marginBottom: 10, fontSize: 16 }}>
                  Conference
                </Text>
              )}
              {props.InEvent && props.Pages[3]?.Status && (
                <TouchableOpacity
                  onPress={() => {
                    props.setPosi(!props.posi);
                    welcomemessage();
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/W-M.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[3].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {props.switchas &&
                !props.Pages[3]?.Status &&
                props.Pages[23]?.Status && (
                  <TouchableOpacity
                    onPress={async () => {
                      let ID = await AsyncStorage.getItem('eventId');
                      let Name = await AsyncStorage.getItem('EventName');
                      props.navigation.navigate('ShowPdf', {
                        PdfUrl: BASE_URL_IMG + props.Pages[23].File,
                      });
                      props.setPosi(!props.posi);
                    }}
                    style={Styles.menuview}>
                    <View style={Styles.iconmenu}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        resizeMode={'contain'}
                        source={require('../../assets/img/W-M.png')}
                      />
                    </View>
                    <Text style={{ marginHorizontal: 15 }}>
                      {props.Pages[23].Name}
                    </Text>
                  </TouchableOpacity>
                )}
              {props.InEvent && props.Pages[4]?.Status && (
                <TouchableOpacity
                  onPress={() => {
                    props.setPosi(!props.posi);
                    confGaid();
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/W-M.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[4].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {props.InEvent && props.Pages[5]?.Status && (
                <TouchableOpacity
                  onPress={() => {
                    props.setPosi(!props.posi);
                    Committee();
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Committee.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[5].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {/* <Text>{JSON.stringify(props.switchas)}</Text> */}
              {props.switchas && props.Pages[6]?.Status && (
                <TouchableOpacity
                  onPress={async () => {
                    let ID = await AsyncStorage.getItem('eventId');
                    let Name = await AsyncStorage.getItem('EventName');
                    props.navigation.navigate('FaculityList', {
                      EventName: Name,
                      Id: ID,
                    });
                    props.setPosi(!props.posi);
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Faculity.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[6].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {props.switchas &&
                !props.Pages[6]?.Status &&
                props.Pages[20]?.Status && (
                  <TouchableOpacity
                    onPress={async () => {
                      let ID = await AsyncStorage.getItem('eventId');
                      let Name = await AsyncStorage.getItem('EventName');
                      props.navigation.navigate('ShowPdf', {
                        PdfUrl: BASE_URL_IMG + props.Pages[20].File,
                      });
                      props.setPosi(!props.posi);
                    }}
                    style={Styles.menuview}>
                    <View style={Styles.iconmenu}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        resizeMode={'contain'}
                        source={require('../../assets/img/Faculity.png')}
                      />
                    </View>
                    <Text style={{ marginHorizontal: 15 }}>
                      {props.Pages[20].Name}
                    </Text>
                  </TouchableOpacity>
                )}

              {props.switchas && props.Pages[7]?.Status && (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const ID = JSON.parse(
                        await AsyncStorage.getItem('eventId'),
                      );
                      const Name = JSON.parse(
                        await AsyncStorage.getItem('EventName'),
                      );
                      const Description = JSON.parse(
                        await AsyncStorage.getItem('EventDescription'),
                      );
                      const Gallery = JSON.parse(
                        await AsyncStorage.getItem('EventGallery'),
                      );

                      props.navigation.navigate('EventsTime', {
                        infoName: Name,
                        infoDesc: Description,
                        Id: ID,
                        ImageGallery: Gallery,
                      });
                      props.setPosi(!props.posi);
                    } catch (e) {
                      // error reading value
                    }
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Program.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[7].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {props.switchas &&
                !props.Pages[7]?.Status &&
                props.Pages[21]?.Status && (
                  <TouchableOpacity
                    onPress={async () => {
                      let ID = await AsyncStorage.getItem('eventId');
                      let Name = await AsyncStorage.getItem('EventName');
                      props.navigation.navigate('ShowPdf', {
                        PdfUrl: BASE_URL_IMG + props.Pages[21].File,
                      });
                      props.setPosi(!props.posi);
                    }}
                    style={Styles.menuview}>
                    <View style={Styles.iconmenu}>
                      <Image
                        style={{ width: '100%', height: '100%' }}
                        resizeMode={'contain'}
                        source={require('../../assets/img/Program.png')}
                      />
                    </View>
                    <Text style={{ marginHorizontal: 15 }}>
                      {props.Pages[21].Name}
                    </Text>
                  </TouchableOpacity>
                )}
              {props.switchas && props.Pages[8]?.Status && (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const ID = JSON.parse(
                        await AsyncStorage.getItem('eventId'),
                      );
                      const Name = JSON.parse(
                        await AsyncStorage.getItem('EventName'),
                      );
                      const Description = JSON.parse(
                        await AsyncStorage.getItem('EventDescription'),
                      );
                      const Gallery = JSON.parse(
                        await AsyncStorage.getItem('EventGallery'),
                      );

                      props.navigation.navigate('WorkshopList', {
                        infoName: Name,
                        infoDesc: Description,
                        Id: ID,
                        ImageGallery: Gallery,
                      });
                      props.setPosi(!props.posi);
                    } catch (e) {
                      // error reading value
                    }
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Workshop.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[8].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {/* {
            props.switchas && <TouchableOpacity
              onPress={async () => {
                try {
                  const ID = JSON.parse(await AsyncStorage.getItem('eventId'))
                  const Name = JSON.parse(await AsyncStorage.getItem('EventName'))
                  const Description = JSON.parse(await AsyncStorage.getItem('EventDescription'))
                  const Gallery = JSON.parse(await AsyncStorage.getItem('EventGallery'))

                  props.navigation.navigate('Courses', {
                    infoName: Name,
                    infoDesc: Description,
                    Id: ID,
                    ImageGallery: Gallery
                  })
                  props.setPosi(!props.posi)
                } catch (e) {
                  // error reading value
                }
              }
              }
              style={Styles.menuview}>
              <View style={Styles.iconmenu}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={'contain'}
                  source={require('../../assets/img/Course.png')}></Image>
              </View>
              <Text style={{ marginHorizontal: 15 }}>Course</Text>
            </TouchableOpacity>
          } */}
              {/* {
            props.switchas && <TouchableOpacity
              onPress={async () => {
                try {
                  const ID = JSON.parse(await AsyncStorage.getItem('eventId'))
                  const Name = JSON.parse(await AsyncStorage.getItem('EventName'))
                  const Description = JSON.parse(await AsyncStorage.getItem('EventDescription'))
                  const Gallery = JSON.parse(await AsyncStorage.getItem('EventGallery'))

                  props.navigation.navigate('Maps', {
                    infoName: Name,
                    infoDesc: Description,
                    Id: ID,
                    ImageGallery: Gallery
                  })
                  props.setPosi(!props.posi)
                } catch (e) {
                  // error reading value
                }
              }
              }
              style={Styles.menuview}>
              <View style={Styles.iconmenu}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  resizeMode={'contain'}
                  source={require('../../assets/img/Map.png')}></Image>
              </View>
              <Text style={{ marginHorizontal: 15 }}>Maps</Text>
            </TouchableOpacity>
          } */}

              {props.switchas && props.Pages[9]?.Status && (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const ID = JSON.parse(
                        await AsyncStorage.getItem('eventId'),
                      );
                      const Name = JSON.parse(
                        await AsyncStorage.getItem('EventName'),
                      );
                      const Description = JSON.parse(
                        await AsyncStorage.getItem('EventDescription'),
                      );
                      const Gallery = JSON.parse(
                        await AsyncStorage.getItem('EventGallery'),
                      );

                      props.navigation.navigate('SponsorList', {
                        infoName: Name,
                        infoDesc: Description,
                        Id: ID,
                        ImageGallery: Gallery,
                      });
                      props.setPosi(!props.posi);
                    } catch (e) {
                      // error reading value
                    }
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Sponsor.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[9].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {props.switchas && props.Pages[10]?.Status && (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const ID = JSON.parse(
                        await AsyncStorage.getItem('eventId'),
                      );
                      const Name = JSON.parse(
                        await AsyncStorage.getItem('EventName'),
                      );
                      const Description = JSON.parse(
                        await AsyncStorage.getItem('EventDescription'),
                      );
                      const Gallery = JSON.parse(
                        await AsyncStorage.getItem('EventGallery'),
                      );

                      props.navigation.navigate('MyPic', {
                        infoName: Name,
                        infoDesc: Description,
                        Id: ID,
                        ImageGallery: Gallery,
                      });
                      props.setPosi(!props.posi);
                    } catch (e) {
                      // error reading value
                    }
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/MyPicture.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[10].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {props.switchas && props.Pages[11]?.Status && (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const ID = JSON.parse(
                        await AsyncStorage.getItem('eventId'),
                      );
                      const Name = JSON.parse(
                        await AsyncStorage.getItem('EventName'),
                      );
                      const Description = JSON.parse(
                        await AsyncStorage.getItem('EventDescription'),
                      );
                      const Gallery = JSON.parse(
                        await AsyncStorage.getItem('EventGallery'),
                      );

                      props.navigation.navigate('ContactUs', {
                        infoName: Name,
                        infoDesc: Description,
                        Id: ID,
                        ImageGallery: Gallery,
                      });
                      props.setPosi(!props.posi);
                    } catch (e) {
                      // error reading value
                    }
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Contactus.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[11].Name}
                  </Text>
                </TouchableOpacity>
              )}
              {props.InEvent && props.Pages[12]?.Status && (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      props.navigation.navigate('Terms', {});
                      props.setPosi(!props.posi);
                    } catch (e) {
                      // error reading value
                    }
                  }}
                  style={Styles.menuview}>
                  <View style={Styles.iconmenu}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Contactus.png')}
                    />
                  </View>
                  <Text style={{ marginHorizontal: 15 }}>
                    {props.Pages[12].Name}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                alignItems: 'center',
                paddingTop: 50,
                justifyContent: 'center',
              }}>
              <Text style={{ marginHorizontal: 15, textAlign: 'center' }}>
                Powered by @CybercityServices
              </Text>
            </View>
            <View style={{ height: 50 }} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
    ShortName: state.Customer.ShortName,
    Notifications: state.Customer.Notifications,
    InEvent: state.Customer.InEvent,
    switchas: state.Customer.switchas,
    Pages: state.Customer.Pages,
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
    chengswitchas: (switchas) => {
      const action = {
        type: 'CHANGE_C_switchas',
        switchas,
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
export default connect(mapStateToProps, mapDispatchToProps)(NewMenue);
