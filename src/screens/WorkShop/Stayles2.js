import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  imgview: {
    width: '15%', height: '50%'
  },
  ModalBack: {
    justifyContent: 'center', alignItems: 'center',
    flex: 1, width: '100%', height: '100%',
    alignSelf: 'center',
    zIndex: 52,
    // opacity: .5
  },
  ModalBackBlure: {
    position: 'absolute',
    justifyContent: 'center', alignItems: 'center',
    flex: 1, width: '100%', height: '100%', top: 0, right: 0,
    alignSelf: 'center', backgroundColor: 'black',
    opacity: .5, zIndex: 50,
  },
  madalRezvpinfo: {
    width: 30,
    height: 30,
    // transform: [{ rotate: '90deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
    left: 40,
    position: 'absolute',
    zIndex: 53,
  },
  ModalWith: {
    padding: 20,
    width: '90%', alignItems: 'center', justifyContent: 'center',
    borderRadius: 20, backgroundColor: '#FFFF',

  },
  modalvpinfo: {
    width: 30,
    height: 30,
    // top: 20, right: 20,
    // top: 25,
    borderRadius: 15,
    marginTop: 15,
    backgroundColor: 'gray',
    position: 'absolute',
    opacity: 0.5,
    alignSelf: 'center',
  },
  modalipinfo: {
    color: '#FFFF',
    fontSize: fontsizes[3],
    opacity: 2,
    alignSelf: 'center',
  },
  headermainscr: {
    width,
    // height: 270,
    paddingTop: height * 0.13,
    backgroundColor: '#DB2227',
    zIndex: 10,
    borderBottomLeftRadius: (width * 8) / 100,
    borderBottomRightRadius: (width * 8) / 100,
  },
  animindex: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DB2227',
    overflow: 'hidden',
  },
  mainscrview: {
    backgroundColor: '#f0f4fd',
    height,
    // width,
  },
  viewtxtinp: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingVertical: 20,
    // backgroundColor: 'blue',
    zIndex: 2,
  },
  txtinpheader: {
    width: width * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    backgroundColor: '#FFFF',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  txtinp: {
    width: '85%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: '#cccccc',
    // fontSize: fontsizes[3],
  },
  txtinptouch: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
  filterpng: {
    width: width * 0.05,
    height: height * 0.05,
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
  bottcarevents: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    // justifyContent: 'space-between',
  },
  reeventbott: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    // alignItems: 'center',
  },
  imgbottcarevents: {
    width: width * 0.04,
    height: height * 0.03,
    marginHorizontal: 3,
  },
  txtcareventdate: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
    color: '#cccccc',
  },
  addevedate: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
  },
  titlename: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
  },
  QuestV: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  AceptT: {
    backgroundColor: 'green',
    paddingHorizontal: 15,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    borderRadius: 5
  },
  DenyT: {
    backgroundColor: 'red',
    paddingHorizontal: 15,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    borderRadius: 5
  },
  titlename2: {
    color: 'grey',
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[1],
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
