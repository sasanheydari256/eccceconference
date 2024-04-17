import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [12, 14, 16, 18, 20, 9] : [14, 16, 18, 20, 24, 9];
const IconSize =
  width < 680 ? [34, 32, 30, 28, 26, 18] : [36, 34, 32, 30, 28, 2];
export default StyleSheet.create({
  mainview: {
    width: '91%',
    height: '100%',
    // backgroundColor: '#1D1E7A',
    flexDirection: 'row',
  },
  mainRightview: {
    // width: '90%',
    height: '100%',
    // marginLeft: '20%',
    backgroundColor: '#FFFF',
    paddingTop:'10%'

  },
  mainLeftview: {
    width: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1D1E7A',
    paddingVertical: 20,
    paddingTop:'20%'
  },
  iconmenu: {
    width: width * 0.1,
    height: width * 0.1,
    // borderRadius: width * 0.05,
    // backgroundColor: '#3e52c8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  menuviewlog: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
    // paddingLeft: 10,
    // paddingBottom: 10,
    // paddingTop: 10,
  },
  topicontxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[5],
    marginTop: 4,
  },
  menuview2: {
    // position: 'absolute',
    // bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  switchasview: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  verticalview: {
    alignItems: 'center',
    width: height * 0.6,
    top: height * 0.3,
    flexDirection: 'row-reverse',
    overflow: 'hidden',
    left: 0,
    transform: [{ rotate: '270deg' }],
  },
  verticalline: {
    borderColor: 'red',
    borderWidth: 2,
    width: height / 2,
    height: 0,
    borderRadius: 3,
  },
  verticaltxt: {
    marginLeft: 5,
    // transform: [{rotateX: '-180deg'}],
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[4],
    color: '#8C8EBD',
    // word-break: break-all;
    // white-space: pre-wrap;
  },
  Touchicons: {
    backgroundColor: '#FFFF',
    marginBottom: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconbottomques: {
    fontSize: IconSize[4],
    color: 'grey',
    margin: 3,
  },
  toptouchicon: {
    // backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: (width * 16) / 100,
    marginBottom: 10,
    // borderRadius: 50,
  },
  listItemsIcon: {
    paddingTop: 10,
    fontSize: IconSize[5], margin: 1,
  },
  imgicons: {
    width: 30,
    height: 30,
  },
  topmenueview: {
    backgroundColor: '#F5F6FA',
    // backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchimg: {
    width: width * 0.15,
    height: width * 0.15,
    overflow: 'hidden',
    marginHorizontal: 5,
    marginTop: 5,
    // borderRadius: width * 0.125,
    borderRadius: 1,
  },
  tablogintxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[5],
    color: '#FFFF',
  },
  tablogintouch: {
    backgroundColor: '#1D1E7A',
    borderRadius: 15,
    paddingHorizontal: 5,
    marginLeft: 5,
    marginTop: 4,
  },
  nameprofileview: {
    // marginTop: 5,
  },
  nameprofile: {
    fontFamily: 'IRANSans-bold',
    fontSize: fontsizes[2],
  },
  viewprofile: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[1],
    color: 'red',
  },
  logintime: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[5],
  },
  topprofileview: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 6,
    backgroundColor: '#F5F6FA',

  },
  backgroandToptouchicon: {
    backgroundColor: '#FFFF',
    width: '60%',
    height: (height * 5) / 100,
    borderRadius: 50,
    alignItems: 'center'
  }
});
