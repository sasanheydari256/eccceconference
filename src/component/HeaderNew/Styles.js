import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import {Colors} from '../services/Colors';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680
    ? [9, 12, 14, 16, 18, 20, 24, 26, 30]
    : [9, 14, 16, 18, 20, 24, 26, 28, 32];
const IconSize =
  width < 680 ? [34, 32, 30, 28, 26, 24, 20] : [36, 34, 32, 30, 28, 26, 22];
export default StyleSheet.create({
  NewHmainview: {
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: 'flex-end',
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  NewHleftview: {
    flexDirection: 'row-reverse',
  },
  NewHcenterview: {
    textAlign: 'center',
  },
  NewHarrowbackimg: {
    height: height * 0.02,
    width: width * 0.08,
  },
  NewHpagename: {
    width: '40%',
    // backgroundColor: 'red',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: height * 0.062,
  },
  NewHHomeIcon: {
    height: '60%',
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
  },
  viewheadericon: {
    // backgroundColor: '#3e52c8',
    marginRight: 5,
    // paddingHorizontal: 2,
    // paddingVertical: 8,
    // borderRadius: 8,
  },
});