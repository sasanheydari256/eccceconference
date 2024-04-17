import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Modal,
  Dimensions,
  Platform,
  View,
  Animated,
} from 'react-native';
import {Spinner} from 'native-base';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import Carousel from 'react-native-snap-carousel';
import {
  getListComment,
  BASE_URL_IMG,
  AddMyComment,
  MyImage,
} from '../../component/services';
import LinearGradient from 'react-native-linear-gradient';
import Rating from '../../component/Rating';
import {TextInput} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const AddComment = (props) => {
  const [itm, setitm] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState('');
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [DATA, setDATA] = useState([]);
  useEffect(() => {
    getListComment({
      EventId: props.route.params.Datas.Id,
      callback: (e) => setDATA(e),
      loading: (e) => setLoading(e),
    });
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={{marginHorizontal: '5%', marginVertical: 10}}>
        <View style={Styles.imgvcomment}>
          {/* <Image
            style={Styles.imguser}
            source={require('../../assets/img/people.png')}></Image> */}
          <Text style={Styles.txtname}>{item.UserName}</Text>
          {/* <Text style={Styles.txtname}>{item.DateTime}</Text> */}
        </View>
        <Text style={Styles.txtdes}>{item.Message}</Text>
        <View
          style={{borderBottomWidth: 0.5, borderColor: 'grey', marginTop: 10}}
        />
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
          <Carousel
            // ref={(c) => { this._carousel = c; }}
            autoplay={true}
            loop={true}
            autoplayInterval={5000}
            // onSnapToItem={(index) => setitemindex(index)}
            data={props.route.params.Datas.Gallery}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={Styles.headermainscr}>
                  <MyImage
                    style={Styles.imgbackheader}
                    source={{
                      uri: BASE_URL_IMG + item.ImageName,
                    }}
                    resizeMode={'cover'}
                  />
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0.5}}
                    colors={['#3f62a4', 'transparent']}
                    // style={Styles.linearGradient}
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      top: 0,
                      zIndex: 2,
                    }}></LinearGradient>
                </View>
              );
            }}
            sliderWidth={width}
            // itemHeight={width * .1}
            itemWidth={width}></Carousel>
        </View>
        <View style={Styles.commentbox}>
          <View style={Styles.addrate}>
            <View style={Styles.rateview}>
              <Rating itm={itm} setitm={setitm} />
            </View>
            <TouchableOpacity
              onPress={() =>
                AddMyComment({
                  loading: (e) => setLoading(e),
                  EventId: props.route.params.Datas.Id,
                  Message,
                  AvgRate: itm,
                  callback: () => {
                    setMessage('');
                    getListComment({
                      EventId: props.route.params.Datas.Id,
                      callback: (e) => setDATA(e),
                    });
                  },
                })
              }
              style={Styles.addtouch}>
              <Text style={Styles.txtaddcomment}>ADD</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.boxcomment}>
            <TextInput
              placeholder={'add your comment...'}
              placeholderTextColor={'#94959a'}
              numberOfLines={Platform.OS === 'ios' ? null : 3}
              minHeight={Platform.OS === 'ios' && 3 ? 20 * 3 : null}
              value={Message}
              onChangeText={(e) => {
                setMessage(e);
              }}
              style={Styles.txtinp}></TextInput>
            <Text style={Styles.posttxt}>Post</Text>
          </View>
          <View style={Styles.usercomm}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={DATA}
              renderItem={renderItem}></FlatList>
          </View>
        </View>
        <View style={{height: height * 0.1}} />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={Loading}
        // onRequestClose={() => {
        //   setModalVisible(false);
        // }}
      >
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

export default AddComment;
