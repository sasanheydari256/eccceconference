import React, { useState, useEffect } from 'react';
import {
  // TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Alert,
  Picker,
  Animated,
  Modal,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
// import {copilot} from 'react-native-copilot';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import LOGOSVG from "../../assets/live.svg"
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import { TextInput } from 'react-native-gesture-handler';
import { Icon, Spinner } from 'native-base';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  convertMonth,
  convertDay,
  MyImage,
} from '../../component/services';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const QuizScreen = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [workshops, setworkshops] = useState([]);
  const [workshops2, setworkshops2] = useState([]);
  const [WallPworkshops, setWallPworkshops] = useState(
    props.route.params.ImageGallery,
  );
  const [Word, setWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFinish, setshowFinish] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    ListQuizEvents();
  }, []);

  const Searches = (e) => {
    var results = [];
    if (e !== '') {
      if (workshops.length > 0) {
        for (var i = 0; i < workshops.length; i++) {
          // for (key in ProgramsSessions[i]) {
          if (workshops[i].Name?.toLowerCase().indexOf(e.toLowerCase()) != -1) {
            results.push(workshops[i]);
          }
          // }
        }
        setworkshops2(results);
      } else {
        setworkshops2([]);
      }
    } else {
      //   if (Datas.Sessions.length > 0) {
      //     getsesion(Datas, indexHall, day, Word)
      //     // setSearchResault(Datas.Sessions)
      //   }
    }
  };
  const GoToDetails = async (item) => {
    const Email = await AsyncStorage.getItem('Token');
    request(
      'POST',
      'ListQuizEvents',
      {
        EventId: props.route.params.Id,
        Email,
        HallName: item?.halname,
      },
      () => { },
      () => { },
      (e) => {
        // alert(JSON.stringify(e));
        // setModalVisible(false)
        if (e.Result == 'Success') {
          // setworkshops(e.Answer)
          props.navigation.navigate('DetailQuiz', {
            QDatas: item.qustions,
            QuizId: item.QuizId,
            FinalText: item.FinalText,
          });
          // GetWorkShopSliderAnyEvent()
        } else if (e.Result == 'Faild') {
          if (e.IsAnswer == true) {
            // setshowFinish(true)
            alert('You have already answered');
            setLoading(false);
          }
        }
        setLoading(false);
        // console.log(JSON.stringify(e))
      },
      (e) => {
        setLoading(false);
        // console.log(e)
      },
    );
  };
  const ListQuizEvents = async () => {
    const Email = await AsyncStorage.getItem('Token');
    // alert(
    //   JSON.stringify({
    //     EventId: props.route.params.Id,
    //     Email,
    //     HallName: null,
    //   }),
    // );
    request(
      'POST',
      'ListQuizEvents',
      {
        EventId: props.route.params.Id,
        Email,
        HallName: null,
      },
      () => { },
      () => { },
      (e) => {
        // alert(JSON.stringify(e));
        // setModalVisible(false)
        if (e.Result == 'Success') {
          // setworkshops(e.Answer)
          let hals = [];
          if (e.Answer.length > 0) {
            for (let i = 0; i < e.Answer.length; i++) {
              const element = e.Answer[i];
              const indexes = hals.findIndex(
                (ss) => ss.halname == element.HallName,
              );
              if (indexes == -1) {
                const a = {
                  qustions: [],
                  halname: element.HallName,
                  Date: element.Date,
                  Informaion: element.Informaion,
                  QuizId: element.QuizId,
                  FinalText: element.FinalText,
                };
                hals.push(a);
              }
            }
            for (let j = 0; j < e.Answer.length; j++) {
              const ele = e.Answer[j];
              const indexesh = hals.findIndex(
                (element) => element.halname == ele.HallName,
              );
              if (indexesh != -1) {
                hals[indexesh].qustions.push(ele);
              }
            }
          }
          // alert(JSON.stringify(hals))
          const indexenull = hals.findIndex(
            (element) => element.halname == null,
          );
          if (indexenull != -1) {
            props.navigation.replace('DetailQuiz', {
              QDatas: hals[indexenull].qustions,
              QuizId: hals[indexenull].QuizId,
              Informaion: hals[indexenull].Informaion,
              FinalText: hals[indexenull].FinalText,
            });
          } else {
            setLoading(false);
            setworkshops2(hals);
            setworkshops(hals);
          }
          // GetWorkShopSliderAnyEvent()
        } else if (e.Result == 'Faild') {
          if (e.IsAnswer == true) {
            setshowFinish(true);
            setLoading(false);
          }
        }
        setLoading(false);
        // console.log(JSON.stringify(e))
      },
      (e) => {
        setLoading(false);
        // console.log(e)
      },
    );
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const EvenOrOdd = (index) => {
    if (index % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => GoToDetails(item)}
        // onPress={() => console.log(JSON.stringify(item))}
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          {/* <Text style={Styles.touchtxt}>{item?.Date}</Text> */}
          {/* <Text style={Styles.touchtxt}>2</Text> */}
        </View>
        <View style={Styles.programtxt}>
          <Text style={Styles.txtprodes}>{item?.halname}</Text>
          {/* <Text style={Styles.txtprodes}>
                {item.Description}
              </Text> */}
          {/* <Text style={Styles.txtproname}>3</Text> */}
        </View>
        <View style={Styles.arroeright}>
          <Image
            style={Styles.arrowimg}
            source={require('../../assets/img/arrow.png')}></Image>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          { height: HEADER_MIN_HEIGHT, opacity: headerOpacity },
        ]}></Animated.View>

      <Header
        navigation={props.navigation}
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        notif={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}>
        <View style={{
          paddingTop: '20%'
        }}>
          <View style={Styles.headermainscr}>
            {/* <ImageBackground
                            resizeMode={'cover'}
                            style={Styles.imgbackheader}
                            source={{ uri: BASE_URL_IMG + props.route.params.ImageGallery[0].ImageName }}
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 0.5 }}
                                colors={['#3f62a4', 'transparent']}
                                // style={Styles.linearGradient}
                                style={{ height: '100%', width: '100%' }}></LinearGradient>
                        </ImageBackground> */}
            <Carousel
              // ref={(c) => { this._carousel = c; }}
              autoplay={true}
              loop={true}
              autoplayInterval={5000}
              // onSnapToItem={(index) => setitemindex(index)}
              data={WallPworkshops}
              renderItem={({ item, index }) => {
                return (
                  <View key={index} style={{height:'100%'}}>
                    <MyImage
                      style={Styles.imgbackheader}
                      source={{
                        uri: BASE_URL_IMG + item.ImageName,
                      }}
                      resizeMode={'stretch'}
                    />
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 0.5 }}
                      colors={['#3f62a4', 'transparent']}
                      // style={Styles.linearGradient}
                      style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        zIndex: 2,
                      }}></LinearGradient>
                  </View>
                );
              }}
              sliderWidth={width}
              // itemHeight={width * .1}
              itemWidth={width}></Carousel>
          </View>
          <View style={Styles.txtinpheader}>
            <TextInput
              onSubmitEditing={() => Searches(Word)}
              onChangeText={(e) => {
                if (e == '') {
                  setworkshops2(workshops);
                } else {
                  Searches(e);
                }
                setWord(e);
              }}
              style={Styles.txtinp}
              placeholderTextColor={'#bbbdc5'}
              placeholder={'Search'}></TextInput>
            <TouchableOpacity style={Styles.txtinptouch}>
              <Icon
                onPress={() => Searches(Word)}
                name={'search1'}
                type={'AntDesign'}
                style={Styles.menutxtinpIcon}></Icon>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={Styles.headermainscr2}> */}
        {/* </View> */}
        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>{props.route.params.infoName}</Text>
        </View>

        <View style={Styles.descview}>
          <View style={{ width: width * 0.9 }}>
            {showFinish ? (
              <Text>You have already answered</Text>
            ) : (
              workshops2.map((item, index) => renderItem(item, index))
            )}
          </View>

          {/* <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={workshops}
                        numColumns={2}
                        renderItem={renderItem}></FlatList> */}
        </View>

        <View style={{ height: height * 0.05 }} />
      </ScrollView>
      {/* </View> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          setLoading(false);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            backgroundColor: 'black',
            opacity: 0.9,
          }}>
          <Spinner color="#FFFF" />
          <Text style={{ color: 'white' }}>Loding ...</Text>
        </View>
      </Modal>
    </View>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);
