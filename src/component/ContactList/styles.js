import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
export const IconSize =
  width < 680 ? [34, 32, 30, 28, 26, 24, 20] : [36, 34, 32, 30, 28, 26, 22];
export default StyleSheet.create({
  mainrow: {
    flexDirection: 'column',
    // backgroundColor: 'red',
    // paddingRight: 25,
  },
  listname: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    marginVertical: 10,
    marginLeft: 10,
    // marginRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0.01,
          height: 0.01,
        },
        shadowOpacity: 0.02,
        shadowRadius: 0.02,
      },
      android: {
        elevation: 0.2,
      },
    }),
  },
  namecontact: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    marginTop: 5,
  },
  datepre: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[1],
    color: '#a6a6a6',
    // marginTop: 5,
  },
  imgview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    // backgroundColor: 'blue',
  },
  nameview: {
    width: width * 0.5,
    // backgroundColor: 'green',
    marginLeft: 15,
    justifyContent: 'center',
  },
  arrowview: {
    // width: width * 0.05,
    // height: height * 0.04,
    alignSelf: 'center',
  },
  imgarrow: {
    color: '#aeaeae',
    fontSize: IconSize[4],
  },
  txtshortw: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[4],
    color: '#a6a6a6',
  },
  registertouch: {
    backgroundColor: '#f0f4fd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    paddingHorizontal: 10,
    alignSelf: 'center',
    // marginRight: 50,
  },
  txtregister: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[0],
    color: '#98b6fd',
  },
  bookmark: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[2],
    color: '#a6a6a6',
    marginTop: 40,
    marginBottom: 10,
  },
  bookmarkview: {
    width: '85%',
    // backgroundColor: 'red',
  },
  wordkey: {
    marginBottom: 3,
    color: '#a9aaae',
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[1],
  },
});
