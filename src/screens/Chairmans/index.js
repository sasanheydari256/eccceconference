import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Animated,
} from 'react-native';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import LinearGradient from 'react-native-linear-gradient';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  convertMonth,
  convertDay,
} from '../../component/services';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Chairmans = (props) => {
  // SessionId
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const [datas, setDatas] = useState({
    Image: '',
    StartTime: '',
    ExpireTime: '',
    Members: [
      {
        UserName: '',
        Title: '',
        Start: '',
      },
    ],
  });
  const [ProgramsSessionsDetails, setProgramsSessionsDetails] = useState([]);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  useEffect(() => {
    // props.start?.();
    // GetProgramsSessionsDetails(props.route.params.SessionId)
    // console.log(props.route.params.items)
    getdatas(props.route.params.items.Id);
  }, []);

  const getdatas = (Id) => {
    request(
      'POST',
      'ChairsmanSpeech',
      {Id},
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response), 'Evantspeeech')
        // console.log(JSON.stringify(Id), 'Evantspeeech')
        if (response.Result == 'Success' && response.Result != null) {
          setDatas(response.Answer);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        // onPress={() => props.navigation.navigate('SessionDetals', { items: item })}
        key={index}
        style={Styles.touchoricomm}>
        <View style={Styles.timeview}>
          <Text style={Styles.touchtxt}>{item.Start}</Text>
          <Text style={Styles.touchtxt}>{item.Expire}</Text>
        </View>
        <View style={Styles.programtxt}>
          <Text style={Styles.txtprodes}>{item.Title}</Text>
          {/* <Text style={Styles.txtprodes}>
            {item.Description}
          </Text> */}
          <Text style={Styles.txtproname}>{item.UserName}</Text>
        </View>
        {/* <View style={Styles.arroeright}>
          <Image
            style={Styles.arrowimg}
            source={require('../../assets/img/arrowleft.png')}></Image>
        </View> */}
      </View>
    );
  };
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
        <View style={Styles.headermainscr}>
          <ImageBackground
            resizeMode={'cover'}
            style={Styles.imgbackheader}
            source={{uri: BASE_URL_IMG + datas.Image}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.5}}
              colors={['#3f62a4', 'transparent']}
              // style={Styles.linearGradient}
              style={{height: '100%', width: '100%'}}></LinearGradient>
          </ImageBackground>
        </View>
        {/* <View style={Styles.bookview}>
          <View style={{ flexDirection: 'row' }}>
            <View style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/note.png')}></Image>
              <Text style={Styles.txtimg}>Write Note</Text>
            </View>
            <View
              style={[
                Styles.writenoteview,
                {
                  borderLeftWidth: 0.5,
                  borderLeftColor: '#e9e9e9',
                  borderRightColor: '#e9e9e9',
                  borderRightWidth: 0.5,
                },
              ]}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/bookmark.png')}></Image>
              <Text style={Styles.txtimg}>Add Bookmark</Text>
            </View>
            <View style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/reminder.png')}></Image>
              <Text style={Styles.txtimg}>remider</Text>
            </View>
          </View>
        </View> */}
        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>
            {props.route.params.Title}
            {/* {JSON.stringify(props.route.params.items)} */}
          </Text>
        </View>
        {/* <View style={{height: height * 0.6}}>
        <ScrollView> */}
        <View style={Styles.descview}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={datas.Members}
            renderItem={renderItem}></FlatList>
        </View>
        <View style={{height: height * 0.05}} />
        {/* </ScrollView>
      </View> */}
      </ScrollView>
    </View>
  );
};

export default Chairmans;
