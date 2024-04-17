import React from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import ContactListEvent from '../../component/ContactListEvent/index';
import Header from '../../component/Header/index';
import Styles from './Stayles';
const { width, height } = Dimensions.get('screen');
const RegisterChat = (props) => {

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
      <View style={Styles.headermainscr}>
        <Header navigation={props.navigation}
          homepress={() => props.navigation.replace('MainScreenEvent')}
          notif={() => props.navigation.navigate('Notifications')}
          iconright={9}
          backcolor={1}
          iconhome={1}
          menuonpress={() => props.setPosi(!props.posi)}></Header>
      </View>
      {/* <View style={Styles.viewtxtinp}>
        <View style={Styles.txtinpheader}>
          <TextInput
            style={Styles.txtinp}
            placeholderTextColor={'#6694fc'}
            placeholder={'Find Registered'}></TextInput>
          <TouchableOpacity style={Styles.txtinptouch}>
            <Icon
              name={'search1'}
              type={'AntDesign'}
              style={Styles.menutxtinpIcon}></Icon>
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={{ width, height: '85%' }}>
        <ContactListEvent
          navigation={props.navigation}
        //  chatscr={() => props.navigation.navigate('ChatScreen')}
        />
        <View style={{ height: height * 0.15 }} />
      </View>
    </View>
  );
};

export default RegisterChat;
