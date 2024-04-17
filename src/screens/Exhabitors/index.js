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
  TextInput,
  Modal,
} from 'react-native';
import { Icon, Spinner } from 'native-base';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import { request, MyImage, BASE_URL_IMG } from '../../component/services';
const { width, height } = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';

const Exhabitors = (props) => {
  const [Datas, setDatas] = useState([]);
  const [Count, setCount] = useState(100);
  const [Page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedList, setSelectedList] = useState('');
  useEffect(() => {
    GetEventExhibitorList(props.route.params.Id);
  }, []);

  const GetEventExhibitorList = (Id) => {
    request(
      'POST',
      'GetEventExhibitor',
      { Id: 82, Count, Page },
      () => { },
      () => { },
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

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ExhabitorsDetails', { Id: item.Id })
        }
        style={Styles.touchflatmain}>
        <View style={{ width: '35%', height: '100%' }}>
          {/* <View style={Styles.numroom}>
            <Text style={Styles.numberroom}>{item.Code}</Text>
          </View> */}
          <Image
            resizeMode={'stretch'}
            style={{
              width: '80%',
              height: '100%',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              overflow: 'hidden',
              alignSelf: 'center'
            }}
            source={{ uri: BASE_URL_IMG + item.Image }}></Image>

        </View>
        <View style={Styles.flatcontainname}>
          <View style={{ height: '100%',paddingVertical:4 }}>
            <Text style={Styles.titlename}>{item.Title}</Text>

          </View>
          <View style={Styles.bottcarevents}>
            <View style={Styles.reeventbott}>
              <View style={Styles.hallicon}>
                {/* <Icon
                  style={{ fontsize: 28 }}
                  name={'university'}
                  type={'FontAwesome'}
                /> */}
              </View>
              <Text style={Styles.txtcareventdate}>{item.HallName}</Text>
            </View>
            <View style={Styles.addevedate}>
              <View style={Styles.hallicon}>
                {/* <Image
                  style={Styles.imgbottcarevents}
                  resizeMode={'contain'}
                  source={require('../../assets/img/location.png')}></Image> */}
              </View>
              {/* <Text style={Styles.txtcareventdate}>Gold</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemList = ({ item, index }) => {
    return item.Name != 'Registeration' ? (
      <TouchableOpacity
        onPress={() => {
          !item.IsChairMan
            ? props.navigation.navigate('Program', {
              Name: item.Name,
              Image: item.Image,
              SessionId: item.SessionId,
              StartTime: item.Start,
              StartDay: item.Day,
              Description: item.Description,
            })
            : props.navigation.navigate('Chairmans', {
              items: Chearman,
              Title: 'Chairman Speech',
            });
        }}
        key={index}
        style={[Styles.touchoricomm, { marginBottom: 20 }]}>
        <View
          style={[
            Styles.timeview,
            { backgroundColor: item.Colore ? item.Colore : '#b34180' },
          ]}>
          <Text style={Styles.touchtxt}>{item.Start}</Text>
          <Text style={Styles.touchtxt}>{item.Expire}</Text>
        </View>
        <View style={[Styles.programtxt, { paddingVertical: 10 }]}>
          <Text
            // onPress={() => {
            //   item.Name != 'register' && props.navigation.navigate('Program', {
            //     Name: item.Name,
            //     Image: item.Image,
            //     SessionId: item.SessionId
            //   })
            // }}
            style={Styles.txttitle}>
            {item.Name ? item.Name : 'Chairman Speech'}
          </Text>
          <Text numberOfLines={1} style={Styles.txttitledes}>
            {item.Hall}
          </Text>
        </View>
        {item.Name != 'Registeration' && (
          <View style={Styles.arroeright}>
            <Image
              resizeMode={'contain'}
              style={Styles.arrowimg}
              source={require('../../assets/img/arrowleft.png')}></Image>
          </View>
        )}
      </TouchableOpacity>
    ) : (
      <View key={index} style={[Styles.touchoricomm, { marginBottom: 20 }]}>
        <View
          style={[
            Styles.timeview,
            { backgroundColor: item.Colore ? item.Colore : '#b34180' },
          ]}>
          <Text style={Styles.touchtxt}>{item.Start}</Text>
          <Text style={Styles.touchtxt}>{item.Expire}</Text>
        </View>
        <View style={[Styles.programtxt, { paddingVertical: 10 }]}>
          <Text
            // onPress={() => {
            //   item.Name != 'register' && props.navigation.navigate('Program', {
            //     Name: item.Name,
            //     Image: item.Image,
            //     SessionId: item.SessionId
            //   })
            // }}
            style={Styles.txttitle}>
            {item.Name}
          </Text>
          <Text numberOfLines={1} style={Styles.txttitledes}>
            {item.Hall}
          </Text>
        </View>
        {item.Name != 'Registeration' && (
          <View style={Styles.arroeright}>
            <Image
              resizeMode={'contain'}
              style={Styles.arrowimg}
              source={require('../../assets/img/arrowleft.png')}></Image>
          </View>
        )}
      </View>
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
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      {/* header top */}
      <View style={{ height: '10%' }}>
        <View style={Styles.headermainscr}>
          {/* <MyImage
            style={{ width: '100%', height: '100%' }}
            source={
              require('../../assets/img/Expo-illo.jpg')
            }
            resizeMode={'stretch'}
          /> */}

        </View>

      </View>
      {/* title */}
      <View style={{ backgroundColor: '#f0f4fd', height: '1%' }}>
        <View style={{ padding: '2%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}> </Text>
        </View>

      </View>

      {/* list */}

      <View style={{ backgroundColor: '#fff', height: '40%' }}>
        <View style={Styles.descview}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={Datas}
            renderItem={renderItem}></FlatList>
        </View>
        <View style={{ height: height * 0.05 }} />
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

export default Exhabitors;
