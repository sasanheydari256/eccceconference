import { StyleSheet, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  qrcontain: {
    height,
    width,
    backgroundColor: '#f0f4fd',
  },
  header: {
    width,
    // backgroundColor: 'red',
    height: height * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qrviewf: {
    height: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  qrviews: {
    // height: height * 0.60,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  qrviewth: {
    width,
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20
    // backgroundColor: 'yellow',
  },
  txtqrhead: {
    color: '#666668',
    fontSize: fontsizes[1],
    fontFamily: 'IRANSans-Bold',
    textAlign: 'center',
    // backgroundColor: 'red',
    textAlign: 'justify',
    marginHorizontal: 10
  },
  txtqrhead2: {
    color: '#4a47a3',
    fontSize: fontsizes[4],
    fontFamily: 'IRANSans-Bold',
    textAlign: 'center',
    // backgroundColor: 'red',
  },
  scancode: {
    // height: '100%',
    justifyContent: 'center',
    paddingBottom: 25,
    width: '80%',
    overflow: 'hidden',
    height: height * 0.65,
    backgroundColor: '#FFFF',
    borderRadius: 25,
  },
  btnnext: {
    width: width * 0.8,
    backgroundColor: '#2F9FD5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingVertical: 10,
  },
  next: {
    color: '#FFFF',
    fontSize: fontsizes[3],
    fontFamily: 'IRANSANS',
    fontWeight: 'bold',
  },
  arrow: {
    color: '#FFFF',
    fontSize: IconSize[2],
    position: 'absolute',
    right: 10,
  },
  txtscdes: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#ababab',
    fontSize: fontsizes[1],
    fontFamily: 'IRANSans-Bold',
    lineHeight: 25,
    // backgroundColor: 'red',
  },
  codeinput: {
    // backgroundColor: 'red',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 10,
    marginHorizontal: '10%',
    flexDirection: 'row',
    borderRadius: 5,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 0.22,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  touchvar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DB2227',
    paddingHorizontal: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  linedott: {
    borderBottomWidth: 0.5,
    borderStyle: 'dotted',
    // color: '#b1b2b2',
    borderColor: '#b1b2b2',
    // position: 'absolute',
    zIndex: 4,
    // bottom: '27%',
    width: width * 0.8,
  },
  vartxt: {
    color: '#FFFF',
    fontSize: fontsizes[1],
    fontFamily: 'IRANSans-Bold',
  },
});
