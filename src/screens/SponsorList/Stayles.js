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
    paddingTop: height * 0.07,
    // backgroundColor: '#DB2227',
    zIndex: 10,
    borderBottomLeftRadius: (width * 8) / 100,
    borderBottomRightRadius: (width * 8) / 100,
  },
  mainscrview: {
    backgroundColor: '#f0f4fd',
    // backgroundColor: 'red',
    height,
    width,
  },
  viewtxtinp: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingVertical: 20,
    zIndex: 2,
  },
  txtinpheader: {
    width: width * 0.7,
    backgroundColor: '#FFFF',
    flexDirection: 'row-reverse',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  txtinp: {
    width: '85%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: '#bcbec7',
    fontSize: fontsizes[2],
    fontFamily: 'IRANSans-Bold',
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
    fontSize: IconSize[3],
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
    overflow: 'hidden',
    flexDirection: 'row',
    marginHorizontal: width * 0.07,
    height: height * 0.10,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFFF',
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
  filterpng: {
    width: width * 0.05,
    height: height * 0.05,
  },
  bottcarevents: {
    flexDirection: 'column',
    marginTop: 5,
    // paddingTop: 5,
    // backgroundColor: 'red',
  },
  flatcontainname: {
    width: '65%',
    flexDirection: 'column',
    paddingLeft: 20,
    alignSelf: 'center',
  },
  reeventbott: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgbottcarevents: {
    width: '100%',
    height: '100%',
  },
  hallicon: {
    width: width * 0.04,
    height: height * 0.02,
    marginRight: 5,
  },
  txtcareventdate: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[0],
    color: '#a8abd4',
  },
  addevedate: {
    flexDirection: 'row',
    // paddingVertical: 5,
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    // marginLeft: 15,
  },
  titlename: {
    fontSize: fontsizes[2],
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
  numroom: {
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: '#2ccef4',
    borderRadius: 7,
    top: '60%',
  },
  numberroom: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    color: '#FFFF',
  },
});
