import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 10, 12, 14, 16, 18, 20] : [9, , 12, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  mainviewCount: {
    backgroundColor: '#902d70',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  countview: {
    alignItems: 'center',
    color: '#464646',
  },
  counttxt: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[4],
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFF',
  },
  countDaytxt: {
    fontFamily: 'IRANSANS',
    fontSize: fontsizes[0],
    color: '#FFFF',
  },
});
