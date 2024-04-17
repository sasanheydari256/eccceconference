import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Animated,
} from 'react-native';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const SpeachSchadule = (props) => {
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
      title: 'Medical',
    },
    {
      id: '4',
      title: 'Medical',
    },
    {
      id: '3',
      title: 'Medical',
    },
    {
      id: '4',
      title: 'Medical',
    },
    {
      id: '3',
      title: 'Medical',
    },
    {
      id: '4',
      title: 'Medical',
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          <Text style={Styles.touchtxt}>10:00 AM</Text>
          <Text style={Styles.touchtxt}>10:05 AM</Text>
        </View>
        <View style={Styles.programtxt}>
          <Text style={Styles.txtprodes}>
            Satisfaction 1.0.1 redefining the ICU patient safety tool box
          </Text>
          <Text style={Styles.txtproname}>Jean Daniel Chiche</Text>
        </View>
      </View>
    );
  };
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
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        notif={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        // iconhome={1}
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
        <View style={Styles.bookview}>
          <View style={{ flexDirection: 'row' }}>
            <View style={Styles.bookcontain}>
              <View style={Styles.writenoteview}>
                <Image
                  style={Styles.imgexhabitnote}
                  resizeMode={'contain'}
                  source={require('../../assets/img/note.png')}></Image>
              </View>
              <Text style={Styles.txtimg}>Write Note</Text>
            </View>
            <View
              style={[
                Styles.bookcontain,
                {
                  borderLeftWidth: 0.5,
                  borderLeftColor: '#e9e9e9',
                  borderRightColor: '#e9e9e9',
                  borderRightWidth: 0.5,
                },
              ]}>
              <View style={[Styles.writenoteview]}>
                <Image
                  style={Styles.imgexhabitnote}
                  resizeMode={'contain'}
                  source={require('../../assets/img/bookmark.png')}></Image>
              </View>
              <Text style={Styles.txtimg}>Add Bookmark</Text>
            </View>
            <View style={Styles.bookcontain}>
              <View style={Styles.writenoteview}>
                <Image
                  style={Styles.imgexhabitnote}
                  resizeMode={'contain'}
                  source={require('../../assets/img/reminder.png')}></Image>
              </View>
              <Text style={Styles.txtimg}>remider</Text>
            </View>
          </View>
        </View>
        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>Chairman Speach</Text>
        </View>

        {/* <View
        style={{
          height: height * 0.6,
          marginTop: 10,
        }}>
        <ScrollView> */}
        <View style={Styles.descview}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={DATA}
            renderItem={renderItem}></FlatList>
        </View>
        <View style={{ height: height * 0.05 }} />
        {/* </ScrollView>
      </View> */}
      </ScrollView>
    </View>
  );
};

export default SpeachSchadule;
