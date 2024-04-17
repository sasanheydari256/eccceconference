import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
    width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({

    mainscrview: {
        backgroundColor: '#f0f4fd',
        // backgroundColor: 'red',
        height,
        width,
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
    mainviewchat: {
        backgroundColor: "#FFFF",
        height: 0.8 * height,
        marginVertical: height * 0.005,
        marginHorizontal: height * 0.02,
        paddingHorizontal: 3,
        borderRadius: 15
    },
    textTitle5: {
        fontSize: fontsizes[3],
        // fontFamily: "ffamily",
    },
    textTitle6: {
        // width: '80%',
        // color: '#FFFF',
        // direction: I18nManager.isRTL ? 'rtl' : 'ltr',
        // fontFamily: ffamily,
    },
    textTitle2: {
        width: '80%',
        color: '#FFFF',
        direction: I18nManager.isRTL ? 'rtl' : 'ltr',
        // fontFamily: ffamily,
    },
    textTitle3: {
        paddingHorizontal: 3,
        color: 'grey',
        // fontFamily: ffamily,
    },


})