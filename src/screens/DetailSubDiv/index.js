import AsyncStorage from  '@react-native-async-storage/async-storage'
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
  Alert,
  Animated,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../component/Header/index';
import {Icon, Spinner} from 'native-base';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  MyImage,
} from '../../component/services';
import Styles from './Stayles';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const DetailSubDiv = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(true);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const AddBookmarkCommite = async (Id) => {
    // console.log(JSON.stringify(Id))
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'AddBookmarkCommite',
        {Email: Token, Id},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify(response));
          if (response.Result == 'Success') {
            alert('add successful');
            // setDatas(response.Answer)
          }
        },
        (err) => {
          // console.log(JSON.stringify(err));
        },
      );
    } else {
      // alert('Please login.')
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
            onPress: () => props.navigation.navigate('Qrcode', {PageNum: 0}),
          },
        ],
        {cancelable: false},
      );
      // props.navigation.navigate('Qrcode', { PageNum: 0 })
    }
  };
  const renderItem = ({item}) => {
    return (
      <ImageBackground
        source={require('../../assets/img/backtouch.png')}
        style={Styles.backtouchimg}>
        <TouchableOpacity style={Styles.touchoricomm}>
          <Text style={Styles.touchtxt}>Organising Commitee</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  useEffect(() => {
    // alert(JSON.stringify(props.route.params?.item));
  }, []);

  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          {height: HEADER_MIN_HEIGHT, opacity: headerOpacity},
        ]}
      />
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
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <ScrollView
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={Styles.headermainscr}>
            <ImageBackground
              blurRadius={10}
              resizeMode={'cover'}
              style={Styles.imgbackheader}
              source={{uri: BASE_URL_IMG + props.route.params?.item.Image}}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 0.5}}
                colors={['#3f62a4', 'transparent']}
                // style={Styles.linearGradient}
                style={{height: '100%', width: '100%'}}
              />
            </ImageBackground>

            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                width: width * 2,
                height: width * 2,
                borderRadius: width * 2,
                backgroundColor: '#f0f4fd',
                bottom: -width * 1.75,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  position: 'absolute',
                  padding: 5,
                  top: -width / 6,
                  width: width / 3,
                  height: width / 3,
                  borderRadius: width / 6,
                  backgroundColor: '#FFFF',
                  zIndex: 100,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: (width - 25) / 3,
                    height: (width - 25) / 3,
                    borderRadius: width / 6,
                    backgroundColor: '#FFFF',
                    zIndex: 100,
                    overflow: 'hidden',
                  }}>
                  <MyImage
                    style={{width: '100%', height: '100%'}}
                    source={{
                      uri: BASE_URL_IMG + props.route.params?.item.Image,
                    }}
                    resizeMode={'cover'}
                  />
                </View>
              </View>
            </View>

            {/* <View style={Styles.circlebackmg}>
              <Image
                style={{height: '40%', width: '40%'}}
                source={{uri: BASE_URL_IMG + props.route.params.item.Image}}
              />
            </View> */}
          </View>
        </View>

        {/* <View style={{height: height * 0.6}}>
        <ScrollView> */}
        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>
            {props.route.params?.item.UserPreFix}
            {props.route.params.item.Name}
          </Text>
          <View style={Styles.bottcarevents}>
            <View style={Styles.reeventbott}>
              <Image
                style={Styles.imgbottcarevents}
                resizeMode={'contain'}
                source={require('../../assets/img/Nationality.png')}
              />
              <Text style={Styles.txtcareventdate}>
                {props.route.params.item.Country}
              </Text>
            </View>
            <View style={Styles.addevedate}>
              <Image
                style={Styles.imgbottcarevents}
                resizeMode={'contain'}
                source={require('../../assets/img/JobRank.png')}
              />
              <Text style={Styles.txtcareventdate}>
                {props.route.params.item.Position}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            Styles.descview,
            {borderBottomColor: '#F9F9FB', borderBottomWidth: 2},
          ]}>
          <Icon
            name="event-note"
            type={'MaterialIcons'}
            style={Styles.iconnotebook}
          />
          <View style={Styles.rightbioview}>
            <Text style={Styles.biotxt}>Designation</Text>
            <Text style={Styles.biodestxt}>
              {props.route.params?.item.Biography}
            </Text>
          </View>
        </View>
        {/* <View style={Styles.descview}>
          <Icon
            name="event-note"
            type={'MaterialIcons'}
            style={Styles.iconnotebook}
          />
          <View style={Styles.rightbioview}>
            <Text style={Styles.biotxt}>Bio</Text>
            <View style={Styles.biodescview}>
              <Text style={Styles.biodestxt}>
                {props.route.params?.item.Biography}
              </Text>
            </View>
          </View>
        </View> */}
        <View style={Styles.borderbott} />
        {/* <View style={Styles.descview}>
          <Text style={Styles.biotxt}>Commitee</Text>
          <Text style={Styles.biodestxt}>
            {props.route.params.Title}
          </Text>
        </View> */}

        {/* <View style={{ paddingHorizontal: 20 }}>
          <Text style={Styles.membertxt}>Member in</Text>
        </View> */}
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={DATA}
          renderItem={renderItem}></FlatList> */}
        <View style={{height: height * 0.15}} />
        {/* </ScrollView>
      </View> */}
      </ScrollView>
      {/* <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingBottom: 30,
          backgroundColor: '#FFFF',
        }}>
        <ImageBackground
          source={require('../../assets/img/backtouch.png')}
          style={Styles.backtouchimg}>
          <View style={Styles.backtouchimg}>
            <Text style={Styles.touchtxt}>{props.route.params.Title}</Text>
            {/* <Text style={Styles.touchtxt}>{props.route.params.EventName}</Text> */}
      {/* <Text style={Styles.dateintouch}>
              {item.Day} - {item.Start} - UEA dubai
            </Text> */}
      {/* </View> */}
      {/* </ImageBackground> */}
      {/* </View> */}
    </View>
  );
};

export default DetailSubDiv;
