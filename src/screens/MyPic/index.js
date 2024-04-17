import React, {useState, useEffect} from 'react';
import {
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
import {Spinner, Icon} from 'native-base';
import CameraRoll from '@react-native-community/cameraroll';
import Header from '../../component/Header/index';
import {connect} from 'react-redux';
import Styles from './Stayles';
import {
  request,
  BASE_URL_IMG,
  getUserInformation,
  getGetBackgroundImage,
  openCameras,
  openEmagefolder,
} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNPhotoManipulator from 'react-native-photo-manipulator';
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
const MyPic = (props) => {
  const [Datas, setDatas] = useState([]);
  const [MyImage, setMyImage] = useState('');
  const [NewMyImage, setNewMyImage] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [clickedIMGIndex, setclickedIMGIndex] = useState(0);
  const [ShowImg, setShowImg] = useState(false);
  const [UserInfo, setUserInfo] = useState({
    Name: '',
    Familly: '',
    Company: '',
    Address: '',
    Phone: '',
    Mobile: '',
    RegisterId: '',
  });
  // const [loading, setLoading] = useState(false)
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const downloadPic = () => {
    // CameraRoll.save(tag, { type, album })
    CameraRoll.save(NewMyImage, {type: 'auto', album: 'EcccDubai'});
    setShowImg(false);
    setModalVisible(false);
    alert('Saved!');
  };
  const mergImages = () => {
    if (MyImage == '') {
      alert('Please take a photo first or use gallery');
    } else {
      setModalVisible(true);
      setShowImg(false);
      setTimeout(() => {
        const image1 = BASE_URL_IMG + Datas[clickedIMGIndex].ImageName;
        const overlay1 = require('../../assets/img/Pic-2-3.png');
        const position1 = {x: 276, y: 120};
        RNPhotoManipulator.overlayImage(image1, overlay1, position1).then(
          (path1) => {
            const image = path1;
            const overlay = MyImage;
            const position = {x: 323, y: 172};
            RNPhotoManipulator.overlayImage(image, overlay, position).then(
              (path2) => {
                const image = path2;
                const overlay = require('../../assets/img/text-shadow.png');
                const position = {x: 510, y: 470};
                RNPhotoManipulator.overlayImage(image, overlay, position).then(
                  (path) => {
                    setNewMyImage(path);
                    setShowImg(true);
                  },
                );
              },
            );
          },
        );
      }, 1000);
    }
  };
  const getData = async () => {
    const EventId = await AsyncStorage.getItem('eventId');
    // alert('ss')
    getUserInformation({
      loading: (e) => setModalVisible(e),
      callback: (e) => setUserInfo(e),
    });
    getGetBackgroundImage({
      loading: (e) => setModalVisible(e),
      callback: (e) => setDatas(e),
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity key={index}>
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
        homepress={() => props.navigation.goBack()}
        // notif={() => props.navigation.navigate('Notifications')}
        iconright={5}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      <View style={Styles.headermainscr}>
        <Text style={Styles.hederBane}>MY PICTURE</Text>
        <View style={{height: 130}} />
        <View style={Styles.txtinpheader}>
          <View style={Styles.Viewupimage}>
            <View style={Styles.ViewImageP}>
              <Image
                resizeMode={'contain'}
                style={{
                  height: 60,
                  width: 60,
                }}
                source={require('../../assets/img/user2.png')}></Image>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={Styles.UserName}>{UserInfo.Name}</Text>
            <View style={Styles.Photos}>
              <TouchableOpacity
                onPress={() => openCameras({setMyImage})}
                style={Styles.BtnT}>
                <Text style={Styles.Buttons}>Take photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openEmagefolder({setMyImage})}
                style={Styles.BtnT}>
                <Text style={Styles.Buttons}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        <View style={{width, alignItems: 'center'}}>
          <View style={{height: 100}} />
          <View style={Styles.txtinpheader2}>
            <Text style={Styles.topic}>Select Background</Text>
            {/* <Image
                            resizeMode={'contain'}
                            style={{
                                height: 160,
                                width: 160,
                            }}
                            source={{ uri: MyImage }}></Image> */}

            {/* <Text>{MyImage}</Text> */}
            <ScrollView horizontal={true} style={{padding: 10}}>
              {/* <Text>{JSON.stringify(Datas)}</Text> */}
              {Datas.length > 0 &&
                Datas.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setclickedIMGIndex(index);
                    }}
                    style={{
                      marginHorizontal: 5,
                      height: height * 0.3,
                      width: width * 0.32,
                      borderRadius: 15,
                      overflow: 'hidden',
                    }}>
                    <MyImage
                      resizeMode={'cover'}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      source={{uri: BASE_URL_IMG + item.ImageName}}></MyImage>
                    <View style={Styles.TikImg}>
                      {clickedIMGIndex == index && (
                        <Image
                          resizeMode={'cover'}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          source={require('../../assets/img/check.png')}></Image>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() =>
              // setModalVisible(true)
              mergImages()
            }
            style={Styles.bottoms}>
            <Text style={{color: '#FFFF', fontWeight: 'bold'}}>
              Make an image
            </Text>
          </TouchableOpacity>
          {/* <FlatList
                        showsVerticalScrollIndicator={false}
                        data={Datas2}
                        renderItem={renderItem}></FlatList> */}
        </View>
        <View style={{height: 50}} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setShowImg(false);
          }}>
          {ShowImg ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                backgroundColor: 'black',
              }}>
              <View style={[Styles.madalRezvpinfo, {left: 40}]}>
                <View style={Styles.modalvpinfo} />
                <Icon
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setShowImg(false);
                  }}
                  name={'close'}
                  type={'AntDesign'}
                  style={Styles.modalipinfo}></Icon>
              </View>
              <View style={[Styles.madalRezvpinfo, {right: 40}]}>
                <View style={Styles.modalvpinfo} />
                <Icon
                  onPress={() => {
                    downloadPic();
                  }}
                  name={'download'}
                  type={'Entypo'}
                  style={Styles.modalipinfo}></Icon>
              </View>

              <Image
                resizeMode={'contain'}
                style={{
                  height: height,
                  width: width,
                }}
                source={{uri: NewMyImage}}></Image>
            </View>
          ) : (
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
          )}
        </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyPic);
