import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  Animated,
  ImageBackground,
  Dimensions,
  View,
  Modal,
  TextInput,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {Icon} from 'native-base';
import Header from '../../component/Header/index';
import {connect} from 'react-redux';
import Styles from './Stayles2';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  getEpostEventList,
} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
// const headerOpacity = scrollY.interpolate({
//   inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
//   outputRange: [0, 0, 1],
//   extrapolate: 'clamp',
//   useNativeDriver: true,
// });
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const CPDFreader = (props) => {
  const [loading, setLoading] = useState(false);
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [modalVisible, setModalVisible] = useState(false);

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
        inform={() => setModalVisible(true)}
        // notif={() => props.navigation.navigate('Notifications')}
        iconright={10}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      <View style={Styles.headermainscr}></View>
      {/* <ScrollView

                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } },
                ])}> */}
      <View style={{width, height: height * 0.84}}>
        <View style={{height: 20}} />
        {/* <Text>{props.route.params.PdfUrl}</Text> */}
        <Pdf
          source={{uri: props.route.params.Mydetailes?.FileLink}}
          onLoadComplete={(numberOfPages, filePath) => {
            // console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            // console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            // console.log(error);
          }}
          onPressLink={(uri) => {
            // console.log(`Link presse: ${uri}`)
          }}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // marginTop: 25,
          }}
        />
      </View>
      <View style={{height: 50}} />
      {/* </ScrollView> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={Styles.madalRezvpinfo}>
          <View style={Styles.modalvpinfo} />
          <Icon
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            name={'close'}
            type={'AntDesign'}
            style={Styles.modalipinfo}></Icon>
        </View>
        <View style={Styles.ModalBackBlure} />
        <View onPress={() => setModalVisible(false)} style={Styles.ModalBack}>
          <View style={Styles.ModalWith}>
            <Text
              style={{
                textAlign: 'justify',
              }}>
              {props.route.params.Mydetailes?.Information}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
    Notifications: state.Customer.Notifications,
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
export default connect(mapStateToProps, mapDispatchToProps)(CPDFreader);
