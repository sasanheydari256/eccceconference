import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { Icon } from 'native-base';
import Styles from './Styles';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
const Header = (props) => {
  const [posi, setPosi] = useState(false);
  const VerticAnim = useRef(new Animated.Value(height - 50)).current;
  const horizonAnim = useRef(new Animated.Value(0)).current;
  const clickmenu = () => {
    Animated.timing(horizonAnim, {
      toValue: !posi ? -(width * 0.65) : 0,
      duration: 1000,
    }).start(() => { });
    Animated.timing(VerticAnim, {
      toValue: !posi ? height * 0.8 : height - 50,
      duration: 1000,
    }).start(() => {
      setPosi(!posi);
    });
  };

  return (
    <View
      style={[
        Styles.header,
        {
          // backgroundColor: 'red',
          position: props.displaytopheader == 1 ? 'relative' : 'absolute',
          // backgroundColor: props.backcolor == 1 ? '' : '#666E83',
          zIndex: 500,
        },
      ]}>
      {/* <Text style={{ position: 'absolute', color: 'yellow', left: 0, top: 20, zIndex: 1000 }}>{props.PageName && props.PageName}</Text> */}
      <View
        style={[
          Styles.topmenu,
          {
            // marginBottom: props.commiteep == 1 ? 50 : 50,
            display: props.arrowinmenue == 1 ? 'none' : 'flex',
          },
        ]}>
        <TouchableOpacity
          {...props}
          setPosi={clickmenu}
          posi={posi}
          onPress={() => props.menuonpress && props.menuonpress()}>
          <Icon name={'menu'} type={'Entypo'} style={Styles.menuIcon}></Icon>
        </TouchableOpacity>
        <View>
          {props.iconright == 10 ? (
            <View style={Styles.iconrightheader}>
              <View style={Styles.viewheadericon}>
                <ImageBackground
                  source={require('../../assets/img/Back.png')}
                  style={{
                    height: height * 0.04,
                    width: width * 0.085,
                    // padding: 5,
                    justifyContent: 'center',
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.homepress && props.homepress()}>
                    <Image
                      style={{
                        height: '60%',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 5,
                      }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/BackHome.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View style={Styles.viewheadericon}>
                <ImageBackground
                  source={require('../../assets/img/Back.png')}
                  style={{
                    height: height * 0.04,
                    width: width * 0.085,
                    // padding: 5,
                    justifyContent: 'center',
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.inform && props.inform()}>
                    <Image
                      style={{
                        height: '60%',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 5,
                      }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/inform.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  resizeMode={'contain'}
                  style={{
                    height: height * 0.02,
                    width: width * 0.08,
                    borderRadius: 7,
                  }}
                  source={{ uri: 'https://admin.plusregistration.com/Images/icons/arrowR.png' }}
                ></Image>
              </TouchableOpacity>
            </View>
          ) : props.iconright == 9 ? (
            <View style={Styles.iconrightheader}>
              <View style={Styles.viewheadericon}>
                <ImageBackground
                  source={require('../../assets/img/Back.png')}
                  style={{
                    height: height * 0.04,
                    width: width * 0.085,
                    // padding: 5,
                    justifyContent: 'center',
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.notif && props.notif()}>
                    <Image
                      style={{
                        height: '60%',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 5,
                      }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Notification.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              </View>

              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  resizeMode={'contain'}
                  style={{
                    height: height * 0.02,
                    width: width * 0.08,
                    borderRadius: 7,
                  }}
                  source={{ uri: 'https://admin.plusregistration.com/Images/icons/arrowR.png' }}></Image>
              </TouchableOpacity>
            </View>
          ) : props.iconright == 8 ? (
            <View style={Styles.iconrightheader}>
              <View style={Styles.viewheadericon}>
                <ImageBackground
                  source={require('../../assets/img/Back.png')}
                  style={{
                    height: height * 0.04,
                    width: width * 0.085,
                    // padding: 5,
                    justifyContent: 'center',
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.notif && props.notif()}>
                    <Image
                      resizeMode={'contain'}
                      style={Styles.imglogineve}
                      source={require('../../assets/img/Profile-2.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              </View>

              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  resizeMode={'contain'}
                  style={{
                    height: height * 0.02,
                    width: width * 0.08,
                    borderRadius: 7,
                  }}
                  source={{ uri: 'https://admin.plusregistration.com/Images/icons/arrowR.png' }}></Image>
              </TouchableOpacity>
            </View>
          ) : props.iconright == 7 ? (
            <View style={Styles.iconrightheader}>
              <View style={Styles.viewheadericon}>
                <ImageBackground
                  source={require('../../assets/img/Back.png')}
                  style={{
                    height: height * 0.04,
                    width: width * 0.085,
                    // padding: 5,
                    justifyContent: 'center',
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.notif && props.notif()}>
                    <Image
                      style={{
                        height: '60%',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 5,
                      }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Notification.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              {/* <View style={Styles.viewheadericon}>
                <ImageBackground
                  source={require('../../assets/img/Back.png')}
                  style={{
                    height: height * 0.04,
                    width: width * 0.085,
                    // padding: 5,
                    justifyContent: 'center',
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.inform && props.inform()}>
                    <Image
                      style={{
                        height: '60%',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 5,
                      }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/inform.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              </View> */}
            </View>
          ) : props.iconright == 6 ? (
            <View style={Styles.iconrightheader}>
              <View style={Styles.viewheadericon}>
                <ImageBackground
                  source={require('../../assets/img/Back.png')}
                  style={{
                    height: height * 0.04,
                    width: width * 0.085,
                    // padding: 5,
                    justifyContent: 'center',
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.notif && props.notif()}>
                    <Image
                      style={{
                        height: '60%',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 5,
                      }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Notification.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  resizeMode={'contain'}
                  style={{
                    height: height * 0.02,
                    width: width * 0.08,
                    borderRadius: 7,
                  }}
                  source={require('../../assets/img/arrowR.png')}></Image>
              </TouchableOpacity>
            </View>
          ) : props.iconright == 5 ? (
            <View style={Styles.iconrightheader}>
              <View style={Styles.viewheadericon}>
                <ImageBackground
                  source={require('../../assets/img/Back.png')}
                  style={{
                    height: height * 0.04,
                    width: width * 0.085,
                    // padding: 5,
                    justifyContent: 'center',
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.homepress && props.homepress()}>
                    <Image
                      style={{
                        height: '60%',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 5,
                      }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/BackHome.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  resizeMode={'contain'}
                  style={{
                    height: height * 0.02,
                    width: width * 0.08,
                    borderRadius: 7,
                  }}
                  source={{ uri: 'https://admin.plusregistration.com/Images/icons/arrowR.png' }}></Image>
              </TouchableOpacity>
            </View>
          ) : props.iconright == 2 ? (
            props.login ? (
              <Text />
            ) : (
              <TouchableOpacity
                onPress={() =>
                  props.navigation &&
                  props.navigation.navigate('Qrcode', {
                    PageNum: 0,
                  })
                }>
                <Image
                  resizeMode={'contain'}
                  style={Styles.imglogineve}
                  source={require('../../assets/img/Profile-2.png')}></Image>
              </TouchableOpacity>
            )
          ) : props.iconright == 3 ? (
            <View style={Styles.iconrightheader}>
              <View style={Styles.viewheadericon}>
                {props.iconhome == 1 ? (
                  <ImageBackground
                    source={require('../../assets/img/Back.png')}
                    style={{
                      height: height * 0.04,
                      width: width * 0.085,
                      // padding: 5,
                      justifyContent: 'center',
                      borderRadius: 7,
                      overflow: 'hidden',
                    }}>
                    <TouchableOpacity
                      onPress={() => props.homepress && props.homepress()}>
                      <Image
                        style={{
                          height: '60%',
                          width: '90%',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}
                        resizeMode={'contain'}
                        source={require('../../assets/img/BackHome.png')}></Image>
                    </TouchableOpacity>
                  </ImageBackground>
                ) : (
                  <TouchableOpacity
                    onPress={() => props.infopress && props.infopress()}>
                    <Image
                      style={{
                        height: height * 0.05,
                        width: width * 0.085,
                        borderRadius: 7,
                      }}
                      source={require('../../assets/img/Notif.png')}></Image>
                  </TouchableOpacity>
                )}
              </View>
              {/* <View style={Styles.viewheadericon}> */}
              {!props.arrowright && (
                <ImageBackground
                  source={require('../../assets/img/Back.png')}
                  style={{
                    height: height * 0.04,
                    width: width * 0.085,
                    // padding: 5,
                    justifyContent: 'center',
                    borderRadius: 7,
                    overflow: 'hidden',
                  }}>
                  <TouchableOpacity
                    onPress={() => props.notif && props.notif()}>
                    <Image
                      style={{
                        height: '60%',
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 5,
                      }}
                      resizeMode={'contain'}
                      source={require('../../assets/img/Notification.png')}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              )}
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  resizeMode={'contain'}
                  style={{
                    height: height * 0.02,
                    width: width * 0.08,
                    borderRadius: 7,
                  }}

                  source={{ uri: 'https://admin.plusregistration.com/Images/icons/arrowR.png' }}></Image>
              </TouchableOpacity>
              {/* </View> */}
            </View>
          ) : (
            <View>
              <Image></Image>
            </View>
          )}
        </View>
      </View>

      {props.mainscreen == 1 ? (
        <View style={{ paddingHorizontal: 10 }}>
          {/* <View style={Styles.txtview}>
            <Text style={Styles.toptextheader}>Find Amazing Events</Text>
            <Text style={Styles.secondtextheader}>123 Events arouund you</Text>
          </View>
          <View style={Styles.viewtxtinp}>
            <View style={Styles.txtinpheader}>
              <TextInput
                style={Styles.txtinp}
                placeholderTextColor={'#bbbdc5'}
                placeholder={'Find Events'}></TextInput>
              <TouchableOpacity style={Styles.txtinptouch}>
                <Icon
                  name={'search1'}
                  type={'AntDesign'}
                  style={Styles.menutxtinpIcon}></Icon>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={Styles.touchfilter}>
              <Image
                resizeMode={'contain'}
                style={Styles.filterpng}
                source={require('../../assets/img/filter.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={Styles.viewtxtinptoast}>
            <Text numberOfLines={2} style={Styles.txtinptoast}>
              you have 05 events in this week
            </Text>
            <TouchableOpacity style={Styles.txtinptouchtoast}>
              <Text style={Styles.txtdatetoast}>03 Apr 2021</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      ) : (
        <View></View>
      )}
      {props.arrowin && (
        <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              resizeMode={'contain'}
              style={{
                height: '20%',
                width: '20%',
                borderRadius: 7,
              }}
              source={{ uri: 'https://admin.plusregistration.com/Images/icons/arrowR.png' }}></Image>
            <View style={{ height: 100, width: 100, backgroundColor: 'red' }}>

            </View>
          </TouchableOpacity>
        </View>
      )}
      {/* <View style={{ height: 50 }}></View> */}
      {props.children}
    </View>
  );
};

export default Header;
