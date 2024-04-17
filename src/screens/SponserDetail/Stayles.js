import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  mainscrview: {
    backgroundColor: '#f0f4fd',
    height: height,
  },
  imgview: {
    width: '15%', height: '100%'
  },
  titlename2: {
    color: 'grey',
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[1],
  },
  titlename: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
  },
  touchflatmain: {
    flexDirection: 'row',
    marginHorizontal: width * 0.05,
    height: height * 0.08,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFF',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  mainscrcarview: {
    backgroundColor: '#FFFF',
    height: height * 0.15,
    // width: width * 0.7,
    borderRadius: 15,
    overflow: 'hidden',
    // paddingHorizontal: 15,
  },
  imgcarmainscr: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  biotxt: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    color: 'black',
    paddingVertical: 5,
  },
  biotxt2: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#FFFF',
    marginBottom: 20
  },
  imgcarmainscr2: {
    width: '20%',
    height: '20%',

  },
  headermainscr: {
    height: height * 0.35,
    borderBottomLeftRadius: (width * 15) / 100,
    borderBottomRightRadius: (width * 15) / 100,
    backgroundColor: 'white',
    overflow: 'hidden',
    zIndex: 2,
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
  imgbackheader: {
    width: width,
    height: '100%',
    // borderBottomLeftRadius: (width * 10) / 100,
    // borderBottomRightRadius: (width * 10) / 100,
    overflow: 'hidden',
  },
  txtbookm: {
    fontSize: fontsizes[4],
    fontFamily: 'IRANSANS',
    color: '#bababa',
  },
  bookview: {
    flexDirection: 'column',
    backgroundColor: '#FFFF',
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    top: height * 0.27,
    position: 'absolute',
    zIndex: 2,
  },
  writenoteview: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  locviewexabit: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    justifyContent: 'space-around',
  },
  imgexhabitloc: {
    width: width * 0.06,
    height: height * 0.05,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  imgexhabitnote: {
    width: width * 0.05,
    height: height * 0.04,
    borderRadius: 5,
    // marginHorizontal: 10,
  },
  boxtopexhab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linebetw: {
    borderWidth: 1,
    borderColor: '#f8f8f8',
    marginVertical: 5,
  },
  txtimg: {
    fontSize: fontsizes[0],
    fontFamily: 'IRANSans-Bold',
  },
  namedetail: {
    fontSize: fontsizes[4],
    fontFamily: 'IRANSans-Bold',
    color: '#363636',
  },
  viewnamedetail: {
    marginTop: height * 0.1,
    backgroundColor: '#FFFF',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
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
    fontSize: fontsizes[2],
    color: '#a6aaab',
    paddingVertical: 5,
  },
  biodestxt: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
    color: 'black',
  },
  descview: {
    paddingTop: 10,
    paddingHorizontal: 20,

    paddingBottom: 25,
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
  arbtnimg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  arimgbtn: {
    width: '100%',
    height: '100%',
    // borderRadius: 30,
    // borderRadius: width * 0.1,
  },

  socialviewmain: {
    // marginTop: height * 0.05,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    paddingBottom: 25,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },

  infoimg: {
    width: '100%',
    height: '100%',
  },
  txticon: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[0],
    color: '#DB2227',
    marginTop: 2,
  },
});
