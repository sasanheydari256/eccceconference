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
import {Icon, Spinner} from 'native-base';
import Header from '../../component/Header/index';
import Styles from './Styles';
import {request, requestGET, BASE_URL_IMG} from '../../component/services';

const {width, height} = Dimensions.get('screen');
const index = (props) => {
  const [Datas, setDatas] = useState(props.route.params.item.Members);
  const [Count, setCount] = useState(1000);
  const [Page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // props.start?.();
    // alert(JSON.stringify(props.route.params.item.Members));
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('DetailSubDiv', {
            item,
            Title: 'rrr',
          })
        }
        style={Styles.touchflatmain}>
        <View style={Styles.itemsview}>
          <Image
            resizeMode={'cover'}
            style={Styles.userimg}
            source={{uri: BASE_URL_IMG + item.Image}}
          />
        </View>
        <View style={Styles.itemsleftview}>
          <Text style={Styles.titlename}>
            {item.UserPreFix}
            {item.Name}
          </Text>
          <View style={Styles.bottcarevents}>
            <View style={Styles.reeventbott}>
              <Image
                style={Styles.imgbottcarevents}
                resizeMode={'contain'}
                source={require('../../assets/img/Nationality.png')}
              />
              <Text style={Styles.txtcareventdate}>{item.Country}</Text>
            </View>
            <View style={Styles.reeventbott}>
              <Image
                style={Styles.imgbottcarevents}
                resizeMode={'contain'}
                source={require('../../assets/img/JobRank.png')}
              />
              <Text style={Styles.txtcareventdate}>{item.Position}</Text>
            </View>
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
        // notif={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <View style={Styles.headermainscr}></View>
      <View style={Styles.viewtxtinp}>
        <View style={Styles.txtinpheader}>
          <View style={{height: 20}} />
          {/* <TextInput
            style={Styles.txtinp}
            placeholderTextColor={'#cccccc'}
            placeholder={'Find Events'}>
            {' '}
          </TextInput> */}
          {/* <TouchableOpacity style={Styles.txtinptouch}>
            <Icon
              name={'search1'}
              type={'AntDesign'}
              style={Styles.menutxtinpIcon}></Icon>
          </TouchableOpacity> */}
        </View>
        {/* <TouchableOpacity style={Styles.touchfilter}>
          <Image
            resizeMode={'contain'}
            style={Styles.filterpng}
            source={require('../../assets/img/filter.png')}></Image>
        </TouchableOpacity> */}
      </View>
      <View style={{width, height: '77%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Datas}
          renderItem={renderItem}
        />
      </View>
      <View style={{height: height * 0.5}} />
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
