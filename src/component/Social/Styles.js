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
    height: height * 0.25,
    // marginHorizontal: 15,
    // backgroundColor: 'red',
    // paddingHorizontal: 15,
  },
  imgview: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  imgcommite: {
    width: '20%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 50,
  },
  topheader: {
    height: height * 0.05,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  nametxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[1],
  },
  datetxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[0],
    color: 'grey',
  },
  mainview: {
    // margin: 10,
    height: '60%',
    // backgroundColor: 'red',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 5,
  },
  maintitletxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[0],
  },
  twiterbtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    width: '50%',
    marginLeft: 15,
    marginVertical: 5,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitertxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[0],
    marginLeft: 4,
  },
});
