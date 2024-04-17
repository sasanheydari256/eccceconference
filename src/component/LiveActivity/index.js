import AsyncStorage from  '@react-native-async-storage/async-storage'
import {Icon} from 'native-base';
import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import News from '../NewsLetter';
import {BASE_URL_IMG} from '../services';
import Styles from './Styles';
const {width, height} = Dimensions.get('screen');

export const index = (props) => {
  useEffect(() => {
    // alert(JSON.stringify(props.route.params));
  }, []);

  return (
    <View>
      <View style={Styles.textmainscrsec}>
        <Text style={Styles.txtmscrhead}>Live Activity</Text>
      </View>
      <TouchableOpacity
        // onPress={() => {
        //   // Linking.openURL(`https://${props.Datas?.LiveLink1}`).then(() => {
        //   //   Linking.openURL(item.Link);
        //   //   // (error) => alert(error),}
        //   // });
        // }}

        onPress={async () => {
          const Token = await AsyncStorage.getItem('Token');
          const Types = await AsyncStorage.getItem('Type');
          // console.log(JSON.stringify({ EmailFrom: Token, EmailTo }))
          if (Token !== null && Token !== undefined && Token !== '') {
            // alert(Types)
            if (Types == 'Physical') {
              alert(
                'You are registered as physical, you can not see the live session',
              );
              // let ID = await AsyncStorage.getItem('eventId')
              // props.navigation.navigate('EventsTime2', {
              //   infoName: Datas.Name,
              //   infoDesc: Datas.Description,
              //   Id: ID,
              //   ImageGallery: Datas.Gallery
              // })
            } else {
              let ID = await AsyncStorage.getItem('eventId');
              props.navigation.navigate('LiveSelection', {
                infoName: props.Datas.Title,
                infoDesc: '',
                Id: ID,
                ImageGallery: props.Datas.Gallery,
              });
            }
          } else {
            setModalVisible(false);
            Alert.alert(
              'Log In to Register',
              'Log in to your account to register for this event',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel '),
                  style: 'cancel',
                },
                {
                  text: 'Log In',
                  onPress: () =>
                    props.navigation.navigate('Qrcode', {PageNum: 0}),
                },
              ],
              {cancelable: false},
            );
          }
          // alert('hh')
        }}
        style={{poverflow: 'hidden', borderRadius: 20}}>
        <View style={Styles.topview}>
          <Image
            source={require('../../assets/img/live.png')}
            // source={{
            //   uri: BASE_URL_IMG + props.Datas.LiveActivity?.Image,
            // }}
            style={Styles.topimg}
          />

          <View style={Styles.liveactivview}>
            <Text style={Styles.liveactivtoptitle}>
              {props.Datas.LiveActivity?.Title}
            </Text>
            <View style={Styles.liveactiveLectureView}>
              <View style={Styles.imfacultview}>
                <Image
                  style={{width: 40, height: 40, borderRadius: 80}}
                  source={{
                    uri: BASE_URL_IMG + props.Datas.LiveActivity?.FacultyImage,
                  }}
                />
              </View>
              <Text style={Styles.liveactivfacultxt}>
                {props.Datas.LiveActivity?.FacultyName}
              </Text>
            </View>
          </View>
        </View>
        {/* <Video
          source={require('../../assets/E-2.mp4')}
          style={Styles.video}
          muted={true}
          repeat={false}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        /> */}
        <Image
          // source={require('../../assets/img/live.png')}
          source={{
            uri: BASE_URL_IMG + props.Datas.LiveActivity?.Image,
          }}
          // style={Styles.topimg}
          style={Styles.video}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
