import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
import {Colors} from '../../component/services/Colors';

// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
    width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
    mainscrview: {

        backgroundColor: '#f0f4fd',
        height,
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
    headermainscr: {
        height: height * 0.4,
        borderBottomLeftRadius: (width * 10) / 100,
        borderBottomRightRadius: (width * 10) / 100,
        // backgroundColor: 'green',
        // paddingBottom: 5,
        overflow: 'hidden',
    },
    imgbackheader: {
        width: (width * 100) / 100,
        height: '100%',
        borderBottomLeftRadius: (width * 10) / 100,
        borderBottomRightRadius: (width * 10) / 100,
        // marginBottom: 25,
        // overflow: 'hidden',
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
        borderRadius: 10,
        top: height * 0.33,
        position: 'absolute',
        zIndex: 2,
    },
    writenoteview: {
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    imgexhabitnote: {
        width: width * 0.05,
        height: height * 0.04,
        borderRadius: 5,
        // marginHorizontal: 10,
    },
    txtimg: {
        fontSize: fontsizes[1],
        fontFamily: 'IRANSANS',
    },
    viewnamedetail: {
        marginTop: height * 0.05,
        backgroundColor: '#FFFF',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    viewnamedetail2: {
        flexDirection: 'row',
        marginTop: height * 0.05,
        width: width * 0.9,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFFF',
        alignItems: 'center',
        height: height * 0.08,
        // paddingHorizontal: 15,
        // paddingVertical: 15,
    },
    namedetail: {
        fontSize: fontsizes[1],
        fontFamily: 'IRANSans-Bold',
        color: '#454545',
        width: '100%',
        // backgroundColor: 'red'
    },
    namedetail2: {
        fontSize: fontsizes[3],
        fontFamily: 'IRANSans-Bold',
        color: '#454545',
        marginHorizontal: 10
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
        color: '#a6aaab',
        paddingVertical: 5,
        marginBottom: 15,
    },
    arrowimg: {
        height: width * 0.1,
        width: width * 0.1,
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
        color: '#969897',
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
        paddingHorizontal: width * 0.08,
        height: 70,
        marginHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        overflow: 'hidden',
    },
    touchtxt: {
        fontFamily: 'IRANSans-Bold',
        fontSize: fontsizes[4],
        color: '#FFFF',
    },
    dateintouch: {
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
    iconStyle:{
        color: Colors.Grey,
        fontSize: 20, padding: 2
    },
      lineGery: {
    display: 'flex',
    height: 2,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    width: '95%',
    marginVertical: 5,
    alignSelf:'center'
  }
});
