import React, { useState, useEffect } from 'react';
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
  TextInput,
} from 'react-native';
import { Icon } from 'native-base';
import Compon from './component'
import Header from '../../component/Header/index';
import { connect } from 'react-redux';
import Styles from './Stayles';
import { request, requestGET, BASE_URL_IMG } from '../../component/services';
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
// const headerOpacity = scrollY.interpolate({
//   inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
//   outputRange: [0, 0, 1],
//   extrapolate: 'clamp',
//   useNativeDriver: true,
// });
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Notifications = (props) => {
  const [Datas, setDatas] = useState(props.Notifications)
  const [Requests, setRequests] = useState([])
  const [ListChatNotif, setListChatNotif] = useState([])
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  useEffect(() => {
    Compon.ListRequestsChat({ navigation: props.navigation, Page: 1, Count: 500, callback: (e) => setRequests(e) })
  }, [])
  const renderItem = (props) => {
    return (
      <View style={[Styles.touchflatmain, { marginTop: 5, overflow: 'hidden' }]}>
        <View style={{
          marginRight: 10,
          // height: '100%',
          justifyContent: 'center', alignItems: 'center', width: '20%', overflow: 'hidden', backgroundColor: '#6561fc'
        }}>
          <Image
            resizeMode={'contain'}
            style={{ width: '40%', height: height / 10 }}
            source={require('../../assets/img/Notification.png')}></Image>
        </View>
        <View
          style={{
            width: '72%',
            flexDirection: 'column',
          }}>
          <Text
            style={Styles.titlename}
          >
            {props.types == true ? props.item.Title : props.item.UserName}
          </Text>
          <Text style={Styles.titlename2}>{props.types == true ? props.item.Text : 'Has Requested To Chat'}</Text>
          {
            props.types == false && <View style={Styles.QuestV}>
              <TouchableOpacity
                onPress={() => Compon.AcceptRequestToUser({
                  RequestEmail: props.item.Email, navigation: props.navigation,
                  callback: () => Compon.ListRequestsChat({ navigation: props.navigation, Page: 1, Count: 500, callback: (e) => setRequests(e) })
                })}
                style={Styles.AceptT}
              ><Text style={{ color: 'white' }}>Accept</Text></TouchableOpacity>
              <TouchableOpacity
                onPress={() => Compon.RejectRequestToUser({
                  RequestEmail: props.item.Email, navigation: props.navigation,
                  callback: () => Compon.ListRequestsChat({ navigation: props.navigation, Page: 1, Count: 500, callback: (e) => setRequests(e) })

                })}
                style={Styles.DenyT}><Text
                  style={{ color: 'white' }}>Deny</Text></TouchableOpacity>
            </View>
          }
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
      <Header navigation={props.navigation}
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        // notif={() => props.navigation.navigate('Notifications')}
        iconright={5}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      <View style={Styles.headermainscr}>
      </View>
      <ScrollView

        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}>
        <View style={{ width, }}>
          {/* <Text>{JSON.stringify()}</Text> */}
          <View style={{ height: 20 }} />
          {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={Datas}
            renderItem={renderItem}></FlatList> */}
          {/* {
            Datas.length > 0 &&
            Datas.map((item, index) => renderItem({ item: item, types: true }))
          }
          {
            Requests.length > 0 &&
            Requests.map((item, index) => renderItem({ item: item, types: false }))
          } */}

        </View>
        {/* <View style={{height: height * 0.3}} /> */}
      </ScrollView>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications)
