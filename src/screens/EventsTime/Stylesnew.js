import {StyleSheet, Dimensions, I18nManager} from 'react-native';
const {width, height} = Dimensions.get('screen');
// const ffamilybold = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Bold';
// const ffamily = I18nManager.isRTL ? 'IRANSANS' : 'TwCenMT-Regular';
const fontsizes =
  width < 680 ? [9, 12, 14, 16, 18, 20, 22] : [9, 14, 16, 18, 20, 24, 26];
const IconSize =
  width < 680 ? [34, 32, 30, 28, 26, 20] : [36, 34, 32, 30, 28, 22];
export default StyleSheet.create({
  mainscrview: {
    backgroundColor: '#f0f4fd',
    height: height * 0.10,
    paddingTop:'3%'
  },
  maincontentview: {
    // backgroundColor: 'red',
    height,

  },
  bookview: {
    // top: height * 0.35,
    // bottom: 50,
    // position: 'absolute',
    // backgroundColor: 'red',
    height: 200,
  },
  rendertimeview: {
    // flexDirection: 'row',
  },
  seconddate: {
    // backgroundColor: 'red',
    // marginLeft: 5,
    // paddingVertical: 2,
    // paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 65,
    height: 65,
  },
  txtmonthse: {
    fontFamily: 'IRANSans-Bold',
    fontSize: fontsizes[3],
    color: '#FFFF',
  },
  txtdatese: {
    fontFamily: 'IRANSans',
    fontSize: fontsizes[1],
    color: '#FFFF',
  },
  touchdate: {
    // marginLeft: 60,
    width: width * 0.2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10
  },
  renderheadtime: {},
  headtimeview: {
    backgroundColor: '#E6EAF3',
    paddingLeft: 15,
    paddingVertical: 5,
  },
  timeleftview: {
    backgroundColor: '#F4F5F7',
    padding: 10,
  },
  renderleftcontent: {
    paddingVertical: 4,
    width:'78%',
    borderBottomWidth:0.5,
    borderBottomColor:'#21321150'
  },
  rendercontentview: {
    flexDirection: 'row',
  },
  iconimg: {
    color: 'grey',
    fontSize: IconSize[5],
  },
  rendertitletxt: {
    fontFamily: 'IRANSans',
    width: width * 0.7,
    fontSize: fontsizes[2],
  },
  renderlocationview: {
    flexDirection: 'row',
  },
  renderaddview: {
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  renderaddtouch: {
    width: 30,
    height: 30,
    borderRadius: 60,
    // justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
  },
  renderaddicon: {
    color: 'grey',
    fontSize: fontsizes[6],
  },
  eachTabStyle: {
    backgroundColor: '#C9CCD3',
  },
  headtimetxt: {
    fontSize:14,
    color:'#26A1F3',
    fontWeight:'bold'
  },
  lineGery: {
    display: 'flex',
    height: 2,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    width: '95%',
    marginVertical: 5,
    alignSelf:'center'
  },
  about: {
    flexDirection: 'column',
  },
  aboutText: {
    fontSize: fontsizes[5],
    fontWeight: '800'
  },
  facultylist: {
    fontSize: fontsizes[4],
    fontFamily: 'IRANSans-Bold',
    color: '#413d3a',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  profileimg: {
    marginBottom: 1,
    paddingLeft: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    // backgroundColor: 'red',
  },
  facultyaddnum: {
    backgroundColor: '#2F9FD5',
    // marginHorizontal: 3,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.05,
  },
  txtnum: {
    fontSize: fontsizes[1],
    fontFamily: 'IRANSANS',
    color: '#FFFF',
  },
  facultypersonv: {
    backgroundColor: '#eaeaea',
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: width * 0.1,
    overflow: 'hidden',
  },
  facultypersonimg: {
    width: '100%',
    height: '100%',
  },
});
