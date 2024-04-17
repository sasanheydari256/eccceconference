import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  Alert,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  MyImage,
} from '../../component/services';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import LinearGradient from 'react-native-linear-gradient';
import Rating from '../../component/Rating';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import AutoHeightWebView from '../../component/services/autoHeightWebview';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const CMEInfo = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [Datas, setDatas] = useState({
    Image: '',
    Text: '',
  });
  const [cemDatas, setCemDatas] = useState('');
  const EventPagesInformation = async (Asw) => {
    const Token = await AsyncStorage.getItem('Token');
    let EventId = await AsyncStorage.getItem('eventId');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'EventPagesInformation',
        {
          EventId,
          Page: props.route.params.Page,
        },
        () => {},
        () => {},
        (response) => {
          // alert(JSON.stringify(response));
          if (response.Result == 'Success') {
            if (response.Answer.length > 0) {
              setDatas(response.Answer[0]);
            }
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    }
    // setPage((prevState) => prevState + 1);
  };

  const EventCmeInformation = async (Asw) => {
    const Token = await AsyncStorage.getItem('Token');
    let EventId = await AsyncStorage.getItem('eventId');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'EventCmeInformation',
        {
          EventId,
        },
        () => {},
        () => {},
        (response) => {
          // alert(JSON.stringify(response));
          if (response.Result == 'Success') {
            if (response.Answer.length > 0) {
              setCemDatas(response.Answer);
            }
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    }
    // setPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    // EventPagesInformation();
    EventCmeInformation();
  }, []);

  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          {height: HEADER_MIN_HEIGHT, opacity: headerOpacity},
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
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        {/* {
         props.route.params.Datas.Gallery.map((item)=>(<Text>{item.ImageName}</Text>))
       } */}
        {/* <View style={Styles.headermainscr}>
          <MyImage
            style={Styles.imgbackheader}
            source={{
              uri: BASE_URL_IMG + Datas?.Image,
            }}
            resizeMode={'cover'}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.5}}
            colors={['#3f62a4', 'transparent']}
            // style={Styles.linearGradient}
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              zIndex: 2,
            }}></LinearGradient>
        </View> */}

        <View style={Styles.descview}>
          <Text style={Styles.biotxt}>Information</Text>
          {/* <Text style={Styles.biodestxt}>{Datas.Text}</Text> */}
          <AutoHeightWebView
            scrollEnabled={false}
            // automaticallyAdjustContentInsets={false}
            source={{
              html:
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                cemDatas,
            }}
            style={{width: '90%', margin: 5, marginTop: 4}}
          />
        </View>
        <View style={{height: height * 0.1}} />
        {/* </ScrollView>
      </View> */}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
    idevents: state.Customer.idevents,
    Notifications: state.Customer.Notifications,
    InEvent: state.Customer.InEvent,
    Pages: state.Customer.Pages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    chengswitchas: (switchas) => {
      const action = {
        type: 'CHANGE_C_switchas',
        switchas,
      };
      dispatch(action);
    },
    chengPages: (Pages) => {
      const action = {
        type: 'CHANGE_C_Pages',
        Pages,
      };
      dispatch(action);
    },
    chengToken: (Token) => {
      const action = {
        type: 'CHANGE_C_Token',
        Token,
      };
      dispatch(action);
    },
    chengInEvent: (InEvent) => {
      const action = {
        type: 'CHANGE_C_InEvent',
        InEvent,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CMEInfo);
