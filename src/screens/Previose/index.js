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
  Picker,
  Animated,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
// import {copilot} from 'react-native-copilot';
// import LOGOSVG from "../../assets/live.svg"
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../component/Header/index';
import Styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import {Icon, Spinner} from 'native-base';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  convertMonth,
  convertDay,
} from '../../component/services';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Previose = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  const [Alldatas, setAlldatas] = useState([]);
  const [Datas, setDatas] = useState({});
  const [Halls, setHalls] = useState([]);
  const [days, setDays] = useState([]);
  const [day, setday] = useState(0);

  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    // props.start?.();
    GetPrograms(props.route.params.Id);
  }, []);

  const GetPrograms = (EventId) => {
    // console.log(JSON.stringify(EventId))
    request(
      'POST',
      'HistoryEventsFiles',
      {EventId},
      () => {},
      () => {},
      (response) => {
        // alert(JSON.stringify(response), 'programha');
        if (response.Result == 'Success' && response.Result != null) {
          setAlldatas(response.Answer);
          if (response.Answer.length > 0) {
            setday(0);
            let az = [];
            for (let i = 0; i < response.Answer.length; i++) {
              const element = response.Answer[i];
              az.push(element.Day);
            }
            setDays(az);
            setHalls(response.Answer[0].ListDetails);
          }
          setModalVisible(false);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };
  const renderDate = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setday(index);
          setHalls(Alldatas[index].ListDetails);
        }}>
        <LinearGradient
          key={index}
          style={Styles.seconddate}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.5}}
          colors={[
            day == index ? '#29ccf7' : '#FFFF',
            day == index ? '#6162f8' : '#FFFF',
          ]}>
          <View style={Styles.seconddate}>
            <Text
              style={[
                Styles.txtdatese,
                {color: day == index ? '#FFFF' : 'black'},
              ]}>
              Day
            </Text>
            <Text
              style={[
                Styles.txtmonthse,
                {color: day == index ? '#FFFF' : 'black'},
              ]}>
              {item}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // (item.HalLink != '' && item.HalLink != null) &&
          props.navigation.navigate('PrevePlayer', {items: item});
        }}
        key={index}
        style={[Styles.touchoricomm, {marginBottom: 20}]}>
        <View style={[Styles.timeview, {backgroundColor: '#b34180'}]}>
          <Image
            resizeMode={'contain'}
            style={Styles.arrowimg}
            source={require('../../assets/img/hall.png')}></Image>
        </View>
        <View style={Styles.programtxt}>
          <Text numberOfLines={1} style={Styles.txttitledes}>
            {item.SessionName}
          </Text>
        </View>

        {/* <View style={Styles.arroeright}>
                    <Image
                        resizeMode={'contain'}
                        style={Styles.arrowimg}
                        source={
                            (item.HalLink != '' && item.HalLink != null) ?
                                require('../../assets/img/live.png') :
                                require('../../assets/img/offline.png')
                        }></Image>
                </View> */}
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
        <View style={Styles.headermainscr}>
          <ImageBackground
            resizeMode={'cover'}
            style={Styles.imgbackheader}
            source={{
              uri: BASE_URL_IMG + props.route.params.ImageGallery[0].ImageName,
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.5}}
              colors={['#3f62a4', 'transparent']}
              // style={Styles.linearGradient}
              style={{height: '100%', width: '100%'}}></LinearGradient>
          </ImageBackground>
        </View>
        <View style={Styles.bookview}>
          <FlatList
            style={{marginLeft: 10}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={days}
            renderItem={renderDate}></FlatList>
        </View>

        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>{props.route.params.infoName}</Text>
        </View>

        <View style={Styles.descview}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={Halls}
            renderItem={renderItem}></FlatList>
        </View>
        <View style={{height: height * 0.05}} />
      </ScrollView>
      {/* </View> */}
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
  Previose
);
