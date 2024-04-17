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
  Linking,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import {Icon, Spinner} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import Video from 'react-native-video';
import {request, requestGET, BASE_URL_IMG} from '../../component/services';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from  '@react-native-async-storage/async-storage'
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const ExhabitSubDev = (props) => {
  const [Epost, setEpost] = useState([]);
  const [Epostvideos, setEpostvideos] = useState([]);
  const [EpostPdf, setEpostPdf] = useState([]);
  const [loading, setLoading] = useState(true);
  const [VideoUrl, setVideoUrl] = useState('');
  const [Datas, setDatas] = useState({
    ExhibitorId: 0,
    Name: '',
    Image: '',
    Code: 0,
    HalName: '',
    Link: '',
    Decription: '',
    Facebook: '',
    Instagram: '',
    Linkedin: '',
    Twitter: '',
    Whatsapp: '',
  });
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(true);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  useEffect(() => {
    GetExhabitorDetails(props.route.params.Id);
    EpostExabitorList(props.route.params.Id);
  }, []);

  const GetExhabitorDetails = (Id) => {
    // console.log(JSON.stringify(Id))
    request(
      'POST',
      'GetExhabitorDetails',
      {Id},
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response))
        if (response.Result == 'Success') {
          setDatas(response.Answer);
        }

        setModalVisible(false);
      },
      (err) => {
        // console.log(JSON.stringify(err))
        setModalVisible(false);
      },
    );
  };
  const EpostExabitorList = (Id) => {
    // console.log(JSON.stringify(Id));
    // console.log(JSON.stringify('Ramin'));
    request(
      'POST',
      'EpostExabitorList',
      {ExabitorId: Id},
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response));
        if (response.Result == 'Success') {
          setEpost(response.Answer);
          let videos = [];
          let PDFS = [];
          for (let index = 0; index < response.Answer.length; index++) {
            const element = response.Answer[index];
            if (element.Type == 'pdf') {
              PDFS.push(element);
            } else if (element.Type == 'film') {
              videos.push(element);
            }
          }
          setEpostPdf(PDFS);
          setEpostvideos(videos);
        }

        setModalVisible(false);
      },
      (err) => {
        // console.log(JSON.stringify(err));
        setModalVisible(false);
      },
    );
  };
  const livezoom = (LiveLink) => {
    let Token = AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      Linking.openURL(LiveLink).catch((err) =>
        console.error('An error occurred', err),
      );
    }
  };
  const BookMark = async () => {
    let Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      // console.log(JSON.stringify({ Id: props.route.params.Id, Email: Token }))
      request(
        'POST',
        'BookMarkExhabitor',
        {Id: props.route.params.Id, Email: Token},
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify(response))
          if (response.Result == 'Success') {
            // setProgramsSessionsDetails(response.Answer)
            if (response.Answer == 'Success') {
              alert('Add to your Bookmarks');
            }
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    } else {
      // props.navigation.navigate('Qrcode', {
      //   PageNum: 0
      // })
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
  const renderItem2 = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ShowPdf', {
            PdfUrl: BASE_URL_IMG + item.FileGuid,
          });
          // props.navigation.navigate('EPosterDetails', {
          //   Datas: EpostPdf[index]
          // })
        }}
        key={index}
        style={[Styles.touchflatmain, {marginTop: 5, overflow: 'hidden'}]}>
        <View
          style={{
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
            width: '20%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#6561fc',
          }}>
          <Image
            resizeMode={'contain'}
            style={{width: '70%', height: '70%'}}
            source={require('../../assets/img/pdf-file.png')}></Image>
        </View>
        <View
          style={{
            width: '60%',
            flexDirection: 'column',
          }}>
          <Text style={Styles.titlename}>{item.FileName}</Text>
          <Text style={Styles.titlename2}>{item.FileGuid}</Text>
        </View>
        <View style={Styles.imgview}>
          <Image
            style={{height: '100%', width: '100%'}}
            resizeMode={'contain'}
            source={require('../../assets/img/arrow.png')}></Image>
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
            source={{uri: BASE_URL_IMG + Datas.Image}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.5}}
              colors={['#3f62a4', 'transparent']}
              // style={Styles.linearGradient}
              style={{height: '100%', width: '100%'}}></LinearGradient>
          </ImageBackground>
          {/* <ImageBackground
          style={Styles.imgbackheader}
          source={require('../../assets/img/exhibitors.png')}>
        </ImageBackground> */}
        </View>
        <View style={Styles.bookview}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {/* <View style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/note.png')}></Image>
              <Text style={Styles.txtimg}>Write Note</Text>
            </View> */}
            <TouchableOpacity
              onPress={() => BookMark()}
              style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/bookmark.png')}></Image>
              <Text style={Styles.txtimg}>Add Bookmark</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                let Token = await AsyncStorage.getItem('Token');
                if (Token !== null && Token !== undefined && Token !== '') {
                  livezoom(Datas.LiveLink);
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
                        onPress: () =>
                          props.navigation.navigate('Qrcode', {PageNum: 0}),
                      },
                    ],
                    {cancelable: false},
                  );
                }
              }}
              style={Styles.writenoteview}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/contact.png')}></Image>
              <Text style={Styles.txtimg}>Book Meeting</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.linebetw} />
          <View style={Styles.locviewexabit}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <Image
                style={Styles.imgexhabitloc}
                resizeMode={'contain'}
                source={require('../../assets/img/locexhab.png')}></Image>
              <View>
                <Text style={Styles.txtimg}>Location:</Text>
                <Text style={Styles.txtimg}>UAE DUBAI | {Datas.HalName}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(Datas.Link).catch((err) =>
                  console.error('An error occurred', err),
                )
              }
              style={Styles.boxtopexhab}>
              <Image
                resizeMode={'contain'}
                style={Styles.imgexhabitloc}
                source={require('../../assets/img/web.png')}></Image>
              <View>
                <Text style={Styles.txtimg}>Web Site:</Text>
                <Text style={Styles.txtimg}>{Datas.Link}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{height: height * 0.6}}>
        <ScrollView> */}
        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>{Datas.Name}</Text>
        </View>
        <View style={Styles.descview}>
          <Text style={Styles.biotxt}>Detail</Text>
          <Text style={Styles.biodestxt}>{Datas.Decription}</Text>
        </View>
        {Epostvideos.length > 0 && (
          <View style={{marginVertical: 10}}>
            <Text style={Styles.biotxt2}>Videos</Text>
            <Carousel
              // ref={(c) => { this._carousel = c; }}
              autoplay={false}
              // onSnapToItem={(index) => setitemindex(index)}
              data={Epostvideos}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setLoading(false);
                      setVideoUrl(item.FileGuid);
                    }}
                    style={Styles.mainscrcarview}>
                    <ImageBackground
                      resizeMode={'cover'}
                      style={Styles.imgcarmainscr}
                      source={{uri: BASE_URL_IMG + item.Image}}>
                      <Image
                        resizeMode={'contain'}
                        style={Styles.imgcarmainscr2}
                        source={require('../../assets/img/play.png')}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }}
              sliderWidth={width}
              itemWidth={width * 0.8}></Carousel>
          </View>
        )}
        {EpostPdf.length > 0 && (
          <View style={{marginVertical: 10}}>
            <Text style={Styles.biotxt2}>Document</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={EpostPdf}
              renderItem={renderItem2}></FlatList>
          </View>
        )}

        <View style={{height: height * 0.5}} />
      </ScrollView>
      <View style={Styles.socialviewmain}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(Datas.Facebook).catch((err) =>
              console.error('An error occurred', err),
            )
          }
          style={Styles.imgview}>
          <Image
            resizeMode={'contain'}
            style={Styles.infoimg}
            source={require('../../assets/img/facebook.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(Datas.Instagram).catch((err) =>
              console.error('An error occurred', err),
            )
          }
          style={Styles.imgview}>
          <Image
            resizeMode={'contain'}
            style={Styles.infoimg}
            source={require('../../assets/img/instagram.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(Datas.Linkedin).catch((err) =>
              console.error('An error occurred', err),
            )
          }
          style={Styles.imgview}>
          <Image
            resizeMode={'contain'}
            style={Styles.infoimg}
            source={require('../../assets/img/linkedin.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(Datas.Twitter).catch((err) =>
              console.error('An error occurred', err),
            )
          }
          style={Styles.imgview}>
          <Image
            resizeMode={'contain'}
            style={Styles.infoimg}
            source={require('../../assets/img/twitter.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(Datas.Whatsapp).catch((err) =>
              console.error('An error occurred', err),
            )
          }
          style={Styles.imgview}>
          <Image
            resizeMode={'contain'}
            style={Styles.infoimg}
            source={require('../../assets/img/whatsapp.png')}></Image>
        </TouchableOpacity>
        {/* <TouchableOpacity
            onPress={() => Linking.openURL(Datas.Link).catch((err) => console.error('An error occurred', err))}
            style={Styles.imgview}>
            <Image
              resizeMode={'contain'}
              style={Styles.infoimg}
              source={require('../../assets/img/youtube.png')}></Image>
          </TouchableOpacity> */}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setLoading(true);
        }}>
        {loading ? (
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
        ) : (
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              backgroundColor: 'black',
              justifyContent: 'center',
            }}>
            <Icon
              onPress={() => {
                setModalVisible(false);
                setLoading(true);
              }}
              name={'close'}
              type={'AntDesign'}
              style={{
                color: '#FFFF',
                fontSize: 18,
                zIndex: 500,
                alignSelf: 'flex-start',
                marginHorizontal: 10,
              }}></Icon>
            <Video
              // source={{ uri: BASE_URL_IMG + VideoUrl }}
              source={{uri: BASE_URL_IMG + VideoUrl}}
              style={{width, height: height - 150}}
              // style={{
              //   justifyContent: 'center',
              //   alignItems: 'center',
              //   width: width,
              //   height: height,
              //   zIndex: 3,
              // }}
              muted={false}
              repeat={false}
              controls={true}
              resizeMode={'contain'}
              rate={1.0}
              ignoreSilentSwitch={'obey'}
            />
            {/* <Text 
              onPress={() =>}
              >puse</Text>
              <Text>play</Text> */}
          </View>
        )}
      </Modal>
    </View>
  );
};

export default ExhabitSubDev;
