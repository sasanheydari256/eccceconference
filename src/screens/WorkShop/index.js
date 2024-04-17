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
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
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
const WorkShop = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [workshops, setworkshops] = useState([props.route.params?.item]);
  const [workshops2, setworkshops2] = useState([props.route.params?.item]);
  const [worktime, setworktime] = useState([]);
  const [WallPworkshops, setWallPworkshops] = useState([]);
  const [Word, setWord] = useState('');

  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    // alert(JSON.stringify(props.route.params?.item));
    // alert(JSON.stringify(props.route.params?.dataworkshop));
    // GetWorkShopAnyEvent();
    gettimeworkshop();
  }, []);

  const gettimeworkshop = () => {
    let workdatas = [props.route.params?.item];
    for (let index = 0; index < workdatas.length; index++) {
      const element = workdatas[index].WorkShopTime;
      // alert(JSON.stringify(element));

      setworktime(element);
    }
    setModalVisible(false);
  };

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
  const GetWorkShopAnyEvent = () => {
    request(
      'POST',
      'GetWorkShopAnyEvent',
      {
        EventId: props.route.params?.Id,
      },
      () => {},
      () => {},
      (e) => {
        // setModalVisible(false)
        // alert(JSON.stringify(e));
        if (e.Result == 'Success') {
          setworkshops(e.Answer);
          setworkshops2(e.Answer);
          // GetWorkShopSliderAnyEvent();
        }
        // console.log(JSON.stringify(e))
      },
      (e) => {
        setModalVisible(false);
        // console.log(e)
      },
    );
  };

  const GetWorkShopSliderAnyEvent = () => {
    request(
      'POST',
      'GetWorkShopSliderAnyEvent',
      {
        EventId: props.route.params.Id,
      },
      () => {},
      () => {},
      (e) => {
        setModalVisible(false);
        if (e.Result == 'Success') {
          setWallPworkshops(e.Answer);
        }
        // console.log(JSON.stringify(e))
      },
      (e) => {
        setModalVisible(false);
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
        onPress={async () => {
          const Token = await AsyncStorage.getItem('Token');
          // console.log(JSON.stringify({ EmailFrom: Token, EmailTo }))
          if (Token !== null && Token !== undefined && Token !== '') {
            props.navigation.navigate('WSDetaile', {Datas: item});
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
                    props.navigation.navigate('Qrcode', {PageNum: 0}),
                },
              ],
              {cancelable: false},
            );
          }
        }}
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.renderimgview}>
          <Image
            resizeMode={'cover'}
            style={Styles.workshopimg}
            source={{uri: BASE_URL_IMG + item.Image}}
          />
        </View>
        <View style={Styles.rightDesview}>
          <Text style={Styles.Timeing}>{item.Title}</Text>
          <Text style={Styles.fullnametxt}>{item.FullName}</Text>
          <View style={Styles.durationtimeview}>
            <Text style={Styles.starttimetxt}>{item.From}</Text>
            <Text style={Styles.finishtimetxt}>{item.Until}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
            <View style={Styles.headermainscr}>
              <MyImage
                style={Styles.imgbackheader}
                source={{
                  uri: BASE_URL_IMG + props.route.params?.item?.Image,
                }}
                resizeMode={'cover'}
              />
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.5}}
                colors={['#3f62a4', 'transparent']}
                // style={Styles.linearGradient}
                style={Styles.linearimg}></LinearGradient>
            </View>
            {/* <Carousel
              // ref={(c) => { this._carousel = c; }}
              autoplay={true}
              loop={true}
              autoplayInterval={5000}
              // onSnapToItem={(index) => setitemindex(index)}
              data={WallPworkshops}
              renderItem={({item, index}) => {
                return (
                );
              }}
              sliderWidth={width}
              // itemHeight={width * .1}
              itemWidth={width}></Carousel> */}
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
              placeholder={'Find Events'}></TextInput>
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
          <Text style={Styles.namedetail}>
            {props.route.params?.item?.Information}
            {/* {worktime.From} */}
          </Text>
        </View>

        <View style={Styles.descview}>
          <View style={{width: width * 0.9}}>
            {/* {workshops2.map((item, index) => renderItem(item, index))} */}
            {worktime.map((item, index) => renderItem(item, index))}
          </View>

          {/* <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={workshops}
                        numColumns={2}
                        renderItem={renderItem}></FlatList> */}
        </View>

        <View style={{height: height * 0.05}} />
      </ScrollView>
      {/* </View> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   setModalVisible(false);
        // }}
      >
        <View style={Styles.loadingview}>
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
 WorkShop
);
