import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
import { Colors } from '../../component/services/Colors';

// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20, 24] : [9, 14, 16, 18, 20, 24, 26];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  mainscrview: {
    backgroundColor: '#f0f4fd',
    height,
    paddingTop:'3%'

  },
  animindex: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'red',
    overflow: 'hidden',
  },
  headermainscr: {
    top: (height * 1) / 100,
    height: height * 0.4,

    // backgroundColor: 'green',
    // paddingBottom: 5,
  },
  imgbackheader: {
    width: '70%',
    height: '32%',
    alignSelf: 'center',
    borderRadius: (width * 30) / 100,
    // marginBottom: 25,

    overflow: 'hidden',
    marginTop: '20%'
  },
  imglinear: {
    width: (width * 100) / 100,
    height: '100%',
    borderBottomLeftRadius: (width * 5) / 100,
    borderBottomRightRadius: (width * 5) / 100,
    // overflow: 'hidden',
    // position: 'absolute',
    // zIndex: 2,
    opacity: 0.6,
  },
  txtbookm: {
    fontSize: fontsizes[3],
    fontFamily: 'IRANSans-Bold',
    color: '#bababa',
  },
  bookview: {
    flexDirection: 'column',
    backgroundColor: '#FFFF',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: height * 0.36,
    position: 'absolute',
    zIndex: 2,
  },
  writenoteview: {
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgexhabitnote: {
    width: width * 0.04,
    height: height * 0.04,
    borderRadius: 5,
    marginHorizontal: 10,
    // marginHorizontal: 10,
  },
  txtimg: {
    fontSize: fontsizes[1],
    fontFamily: 'IRANSANS',
  },
  viewnamedetail: {
    // marginTop: height * 0.05,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    paddingVertical: 5,
  },
  namedetail: {
    fontSize: fontsizes[3],
    fontFamily: 'IRANSans-Bold',
    color: '#454545',
  },
  //   viewnamedetail: {
  //     marginTop: height * 0.02,
  //     backgroundColor: '#FFFF',
  //     flexDirection: 'column',
  //     // justifyContent: 'center',
  //     alignItems: 'center',
  //     paddingVertical: 5,
  //   },
  bottcarevents: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: width - 40,
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
    marginRight: 10,
  },
  txtcareventdate: {
    fontFamily: 'IRANSans-Bold',
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
    color: 'black',
    paddingVertical: 5,
    marginBottom: 15,
  },
  biodestxt: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[0],
    color: 'black',
  },
  descview: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',

    paddingBottom: 25,
  },
  borderbott: {
    width: width * 0.9,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6dae3',
    alignSelf: 'center',
  },
  membertxt: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
    color: 'black',
    paddingVertical: 10,
  },
  touchoricomm: {
    // backgroundColor: '#57c9fd',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    // paddingHorizontal: 5,
    borderRadius: 5,
  },
  backtouchimg: {
    // position: 'absolute',
    // bottom: 0,
    // paddingHorizontal: width * 0.08,
    // height: 70,
    width: width * 0.85,
    marginHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
    overflow: 'hidden',
  },
  touchtxt: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[1],
    color: '#FFFF',
  },
  dateintouch: {
    textAlign: 'center',
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
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
  rightbioview: {
    marginLeft: 10,
    // backgroundColor: 'red',
    width: width * 0.8,
  },
  iconnotebook: {
    color: '#8B8B8D',
  },
  iconStyle: {
    color: Colors.Grey,
    fontSize: 20, padding: 2
  },
});
