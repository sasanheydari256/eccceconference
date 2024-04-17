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
    marginTop: 10,
  },
  txtmscrhead: {
    fontFamily: 'IRANSans-Bold',
    fontWeight: 'bold',
    color: '#413d3a',
    fontSize: fontsizes[5],
  },
  viewall: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[4],
    fontWeight: 'bold',
    color: '#2F9FD5',
    textDecorationLine: 'underline',
  },
  commitecar: {
    backgroundColor: '#FFFF',
    borderRadius: 10,
    justifyContent: 'center',
    // height: height * 0.25,
    // marginHorizontal: 15,
    // backgroundColor: 'red',
    // paddingHorizontal: 15,
  },
  imgcommite: {
    // width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
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
    fontSize: IconSize[4],
  },
  addeventstitle: {
    flexDirection: 'row',
    // paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'red',
  },
  bottomview: {
    paddingHorizontal: 10,
    height: '20%',
    justifyContent: 'center',
  },
  desctxt: {
    color: 'grey',
    fontSize: fontsizes[1],
    fontFamily: 'IRANSans',
    marginVertical: 2,
  },
  datetxt: {
    color: 'grey',
    fontSize: fontsizes[0],
    fontFamily: 'IRANSans',
  },
  titletxt: {
    fontSize: fontsizes[2],
    fontFamily: 'IRANSans-bold',
  },
  readtxt: {
    color: '#1F1E60',
    fontSize: fontsizes[1],
    fontFamily: 'IRANSans-bold',
  },
});
