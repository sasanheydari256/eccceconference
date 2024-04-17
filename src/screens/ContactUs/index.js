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
import MapView, {Marker} from 'react-native-maps';
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
  GetContactUs,
  convertMonth,
  convertDay,
} from '../../component/services';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const ContactUs = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const [Datas, setDatas] = useState({
    Result: 'Success',
    Lat: 25.2048,
    Long: 55.2708,
    Answer: [
      {Key: 'phoneNumber', Value: '+989306255564'},
      {Key: 'Phone', Value: '+989120783077'},
      {Key: 'Email', Value: 'ecc@gmail.com'},
      {Key: 'fax', Value: '+982188775544'},
    ],
  });
  const [modalVisible, setModalVisible] = useState(true);
  const [Message, setMessage] = useState('');
  const [Email, setEmail] = useState('');

  useEffect(() => {
    GetContactUs({
      loading: (e) => setModalVisible(e),
      callback: (e) => setDatas(e),
    });
  }, []);

  const SendFedback = async () => {
    if (Message != '' && Email != '') {
      let EventId = await AsyncStorage.getItem('eventId');
      request(
        'POST',
        'FeedBack',
        {Email, Message, EventId},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({ Email, Message }))
          // console.log(JSON.stringify(response))
          if (response.Result == 'Success') {
            alert('Your feedback was received, thank you.');
            setEmail('');
            setMessage('');
            setModalVisible(false);
          } else if (response.Result == 'Faild') {
            alert('Please enter a valid Email Address.');
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    }
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
              {!modalVisible && (
                <MapView
                  zoomTapEnabled={true}
                  zoomEnabled={true}
                  // pitchEnabled={false}
                  rotateEnabled={true}
                  // scrollEnabled={false}
                  style={{width: '100%', height: '100%'}}
                  region={{
                    latitude: Datas.Lat,
                    longitude: Datas.Long,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                  }}
                  initialRegion={{
                    latitude: Datas.Lat,
                    longitude: Datas.Long,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: Datas.Lat,
                      longitude: Datas.Long,
                    }}
                    // key={'000'}
                    // onDragEnd={(e) =>
                    //   this._updateMarkedLocation(e.nativeEvent.coordinate)
                    // }
                    pinColor="red"
                  />
                </MapView>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            top: -20,
            zIndex: 10,
            width: '85%',
            backgroundColor: '#FFFF',
            borderRadius: 10,
            alignItems: 'center',
            padding: 10,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{marginVertical: 10}}>Please enter your feedback</Text>
          {/* <View style={{}}> */}
          <TextInput
            placeholder={'your Email'}
            placeholderTextColor={'#94959a'}
            numberOfLines={1}
            // minHeight={(Platform.OS === 'ios' && 3) ? (20 * 3) : null}
            value={Email}
            onChangeText={(e) => {
              setEmail(e);
            }}
            style={Styles.txtinp2}></TextInput>
          {/* </View> */}
          {/* <View style={{}}> */}
          <TextInput
            placeholder={'add your feedback...'}
            placeholderTextColor={'#94959a'}
            numberOfLines={Platform.OS === 'ios' ? null : 3}
            minHeight={Platform.OS === 'ios' && 3 ? 20 * 3 : null}
            value={Message}
            onChangeText={(e) => {
              setMessage(e);
            }}
            style={Styles.txtinp2}></TextInput>
          {/* </View> */}
          <TouchableOpacity
            onPress={() => SendFedback()}
            style={{
              backgroundColor: '#DB2227',
              width: width * 0.75,
              borderRadius: 10,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              paddingVertical: 10,
            }}>
            <Text style={{color: '#FFFF'}}>submit</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 30, minHeight: height * 0.59}}>
          <View style={Styles.txtinpheader}>
            {Datas.Answer.map((item, index) => (
              <View key={index}>
                <Text style={Styles.TextTitles}>
                  {item.Key} : {item.Value}
                </Text>
                {/* <Text style={Styles.TextTxt}>{item.Value}</Text> */}
              </View>
            ))}
          </View>
        </View>

        <View style={{height: height * 0.15}} />
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
 ContactUs
);
