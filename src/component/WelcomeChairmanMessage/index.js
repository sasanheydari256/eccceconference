import React from 'react';
import {Text, View, Image, PixelRatio} from 'react-native';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import {BASE_URL_IMG} from '../services';
import AutoHeightWebView from '../services/autoHeightWebview';
import Styles from './Styles';

// DWMassage
export const index = (props) => {
  return (
    <View>
      <Text style={Styles.maintitletxt}>Welcome Chairman Message</Text>
      {/* {props.DWMassage.map((item, index) => ( */}
      <View style={Styles.boxview}>
        <View style={Styles.boxNameview}>
          <Image
            // source={require('../../assets/img/usercomm.png')}
            source={{uri: BASE_URL_IMG + props.DWMassage.ImageChairman}}
            style={Styles.welcomeuserimg}
          />
          <View style={Styles.boxpositionview}>
            <Text style={Styles.nametxt}>{props.DWMassage.ChairmanName}</Text>
            <Text style={Styles.positiontxt}>{props.DWMassage.Title}</Text>
          </View>
        </View>
        {/* <View style={{height: 50}}> */}
        <AutoHeightWebView
          scrollEnabled={false}
          // automaticallyAdjustContentInsets={false}
          source={{
            html:
              '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
              props.DWMassage.DescriptionChairman,
          }}
          style={{width: '90%', margin: 5, marginTop: 4}}
        />
        {/* </View> */}
        {/* <Text style={Styles.describetxt}>
          {props.DWMassage.DescriptionChairman}
        </Text> */}
      </View>
      {/* ))} */}
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
