import {Link} from '@react-navigation/native';
import {Icon} from 'native-base';
import React from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import News from '../NewsLetter';
import {BASE_URL_IMG} from '../services';
import Styles from './Styles';
const {width, height} = Dimensions.get('screen');

export const index = (props) => {
  return (
    <View>
      <View style={Styles.textmainscrsec}>
        <Text style={Styles.txtmscrhead}>Social</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SocialMedia')}>
          <Text style={Styles.viewall}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: 10}}>
        <Carousel
          // ref={(c) => { this._carousel = c; }}
          autoplay={false}
          loop={true}
          // onSnapToItem={(index) => setitemindex(index)}
          data={props.Datas.Committee}
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
                <View style={Styles.topheader}>
                  <Image
                    resizeMode={'cover'}
                    style={Styles.imgcommite}
                    source={{uri: BASE_URL_IMG + item.Image}}
                  />
                  <View style={Styles.imgview}>
                    <Text style={Styles.nametxt}>MeetUps Event</Text>
                    <Text style={Styles.datetxt}>
                      {new Date().toLocaleString()}
                    </Text>
                  </View>
                </View>
                <View style={Styles.mainview}>
                  <Text style={Styles.maintitletxt}>
                    Digital fingerpints of a milion child abuse
                  </Text>
                  <Text style={Styles.maintitletxt}>
                    images made{' '}
                    <Link style={{color: 'blue'}}>https://t.co/</Link>
                  </Text>
                </View>
                <View>
                  <TouchableOpacity style={Styles.twiterbtn}>
                    <Image
                      source={require('../../assets/img/twitter.png')}
                      style={{width: 10, height: 10}}
                    />
                    <Text style={Styles.twitertxt}>View on Twitter</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
          // layout={'tinder'}
          // layoutCardOffset={`18`}
          sliderWidth={width}
          itemWidth={width * 0.5}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
