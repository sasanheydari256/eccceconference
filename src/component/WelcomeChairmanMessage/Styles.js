import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 10, 12, 14, 16, 18, 20] : [9, , 12, 14, 16, 18, 20, 24];
const IconSize = width < 680 ? [34, 32, 30, 28, 26] : [36, 34, 32, 30, 28];
export default StyleSheet.create({
  boxview: {
    backgroundColor: '#FFFF',
    width: width * 0.9,
    // height: height * 0.4,
    alignSelf: 'center',
  },
  maintitletxt: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: fontsizes[4],
    fontFamily: 'IRANSans',
  },
  boxNameview: {
    flexDirection: 'row',
  },
  boxpositionview: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
  },
  welcomeuserimg: {
    width: width / 4,
    height: width / 4,
    margin: 10,
  },
  positiontxt: {
    fontSize: fontsizes[1],
    fontFamily: 'IRANSans',
  },
  nametxt: {
    fontSize: fontsizes[5],
    fontFamily: 'IRANSans',
    marginBottom: 3,
  },
  describetxt: {
    fontSize: fontsizes[2],
    fontFamily: 'IRANSans',
    margin: 10,
  },
});
