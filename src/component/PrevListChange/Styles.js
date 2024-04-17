import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import {Colors} from '../services/Colors';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [12, 14, 16, 18, 20, 9] : [14, 16, 18, 20, 24, 9];
const IconSize =
  width < 680 ? [34, 32, 30, 28, 26, 18] : [36, 34, 32, 30, 28, 2];
export default StyleSheet.create({
  windowicon: {},
  windowiconview: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 10,
  },
  commitecar: {
    backgroundColor: '#FFFF',
    borderRadius: 10,
    width: width * 0.45,
    borderColor: Colors.MedionLightGrey,
    borderWidth: 0.5,
    // height: height * 0.15,
    margin: 5,
  },
  imgcommite: {
    height: height * 0.1,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  horizimgcommite: {
    height: height * 0.1,
    width: '30%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  addeventstitle: {
    // flexDirection: 'row',
    // paddingTop: 10,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
  },
  addeventsdatearrow: {
    // flexDirection: 'column',
    backgroundColor: '#2F9FD5',
    position: 'absolute',
    right: 10,
    top: -20,
    // paddingHorizontal: 5,
    // paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowright: {
    color: '#FFFF',
    fontSize: IconSize[2],
  },
  bottomview: {
    paddingHorizontal: 10,
  },
  datetxt: {
    color: 'grey',
    fontSize: fontsizes[0],
    fontFamily: 'IRANSans',
  },
  titletxt: {
    fontSize: fontsizes[0],
    fontFamily: 'IRANSans',
  },
  readtxt: {
    color: '#1F1E60',
    fontSize: fontsizes[1],
    fontFamily: 'IRANSans-bold',
  },
  desctxt: {
    color: 'grey',
    fontSize: fontsizes[1],
    fontFamily: 'IRANSans',
    marginVertical: 2,
  },
  horiztouch: {
    width: width * 0.95,
    // height: height * 0.1,
    backgroundColor: '#FFFF',
    borderColor: Colors.MedionLightGrey,
    borderWidth: 0.5,
    borderRadius: 4,
    marginBottom: 4,
    paddingBottom: 0,
  },
  horiztopview: {
    flexDirection: 'row',
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1,
    marginBottom: 3,
    paddingBottom: 3,
  },
  horizbottomview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 0,
    paddingHorizontal: 4,
  },
  // iconview: {
  //   borderRightColor: 'grey',
  //   borderLeftColor: 'grey',
  //   borderRightWidth: 3,
  //   borderLeftWidth: 1,
  //   marginVertical: 0,
  // },
  forwadicon: {
    fontSize: IconSize[5],
    marginLeft: 3,
  },
  horizrighticon: {
    flexDirection: 'row',
  },
  imgbottcareventssec: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
});
