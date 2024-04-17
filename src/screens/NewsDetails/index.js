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
// import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
// import {copilot} from 'react-native-copilot';
import AsyncStorage from  '@react-native-async-storage/async-storage'
// import LOGOSVG from "../../assets/live.svg"
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../component/Header/index';
import Styles from './Styles';
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
import AutoHeightWebView from '../../component/services/autoHeightWebview';
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
  //   const [workshops, setworkshops] = useState([props.route.params?.item]);
  //   const [workshops2, setworkshops2] = useState([props.route.params?.item]);
  const [worktime, setworktime] = useState([props.route.params?.item]);
  //   const [WallPworkshops, setWallPworkshops] = useState([]);
  //   const [Word, setWord] = useState('');

  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    console.log(JSON.stringify(props.route.params?.item));
  }, []);

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
        <Image
          resizeMode={'cover'}
          style={Styles.workshopimg}
          source={{uri: BASE_URL_IMG + item.Image}}
        />
        <View style={{width: '100%'}}>
          <Text style={Styles.Timeing}>{item.Title}</Text>
          <Text style={Styles.fullnametxt}>{item.FullName}</Text>
          <View style={Styles.durationtimeview}>
            <Text style={Styles.starttimetxt}>{item.DateTime}</Text>
            {/* <Text style={Styles.finishtimetxt}>{item.Until}</Text> */}
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
            <View style={Styles.headermainscr}>
              <MyImage
                style={Styles.imgbackheader}
                source={{
                  uri: BASE_URL_IMG + props.route.params?.item.Image,
                }}
                resizeMode={'stretch'}
              />
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.5}}
                colors={['#3f62a4', 'transparent']}
                // style={Styles.linearGradient}
                style={Styles.linearimg}></LinearGradient>
            </View>
          </View>
          <View style={Styles.txtinpheader}>
            <View style={Styles.timetitleview}>
              <Text style={Styles.txtinptitle}>
                {props.route.params?.item.Title}
              </Text>
              <Text style={Styles.txtinp}>
                {props.route.params?.item.DateTime}
              </Text>
            </View>
            {/* <View style={{backgroundColor: '#FFFF'}}> */}
            <AutoHeightWebView
              scrollEnabled={false}
              // automaticallyAdjustContentInsets={false}
              source={{
                html:
                  '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                  props.route.params?.item.Description,
              }}
              style={{
                width: '95%',
                margin: 5,
                marginTop: 4,
              }}
            />
            {/* </View> */}
          </View>
        </View>

        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>
            {/* {props.route.params?.item.Information} */}
            {/* {worktime.From} */}
          </Text>
        </View>

        <View style={Styles.descview}>
          <View style={{width: width * 0.9}}>
            {/* {worktime.map((item, index) => renderItem(item, index))} */}
          </View>
        </View>

        <View style={{height: height * 0.05}} />
      </ScrollView>

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
  WorkShop,
);
