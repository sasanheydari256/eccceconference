import {Icon} from 'native-base';
import React from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import News from '../../component/NewsLetter';
import {BASE_URL_IMG} from '../../component/services';
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
          {/* {props.workshop}
          {props.mediaPartner}
          {props.News} */}
          Workshop
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
                  // Subdivision

                  props.navigation.navigate('WorkShop', {
                    // Title: item.Title,
                    // Id: item.WorkShopId,
                    item,
                    // dataworkshop: props.Datas,
                  })
                }
                style={[
                  Styles.commitecar,
                  {
                    height: props.News ? height * 0.25 : height * 0.15,
                    // width: props.News ? width * 0.8 : width * 0.5,
                  },
                ]}>
                <Image
                  resizeMode={'cover'}
                  style={[
                    Styles.imgcommite,
                    {
                      height: props.News ? '80%' : '80%',
                    },
                  ]}
                  source={{uri: BASE_URL_IMG + item.Image}}
                />
                <View style={Styles.addeventstitle}>
                  <View style={Styles.addeventsdatearrow}>
                    <Icon
                      name={'keyboard-arrow-right'}
                      type={'MaterialIcons'}
                      style={Styles.arrowright}
                    />
                  </View>
                </View>

                <View style={Styles.bottomview}>
                  <Text style={Styles.titletxt}>{item.Name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          // layout={'tinder'}
          // layoutCardOffset={`18`}
          sliderWidth={width}
          itemWidth={props.News ? width * 0.6 : width * 0.4}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
