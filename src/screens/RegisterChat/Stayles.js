import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  headermainscr: {
    width: '100%',
    height: '12%',
    // backgroundColor: 'green',
    zIndex: 2,
  },
  mainscrview: {
    backgroundColor: '#FFFF',
    height,
    width,
  },
  viewtxtinp: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.8,
    alignSelf: 'center',
    // backgroundColor: 'red',
    zIndex: 2,
  },
  txtinpheader: {
    backgroundColor: '#f0f4fd',
    flexDirection: 'row-reverse',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  txtinp: {
    width: '85%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: '#6f8fc2',
    fontSize: fontsizes[3],
  },
  txtinptouch: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // backgroundColor: 'red',
  },
  menutxtinpIcon: {
    color: '#6f8fc2',
    fontSize: IconSize[4],
    paddingVertical: 10,
  },
  touchfilter: {
    backgroundColor: '#2F9FD5',
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  touchflatmain: {
    flexDirection: 'column',
    marginHorizontal: width * 0.08,
    height: height * 0.25,
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
  },
  touchview: {
    flexDirection: 'row',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imgview: {
    backgroundColor: '#2fcdf0',
    padding: 10,
    borderRadius: 10,
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
