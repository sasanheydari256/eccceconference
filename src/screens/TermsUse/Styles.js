import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 10, 12, 14, 16, 18, 20] : [9, , 12, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  boxview: {
    // backgroundColor: '#FFFF',
    // width: width * 0.95,
    // height: height * 0.4,
    // alignSelf: 'center',
    height,
    // paddingTop: 30,
    // paddingLeft: 10,
  },
  termsTitle: {
    fontSize: fontsizes[5],
    fontFamily: 'IRANSans-bold',
    marginBottom: 3,
    marginTop: 30,
  },
});
