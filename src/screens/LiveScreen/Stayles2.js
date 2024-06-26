import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20, 22] : [9, 14, 16, 18, 20, 24, 26];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  mainscrview: {
    backgroundColor: '#f0f4fd',
    height,
    paddingTop:'4%'

  },
  headermainscr: {
    width,
    // height: 270,
    paddingTop: height * 0.13,
    backgroundColor: '#DB2227',
    zIndex: 10,
    // borderBottomLeftRadius: (width * 8) / 100,
    // borderBottomRightRadius: (width * 8) / 100,
  },
  mainviewchat: {
    backgroundColor: '#FFFF',
    height: 0.4 * height,
    marginVertical: height * 0.005,
    // marginHorizontal: height * 0.02,
    paddingHorizontal: 3,
    // borderRadius: 15
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
  linearGradient: {
    height: '20%',
    width: '100%',
    // height: 90,
    position: 'absolute',
    top: 0,
    zIndex: 7,
    opacity: 0.2,
  },
  imgbackheader: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'red'
    // borderBottomLeftRadius: (width * 10) / 100,
    // borderBottomRightRadius: (width * 10) / 100,
    // overflow: 'hidden',
  },
  txtbookm: {
    fontSize: fontsizes[4],
    fontFamily: 'IRANSANS',
    color: '#bababa',
  },
  bookview: {
    top: height * 0.35,
    // bottom: 50,
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'row',
    // backgroundColor: 'red',
    // marginLeft: 10,
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
    width: width * 0.06,
    height: height * 0.05,
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
    marginVertical: 10,
  },
  txtimg: {
    fontSize: fontsizes[1],
    fontFamily: 'IRANSANS',
  },
  namedetail: {
    fontSize: fontsizes[2],
    fontFamily: 'IRANSans-Bold',
    color: '#a2a2a2',
  },
  viewnamedetail: {
    justifyContent: 'center',
    marginTop: height * 0.01,
    alignItems: 'center',
    paddingHorizontal: 20,
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
    fontFamily: 'IRANSANS',
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
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 25,
    // backgroundColor: 'red',
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
    backgroundColor: '#FFFF',
    borderRadius: 10,
    width: width * 0.9,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1.5,
        },
        shadowOpacity: 0.35,
        shadowRadius: 0.35,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backtouchimg: {
    paddingHorizontal: width * 0.1,
    height: '100%',
    marginHorizontal: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  touchtxt: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    color: '#FFFF',
  },
  programtxt: {
    width: '60%',
    marginLeft: 20,
    paddingVertical: 5,
    // backgroundColor: 'red',
  },
  timeview: {
    backgroundColor: '#112669',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  txtlocation: {
    color: '#a6aaab',
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
  },
  arroeright: {
    backgroundColor: '#57c9fd',
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 2,
    right: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtprodes: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
  },
  txttitle: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
    fontWeight: 'bold',
    // backgroundColor: 'red',
  },
  txttitledes: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    // backgroundColor: 'red',
  },
  txtproname: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
    color: '#9f9f9f',
  },
  arrowimg: {
    height: height * 0.015,
    width: width * 0.03,
  },
  timeflat: {
    marginHorizontal: 10,
    backgroundColor: '#FFFF',
    paddingVertical: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  firstdate: {
    marginHorizontal: 10,
    backgroundColor: '#FFFF',
    paddingVertical: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  seconddate: {
    // backgroundColor: 'red',
    marginLeft: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  txtdate: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[6],
  },
  txtdatese: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[6],
    color: '#FFFF',
  },
  txtmonth: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
  },
  txtmonthse: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
    color: '#FFFF',
  },
  searchbox: {
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    width: width * 0.55,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  searchview: {
    zIndex: 900,
    marginHorizontal: width * 0.05,
    marginTop: height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtsearch: {
    width: '85%',
    fontSize: fontsizes[2],
    fontFamily: 'IRANSans-Bold',
    alignItems: 'center',
  },
  iconsearch: {
    color: '#b6b6b6',
    fontSize: IconSize[4],
  },
  chooseview: {
    backgroundColor: '#27cff6',
    // flexDirection: 'row',

    zIndex: 900,
    alignItems: 'center',
    // color: '#FFFF',
    width: '35%',
    justifyContent: 'space-around',
    // paddingHorizontal: 10,
    borderRadius: 10,
  },
  touchchoose: {
    color: '#FFFF',
    width: 65,
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[1],
  },
  icondown: {
    color: '#FFFF',
    // backgroundColor: 'red',
    fontSize: IconSize[4],
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
  bigshowtouch: {
    position: 'absolute',
    padding: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#3e52c8',
    borderWidth: 0.5,
    borderColor: 'grey',
    right: 0,
    zIndex: 99999,
  },
  sendmessageview: {
    // backgroundColor: '#f0f4fd',
    marginBottom: 0,
    position: 'absolute',
    bottom: 25,
    right: 0,
    // zIndex: 100,
    width: '100%',
    height: 40,
    // borderRadius: 25,
    // flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#3e52c8',
    // paddingHorizontal: 5,
    alignItems: 'center',
    // marginHorizontal: 3,
  },
  entermessageview: {
    backgroundColor: '#f0f4fd',
    marginBottom: 10,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  sendimgtouch: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
  },
  rendermessageview: {
    alignSelf: 'flex-start',
    width: '94%',
    backgroundColor: '#dff8fd',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  textTitle3: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 5,
    borderRadius: 3,
    padding: 10,
    backgroundColor: '#dff8fd',
    width: '100%',
  },
  renseranswertxt: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    borderRadius: 3,
    padding: 10,
    backgroundColor: '#dff8fd',
    width: '100%',
  },
  tabheaderview: {
    flexDirection: 'row',
    backgroundColor: '#DC5468',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width,
  },
  touchtabheader: {
    flexDirection: 'row',
    borderRightColor: '#FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 3,
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
  tabheaderbuttom: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    width,
    marginTop:'16%',
  },
  companyiconbottom: {
    // color: '#eaeaea',
    fontSize: IconSize[5],
    marginRight: 5,
  },
  aboutcomtitletxt: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
  },
  aboutcomview: {
    paddingHorizontal: 20,
    paddingVertical:8
  },
  renderimgview: {
    backgroundColor: '#F9F9F9',
    marginBottom: 5,
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },
  contentview: {
    backgroundColor: '#FFFF',
  },
  renderimg: {
    width: 50,
    height: 50,
  },
  rendercontentview: {
    marginLeft: 10,
    // backgroundColor: 'red',
    width: '70%',
  },
  nametxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[1],
  },
  jobtitletxt: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[1],
    color: 'red',
  },
});
