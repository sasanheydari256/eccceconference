import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 10, 12, 14, 16, 18, 20] : [9, , 12, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  textmainscrsec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  txtmscrhead: {
    fontFamily: 'IRANSans-Bold',
    fontWeight: 'bold',
    color: '#413d3a',
    fontSize: fontsizes[3],
  },
  viewall: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
    fontWeight: 'bold',
    color: '#2F9FD5',
    textDecorationLine: 'underline',
  },
  commitecar: {
    backgroundColor: '#FFFF',
    // borderRadius: 10,
    height: height * 0.1,
    alignItems: 'center',
  },
  imgcommite: {
    height: '60%',
    width: '30%',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  titletxt: {
    fontSize: fontsizes[2],
    fontFamily: 'IRANSans-bold',
    marginTop: 5,
  },
  desctxt: {
    fontSize: fontsizes[0],
    fontFamily: 'IRANSans',
    color: 'grey',
  },
});
