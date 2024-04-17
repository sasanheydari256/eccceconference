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
import Styles from './Stayles';
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
const Maps = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [Datas, setDatas] = useState([]);
  const [Datas2, setDatas2] = useState([]);
  const [Word, setWord] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    GetMapAnyEvent(props.route.params.Id);
  }, []);

  const Searches = (e) => {
    var results = [];
    if (e !== '') {
      if (Datas.length > 0) {
        for (var i = 0; i < Datas.length; i++) {
          // for (key in ProgramsSessions[i]) {
          if (Datas[i].HallName?.toLowerCase().indexOf(e.toLowerCase()) != -1) {
            results.push(Datas[i]);
          }
          // }
        }
        setDatas2(results);
      } else {
        setDatas2([]);
      }
    } else {
      //   if (Datas.Sessions.length > 0) {
      //     getsesion(Datas, indexHall, day, Word)
      //     // setSearchResault(Datas.Sessions)
      //   }
    }
  };
  const GetMapAnyEvent = (EventId) => {
    // console.log(JSON.stringify(EventId));
    request(
      'POST',
      'GetMapAnyEvent',
      {EventId},
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response), 'Maps');
        if (response.Result == 'Success') {
          setDatas(response.Answer);
          setDatas2(response.Answer);
          setModalVisible(false);
        }
        setModalVisible(false);
      },
      (err) => {
        // console.log(JSON.stringify(err));
        setModalVisible(false);
      },
    );
  };
  const _downloadFile = (item) => {
    props.navigation.navigate('ShowPdf', {PdfUrl: BASE_URL_IMG + item});
    // Linking.openURL(BASE_URL_IMG + item).catch((err) =>
    //  console.error('An error occurred', err));
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => _downloadFile(item.FileName)}
        key={index}
        style={[Styles.touchoricomm, {marginBottom: 20}]}>
        <View style={[Styles.timeview]}>
          <Text style={Styles.txttitle}>{item.HallName}</Text>
        </View>

        <View
          style={[
            Styles.arrowimg,
            {
              zIndex: 4,
              backgroundColor: 'black',
              opacity: 0.7,
            },
          ]}></View>
        <Image
          resizeMode={'cover'}
          style={[Styles.arrowimg, {zIndex: 3}]}
          source={{uri: BASE_URL_IMG + item.Image}}></Image>
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
            <ImageBackground
              resizeMode={'cover'}
              style={Styles.imgbackheader}
              source={{
                uri:
                  BASE_URL_IMG + props.route.params.ImageGallery[0].ImageName,
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.5}}
                colors={['#3f62a4', 'transparent']}
                // style={Styles.linearGradient}
                style={{height: '100%', width: '100%'}}></LinearGradient>
            </ImageBackground>
          </View>
          <View style={Styles.txtinpheader}>
            <TextInput
              onSubmitEditing={() => Searches(Word)}
              onChangeText={(e) => {
                if (e == '') {
                  setDatas2(Datas);
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

        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>{props.route.params.infoName}</Text>
        </View>

        <View style={Styles.descview}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={Datas2}
            renderItem={renderItem}></FlatList>
        </View>
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
  Maps
);
