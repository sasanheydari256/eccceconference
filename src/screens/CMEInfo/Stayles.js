import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  mainscrview: {
    backgroundColor: '#f0f4fd',
    height,
  },
  animindex: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DB2227',
    overflow: 'hidden',
  },
  arbtnimg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  headermainscr: {
    height: height * 0.4,
    width,
    borderBottomLeftRadius: (width * 8) / 100,
    borderBottomRightRadius: (width * 8) / 100,
    overflow: 'hidden',
    backgroundColor: '#eaeef7',
    zIndex: 2,
  },
  imgbackheader: {
    height: '100%',
    width: '100%',
    // borderBottomLeftRadius: (width * 10) / 100,
    // borderBottomRightRadius: (width * 10) / 100,
    // overflow: 'hidden',
  },
  linearGradient: {
    height: '20%',
    width: '100%',
    // height: 90,
    position: 'absolute',
    top: 0,
    zIndex: 7,
    opacity: 0.2,
  },
  txtbookm: {
    fontSize: fontsizes[4],
    fontFamily: 'IRANSANS',
    color: '#bababa',
  },
  bookview: {
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
    alignSelf: 'center',
    // marginHorizontal: width * 0.05,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 17,
    top: height * 0.35,
    position: 'absolute',
    zIndex: 2,
  },
  addcomm: {
    backgroundColor: '#2F9FD5',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtaddcomm: {
    fontSize: fontsizes[2],
    fontFamily: 'IRANSANS',
    color: '#FFFF',
  },
  namedetail: {
    fontSize: fontsizes[4],
    fontFamily: 'IRANSANS',
  },
  viewnamedetail: {
    marginTop: height * 0.05,
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  infoimg: {
    width: '80%',
    height: '70%',
  },
  imgview: {
    width: width * 0.2,
    height: height * 0.08,
    flexDirection: 'column',
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  txticon: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[0],
    color: '#DB2227',
    marginTop: 2,
  },

  bottcarevents: {
    flexDirection: 'row',
    padding: 5,
    // backgroundColor: 'red',
    // justifyContent: 'space-between',
  },
  reeventbott: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  imgbottcarevents: {
    width: width * 0.07,
    height: height * 0.04,
    marginHorizontal: 5,
  },
  txtcareventdate: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
    color: '#a6aaab',
  },
  addevedate: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginLeft: 15,
    paddingHorizontal: 15,
  },
  biotxt: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
    color: '#a6aaab',
    paddingVertical: 5,
  },
  biodestxt: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
    color: '#b6b6b6',
  },
  descview: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFF',
    marginHorizontal: width * 0.05,
    borderRadius: 10,
    marginTop: 20,
    top: (12 * height) / 100,
  },
  borderbott: {
    width: width * 0.9,
    borderBottomWidth: 0.5,
    borderBottomColor: '#b6b6b6',
    alignSelf: 'center',
  },
  membertxt: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[3],
    color: '#a6aaab',
    paddingVertical: 10,
  },
  touchoricomm: {
    // backgroundColor: '#57c9fd',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: width * 0.1,
    borderRadius: 5,
  },
  backtouchimg: {
    paddingHorizontal: width * 0.1,
    height: '100%',
    marginHorizontal: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  touchtxt: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[5],
    color: '#FFFF',
  },
  arbtn: {
    position: 'absolute',
    zIndex: 4,
    right: 0,
    top: height * 0.8,
    width: 60,
    height: 50,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#6561fc',
    overflow: 'hidden',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 5,
  },
  arimgbtn: {
    width: '100%',
    height: '100%',
    // borderRadius: 30,
    // borderRadius: width * 0.1,
  },
});