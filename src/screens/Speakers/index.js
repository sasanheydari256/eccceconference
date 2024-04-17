import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View, Alert,
  Animated,
  Modal,
  PixelRatio,
} from 'react-native';
import { Spinner, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../component/Header/index';
import { request, requestGET, BASE_URL_IMG } from '../../component/services';
import Styles from './Stayles';
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const Speakers = (props) => {
  const [Datas, setDatas] = useState([])
  const [readmr, setreadmr] = useState(false);
  const minHeight = 80;
  const maxHeight = 1200;
  const animatedHeight = useRef(new Animated.Value(minHeight)).current;
  const [speakersState, setSpeakersState] = useState([])
  const [speakerDetaile, setSpeakerDetaile] = useState([])
  const [rateState, setRateState] = useState(null)
  const [Mycountry, setMycountry] = useState('')
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(true)
  const SpeakersListFaculty = () => {
    request('POST', 'SpeakersListFaculty', { UserId: props.route.params.data.Id }, () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify(response), 'test',)
        if (response.Result == 'Success') {
          setSpeakersState(response.Answer)
          setModalVisible(false)
        }
      },
      (err) => { console.log(JSON.stringify(err)) })
  }
  const SpeakerDetaile = async () => {
    // console.log( props.route.params.data.Id);
    let Token = await AsyncStorage.getItem('Token')


    request('POST', 'SpeakerInformation', {
      Id: props.route.params.data.Id,
      Email: Token,

    }, () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify(response), 'test',)
        if (response.Result == 'Success') {
          setSpeakerDetaile(response.Answer)
          setRateState(response.Answer.Rated)
        }
      },
      (err) => { console.log(JSON.stringify(err)) })


    // if (Token !== null && Token !== undefined && Token !== '') {
    //   console.log(JSON.stringify({ Id: props.route.params.data.Id, Email: Token }))
    //   request('POST', 'SpeakerInformation', {
    //     Id: props.route.params.data.Id,
    //     Email: Token,

    //   }, () => { },
    //     () => { },
    //     (response) => {
    //       // console.log(JSON.stringify(response), 'test',)
    //       if (response.Result == 'Success') {
    //         setSpeakerDetaile(response.Answer)
    //         setRateState(response.Answer.Rated)
    //       }
    //     },
    //     (err) => { console.log(JSON.stringify(err)) })
    // } else {
    //   // props.navigation.navigate('Qrcode', {
    //   //   PageNum: 0
    //   // })
    //   // alert('Please login.')
    //   Alert.alert(
    //     "Log In to Register",
    //     "Log in to your account to register for this event",
    //     [
    //       {
    //         text: "Cancel",
    //         onPress: () => console.log("Cancel "),
    //         style: "cancel"
    //       },
    //       { text: "Log In", onPress: () => props.navigation.navigate('Qrcode', { PageNum: 0 }) }
    //     ],
    //     { cancelable: false }
    //   );
    // }
  }
  useEffect(() => {
    // console.log(props.route.params.data);
    SpeakersListFaculty()
    SpeakerDetaile();

  }, [])
  //   GetSpeakerRate
  // int SpeakerId 
  // int EventId 
  // string Email  
  // int Rate
  const sendRate = async (rate) => {

    const eventId = await AsyncStorage.getItem('eventId');

    let Token = await AsyncStorage.getItem('Token');

    if (Token !== null && Token !== undefined && Token !== '') {
      // console.log(JSON.stringify({ Id: props.route.params.Id, Email: Token }))
      request('POST', 'GetSpeakerRate', {
        SpeakerId: props.route.params.data.Id,
        Email: Token,
        EventId: eventId,
        Rate: rate
      }, () => { },
        () => { },
        (response) => {
          console.log(JSON.stringify(response))
          if (response.Result == 'Success') {
            // setProgramsSessionsDetails(response.Answer)
            if (response.Answer == 'Success') {
              setRateState(rate)
            }
          }
        },
        (err) => { console.log(JSON.stringify(err)) })
    } else {
      // props.navigation.navigate('Qrcode', {
      //   PageNum: 0
      // })
      // alert('Please login.')
      Alert.alert(
        "Log In to Register",
        "Log in to your account to register for this event",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel "),
            style: "cancel"
          },
          { text: "Log In", onPress: () => props.navigation.navigate('Qrcode', { PageNum: 0 }) }
        ],
        { cancelable: false }
      );
    }
  }
  const BookMark = async () => {
    let Token = await AsyncStorage.getItem('Token')
    if (Token !== null && Token !== undefined && Token !== '') {
      // console.log(JSON.stringify({ Id: props.route.params.Id, Email: Token }))
      request('POST', 'AddBookmarkFacillity', { Id: props.route.params.data.Id, Email: Token }, () => { },
        () => { },
        (response) => {
          console.log(JSON.stringify(response))
          if (response.Result == 'Success') {
            // setProgramsSessionsDetails(response.Answer)
            alert('Add to your Bookmarks')
            if (response.Answer == 'Success') {
            }
          }
        },
        (err) => { console.log(JSON.stringify(err)) })
    } else {
      // props.navigation.navigate('Qrcode', {
      //   PageNum: 0
      // })
      // alert('Please login.')
      Alert.alert(
        "Log In to Register",
        "Log in to your account to register for this event",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel "),
            style: "cancel"
          },
          { text: "Log In", onPress: () => props.navigation.navigate('Qrcode', { PageNum: 0 }) }
        ],
        { cancelable: false }
      );
    }
  }
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const RateRender = () => {
    const elements = [];

    for (let index = 1; index < 6; index++) {
      let nameStar = 'star-o'
      if (rateState !== null & rateState <= index) {
        nameStar = 'star'
      }

      // اینجا کد مربوط به رندر هر المان قرار می‌گیرد
      elements.push(
        <TouchableOpacity
          onPress={() => {
            sendRate(index);
          }}>
          <Icon
            key={index}
            name={nameStar}
            type={'FontAwesome'}
            style={{ fontSize: 20, padding: 2 }}
          />
        </TouchableOpacity>

      );
    }

    return <>{elements}</>;
  };

  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={require('../../assets/img/backtouch.png')}
        style={Styles.backtouchimg}>
        <View style={Styles.backtouchimg}>
          <Text style={Styles.touchtxt}>{item.Name}</Text>
          {/* <Text style={Styles.touchtxt}>{props.route.params.EventName}</Text> */}
          <Text style={Styles.dateintouch}>
            {item.Day} - {item.Start} - {Mycountry}
          </Text>
        </View>
      </ImageBackground>
    );
  };
  const RenderSpeaks = () => {
    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {speakersState.map(i => (
          <TouchableOpacity key={i.Id} style={{
            width: '100%',
            height: height * 0.12,
            flexDirection: 'row',

            borderBottomColor: '#BDBDBD',
            borderBottomWidth: 4,
            padding: 10
          }}
            onPress={() => {
              // console.log(i.Id);
              // props.navigation.navigate('Speakers',
              //   {
              //     data: i
              //   })
            }}>
            <View style={{ flexDirection: 'row', width: '96%' }}>
              <View style={{ flexDirection: 'column', width: '20%', padding: 2 }}>
                <Text style={{ fontSize: 16 }}>{i.Start ? i.Start : '---'}</Text>
                <Text style={{ fontSize: 16, color: '#B3B3B3' }}>{i.Expire ? i.Expire : '---'}</Text>
              </View>
              <View style={{ flexDirection: 'column', width: '90%' }}>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{i.Name ? i.Name : '---'}</Text>
                </View>
                <View>
                  <Text style={{ color: '#B3B3B3' }}>{i.Track ? i.Track : '---'}</Text>
                </View>
                <View>
                  <Text>{i.Day}</Text>
                </View>
              </View>

            </View>
            <View style={{ justifyContent: 'center' }}>
              {/* <Icon
                name={'chevron-right'}
                type={'FontAwesome'}
                style={Styles.iconStyle}
              /> */}
            </View>


          </TouchableOpacity>
        ))}
        {speakersState.length > 3 && (
          <View style={{ height: height * 0.12 }} />
        )}
      </View>

    )
  }
  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          { height: HEADER_MIN_HEIGHT, opacity: headerOpacity },
        ]}></Animated.View>
      {/* <View style={Styles.arbtn}>
        <View style={Styles.arbtnimg}>
          <Image
            resizeMode={'cover'}
            style={Styles.arimgbtn}
            source={require('../../assets/img/artab.png')}></Image>
        </View>
      </View> */}
      <Header navigation={props.navigation}
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        notif={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      <ScrollView
        style={{ height: height, flexDirection: 'column' }}
      >
        <View style={Styles.headermainscr}>


          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 0 }}
            colors={['#2548A9', '#4425A9']}
            // style={Styles.linearGradient}
            style={{
              height: '100%', width: '100%',
            }}>
            <View style={{ flexDirection: 'row', width: '100%', height: '100%', marginTop: '18%' }}>
              <View style={{ width: '40%', height: '100%', flexDirection: 'column' }}>
                <Image
                  style={Styles.imgbackheader}
                  blurRadius={0}
                  source={{
                    uri: BASE_URL_IMG + speakerDetaile.Image,
                  }}
                  resizeMode={'cover'}
                />
                <View style={{ alignSelf: 'center', paddingHorizontal: '13%', marginTop: '10%', backgroundColor: '#3F67D590', borderRadius: 5 }}>
                  <Text style={{ fontSize: 16, color: '#E4E4E4', textAlign: 'center' }}>{speakerDetaile.Position ? speakerDetaile.Position : "Speaker"}</Text>
                </View>
              </View>
              {/* bio */}
              <View style={{ width: '58%', height: '100%', flexDirection: 'column' }}>
                <View style={{ paddingTop: '1%' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#E4E4E4' }}>{speakerDetaile.Name ? speakerDetaile.NameExtention + '' + speakerDetaile.Name : "---"}</Text>
                </View>
                <View style={{ marginTop: '5%' }}>
                  <Text numberOfLines={7} ellipsizeMode='tail' style={{ fontSize: 14, color: '#E4E4E4', fontStyle: 'italic' }}>{speakerDetaile.ShortBio ?
                    speakerDetaile.ShortBio
                    : ""}</Text>
                </View>
                <View style={{ marginTop: '4%' }}>
                  <Text style={{ fontSize: 14, color: '#E4E4E4' }}>{speakerDetaile.Location ? speakerDetaile.Location : "---"}</Text>
                </View>
              </View>
            </View>

          </LinearGradient>


        </View>
        {/* rate */}
        <View style={{

          justifyContent: 'space-between',
          alignItems: 'center', width: width, height: (height * 4.1) / 100,
          backgroundColor: '#C9CCD3', flexDirection: 'row'
        }}>
          <Text style={{ marginLeft: '4%' }}>Rate this</Text>
          <View style={{ flexDirection: 'row', marginRight: '2%' }}>

            <RateRender />
          </View>
        </View>
        {/* bio */}
        <View style={{
          width: width, height: (height * 4) / 100,
          backgroundColor: '#C9CCD3', marginTop: '1%', justifyContent: 'center'
        }}>
          <Text style={{ marginLeft: '4%', fontSize: 18, fontWeight: 'bold' }}>Bio</Text>
        </View>



        <AnimatedTextCollapse text={
          speakerDetaile.Bio
        }
          fontSize={13}
        />


        {/* speak at */}
        <View style={{
          width: width, height: (height * 4) / 100,
          backgroundColor: '#C9CCD3', marginTop: '2%', justifyContent: 'center'
        }}>
          <Text style={{ marginLeft: '4%', fontSize: 16, fontWeight: 'bold' }}>Speaking At</Text>
        </View>
        <ScrollView>
          <RenderSpeaks />
        </ScrollView>

        {/* <View style={Styles.bookview}>

                      

          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity
              onPress={() => BookMark()}
              style={[
                Styles.writenoteview,

              ]}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/bookmark.png')}></Image>
              <Text style={Styles.txtimg}>Add Bookmark</Text>
            </TouchableOpacity>

          </View>
        </View> */}
        {/* <View style={{height: height * 0.6}}>
        <ScrollView> */}
        {/* <View style={Styles.viewnamedetail}>
          <View style={{
            flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            borderBottomWidth: 1, borderColor: '#f0f4fd', width: '100%',
            marginBottom: 5, paddingBottom: 5
          }}>

            <TouchableOpacity
              onPress={() => BookMark()}
              style={[
                Styles.writenoteview,

              ]}>
              <Image
                style={Styles.imgexhabitnote}
                resizeMode={'contain'}
                source={require('../../assets/img/bookmark.png')}></Image>
              <Text style={Styles.txtimg}>BOOKMARK</Text>
            </TouchableOpacity>

          </View>
          <Text style={Styles.namedetail}>{props.route.params.data.Name}</Text>
          <Text style={Styles.biodestxt}>
            {Mycountry}
          </Text>
        </View> */}

        {/* </ScrollView>
      </View> */}
      </ScrollView>
      {/* <View style={{
        position: 'absolute', bottom: 0,
        width: '100%',
        paddingBottom: 30, backgroundColor: '#FFFF'
      }}> */}

      {/* <View style={Styles.borderbott} /> */}
      {/* <View style={{ paddingHorizontal: 20 }}>
          <Text style={Styles.membertxt}>Presenting at</Text>
        </View> */}
      {/* <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={Datas}
          renderItem={renderItem}></FlatList> */}
      {/* <ImageBackground
          source={require('../../assets/img/backtouch.png')}
          style={Styles.backtouchimg}>
          <TouchableOpacity style={Styles.touchoricomm}>
            <Text style={Styles.touchtxt}>{props.route.params.EventName}</Text>
           
          </TouchableOpacity>
        </ImageBackground> */}

      {/* </View> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      // onRequestClose={() => {
      //   setModalVisible(false);
      // }}
      >
        <View style={{
          justifyContent: 'center', alignItems: 'center',
          flex: 1, width: '100%', height: '100%',
          alignSelf: 'center', backgroundColor: 'black',
          opacity: .5
        }}>
          <Spinner color='#FFFF' />
          <Text style={{ color: 'white' }}>Loding ...</Text>
        </View>
      </Modal>
    </View>
  );
};



const AnimatedTextCollapse = ({ text, fontSize }) => {
  const [textLines, setTextLines] = useState(1);

  const handleTextLayout = (event) => {
    const { lines } = event.nativeEvent;
    setTextLines(lines.length);
  };
  const padding = 5;
  const pixelSize = PixelRatio.getFontScale() * fontSize + 2;
  const [readMore, setReadMore] = useState(false);
  const minLine = 4;
  const minHeight = minLine * pixelSize;
  // number 4 that padding is 5
  const maxHeight = (textLines + (padding / 2.5)) * pixelSize;

  const animatedHeight = useRef(new Animated.Value(minHeight)).current;


  const toggleReadMore = () => {
    const newHeight = readMore ? minHeight : maxHeight;
    Animated.timing(animatedHeight, {
      toValue: newHeight,
      duration: 800,
      useNativeDriver: false,
    }).start();
    setReadMore(!readMore);
  };

  return (
    <View style={{ padding: 0 }}>
      {text ? (
        <Animated.View style={{
          width: Dimensions.get('window').width,
          alignSelf: 'center', overflow: 'hidden', height: animatedHeight
        }}>
          <Text onTextLayout={handleTextLayout} numberOfLines={readMore ? 120 : 3} style={{ fontSize: fontSize, padding: padding, paddingLeft: 15 }}>
            {text}
          </Text>
        </Animated.View>
      )
        :
        (<Text onTextLayout={handleTextLayout} numberOfLines={readMore ? 120 : 3} style={{ fontSize: fontSize, padding: padding, paddingLeft: 15 }}>
          ---
        </Text>)
      }
      {
        textLines > 3 && (
          <TouchableOpacity onPress={toggleReadMore}>
            <Text style={{ color: '#3D4DCA', marginLeft: padding }}>{readMore ? 'Show less' : 'Read more'}</Text>
          </TouchableOpacity>
        )
      }

    </View>
  );
};
export default Speakers;
