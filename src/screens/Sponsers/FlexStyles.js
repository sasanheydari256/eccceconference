import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize =
  width < 680 ? [34, 32, 30, 28, 26, 18] : [36, 34, 32, 30, 28, 20];
export default StyleSheet.create({
  imgview: {
    width: '15%',
    height: '100%',
  },
  infoimg: {
    width: '100%',
    height: '100%',
  },
  mainscrview: {
    backgroundColor: '#f0f4fd',
    // backgroundColor: 'red',
    height,
    width,
  },
  headermainscr: {
    height: height * 0.3,
    width,
    // borderBottomLeftRadius: (width * 8) / 100,
    // borderBottomRightRadius: (width * 8) / 100,
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
  flexmailview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    zIndex: 3,
    marginVertical: 25,
  },
  imgrighticon: {
    width: 70,
    height: 70,
    borderWidth: 4,
    borderColor: '#FFFF',
    marginTop: -60,
    borderRadius: 3,
  },
  fexmailtxt: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[4],
    // color: '#FFFF',
  },
  boothtxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[1],
    backgroundColor: '#D43F49',
    color: '#FFFF',
    textAlign: 'center',
    borderRadius: 5,
  },
  tabheaderview: {
    flexDirection: 'row',
    backgroundColor: '#DC5468',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width,
  },
  tabheaderbuttom: {
    flexDirection: 'row',
    // backgroundColor: '#DC5468',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width,
  },
  touchtabheader: {
    flexDirection: 'row',
    borderRightColor: '#FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRightWidth: 0.5,
    // backgroundColor: 'blue',
    // paddingHorizontal: 10,
  },
  tabheadertxt: {
    color: '#FFFF',
    fontFamily: 'IRANSans',
    fontSize: fontsizes[2],
  },
  tabheadertxtbottom: {
    // color: '#FFFF',
    fontFamily: 'IRANSans',
    fontSize: fontsizes[2],
  },
  companyicon: {
    color: '#eaeaea',
    fontSize: IconSize[5],
    marginRight: 5,
  },
  companyiconbottom: {
    // color: '#eaeaea',
    fontSize: IconSize[5],
    marginRight: 5,
  },
  aboutcomtxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[2],
    padding: 15,
  },
  aboutcomtitletxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[2],
    padding: 10,
  },
  pdfimg: {
    width: 20,
    height: 20,
  },
  touchflatmain: {
    width: width * 0.9,
    borderBottomColor: '#E0E0E2',
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchvideoflat: {
    width: width * 0.45,
    backgroundColor: '#E0E0E0',
    // borderWidth: 1,
    margin: 10,
    // alignSelf: 'center',
    // paddingVertical: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  eyeicon: {
    fontSize: IconSize[4],
  },
  eyeicon2: {
    fontSize: IconSize[4],
    marginRight: 4,
  },
  iconsview: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  iconsview2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contenttxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[2],
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
  titlename: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
    marginLeft: 10,
  },
});
