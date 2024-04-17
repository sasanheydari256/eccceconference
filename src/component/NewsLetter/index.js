import {Icon} from 'native-base';
import React from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import {BASE_URL_IMG, HtmlOneLine} from '../services';
import Styles from './Stayles';
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
          {props.workshop}
          {props.mediaPartner}
          {props.News}
        </Text>
        {/* <Text
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
        </Text> */}
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
                  props.navigation.navigate('NewsDetails', {
                    item,
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
                      height: props.News ? '50%' : '60%',
                    },
                  ]}
                  source={{uri: BASE_URL_IMG + item.Image}}
                />
                <View style={Styles.addeventstitle}>
                  {props.News ? (
                    <Text></Text>
                  ) : (
                    <View style={Styles.addeventsdatearrow}>
                      <Icon
                        name={'keyboard-arrow-right'}
                        type={'MaterialIcons'}
                        style={Styles.arrowright}
                      />
                    </View>
                  )}
                </View>
                {props.News ? (
                  <View style={Styles.bottomview}>
                    <Text style={Styles.datetxt}>{item.DateTime}</Text>
                    <Text style={Styles.titletxt}>{item.Title}</Text>
                    <Text style={Styles.desctxt} numberOfLines={1}>
                      {HtmlOneLine(item.Description)}
                    </Text>
                    {/* <WebView
                      originWhitelist={['*']}
                      source={{html: item.Description}}
                    /> */}
                    <Text style={Styles.readtxt}>Read More</Text>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </TouchableOpacity>
            );
          }}
          // layout={'tinder'}
          // layoutCardOffset={`18`}
          sliderWidth={width}
          itemWidth={props.News ? width * 0.5 : width * 0.3}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
