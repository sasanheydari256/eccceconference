import React, {useState, useEffect} from 'react';
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
  Linking,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
// import {copilot} from 'react-native-copilot';
import AsyncStorage from  '@react-native-async-storage/async-storage'
// import LOGOSVG from "../../assets/live.svg"
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import {TextInput} from 'react-native-gesture-handler';
import {Icon, Spinner} from 'native-base';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  convertMonth,
  convertDay,
  MyImage,
} from '../../component/services';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const SocialNetwork = (props) => {
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

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    EventSocialMedia();
  }, []);

  const EventSocialMedia = () => {
    request(
      'POST',
      'EventSocialMedia',
      {
        EventId: props.route.params.Id,
      },
      () => {},
      () => {},
      (e) => {
        // alert(JSON.stringify(e))
        // setModalVisible(false)
        if (e.Result == 'Success') {
          setworkshops2(e.Answer);
        }
        setModalVisible(false);
        // console.log(JSON.stringify(e))
      },
      (e) => {
        setModalVisible(false);
        // console.log(e)
      },
    );
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          // alert('hh')
          Linking.canOpenURL(item?.Link).then((supported) => {
            if (supported) {
              Linking.openURL(item?.Link);
            } else {
              console.log("Don't know how to open URI: " + item?.Link);
            }
          });
        }}
        style={{
          // width: '33%',
          // backgroundColor: 'red',
          paddingHorizontal: 5,
        }}>
        <TouchableOpacity
          onPress={async () => {
            Linking.canOpenURL(item?.Link).then((supported) => {
              if (supported) {
                Linking.openURL(item?.Link);
              } else {
                console.log("Don't know how to open URI: " + item?.Link);
              }
            });
          }}
          style={Styles.flatGrowB}>
          <Image
            resizeMode={'cover'}
            style={{width: 80, borderRadius: 40, height: 80}}
            source={{uri: BASE_URL_IMG + item?.Image}}></Image>
        </TouchableOpacity>
        <Text style={Styles.txtgbuis}>{item.Name}</Text>
      </TouchableOpacity>

      // <TouchableOpacity
      //     // onPress={() => props.navigation.navigate('DetailQuiz', {
      //     //     QDatas: item.qustions,
      //     //     QuizId: item.QuizId
      //     // })}
      //     onPress={() => {
      // Linking.canOpenURL(item?.Link).then(supported => {
      //     if (supported) {
      //         Linking.openURL(item?.Link);
      //     } else {
      //         console.log("Don't know how to open URI: " + item?.Link);
      //     }
      // });
      //     }}
      //     key={index} style={Styles.touchoricomm}>
      //     <View style={Styles.timeview}>
      //         {/* <Text style={Styles.touchtxt}>1</Text> */}
      // <Image
      //     resizeMode={'cover'}
      //     style={{ width: 80, borderRadius: 5, height: 80, }}
      //     source={{ uri: BASE_URL_IMG + item?.Image }}></Image>
      //         {/* <Text style={Styles.touchtxt}>2</Text> */}
      //     </View>
      //     <View style={Styles.programtxt}>
      //         <Text style={Styles.txtprodes}>
      //             {item.Name}
      //         </Text>
      //     </View>
      // </TouchableOpacity>
    );
  };
  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          {height: HEADER_MIN_HEIGHT, opacity: headerOpacity},
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
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        <View>
          <View style={Styles.headermainscr}>
            <Carousel
              autoplay={true}
              loop={true}
              autoplayInterval={5000}
              data={WallPworkshops}
              renderItem={({item, index}) => {
                return (
                  <View key={index} style={Styles.headermainscr}>
                    <MyImage
                      style={Styles.imgbackheader}
                      source={{
                        uri: BASE_URL_IMG + item.ImageName,
                      }}
                      resizeMode={'cover'}
                    />
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 0.5}}
                      colors={['#3f62a4', 'transparent']}
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
              itemWidth={width}></Carousel>
          </View>
        </View>
        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>SocialMedia</Text>
        </View>
        {/* <View style={Styles.descview}> */}
        <View
          style={{
            marginTop: 10,
            // justifyContent: 'center',
            // width: '100%',
            // backgroundColor: 'red',
            alignItems: 'center',

            justifyContent: 'center',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            overflow: 'hidden',

            // backgroundColor: 'green',
          }}>
          <View
            style={{
              width: '90%',
              // flexDirection: 'row',
              // alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: '#FFFF',
            }}>
            {workshops2.map((item, index) => renderItem(item, index))}
          </View>
        </View>
        {/* </View> */}
        <View style={{height: height * 0.05}} />
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
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
  SocialNetwork
);
