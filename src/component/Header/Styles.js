import { StyleSheet, Dimensions, I18nManager } from 'react-native';
import { Colors } from '../services/Colors';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680
    ? [9, 12, 14, 16, 18, 20, 24, 26, 30]
    : [9, 14, 16, 18, 20, 24, 26, 28, 32];
const IconSize =
  width < 680 ? [34, 32, 30, 28, 26, 24, 20] : [36, 34, 32, 30, 28, 26, 22];
export default StyleSheet.create({
  header: {
    height: '11%',
    width: '100%',
    // paddingVertical: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // zIndex: 500,

    // backgroundColor: 'red',

    
  },
  menuIcon: {
    color: Colors.lightGrey,
    fontSize: IconSize[0],
    marginLeft: '10%',
    marginBottom:'3%'
  },
  menuIcon2: {
    color: '#FFFF',
    fontSize: IconSize[0],
    marginRight: 10,
  },
  topmenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 30,
    marginVertical: 5,
    width,
    height:'100%',
    alignItems: 'flex-end',
    // marginHorizontal: 10,
    backgroundColor: '#4f7ce3',
  },
  txtview: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  toptextheader: {
    color: '#FFFF',
    fontSize: fontsizes[7],
    fontFamily: 'TwCenMT-Bold',
    // fontFamily: 'IRANSans-Bold',
    paddingVertical: 5,
  },
  secondtextheader: {
    color: '#FFFF',
    fontSize: fontsizes[3],
    fontFamily: 'TwCenMT-Regular',
  },
  viewtxtinp: {
    flexDirection: 'row',
    // paddingHorizontal: 10,
    paddingVertical: 20,
    alignSelf: 'center',
    marginBottom: 40,
  },
  txtinpheader: {
    width: (width * 75) / 100,
    backgroundColor: '#FFFF',
    flexDirection: 'row-reverse',
    borderRadius: 10,
    alignItems: 'center',
    // marginBottom: 30,
  },
  menutxtinpIcon: {
    color: '#bcbec7',
  },
  txtinp: {
    width: '85%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    // color: '#bcbec7',
    fontSize: fontsizes[3],
    fontFamily: 'IRANSans-Bold',
    alignItems: 'center',
  },
  txtinptouch: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
  iconrightheader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 10,
  },
  homeicon: {
    color: '#FFFF',
    marginHorizontal: 5,
    fontSize: IconSize[5],
  },
  viewheadericon: {
    // backgroundColor: '#3e52c8',
    marginLeft: 5,
    // paddingHorizontal: 2,
    paddingVertical: 8,
    // borderRadius: 8,
  },
  iicon: {
    paddingHorizontal: 14,
    color: '#FFFF',
    // marginHorizontal: 5,
    fontSize: IconSize[5],
  },
  imglogineve: {
    height: height * 0.04,
    width: width * 0.085,
    marginRight: 20,
    zIndex: 680,
  },
  viewtxtinptoast: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#FFFF',
    position: 'absolute',
    top: height * 0.2,
    zIndex: 10,
    paddingVertical: 15,
    borderRadius: 15,
    paddingHorizontal: 20,
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
  txtinptoast: {
    width: '60%',
    borderRadius: 10,
    color: '#bcbec7',
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    paddingHorizontal: 5,
    // backgroundColor: 'red',
    // fontSize: fontsizes[3],
  },
  txtinptouchtoast: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#29cff9',
  },
  txtdatetoast: {
    color: '#FFFF',
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[1],
    // paddingHorizontal: 3,
  },
});
