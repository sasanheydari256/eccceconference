import {Icon} from 'native-base';
import React from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import News from '../NewsLetter';
import {BASE_URL_IMG} from '../services';
import Styles from './Styles';
const {width, height} = Dimensions.get('screen');

export const index = (props) => {
  return (
    <View>
      <View style={Styles.textmainscrsec}>
        <Text
          //   onPress={async () => {
          //     let ID = await AsyncStorage.getItem('eventId');
          //     // alert('hh')
          //     props.navigation.navigate('Sponsers', {
          //       infoName: props.Datas.Name,
          //       infoDesc: props.Datas.Description,
          //       Id: ID,
          //       ImageGallery: Datas.Gallery,
          //     });
          //   }}
          style={Styles.txtmscrhead}>
          Committees (show photos and name)
        </Text>
        <Text
          //   onPress={async () => {
          //     let ID = await AsyncStorage.getItem('eventId');
          //     // alert('hh')
          //     props.navigation.navigate('Sponsers', {
          //       infoName: props.Datas.Name,
          //       infoDesc: props.Datas.Description,
          //       Id: ID,
          //       ImageGallery: props.Datas.Gallery,
          //     });
          //   }}
          style={Styles.viewall}>
          View All
        </Text>
      </View>
      <View style={{marginVertical: 10}}>
        <Carousel
          // ref={(c) => { this._carousel = c; }}
          autoplay={false}
          loop={true}
          // onSnapToItem={(index) => setitemindex(index)}
          data={props.Datas}
          style={{marginHorizontal: 15}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Subdivision', {
                    Title: item.Title,
                    Id: item.Id,
                  })
                }
                style={Styles.commitecar}>
                <Image
                  //   resizeMode={'cover'}
                  style={Styles.imgcommite}
                  source={{uri: BASE_URL_IMG + item.Image}}
                  // source={require('../../assets/img/usercomm.png')}
                />
                <Text style={Styles.titletxt}>{item.Title}</Text>
                {/* <Text style={Styles.desctxt}>Marketing Director @ qualzem</Text> */}
              </TouchableOpacity>
            );
          }}
          // layout={'tinder'}
          // layoutCardOffset={`18`}
          sliderWidth={width}
          itemWidth={width * 0.35}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
