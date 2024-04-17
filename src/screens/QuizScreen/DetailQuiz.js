import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  Animated,
  ImageBackground,
  Dimensions,
  View,
  Modal,
  TextInput,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import {Icon, Input} from 'native-base';
import Header from '../../component/Header/index';
import {connect} from 'react-redux';
import Styles from './Stayles2';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  getEpostEventList,
} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
// const headerOpacity = scrollY.interpolate({
//   inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
//   outputRange: [0, 0, 1],
//   extrapolate: 'clamp',
//   useNativeDriver: true,
// });
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const DetailQuiz = (props) => {
  const [loading, setLoading] = useState(false);
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const [EndOfQuiz, setEndOfQuiz] = useState(false);
  const [active, setActive] = useState(0);
  const [Grade, setGrade] = useState(-1);
  const [myaswers, setmyaswers] = useState([]);
  const [indexesoal, setindexesoal] = useState(0);
  const [radio, setradio] = useState(-1);
  const [AnswerId, setAnswerId] = useState(-1);
  const [QDatas, setQDatas] = useState([]);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const AnswerUserToQuiz = async (Asw) => {
    const Token = await AsyncStorage.getItem('Token');
    // console.log(JSON.stringify({
    //     QuizId: props.route.params.QuizId, CategoryId: QDatas[0].CategoryId,
    //     Email: Token, Description: '', Answers: Asw
    // }))
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'AnswerUserToQuiz',
        {
          QuizId: props.route.params.QuizId,
          CategoryId: QDatas[0].CategoryId,
          Email: Token,
          Description: '',
          Answers: Asw,
        },
        () => {},
        () => {},
        async (response) => {
          // alert(JSON.stringify(response))
          if (response.Result == 'Success') {
            // setDatas()
            // alert(JSON.stringify(response))
            setEndOfQuiz(true);
            setGrade(response.Grade);

            // let qq = []
            // const quizez = await AsyncStorage.getItem('quizez')
            // // alert(JSON.stringify(quizez))
            // if (quizez != null && quizez != undefined) {

            //     qq = JSON.parse(quizez)
            // }
            // qq.push({
            //     QuizId: props.route.params.QuizId,
            //     Email: Token, Description: '', Answers: Asw
            // })
            // await AsyncStorage.setItem('quizez', JSON.stringify(qq))
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    }
    // setPage((prevState) => prevState + 1);
  };
  const CheckTest = async () => {
    // let qq = []
    // // await AsyncStorage.removeItem('quizez')
    // const quizez = await AsyncStorage.getItem('quizez')

    // if (quizez != null && quizez != undefined) {
    //     qq = JSON.parse(quizez)
    //     // alert('55')
    // }
    // if (qq.length > 0) {
    //     const indexf = qq.findIndex((element) => element.QuizId == props.route.params.QuizId)
    //     // alert(indexf)
    //     if (indexf != -1) {
    //         setEndOfQuiz(true);
    //     } else {
    //         setEndOfQuiz(false);
    //         setQDatas(props.route.params.QDatas)
    //         // alert(JSON.stringify(props.route.params.QDatas))
    //     }
    // } else {
    // alert(JSON.stringify('ss'))
    setQDatas(props.route.params.QDatas);
    setEndOfQuiz(false);
    // }
    // return true;
  };
  useEffect(() => {
    CheckTest();
  }, []);
  const RadioTouch = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setradio(index);
          setAnswerId(item.AnswerId);
        }}
        disabled={radio != -1}
        checked={active == 0}
        style={[
          Styles.touchquis,
          {
            backgroundColor:
              radio == -1
                ? '#FFFF'
                : item.IsAnswer
                ? 'green'
                : radio == index
                ? 'red'
                : '#FFFF',
          },
        ]}>
        <Text style={Styles.touchquistxt}>{item.Answer}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        Styles.mainscrview,
        {backgroundColor: EndOfQuiz ? '#DB2227' : '#f0f4fd'},
      ]}>
      <Animated.View
        style={[
          Styles.animindex,
          {height: HEADER_MIN_HEIGHT, opacity: headerOpacity},
        ]}></Animated.View>
      <Header
        navigation={props.navigation}
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        inform={() => setModalVisible(true)}
        // notif={() => props.navigation.navigate('Notifications')}
        iconright={10}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      <View style={Styles.headermainscr}></View>
      {EndOfQuiz ? (
        <View
          style={{
            backgroundColor: '#DB2227',
            width,
            height: height - HEADER_MIN_HEIGHT,
            paddingTop: height / 4,
            alignItems: 'center',
          }}>
          <Text style={Styles.Congra}>Congratulations!</Text>
          <Text style={Styles.FinalText}>You'r Grade is {Grade}/100</Text>
          <Text style={Styles.FinalText}>Thank you for submitting</Text>
          <View style={Styles.qrviewth2}>
            {/* <TouchableOpacity
                            onPress={() => {

                            }}
                            // disabled={AnswerId == -1}
                            style={Styles.btnnext}>

                            <Text style={Styles.next}>
                                View Answer Sheet
</Text>
                        </TouchableOpacity> */}
          </View>
        </View>
      ) : (
        <ScrollView
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollY}}},
          ])}>
          {QDatas.length > 0 && (
            <View style={{width}}>
              <View style={{height: 20}} />
              <View style={Styles.imgviewmain}>
                {/* {radio == -1 ? */}
                <ScrollView
                  persistentScrollbar={true}
                  horizontal={true}
                  style={{flex: 1, width: '100%', paddingBottom: 20}}>
                  {QDatas[indexesoal]?.Galleries &&
                    QDatas[indexesoal]?.Galleries.length > 0 &&
                    QDatas[indexesoal]?.Galleries.map((item, index) => (
                      <Image
                        key={index}
                        resizeMode={'contain'}
                        style={{
                          width: width * 0.9,
                          height: 180,
                          borderRadius: 10,
                        }}
                        source={{uri: BASE_URL_IMG + item?.Image}}></Image>
                    ))}
                  {QDatas[indexesoal]?.Video && (
                    <Video
                      // source={{ uri: BASE_URL_IMG + VideoUrl }}
                      source={{uri: BASE_URL_IMG + QDatas[indexesoal]?.Video}}
                      style={{width: width * 0.9, height: 180}}
                      // style={{
                      //   justifyContent: 'center',
                      //   alignItems: 'center',
                      //   width: width,
                      //   height: height,
                      //   zIndex: 3,
                      // }}
                      muted={false}
                      repeat={false}
                      controls={true}
                      resizeMode={'contain'}
                      rate={1.0}
                      ignoreSilentSwitch={'obey'}
                    />
                  )}
                </ScrollView>
                <Text style={Styles.numberquestion}>
                  {indexesoal + 1}/{QDatas.length}
                </Text>
                <Text style={Styles.question}>
                  CASE {indexesoal + 1} {QDatas[indexesoal].Description}
                  {/* Video */}
                </Text>
                <Text style={Styles.question}>
                  {QDatas[indexesoal].Question}
                  {/* Video */}
                </Text>
                {radio != -1 && (
                  <Text style={Styles.question}>
                    {QDatas[indexesoal].Informaion}
                  </Text>
                )}
                {radio != -1 && (
                  <ScrollView
                    persistentScrollbar={true}
                    horizontal={true}
                    style={{flex: 1, width: '100%', paddingBottom: 20}}>
                    {QDatas[indexesoal]?.Image && (
                      <Image
                        resizeMode={'contain'}
                        style={{
                          width: width * 0.9,
                          height: 180,
                          borderRadius: 10,
                          marginVertical: 5,
                        }}
                        source={{
                          uri: BASE_URL_IMG + QDatas[indexesoal]?.Image,
                        }}></Image>
                    )}
                  </ScrollView>
                )}
              </View>

              {QDatas[indexesoal].Answers.map((item, index) => (
                <RadioTouch item={item} index={index} />
              ))}

              <View style={Styles.qrviewth}>
                <TouchableOpacity
                  onPress={() => {
                    setmyaswers([
                      ...myaswers,
                      {AnswerId: QDatas[indexesoal].QuizId, OptionId: AnswerId},
                    ]);
                    setAnswerId(-1);
                    setradio(-1);
                    if (myaswers.length < QDatas.length - 1) {
                      setindexesoal(indexesoal + 1);
                    } else if (myaswers.length == QDatas.length - 1) {
                      const aa = [
                        ...myaswers,
                        {
                          AnswerId: QDatas[indexesoal].QuizId,
                          OptionId: AnswerId,
                        },
                      ];
                      AnswerUserToQuiz(aa);
                    }
                  }}
                  disabled={AnswerId == -1}
                  style={
                    AnswerId == -1 ? Styles.btnnextdisable : Styles.btnnext
                  }>
                  <Icon
                    name={'arrowright'}
                    type={'AntDesign'}
                    style={Styles.arrow}></Icon>
                  <Text style={Styles.next}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{height: 90}} />
        </ScrollView>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={Styles.madalRezvpinfo}>
          <View style={Styles.modalvpinfo} />
          <Icon
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            name={'close'}
            type={'AntDesign'}
            style={Styles.modalipinfo}></Icon>
        </View>
        <View style={Styles.ModalBackBlure} />
        <View onPress={() => setModalVisible(false)} style={Styles.ModalBack}>
          <View style={Styles.ModalWith}></View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    Token: state.Customer.Token,
    Notifications: state.Customer.Notifications,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    chengToken: (Token) => {
      const action = {
        type: 'CHANGE_C_Token',
        Token,
      };
      dispatch(action);
    },
    chengidevents: (idevents) => {
      const action = {
        type: 'CHANGE_C_idevents',
        idevents,
      };
      dispatch(action);
    },
    chengNotifications: (Notifications) => {
      const action = {
        type: 'CHANGE_C_Notifications',
        Notifications,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailQuiz);
