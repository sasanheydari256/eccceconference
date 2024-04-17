import {StyleSheet, Dimensions, I18nManager} from 'react-native';
import {Colors} from '../../component/services/Colors';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20] : [9, 14, 16, 18, 20, 24];
const IconSize =
  width < 680 ? [34, 32, 30, 28, 26, 18] : [36, 34, 32, 30, 28, 2];
export default StyleSheet.create({
  PostItemFoterIcons: {
    marginHorizontal: 5,
    fontSize: IconSize[4],
  },
  PostItemView: {
    width: width - 20,
    margin: 10,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.MedionLightGrey,
  },
  PostItemImage: {
    width: width - 20,
    height: width / 2,
  },
  PostItemFoter: {
    width: width - 20,
    padding: 10,
  },
  PostItemFoterText: {
    borderTopColor: Colors.MedionLightGrey,
    borderTopWidth: 0.5,
    marginVertical: 10,
    width: width,
  },
  animindex: {
    backgroundColor: '#DB2227',
    overflow: 'hidden',
  },
});
