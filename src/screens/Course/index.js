import { View, Icon } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Animated,
  Dimensions,
  TextInput,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Styles from './Stayles';
import Header from '../../component/Header/index';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../component/ContactList/styles';
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Course = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const DATA = [
    {
      id: '1',
      title: 'All',
    },
    {
      id: '2',
      title: 'Medical',
    },
    {
      id: '3',
      title: 'Stem Cells',
    },
    {
      id: '4',
      title: 'Stem Cells',
    },
    {
      id: '5',
      title: 'Stem Cells',
    },
    {
      id: '5',
      title: 'Stem Cells',
    },
    {
      id: '5',
      title: 'Stem Cells',
    },
  ];

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
      <Header navigation={props.navigation}
        iconhome={1}
        iconright={3}
        backcolor={1}
        infopress={() => props.navigation.navigate('Information')}
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}>
        <View style={Styles.headermainscr}>
          <ImageBackground
            resizeMode={'contain'}
            style={Styles.imgbackheader}
            source={require('../../assets/img/imgbackmainscr.png')}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
              colors={['#3f62a4', 'transparent']}
              // style={Styles.linearGradient}
              style={{ height: '100%', width: '100%' }}></LinearGradient>
          </ImageBackground>
        </View>
        <View style={Styles.viewtxtinp}>
          <View
            style={{
              flexDirection: 'row-reverse',
              width: '80%',
              backgroundColor: '#FFFF',
              borderRadius: 15,
              paddingHorizontal: 20,
              alignItems: 'center',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1.5,
                  },
                  shadowOpacity: 0.35,
                  shadowRadius: 0.35,
                },
                android: {
                  elevation: 3,
                },
              }),
            }}>
            <TextInput
              placeholder={'Find Course'}
              placeholderTextColor={'#bbbdc6'}
              style={Styles.txtplace}></TextInput>
            <Icon
              name={'search1'}
              type={'AntDesign'}
              style={Styles.iconsearch}></Icon>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#2F9FD5',
              marginLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              paddingHorizontal: 15,
            }}>
            <Image
              resizeMode={'contain'}
              style={{ width: width * 0.05, height: height * 0.05 }}
              source={require('../../assets/img/filter.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ marginTop: 30 }}>
              <View style={Styles.mainscrcarview}>
                <Image
                  resizeMode={'cover'}
                  style={Styles.imgcarmainscr}
                  source={require('../../assets/img/exhibitors.png')}
                />
                <View style={Styles.addeventstitle}>
                  <View style={Styles.addeventsdate}>
                    <Text style={Styles.txtcarmainloc}>18 hours</Text>
                  </View>
                </View>
                <View style={Styles.bottcarevents}>
                  <Text style={Styles.txttitle}>Medical Skill Training</Text>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 15 }}>
              <View style={Styles.mainscrcarview}>
                <Image
                  resizeMode={'cover'}
                  style={Styles.imgcarmainscr}
                  source={require('../../assets/img/exhibitors.png')}
                />
                <View style={Styles.addeventstitle}>
                  <View style={Styles.addeventsdate}>
                    <Text style={Styles.txtcarmainloc}>18 hours</Text>
                  </View>
                </View>
                <View style={Styles.bottcarevents}>
                  <Text style={Styles.txttitle}>Medical Skill Training</Text>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 15 }}>
              <View style={Styles.mainscrcarview}>
                <Image
                  resizeMode={'cover'}
                  style={Styles.imgcarmainscr}
                  source={require('../../assets/img/exhibitors.png')}
                />
                <View style={Styles.addeventstitle}>
                  <View style={Styles.addeventsdate}>
                    <Text style={Styles.txtcarmainloc}>18 hours</Text>
                  </View>
                </View>
                <View style={Styles.bottcarevents}>
                  <Text style={Styles.txttitle}>Medical Skill Training</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ marginTop: 30 }}>
              <View style={Styles.secondview}>
                <Image
                  resizeMode={'cover'}
                  style={Styles.imgcarmainscr}
                  source={require('../../assets/img/exhibitors.png')}
                />
                <View style={Styles.addeventstitle}>
                  <View style={Styles.addeventsdate}>
                    <Text style={Styles.txtcarmainloc}>18 hours</Text>
                  </View>
                </View>
                <View style={Styles.bottcarevents}>
                  <Text style={Styles.txttitle}>Medical Skill Training</Text>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 15 }}>
              <View style={Styles.secondview}>
                <Image
                  resizeMode={'cover'}
                  style={Styles.imgcarmainscr}
                  source={require('../../assets/img/exhibitors.png')}
                />
                <View style={Styles.addeventstitle}>
                  <View style={Styles.addeventsdate}>
                    <Text style={Styles.txtcarmainloc}>18 hours</Text>
                  </View>
                </View>
                <View style={Styles.bottcarevents}>
                  <Text style={Styles.txttitle}>Medical Skill Training</Text>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 15 }}>
              <View style={Styles.secondview}>
                <Image
                  resizeMode={'cover'}
                  style={Styles.imgcarmainscr}
                  source={require('../../assets/img/exhibitors.png')}
                />
                <View style={Styles.addeventstitle}>
                  <View style={Styles.addeventsdate}>
                    <Text style={Styles.txtcarmainloc}>18 hours</Text>
                  </View>
                </View>
                <View style={Styles.bottcarevents}>
                  <Text style={Styles.txttitle}>Medical Skill Training</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Course;
