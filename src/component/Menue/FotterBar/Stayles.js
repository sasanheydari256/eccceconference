import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [12, 14, 16, 18, 20, 9] : [14, 16, 18, 20, 24, 9];
const IconSize =
  width < 680 ? [34, 32, 30, 28, 26, 18] : [36, 34, 32, 30, 28, 2];
export default StyleSheet.create({
  foter: {
    width: width / 5,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop:'1%'
  },
  Icons: {fontSize: IconSize[4], marginTop: 5},
  text: {
    marginTop: 3,
    fontSize: fontsizes[5],
  },
});
