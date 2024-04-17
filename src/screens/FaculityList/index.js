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
} from 'react-native';
// import { Icon } from 'native-base';
import Contactlist from '../../component/ContactList/index';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import {request, requestGET, BASE_URL_IMG} from '../../component/services';
const {width, height} = Dimensions.get('screen');
const FaculityList = (props) => {
  const [Count, setCount] = useState(10);
  const [Page, setPage] = useState(1);
  useEffect(() => {
    // props.start?.();
    // alert(JSON.stringify(props.route.params));
  }, []);

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
            placeholderTextColor={'#6694fc'}
            placeholder={'Find Speakers'}></TextInput>
          <TouchableOpacity style={Styles.txtinptouch}>
            <Icon
              name={'search1'}
              type={'AntDesign'}
              style={Styles.menutxtinpIcon}></Icon>
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={{width, height: '82%'}}>
        <Contactlist
          // Datas={Datas}
          EventName={props.route.params.EventName}
          Id={props.route.params.Id}
          headerspeaker={1}
          arrow={1}
          navigation={props.navigation}
          // speaker={() => props.navigation.navigate('Speakers')}
        />
        <View style={{height: height * 0.15}} />
      </View>
    </View>
  );
};

export default FaculityList;
