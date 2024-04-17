import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 10, 12, 14, 16, 18, 20] : [9, , 12, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  textmainscrsec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  txtmscrhead: {
    fontFamily: 'IRANSans-Bold',
    fontWeight: 'bold',
    color: '#413d3a',
    fontSize: fontsizes[5],
  },
  video: {
    marginHorizontal: 20,
    height: height * 0.2,
    borderRadius: 20,
  },
  topview: {
    // backgroundColor: 'green',
    height: height * 0.2,
    width: width * 0.9,
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    // overflow: 'hidden',
  },
  topimg: {
    width: 60,
    height: 60,
  },
  liveactivview: {
    // backgroundColor: 'red',
    // height: '40%',
    // justifyContent: 'space-between',
  },
  liveactiveLectureView: {
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    padding: 10,
    position: 'relative',
    alignItems: 'center',
    // overflow: 'hidden',
  },
  imfacultview: {
    // width: '30%',
  },
  liveactivtoptitle: {
    fontFamily: 'IRANSans-Bold',
    fontWeight: 'bold',
    color: '#FFFF',
    fontSize: fontsizes[5],
    margin: 5,
  },
  liveactivfacultxt: {
    fontFamily: 'IRANSans',
    color: '#FFFF',
    fontSize: fontsizes[2],
    margin: 5,
  },
});
