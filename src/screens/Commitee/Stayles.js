import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  headermainscr: {
    width,
    // height: 270,
    paddingTop: height * 0.13,
    // backgroundColor: '#DB2227',
    zIndex: 10,
    borderBottomLeftRadius: (width * 8) / 100,
    borderBottomRightRadius: (width * 8) / 100,
  },
  mainscrview: {
    backgroundColor: '#f0f4fd',
    height,
    width,
  },
  viewtxtinp: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingVertical: 20,
    // backgroundColor: 'red',
    zIndex: 2,
  },
  txtinpheader: {
    width: width * 0.7,
    backgroundColor: '#FFFF',
    flexDirection: 'row-reverse',
    borderRadius: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  txtinp: {
    width: '85%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: '#bab9bf',
    fontSize: fontsizes[3],
    fontFamily: 'IRANSans-Bold',
  },
  txtinptouch: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  filterpng: {
    width: width * 0.05,
    height: height * 0.05,
  },
  menutxtinpIcon: {
    color: '#bcbec7',
    fontSize: IconSize[1],
    paddingVertical: 10,
  },
  touchfilter: {
    backgroundColor: '#2F9FD5',
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  touchflatmain: {
    flexDirection: 'column',
    marginHorizontal: 10,
    height: height * 0.24,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: '#FFFF',
  },
  imgcommitee: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  txttitle: {
    fontSize: fontsizes[3],
    fontFamily: 'IRANSans-Bold',
  },
  touchview: {
    flexDirection: 'row',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 5,
  },
  imgview: {
    // backgroundColor: '#2fcdf0',
    width: width * 0.12,
    height: height * 0.1,
    // padding: 10,
    // borderRadius: 10,
    marginTop: -(height * 5) / 100,
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
});
