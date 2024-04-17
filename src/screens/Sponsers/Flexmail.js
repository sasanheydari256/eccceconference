import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  // StatusBar,
  Linking,
  // TouchableOpacity,
  // Animated,
  // Pressable,
} from 'react-native';
// import {NativeBaseProvider, Box, Center, HStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Header from '../../component/Header';
import FlexStyles from './FlexStyles';
import Carousel from 'react-native-snap-carousel';
import {BASE_URL_IMG, MyImage, request} from '../../component/services';
import About from '../../assets/img/About.png';
import {Icon, Spinner} from 'native-base';
import {Link} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import AsyncStorage from  '@react-native-async-storage/async-storage'

const {width, height} = Dimensions.get('screen');

export const Flexmail = (props) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(1);
  const [slectbox, setslectbox] = useState(false);
  const [readmr, setreadmr] = useState(false);
  const [listmenue, setlistmenue] = useState([]);
  const [Datas, setDatas] = useState();

  const [Epost, setEpost] = useState([]);
  const [Epostvideos, setEpostvideos] = useState([]);
  const [EpostPdf, setEpostPdf] = useState([]);
  const [VideoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    // alert(JSON.stringify(props.route.params));
    // GetEventExhibitor(props.route.params.Id);
    EpostSponsserList(props.route.params?.Id);
    GetExhabitorDetails(props.route.params?.Id);

    let listheader = ['Company', 'Videos', 'Documents'];
    let ddpartment = [];
    for (let index = 0; index < listheader.length; index++) {
      const element = listheader[index];
      ddpartment.push(listheader[index]);
      setlistmenue(ddpartment);
    }
  }, []);

  const GetExhabitorDetails = async (Id) => {
    const Token = await AsyncStorage.getItem('Token');

    // console.log(JSON.stringify('Ramin'))
    // console.log(JSON.stringify({ Email: Token }))
    request(
      'POST',
      'GetDetailsSponsser',
      {Id, Email: Token},
      () => {},
      () => {},
      (response) => {
        // alert(JSON.stringify(response, 'detailsponsoooor'));
        if (response.Result == 'Success') {
          setDatas(response.Answer);
          setModalVisible(false);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };
  const EpostSponsserList = (Id) => {
    // console.log(JSON.stringify(Id))
    request(
      'POST',
      'EpostSponsserList',
      {Id},
      () => {},
      () => {},
      (response) => {
        // alert(JSON.stringify(response, 'epostlist'));
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
        // console.log(JSON.stringify(err))
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

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ShowPdf', {
            PdfUrl: BASE_URL_IMG + item.FileGuid,
          });
        }}
        key={index}
        style={FlexStyles.touchflatmain}>
        <View style={FlexStyles.iconsview}>
          <View
            style={{
              // marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
              width: '20%',
              height: '100%',
              overflow: 'hidden',
              // backgroundColor: 'red',
            }}>
            <Image
              resizeMode={'contain'}
              style={{width: '70%', height: '70%', backgroundColor: 'red'}}
              source={require('../../assets/img/pdf-file.png')}></Image>
          </View>
          <View
            style={{
              width: '60%',
              flexDirection: 'column',
            }}>
            <Text style={FlexStyles.titlename}>{item.FileName}</Text>
            {/* <Text style={Styles.titlename2}>{item.FileGuid}</Text> */}
          </View>

          {/* <Image
            source={require('../../assets/img/pdf-file.png')}
            // source={{uri: BASE_URL_IMG + item.Image}}
            style={FlexStyles.pdfimg}
          /> */}
          <Text style={FlexStyles.contenttxt}> {item.Name}</Text>
        </View>
        <View style={FlexStyles.iconsview2}>
          <Icon
            name={'eye-outline'}
            type={'Ionicons'}
            style={FlexStyles.eyeicon2}
          />
          <Icon
            name={'bookmark'}
            type={'Fontisto'}
            style={FlexStyles.eyeicon}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderVideoItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setLoading(false);
          setVideoUrl(item.FileGuid);
        }}
        style={FlexStyles.touchvideoflat}>
        <Video
          // source={require('../../assets/E-2.mp4')}
          source={{uri: BASE_URL_IMG + item.FileGuid}}
          style={{height: height * 0.13, width: width * 0.4}}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={FlexStyles.mainscrview}>
      <Header
        navigation={props.navigation}
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        notif={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <View style={FlexStyles.headermainscr}>
        <View key={index} style={FlexStyles.headermainscr}>
          <MyImage
            style={FlexStyles.imgbackheader}
            source={{
              uri: BASE_URL_IMG + Datas?.Image,
            }}
            resizeMode={'cover'}
          />
        </View>
        {/* <Carousel
          // ref={(c) => { this._carousel = c; }}
          autoplay={true}
          loop={true}
          autoplayInterval={5000}
          // onSnapToItem={(index) => setitemindex(index)}
          data={props.route.params.ImageGallery}
          // data={[{img: About}]}
          // data={Datas}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={FlexStyles.headermainscr}>
                <MyImage
                  style={FlexStyles.imgbackheader}
                  source={{
                    uri: BASE_URL_IMG + item.ImageName,
                  }}
                  resizeMode={'cover'}
                />
              </View>
            );
          }}
          sliderWidth={width}
          // itemHeight={width * .1}
          itemWidth={width}
        /> */}
      </View>
      <View style={FlexStyles.flexmailview}>
        <View>
          {/* <Text style={FlexStyles.fexmailtxt}>Flexmail</Text> */}
          <Text style={FlexStyles.fexmailtxt}>{Datas?.Name}</Text>
          <Text style={FlexStyles.boothtxt}>{Datas?.Country}</Text>
        </View>
        <Image
          // source={require('../../assets/img/mainflatone.png')}
          source={{
            uri: BASE_URL_IMG + Datas?.Image,
          }}
          style={FlexStyles.imgrighticon}
        />
      </View>
      <View>
        <View style={FlexStyles.tabheaderview}>
          {/* {listmenue.map((item, index) => (
            ))} */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(Datas?.Link).catch((err) => console.log(err));
            }}
            style={FlexStyles.touchtabheader}>
            <Text style={FlexStyles.tabheadertxt}>Website</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {
            //   setSelected(2);
            // }}
            style={FlexStyles.touchtabheader}>
            <Text style={FlexStyles.tabheadertxt}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => {
            //   setSelected(3);
            // }}
            style={FlexStyles.touchtabheader}>
            <Text style={FlexStyles.tabheadertxt}>Document</Text>
          </TouchableOpacity>
        </View>
        <View style={FlexStyles.tabheaderbuttom}>
          {/* {listmenue.map((item, index) => (
            ))} */}
          <TouchableOpacity
            onPress={() => {
              setSelected(1);
            }}
            style={FlexStyles.touchtabheader}>
            <Icon
              name={'building'}
              type={'FontAwesome'}
              style={FlexStyles.companyiconbottom}
            />
            <Text style={FlexStyles.tabheadertxtbottom}>Company</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected(2);
            }}
            style={FlexStyles.touchtabheader}>
            <Icon
              name={'play'}
              type={'AntDesign'}
              style={FlexStyles.companyiconbottom}
            />
            <Text style={FlexStyles.tabheadertxtbottom}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected(3);
            }}
            style={FlexStyles.touchtabheader}>
            <Icon
              name={'text-document-inverted'}
              type={'Entypo'}
              style={FlexStyles.companyiconbottom}
            />
            <Text style={FlexStyles.tabheadertxtbottom}>Document</Text>
          </TouchableOpacity>
        </View>
        <View>
          {selected === 1 && (
            <View>
              <Text style={FlexStyles.aboutcomtitletxt}>ABOUT</Text>
              <Text
                numberOfLines={readmr ? 20 : 2}
                style={FlexStyles.aboutcomtxt}>
                {Datas?.Decription && (
                  <View
                    style={{
                      width: width,
                      // backgroundColor: 'red',
                      alignSelf: 'center',
                    }}>
                    <Text style={{paddingHorizontal: 10}}>
                      {Datas?.Decription}
                    </Text>
                    {/* <TouchableOpacity onPress={() => setreadmr(true)}>
                      <Text> read more </Text>
                    </TouchableOpacity> */}
                  </View>
                )}
              </Text>
            </View>
          )}
          {selected === 2 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={Epostvideos}
              renderItem={renderVideoItem}
              numColumns={2}
            />
          )}
          {selected === 3 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={EpostPdf}
              renderItem={renderItem}
            />
          )}
          {selected === 4 && (
            <View>
              <Text style={FlexStyles.aboutcomtitletxt}>Contact Us</Text>
              <Text
                numberOfLines={readmr ? 20 : 2}
                style={FlexStyles.aboutcomtxt}>
                {Datas?.Decription && (
                  <View
                    style={{
                      width: width,
                      // backgroundColor: 'red',
                      alignSelf: 'center',
                    }}>
                    <Text style={{paddingHorizontal: 10}}>
                      {Datas?.Decription}
                    </Text>
                    {/* <TouchableOpacity onPress={() => setreadmr(true)}>
                      <Text> read more </Text>
                    </TouchableOpacity> */}
                  </View>
                )}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#FFFF',
          flexDirection: 'row',
          paddingBottom: 25,
          position: 'absolute',
          bottom: 0,
          right: 0,
          width,
          alignItems: 'center',
          paddingVertical: 10,
          height: height / 10,
          paddingHorizontal: 10,
          justifyContent: 'space-around',
        }}>
        {Datas?.Facebook != '#' && (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(Datas.Facebook).catch((err) =>
                console.error('An error occurred', err),
              )
            }
            style={FlexStyles.imgview}>
            <Image
              resizeMode={'contain'}
              style={FlexStyles.infoimg}
              source={require('../../assets/img/facebook.png')}></Image>
          </TouchableOpacity>
        )}
        {Datas?.Instagram != '#' && (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(Datas.Instagram).catch((err) =>
                console.error('An error occurred', err),
              )
            }
            style={FlexStyles.imgview}>
            <Image
              resizeMode={'contain'}
              style={FlexStyles.infoimg}
              source={require('../../assets/img/instagram.png')}></Image>
          </TouchableOpacity>
        )}
        {Datas?.Linkedin != '#' && (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(Datas.Linkedin).catch((err) =>
                console.error('An error occurred', err),
              )
            }
            style={FlexStyles.imgview}>
            <Image
              resizeMode={'contain'}
              style={FlexStyles.infoimg}
              source={require('../../assets/img/linkedin.png')}></Image>
          </TouchableOpacity>
        )}
        {Datas?.Twitter != '#' && (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(Datas.Twitter).catch((err) =>
                console.error('An error occurred', err),
              )
            }
            style={FlexStyles.imgview}>
            <Image
              resizeMode={'contain'}
              style={FlexStyles.infoimg}
              source={require('../../assets/img/twitter.png')}></Image>
          </TouchableOpacity>
        )}
        {Datas?.Whatsapp != '#' && (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(Datas.Whatsapp).catch((err) =>
                console.error('An error occurred', err),
              )
            }
            style={FlexStyles.imgview}>
            <Image
              resizeMode={'contain'}
              style={FlexStyles.infoimg}
              source={require('../../assets/img/whatsapp.png')}></Image>
          </TouchableOpacity>
        )}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Flexmail);
