import React, { useState, useEffect } from 'react';
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
import { Icon, Spinner } from 'native-base';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import { request, requestGET, BASE_URL_IMG } from '../../component/services';
import AsyncStorage from '@react-native-async-storage/async-storage'
const { width, height } = Dimensions.get('screen');
const index = (props) => {
  const [Datas, setDatas] = useState([]);
  const [Count, setCount] = useState(500);
  const [modalVisible, setModalVisible] = useState(true);
  const [Page, setPage] = useState(1);
  useEffect(() => {
    // alert('hiiii');
    // alert(JSON.stringify(props));
    GetEventExhibitor();
  }, []);

  const GetEventExhibitor = async () => {
    let ID = await AsyncStorage.getItem('eventId');
    request(
      'POST',
      'GetSponsser',
      { Id: ID },
      () => { },
      () => { },
      (response) => {
        // alert(JSON.stringify(response));
        console.log(JSON.stringify(response));
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

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          // props.navigation.navigate('SponserDetail', {Id: item.Id})
          // props.navigation.navigate('Sponsers', { Id: item.Id })
          props.navigation.navigate('ExhabitorsDetails', { Id: item.Id })
        }
        style={Styles.touchflatmain}>
        <View style={{ width: '35%', height: '100%' }}>
          <Image
            resizeMode={'stretch'}
            style={{
              width: '100%',
              height: '100%',
              // borderTopLeftRadius: 20,
              // borderBottomLeftRadius: 20,
              overflow: 'hidden',
            }}
            source={{ uri: BASE_URL_IMG + item.Image }}
          />
        </View>
        <Text
          style={{
            position: 'absolute',
            right: 4,
            padding: 2,
            color: 'grey',
            fontSize: 18,
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
      <View style={{ width, height: '80%', marginTop: 15 }}>
        <ScrollView>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Datas}
            renderItem={renderItem}
          />
          <View style={{ height: height * 0.05 }} />
        </ScrollView>

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
          <Text style={{ color: 'white' }}>Loding ...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default index;
