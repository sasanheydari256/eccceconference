import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import Styles from './Styles';
import {BASE_URL_IMG, getDay} from '../services';
const {width, height} = Dimensions.get('screen');

export const PrevListChange = (props) => {
  const {DATA2, checkLogin} = props;
  const [changewindow, setChangewindow] = useState(false);
  const [Email, setEmail] = useState('');
  useEffect(() => {
    // setChangewindow(!changewindow);
    // Alert.alert(JSON.stringify(props));
  }, []);

  const renderitem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          checkLogin(
            item.Id,
            BASE_URL_IMG + item.Image,
            item.Splash,
            item.SplshText,
            item.SplashAds,
            item.SplashAdsLink,
            item,
          )
        }
        style={Styles.commitecar}>
        <Image
          resizeMode={'stretch'}
          style={Styles.imgcommite}
          source={{uri: BASE_URL_IMG + item?.Image}}
        />
        <View style={Styles.addeventstitle}>
          <Text>{item.Name}</Text>
          <Text style={Styles.titletxt}>
            {item.Country && `${item.Country}, ${item.City}`}
          </Text>
          <Text style={Styles.datetxt}>{getDay(item.Day)}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderitemone = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          checkLogin(
            item.Id,
            BASE_URL_IMG + item.Image,
            item.Splash,
            item.SplshText,
            item.SplashAds,
            item.SplashAdsLink,
            item,
          )
        }
        style={Styles.horiztouch}>
        <View style={Styles.horiztopview}>
          <Image
            //   resizeMode={'cover'}
            style={Styles.horizimgcommite}
            source={{uri: BASE_URL_IMG + item?.Image}}
            resizeMode={'stretch'}
          />
          <View style={Styles.addeventstitle}>
            <Text style={{width: width / 1.5}}>{item.ShortName}</Text>
            <Text style={Styles.titletxt}>
              {item.Country && `${item.Country}, ${item.City}`}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={Styles.imgbottcareventssec}
                resizeMode={'contain'}
                source={require('../../assets/img/date.png')}
              />
              <Text style={Styles.datetxt}>{getDay(item.Day)}</Text>
            </View>
          </View>
        </View>
        <View style={Styles.horizbottomview}>
          {/* <Text>{item.Countregistration} interested</Text> */}
          {/* <Text>{props.idanytype?.LoginNumber}</Text> */}
          <View style={Styles.horizrighticon}>
            {/* <Icon name={'forward'} type={'Entypo'} style={Styles.forwadicon} />

            <Icon
              name={'bookmark'}
              type={'Fontisto'}
              style={Styles.forwadicon}
            /> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const RenderIcon = () => {
    if (changewindow) {
      return (
        <Icon
          // onPress={() => CloseSearch()}
          name={'windows'}
          type={'AntDesign'}
          style={Styles.windowicon}
        />
      );
    } else {
      return (
        <Icon
          // onPress={() => CloseSearch()}
          name={'windowso'}
          type={'AntDesign'}
          style={Styles.windowicon}
        />
      );
    }
  };
  return (
    <View style={{height: height * 0.55}}>
      <View style={Styles.windowiconview}>
        <TouchableOpacity onPress={() => setChangewindow((past) => !past)}>
          <RenderIcon />
        </TouchableOpacity>
      </View>
      <View>
        {changewindow ? (
          <FlatList
            numColumns={2}
            key={'_'}
            // onRefresh={() => this._getList(active)}
            // refreshing={loading}
            // onEndReached={!end && _handleLoadMore}
            // onEndReachedThreshold={0.5}
            initialNumToRender={5}
            keyExtractor={(item, index) => `${index}`}
            style={{marginHorizontal: 10}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={DATA2}
            // data={DATA}
            renderItem={renderitem}
          />
        ) : (
          <FlatList
            key={'#'}
            // onRefresh={() => this._getList(active)}
            // refreshing={loading}
            // onEndReached={!end && _handleLoadMore}
            // onEndReachedThreshold={0.5}
            initialNumToRender={5}
            keyExtractor={(item, index) => `${index}`}
            style={{marginLeft: 10}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // horizontal={true}
            data={DATA2}
            // data={DATA2}
            renderItem={renderitemone}
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrevListChange);
