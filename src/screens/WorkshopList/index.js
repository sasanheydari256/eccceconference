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
  Modal,
  TextInput,
} from 'react-native';
import {Icon, Spinner} from 'native-base';
import Header from '../../component/Header/index';
import Styles from './Styles';
import {request, requestGET, BASE_URL_IMG} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
const {width, height} = Dimensions.get('screen');
const index = (props) => {
  const [Datas, setworkshops] = useState([]);
  const [Count, setCount] = useState(500);
  const [modalVisible, setModalVisible] = useState(true);
  const [Page, setPage] = useState(1);
  useEffect(() => {
    // alert('hiiii');
    // alert(JSON.stringify(props));
    GetWorkShopAnyEvent();
  }, []);

  const GetWorkShopAnyEvent = async () => {
    let EventId = await AsyncStorage.getItem('eventId');
    let Token = await AsyncStorage.getItem('Token');
    request(
      'POST',
      'GetWorkShopAnyEvent',
      {
        EventId,
        Token,
      },
      () => {},
      () => {},
      async (e) => {
        setModalVisible(false);
        // alert(JSON.stringify(e.Answer));
        if (e.Result == 'Success') {
          setworkshops(e.Answer);
        }
      },
      (e) => {
        setModalVisible(false);
        // console.log(e)
      },
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('WorkShop', {Id: item.Id, item})
        }
        style={Styles.touchflatmain}>
        <View style={{width: '35%', height: '100%'}}>
          <Image
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: '100%',
              // borderTopLeftRadius: 20,
              // borderBottomLeftRadius: 20,
              overflow: 'hidden',
            }}
            source={{uri: BASE_URL_IMG + item.Image}}
          />
        </View>
        <Text
          style={{
            position: 'absolute',
            bottom: 5,
            right: 5,
            backgroundColor: '#FFFF',
            borderRadius: 5,
            fontFamily: 'IRANSans-Bold',
            padding: 3,
            color: 'grey',
            fontSize: 12,
          }}>
          {item.Category}
        </Text>
        <View style={Styles.flatcontainname}>
          <Text style={Styles.titlename}>{item.Name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={Styles.mainscrview}>
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
      <View style={Styles.headermainscr}></View>
      {/* <View style={Styles.viewtxtinp}>
        <View style={Styles.txtinpheader}>
          <TextInput
            style={Styles.txtinp}
            placeholderTextColor={'#bcbbc9'}
            placeholder={'Find Events'}></TextInput>
          <TouchableOpacity style={Styles.txtinptouch}>
            <Icon
              name={'search1'}
              type={'AntDesign'}
              style={Styles.menutxtinpIcon}></Icon>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={Styles.touchfilter}>
          <Image
            style={Styles.filterpng}
            resizeMode={'contain'}
            source={require('../../assets/img/filter.png')}></Image>
        </TouchableOpacity>
      </View> */}
      <View style={{width, height: '80%', marginTop: 15}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Datas}
          renderItem={renderItem}
        />
        <View style={{height: height * 0.05}} />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
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

export default index;
