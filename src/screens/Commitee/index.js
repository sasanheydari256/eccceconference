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
  TextInput,
  Modal,
} from 'react-native';
import {Icon} from 'native-base';
import {Spinner} from 'native-base';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import {request, requestGET, BASE_URL_IMG} from '../../component/services';
const {width, height} = Dimensions.get('screen');
const Commitee = (props) => {
  const [Datas, setDatas] = useState([]);
  const [Count, setCount] = useState(500);
  const [Page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    // props.start?.();
    // alert('hiiiiii');
    // alert(JSON.stringify(props.route.params));
    GetEventCommitee(props.route.params?.Id);
  }, []);

  const GetEventCommitee = (Id) => {
    // console.log(JSON.stringify(props));
    request(
      'POST',
      'GetEventCommitee',
      {Id, Count, Page},
      () => {},
      () => {},
      (response) => {
        // alert(JSON.stringify(response));
        if (response.Result == 'Success') {
          setDatas(response.Answer);
        }
        setModalVisible(false);
      },
      (err) => {
        // console.log(JSON.stringify(err));
        setModalVisible(false);
      },
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Subdivision', {
            Id: item.Id,
            Title: item.Title,
          })
        }
        key={index}
        style={Styles.touchflatmain}>
        <View style={{height: '70%'}}>
          <Image
            resizeMode={'stretch'}
            style={Styles.imgcommitee}
            source={{uri: BASE_URL_IMG + item.Image}}></Image>
        </View>
        <View style={Styles.touchview}>
          <Text style={Styles.txttitle}>{item.Title}</Text>
          <View style={Styles.imgview}>
            <Image
              style={{height: '100%', width: '100%'}}
              resizeMode={'contain'}
              source={require('../../assets/img/arrow.png')}></Image>
          </View>
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
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      <View style={Styles.headermainscr} />
      {/* <View style={Styles.viewtxtinp}>
        <View style={Styles.txtinpheader}>
          <TextInput
            style={Styles.txtinp}
            placeholder={'Find Commitee'}
            placeholderTextColor={'#bab9bf'}></TextInput>
          <TouchableOpacity style={Styles.txtinptouch}>
            <Icon
              name={'search1'}
              type={'AntDesign'}
              style={Styles.menutxtinpIcon}></Icon>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={Styles.touchfilter}>
          <Image
            resizeMode={'contain'}
            style={Styles.filterpng}
            source={require('../../assets/img/filter.png')}></Image>
        </TouchableOpacity>
      </View> */}
      <View style={{width, height: '90%', marginTop: 15}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Datas}
          renderItem={renderItem}></FlatList>
        <View style={{height: height * 0.17}} />
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

export default Commitee;
