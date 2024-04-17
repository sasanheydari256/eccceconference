import {
  View,
  Text,
  Dimensions,
  Image as Images,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Animated,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import Carousel from 'react-native-snap-carousel';
import {
  getListComment,
  BASE_URL_IMG,
  AddMyComment,
  requestLogin,
  request,
  getReminTime,
  MyImage,
} from '../../component/services';
import ImagePicker from 'react-native-image-crop-picker';
import MapView, { Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import About from '../../../src/assets/img/About.png';
import Rating from '../../component/Rating';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import styles from '../../component/ContactList/styles';
import Header from '../../component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';
import PostItem from './PostItem';
import { Colors } from '../../component/services/Colors';
import RNPhotoManipulator from 'react-native-photo-manipulator';
// import Maps from '../../src/screens/Maps';

const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const SocialMedia = (props) => {
  const [Datas, setDatas] = useState([]);
  const [Description, setDescription] = useState('');
  const [Image, setImage] = useState();
  const [ImagePath, setImagePath] = useState('');
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setoptions] = useState(5);
  const [MyImagepic, setMyImagepic] = useState('');
  const [NewMyImage, setNewMyImage] = useState('');
  const [ShowImg, setShowImg] = useState(false);
  const inpRef = React.useRef('');

  const handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      if (e.target.files && e.target.files[0]) {
        GetMediaAnyEvent(e.target.files[0]);
      }
      // setimagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const sendImage = async (IMG, nameImage) => {
    let EventId = await AsyncStorage.getItem('eventId');
    let Token = await AsyncStorage.getItem('Token');
    nameImage = nameImage.split('/').pop();

    request(
      'POST',
      'CreateNewMedia',
      {
        EventId,
        Email: Token,
        ImageName: nameImage,
        ImageFile: IMG,
        Description: inpRef.current,
      },
      () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify({
        //   Email: Token,
        //   ImageName: 'Imsged', ImageFile: IMG
        // }))
        // console.log(response);
        // alert(JSON.stringify(response))
        if (response.Result == 'Success') {
          if (response.Answer == 'Success') {
            GetMediaAnyEvent()
          }
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };
  useEffect(() => {
    GetMediaAnyEvent()
  }, []);
  const GetMediaAnyEvent = async (e) => {
    let EventId = await AsyncStorage.getItem('eventId');
    let Token = await AsyncStorage.getItem('Token');

    let dats = new FormData();
    dats.append('image', Image);
    // console.log('image', JSON.stringify(Image));
    // console.log('image', ImagePath);

    request(
      'POST',
      'GetMediaAnyEvent',
      {
        EventId,
        Email: Token,
        Page: 1,
        Count: 10
      },
      () => { },
      () => { },
      async (e) => {
        // alert(JSON.stringify(e), 'GetMediaAnyEventGetMediaAnyEvent');
        // setModalVisible(false)
        console.log(e.Answer);

        if (e.Result == 'Success') {
          setDatas(e.Answer)
          // setmediaanyevent(e.Answer);
        }
      },
      (e) => {
        setModalVisible(false);
        // console.log(e)
      },
    );
  };

  const ImgPost = () => {
    // const requestUserPermission = async () => {
    //   const authStatus = await messaging().requestPermission();
    //   const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //   if (enabled) {
    //     console.log('Authorization status:', authStatus);
    //   }
    // };
    ImagePicker.openPicker({
      width: 417,
      height: 417,
      cropping: true,
      includeBase64: true,
      // cropperCircleOverlay: true,
    }).then((image) => {
      setImagePath(image.path);
      setImage(image.data);
      // sendImage(image.data,image.path);
      // console.log(JSON.stringify(image.data));
    })
      .catch((err) => {
        // console.log(err);
      });
  };

  // const openPicker = (options) => {
  //   console.log(options);
  //   const {count: maxFiles, success, complete} = options;
  //   return ImagePicker.openPicker({
  //     multiple: true,
  //     maxFiles,
  //   }).then((images) => {
  //     console.log(images);
  //     let data = Object.assign({}, getRes(images), res);
  //     success && success(data);
  //     complete && complete(data);
  //     return data;
  //   });
  // };

  const HeaderSocial = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFFF',
          padding: 5,
          width: '95%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginHorizontal: 10,
          borderRadius: 40
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Images
            source={{
              uri: BASE_URL_IMG + '10f7057fdd334c539ea8425445066e4f.jpeg',
            }}
            style={{width: 26, height: 26, borderRadius: 13, margin: 5}}
          /> */}
          <Text>Write Something...</Text>
        </View>
        <Icon name={'camera-plus-outline'} type={'MaterialCommunityIcons'} style={{ color: Colors.Grey }} />
      </TouchableOpacity>
    );
  };

  const PostImage = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableHighlight
          onPress={() => {
            console.log('off');
            setModalVisible(false);
          }}
          style={{
            backgroundColor: '#00000080',

            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%',
            height: '100%',
            alignSelf: 'center',
          }}
        >
          <View >
            <View
              style={{
                width: width,
                height: height,
                position: 'absolute',
                top: 0,
                right: 0,
              }}
            />
            <View
              style={{
                backgroundColor: '#FFFF',
                width: width - 50,
                borderRadius: 10,
                overflow: 'hidden',
                padding: 10,
              }}
            >
              <TouchableOpacity style={{ marginBottom: 10 }} onPress={ImgPost}>
                {/* <Icon
                name={'camera'}
                type={'EvilIcons'}
                style={{color: Colors.Grey}}
              /> */}
                <Images
                  style={{ width: '100%', height: height / 4 }}
                  source={
                    ImagePath != ''
                      ? { uri: ImagePath }
                      : require('../../../src/assets/img/3.png')
                  }
                />
              </TouchableOpacity>
              <Text>Description : </Text>
              <TextInput
                multiline
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  borderBottomColor: Colors.MedionLightGrey,
                  borderBottomWidth: 0.5,
                }}
                placeholderTextColor={'#bbbdc5'}
                placeholder={'Write Something...'}
                onChangeText={(Text) => {
                  console.log(Text);
                  inpRef.current = Text
                }}

              />
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  backgroundColor: '#98b6fd',
                  width: '100%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  margin: 10,
                }}
                onPress={() => {
                  sendImage(Image, ImagePath);
                  setModalVisible(false);
                }}>
                <Text
                  style={{
                    color: '#FFFF',
                    fontSize: 17,
                    fontWeight: 'bold',
                  }}>
                  Send Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableHighlight>
      </Modal>
    );
  };

  return (
    <View>
      <Animated.View
        style={[
          Styles.animindex,
          { height: HEADER_MIN_HEIGHT, opacity: headerOpacity },
        ]}
      />
      <Header
        navigation={props.navigation}
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        // notif={() => props.navigation.navigate('Notifications')}
        // inform={() => props.navigation.navigate('Information', {Datas})}
        iconright={5}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <ScrollView style={{ height: '79%' }}>
        <View>
          {/* {Datas.length > 0 && Datas.map((item, index) => PostItem(item))} */}
          {/* <View style={{height: height / 2, width}} /> */}
          {HeaderSocial()}
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={Datas}
            inverted={true}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <PostItem item={item} ImageName={item.Image} key={`${index}`} />
            )}
            ListFooterComponent={() => (
              <View style={{ height: 1, width }} />
            )}></FlatList>
        </View>
      </ScrollView>
      <PostImage option={options} />
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
    chengitemdata: (itemdata) => {
      const action = {
        type: 'CHANGE_C_itemdata',
        itemdata,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SocialMedia);
