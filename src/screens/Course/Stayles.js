import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 10, 12, 14, 16, 18, 20] : [9, , 12, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  mainscrview: {
    backgroundColor: '#f0f4fd',
    height,
  },
  headermainscr: {
    height: height * 0.41,
    width,
    // borderBottomLeftRadius: (width * 25) / 100,
    // borderBottomRightRadius: (width * 25) / 100,
    backgroundColor: '#f0f4fd',
    zIndex: 2,
  },
  bodyscreen: {
    height: height * 0.6,
    // backgroundColor: 'yellow',
  },
  titletopbox: {
    borderWidth: 1,
    width: width * 0.8,
    borderColor: '#e0e0e0',
    alignSelf: 'center',
  },
  viewtopbox: {
    backgroundColor: '#FFFF',
    marginHorizontal: '5%',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 0.35,
      },
      android: {
        elevation: 3,
      },
    }),
    // marginVertical: 5,
    // position: 'absolute',
    // zIndex: 2,
  },
  txttopbox: {
    color: '#797979',
    fontSize: fontsizes[3],
    fontFamily: 'IRANSans-Bold',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
    // backgroundColor: 'red',
  },
  bottomtbox: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',

    // backgroundColor: 'green',
  },
  facultylist: {
    fontSize: fontsizes[4],
    fontFamily: 'IRANSans-Bold',
    color: '#413d3a',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  facultypersonv: {
    backgroundColor: '#eaeaea',
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
  },
  facultyaddnum: {
    backgroundColor: '#2F9FD5',
    // marginHorizontal: 3,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
  },
  facultypersonimg: {
    width: '100%',
    height: '100%',
  },
  flatGrowB: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 10,
    width: width * 0.2,
    // backgroundColor: 'red',
  },
  txtnum: {
    fontSize: fontsizes[1],
    fontFamily: 'IRANSANS',
    color: '#FFFF',
  },
  txtgbuis: {
    fontSize: fontsizes[1],
    fontFamily: 'IRANSans-Bold',
    color: '#7c76b2',
    marginTop: 5,
    textAlign: 'center',
  },
  textmainscrsec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  txtmscrhead: {
    fontFamily: 'IRANSans-Bold',
    color: '#413d3a',
    fontSize: fontsizes[4],
  },
  viewall: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
    color: '#2F9FD5',
    textDecorationLine: 'underline',
  },
  mainscrcarview: {
    backgroundColor: '#FFFF',
    height: height * 0.26,
    width: width * 0.4,
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    // paddingHorizontal: 15,
  },
  secondview: {
    backgroundColor: '#FFFF',
    height: height * 0.32,
    width: width * 0.4,
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 10,
    // paddingHorizontal: 15,
  },
  commitecar: {
    backgroundColor: '#FFFF',
    height: height * 0.3,
    borderRadius: 15,
    // marginHorizontal: 15,
    // backgroundColor: 'red',
    // paddingHorizontal: 15,
  },
  heartstyle: {
    position: 'absolute',
    zIndex: 2,
    height: '10%',
    width: '15%',
    top: 10,
    right: 10,
  },
  imgcarmainscr: {
    width: '100%',
    height: '85%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  imgcommite: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  addeventstitle: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 10,
    // backgroundColor: 'blue',
  },
  txtreevents: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[3],
  },
  addeventsdate: {
    flexDirection: 'column',
    backgroundColor: '#FFFF',
    position: 'absolute',
    right: 10,
    top: -12,
    paddingHorizontal: 10,
    // paddingVertical: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.1,
      },
      android: {
        elevation: 2.5,
      },
    }),
  },
  profileimg: {
    marginBottom: 15,
    paddingLeft: 15,
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    // backgroundColor: 'red',
  },
  addeventsdatearrow: {
    // flexDirection: 'column',
    backgroundColor: '#2F9FD5',
    position: 'absolute',
    right: 10,
    top: -18,
    // paddingHorizontal: 5,
    // paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowright: {
    color: '#FFFF',
    fontSize: IconSize[2],
  },
  txtcarmainloc: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
    color: '#767676',
  },
  txttitle: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    color: '#767676',
  },
  reeventbott: {
    width: width * 0.35,
    flexDirection: 'row',
    // paddingVertical: 10,
    paddingHorizontal: 5,
    // justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  imglocview: {
    width: width * 0.05,
    height: width * 0.06,
    // padding: 5,
  },
  imgbottcarevents: {
    width: '100%',
    height: '100%',
    marginHorizontal: 3,
  },
  txtcareventdate: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
    marginLeft: 10,
  },
  addevedate: {
    width: width * 0.35,
    flexDirection: 'row',
    paddingVertical: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    // backgroundColor: 'red',
  },
  bottcarevents: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    // backgroundColor: 'red',
    // justifyContent: 'space-between',
  },

  commercialview: {
    height: '5%',
    width,
    marginTop: 10,
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
  linearGradient: {
    height: '20%',
    width: '100%',
    // height: 90,
    position: 'absolute',
    top: 0,
    zIndex: 7,
    opacity: 0.2,
  },
  arimgback: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.12,
    padding: 7,
    backgroundColor: '#FFFF',
  },
  arimgbtn: {
    width: '100%',
    height: '100%',
    // borderRadius: 30,
    // borderRadius: width * 0.1,
  },
  imgbackheader: {
    height: '100%',
    width: '100%',
  },
  viewtxtinp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.9,
    alignSelf: 'center',
    position: 'absolute',
    top: height * 0.35,
    zIndex: 10,
    // alignItems: 'center',
  },
  txtinpheader: {
    backgroundColor: '#FFFF',
    flexDirection: 'row-reverse',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  txtdate: {
    color: '#FFFF',
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[1],
    // paddingHorizontal: 3,
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
  txtinp: {
    width: '60%',
    borderRadius: 10,
    color: '#bcbec7',
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    paddingHorizontal: 5,
    // fontSize: fontsizes[3],
  },
  txtinptouch: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#29cff9',
  },
  menutxtinpIcon: {
    color: '#6694fc',
    fontSize: IconSize[1],
    paddingVertical: 10,
  },
  botomtoast: {
    width: width * 0.7,
    height: height * 0.07,
    borderRadius: 15,
    zIndex: -5,
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.1,
      },
      android: {
        elevation: 2.5,
      },
    }),
  },
  txtplace: {
    width: '90%',
    fontSize: fontsizes[4],
  },
  iconsearch: {
    color: '#bbbdc6',
    fontSize: IconSize[3],
    marginRight: 5,
  },
});
