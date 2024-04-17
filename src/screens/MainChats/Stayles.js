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
    touchflatmain: {
        flexDirection: 'row',
        marginHorizontal: width * 0.08,
        height: height * 0.08,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#FFFF',
        justifyContent: 'space-around',
        // paddingLeft: 10,
        alignItems: 'center',
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
    flatcontainname: {
        width: '65%',
        flexDirection: 'column',
        paddingLeft: 20,
        alignSelf: 'center',
        // backgroundColor: "blue",
    },
    titlename: {
        fontFamily: 'IRANSans-Bold',
        fontSize: fontsizes[3],
    },
    toucharrowaa: {
        width: '10%',
        height: '50%'
    }
















})