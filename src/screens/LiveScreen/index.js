import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { Icon } from 'native-base';
import Video from 'react-native-video';
// import Orientation from 'react-native-orientation';
// import { WebView } from 'react-native-webview';
import Header from '../../component/Header';
import Styles from './Stayles2';
import RBSheet from 'react-native-raw-bottom-sheet';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import SM from './SendMassage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_URL_IMG, request } from '../../component/services';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('screen');
// import AsyncStorage from  '@react-native-async-storage/async-storage'
const LiveScreen = (props) => {
  const [Count, setCount] = useState(15);
  const [Page, setPage] = useState(1);
  const [EndL, setEndL] = useState(false);
  const [Bigshow, setBigshow] = useState(height * 0.45);
  const [fisttime, setfisttime] = useState(false);
  const [MText, setMText] = useState('');
  const [Data, setData] = useState([]);
  const [Data2, setData2] = useState([]);
  const [selected, setSelected] = useState(1);
  const [ProgramsSessionsDetails, setProgramsSessionsDetails] = useState([]);
  const [description, setdescription] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [speakersState, setSpeakersState] = useState([])
  const [questionsState, setQuestionsState] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

  const refRBSheet = useRef();
  useEffect(() => {
    // Alert.alert(JSON.stringify(props.route));
    DetailsLivestream();
    // SpeakersListFaculty()

    // const interval = setInterval(() => {
    //   SM.MyTickets({
    //     HallName: props.route.params.items?.HalName,
    //     navigation: props.navigation,
    //     callback: (e) => {
    //       setData(e);
    //     },
    //   });
    // }, 10000);

    // return () => clearInterval(interval);
  }, []);

  const StaticPage = async () => {
    const ID = await AsyncStorage.getItem('eventId');
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'StaticPage',
        {
          Email: Token,
          EventId: ID,
          TrackNumber: props.route.params?.Liveindex,
        },
        () => { },
        () => { },
        (response) => {
          // alert(JSON.stringify({
          //     EventId: ID,
          //     TrackNumber: props.route.params.Liveindex,
          //     Email: Token
          // }))
          // alert(JSON.stringify(response));
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    }
  };

  const GetProgramsSessionsDetails = (Session) => {
    // console.log(JSON.stringify(props.route.params.SessionId));
    request(
      'POST',
      'GetProgramsSessionsDetails',
      { Session: Session, Email: 'a@gmail.com' },
      () => { },
      () => { },
      (response) => {
        console.log(JSON.stringify(response), 'sessiondetail');
        if (response.Result == 'Success') {
          setProgramsSessionsDetails(response.Answer);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };

  const OnlinUserTrack = async () => {
    const ID = await AsyncStorage.getItem('eventId');
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'OnlinUserTrack',
        {
          EventId: ID,
          TrackNumber: props.route.params?.Liveindex,
          Email: Token,
        },
        () => { },
        () => { },
        (response) => {
          // alert(JSON.stringify({
          //     EventId: ID,
          //     TrackNumber: props.route.params.Liveindex,
          //     Email: Token
          // }))
          // alert(JSON.stringify(response));
        },
        (err) => {
          console.log(JSON.stringify(err));
        },
      );
    }
  };
  const DetailsLivestream = async () => {
    // console.log(props.route.params.items.Id);
    request(
      'POST',
      'DetailsLivestream',
      {
        id: props.route.params.items.Id
      },
      () => { },
      () => { },
      (response) => {
        // alert(JSON.stringify({
        //     EventId: ID,
        //     TrackNumber: props.route.params.Liveindex,
        //     Email: Token
        // }))
        console.log(JSON.stringify(response));
        setSpeakersState(response.Speakers)
        setQuestionsState(response.Questions)
        setData(response)

      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );

  };

  useEffect(() => {
    // alert(JSON.stringify(props.route.params.items));
    // GetProgramsSessionsDetails(props.route.params.items?.SessionId);
    // SM.MyTickets({
    //   HallName: props.route.params.items?.HalName,
    //   navigation: props.navigation,
    //   callback: (e) => {
    //     setData(e)
    //     // console.log(e);
    //   },
    // });
    // // StaticPage();
    // const Liveinterval = setInterval(() => {
    //   DetailsLivestream();
    // }, 5000);
    // return () => clearInterval(Liveinterval);
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      // Data.length > 0 && Data.slice(0).reverse().map((item, indexs) => (
      // Data.length > 0 && Data.map((item, indexs) => (
      // item.Answers.length > 0 ?
      <View key={index} style={Styles.rendermessageview}>
        <Text style={Styles.textTitle3}>Me : {item.Message}</Text>
        {item.Answers.length > 0 &&
          item.Answers.map((e) => (
            <Text style={Styles.renseranswertxt}>Answer : {e.Answer}</Text>
          ))}
      </View>
    );
  };
  const renderSpeakersItem = ({ item, index }) => {
    return (
      <View style={Styles.renderimgview}>
        <Image
          source={{ uri: BASE_URL_IMG + item.UserImage }}
          style={Styles.renderimg}
        />
        <View style={Styles.rendercontentview}>
          <Text style={Styles.nametxt}>{item.UserName}</Text>
          <Text style={Styles.jobtitletxt}>{item.LocationUser}</Text>
        </View>
        <Icon name={'keyboard-arrow-right'} type={'MaterialIcons'} />
      </View>
    );
  };

  const DATAdetail = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const renderItemQuestion = (q, i) => {
    return (
      <View key={i} style={{ height: height * 0.08, backgroundColor: '#b7b7b7', borderRadius: 15, padding: 10, marginVertical: '1%' }}>
        <View>
          <Text style={{ fontSize: 16 }}>
            Q. {q.item.Text}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12 }}>
            Asked by
          </Text>
          <Text style={{ paddingLeft: 4, fontSize: 16, fontWeight: 'bold' }}>
            {q.item.UserName}
          </Text>
        </View>
      </View>
    )
  }
  const RenderSpeaker = () => {
    return (
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {speakersState.map(i => (
          <TouchableOpacity style={{
            width: '100%',
            height: height * 0.19,
            flexDirection: 'row',
            backgroundColor: '#EFEFEF',
            borderBottomColor: '#BDBDBD',
            borderBottomWidth: 4,
            padding: 10
          }}
            onPress={() => {
              // console.log(i.Id);

              props.navigation.navigate('Speakers',
                {
                  data: i
                })
            }}>
            <View style={{ flexDirection: 'column', width: '96%' }}>
              <View>
                <Text>{i.StartTime} - {i.ExpireTime}</Text>
              </View>
              <View style={{}}>
                <Text style={{ fontWeight: 'bold' }}>{i.Title}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 0 }}>
                <View style={{ width: '15%', height: '70%', justifyContent: 'center' }}>
                  <Image
                    resizeMode={'cover'}
                    style={{ width: '80%', height: '85%', borderRadius: 100, alignSelf: 'center' }}
                    source={{ uri: BASE_URL_IMG + i.UserImage }}></Image>
                </View>
                <View style={{ paddingLeft: '2%', paddingTop: 0, width: '90%', justifyContent: 'flex-start' }}>
                  <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }} >{i.UserName}</Text>
                  </View>
                  <View>
                    <Text> {i.LocationUser} </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Icon
                name={'chevron-right'}
                type={'FontAwesome'}
                style={{ fontSize: 12 }}
              />
            </View>


          </TouchableOpacity>
        ))}
      </View>

    )
  }
  const renderItemAgenda = (data) => {
    const i = data.item
    return (
      <View>
        <TouchableOpacity style={{
          width: '100%',
          height: height * 0.19,
          flexDirection: 'row',
          backgroundColor: '#EFEFEF',
          borderBottomColor: '#BDBDBD',
          borderBottomWidth: 4,
          padding: 10
        }}
          onPress={() => {
            console.log(i);


          }}>
          <View style={{ flexDirection: 'column', width: '96%' }}>
            <View>
              <Text>{i.Start} - {i.Expire}</Text>
            </View>
            <View style={{}}>
              <Text style={{ fontWeight: 'bold' }}>{i.Name}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 0 }}>
              <View style={{ width: '15%', height: '70%', justifyContent: 'center' }}>
                <Image
                  resizeMode={'cover'}
                  style={{ width: '80%', height: '85%', borderRadius: 100, alignSelf: 'center' }}
                  source={{ uri: BASE_URL_IMG + i.Image }}></Image>
              </View>
              <View style={{ paddingLeft: '2%', paddingTop: 0, width: '90%', justifyContent: 'flex-start' }}>
                <View style={{ width: '100%' }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }} >{i.Description}</Text>
                </View>
                <View>
                  <Text> {i.Hall} </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Icon
              name={'chevron-right'}
              type={'FontAwesome'}
              style={{ fontSize: 12 }}
            />
          </View>


        </TouchableOpacity>
      </View>

    );
  };
  return (
    <View style={{ width: '100%' }}>
      <View style={Styles.mainscrview}>
        <Header
          navigation={props.navigation}
          homepress={() => props.navigation.navigate('MainScreenEvent')}
          notif={() => props.navigation.navigate('Notifications')}
          iconright={3}
          backcolor={1}
          iconhome={1}
        // menuonpress={() => props.setPosi(!props.posi)}
        />
        {/* <View style={Styles.headermainscr}></View> */}
        <View
          style={{
            transform: [{ rotate: Bigshow == height ? '90deg' : '0deg' }],
            position: Bigshow == height ? 'absolute' : 'relative',
            width: Bigshow == height ? height : width,
            height: Bigshow == height ? width : height * 0.36,
            zIndex: 8888,
            backgroundColor: 'black',
            top: Bigshow == height ? height * 0.27 : height * 0.08,
            left: Bigshow == height ? -width * 0.52 : 0,
          }}>
          {/* <Video
            source={require('../../assets/sd.mp4')}
            style={{ width: '100%', height: '100%' }}
            muted={false}
            repeat={true}
            controls={false}
            // fullscreenOrientation={false}
            fullscreen={false}
            resizeMode={'stretch'}
            rate={1}
            ignoreSilentSwitch={'obey'}
          /> */}
          <WebView
            source={{ uri: 'https://iframe.dacast.com/live/0652df9c-9820-4d38-4577-937413ac6514/2a98757f-d25e-2101-4a83-74a3babec2c5' }} // آدرس وبسایت مورد نظر خود را وارد کنید
            style={{ flex: 1 }}
          />
        </View>
        {/* <Text>{JSON.stringify(props.route.params.items.HalName)}</Text> */}
        <TouchableOpacity
          style={[Styles.bigshowtouch, { top: Bigshow == height ? '4%' : '40%' }]}
          onPress={() => {
            // Orientation.lockToLandscape();
            setBigshow(Bigshow == height ? 1 : height);
          }}>
          <Icon
            style={{ fontSize: 18, color: '#FFFF' }}
            name={'resize-full-screen'}
            type={'Entypo'}
          />
        </TouchableOpacity>
        <View style={Styles.tabheaderbuttom}>
          <TouchableOpacity
            onPress={() => {
              setSelected(1);
            }}
            style={[Styles.touchtabheader, { borderBottomWidth: selected === 1 ? 1 : 0, borderColor: 'red' }]}>
            <Text style={[Styles.tabheadertxtbottom,
            { color: selected === 1 ? 'red' : '#808080' }]}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected(2);
            }}
            style={[Styles.touchtabheader, { borderBottomWidth: selected === 2 ? 1 : 0, borderColor: 'red' }]}>
            <Text style={[Styles.tabheadertxtbottom,
            { color: selected === 2 ? 'red' : '#808080' }]}>Q&A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected(3);
            }}
            style={[Styles.touchtabheader, { borderBottomWidth: selected === 3 ? 1 : 0, borderColor: 'red' }]}>
            <Text style={[Styles.tabheadertxtbottom,
            { color: selected === 3 ? 'red' : '#808080' }]}>Speakers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelected(4);
            }}
            style={[Styles.touchtabheader, { borderBottomWidth: selected === 4 ? 1 : 0, borderColor: 'red' }]}>
            <Text style={[Styles.tabheadertxtbottom,
            { color: selected === 4 ? 'red' : '#808080' }]}>Agenda</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.contentview}>
          {/* Details */}
          {selected === 1 && (
            <View style={Styles.aboutcomview}>
              <View>
                <Text style={{ fontSize: 24 }}>Title</Text>
              </View>
              <View style={{ paddingVertical: 8 }}>
                <Text>
                  {Data.Details}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 24 }}>Speakers</Text>
              </View>
              <ScrollView style={{
                height: height * 0.3
              }}>
                {speakersState.length > 0 &&
                  <View >
                    <RenderSpeaker />
                  </View>
                }
                <View style={{height:(height * 10) / 100}}></View>
              </ScrollView>
            </View>

          )}

          {/* Q&A */}
          {selected === 2 && (
            <ScrollView style={{ margin: 11, height: (height * 10) / 100 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={questionsState}
                inverted={true}
                renderItem={renderItemQuestion}
              />
            </ScrollView>
          )}
          {selected === 2 && (
            <View style={{ width: width, height: '29%', alignItems: 'center' }}>
              <View style={{
                bottom: 0,
                position: 'relative',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
                {/* <TextInput style={{
                  width: '88%',
                  backgroundColor: 'lightgray',
                  padding: 10,
                }} placeholder="Enter text here" /> */}
                <TouchableOpacity style={{
                  width: '50%',
                  backgroundColor: '#5077D2', borderRadius: 25,
                  height: '50%', justifyContent: 'center',
                  alignItems: 'center'
                }}
                  onPress={() => { setModalVisible(true) }}>
                  <Text>ask a Question</Text>
                </TouchableOpacity>

              </View>
            </View>
          )}
          {/* Speakers */}
          {selected === 3 && (
            <ScrollView style={{
              height: height * 0.4
            }}>
              {speakersState.length > 0 &&
                <View >
                  <RenderSpeaker />
                </View>
              }
                <View style={{height:(height * 10) / 100}} ></View>

            </ScrollView>
          )}


          {/* Agenda */}
          {selected === 4 && (
            // <ScrollView style={{ margin: 11, height: (height * 38) / 100 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={Data.Agenda}
              renderItem={renderItemAgenda}
            />
            // </ScrollView>
          )}
                <View style={{height:(height * 13) / 100}} ></View>

        </View>
        <View style={Styles.mainviewchat}>
          {/* <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={Data}
            inverted
            contentContainerStyle={{flexDirection: 'column-reverse'}}
            renderItem={renderItem}
          /> */}
        </View>

      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        keyboardAvoidingViewEnabled={true}
        height={110}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },

          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={Styles.entermessageview}>
          <View style={{ width: '85%' }}>
            <TextInput
              style={{ width: '100%' }}
              value={MText}
              onChangeText={(e) => {
                setMText(e);
              }}
              placeholder={'Type a Message'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              SM.SendTicket({
                HallName: props.route.params?.items.HalName,
                navigation: props.navigation,
                Text: MText,
                callback: (e) => {
                  // {"Message":"salam","DateTime":"2021-05-01T08:25:02.05","TicketId":1,
                  // "Answers":[{"TicketId":1,
                  // "Answer":"aleke salam","DateTime":"2021-05-01T08:25:39.347"}]}
                  if (e) {
                    setData([
                      ...Data,
                      {
                        Message: MText,
                        DateTime: '',
                        TicketId: 0,
                        Answers: [
                          {
                            TicketId: 0,
                            Answer: '',
                            DateTime: '',
                          },
                        ],
                      },
                    ]);
                    setMText('');
                    refRBSheet.current.close();
                  }
                },
              });
            }}
            style={Styles.sendimgtouch}>
            <Image
              style={{ height: 35, width: 35, marginRight: 5 }}
              source={require('../../assets/icon/Send.png')}
            />
          </TouchableOpacity>
        </View>
      </RBSheet>
      <Modal transparent={true} visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableWithoutFeedback style={{ zIndex: 0 }} onPress={() => setModalVisible(false)}>
            <View style={{ zIndex: 4, width: width, height: '77%', backgroundColor: '#00000069', alignItems: 'center' }}>

            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={{ zIndex: 0 }} onPress={() => { }}>
            <View style={{ zIndex: 4, width: width, height: '33%', backgroundColor: '#00000069', alignItems: 'center' }}>
              <View
                onTouchStart={(e) => e.stopPropagation()}
                style={{ borderRadius: 10, backgroundColor: '#E3F3FD', top: -40, width: '85%', height: (height * 23) / 100, paddingTop: '4%', paddingHorizontal: '4%' }}>
                <View>
                  <Text style={{ fontSize: 18 }}>Ask a Question</Text>
                </View>
                <View style={{ paddingVertical: '4%' }}>
                  <TextInput
                    placeholder='Type Here'
                    placeholderTextColor={'#76767676'}
                    style={{ backgroundColor: '#fff', borderRadius: 2, borderWidth: 0.2 }}
                    value={MText}
                    onChangeText={(e) => {
                      setMText(e);
                    }}
                  />
                </View>
                <View style={{ justifyContent: 'space-around', width: '100%', flexDirection: 'row', height: '28%', alignItems: 'flex-end' }}>
                  <TouchableOpacity
                    onPress={() => { setModalVisible(false) }} style={{ backgroundColor: '#76767610', width: '45%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      SM.SendTicket({
                        HallName: props.route.params?.items.HalName,
                        navigation: props.navigation,
                        Text: MText,
                        callback: (e) => {
                          // {"Message":"salam","DateTime":"2021-05-01T08:25:02.05","TicketId":1,
                          // "Answers":[{"TicketId":1,
                          // "Answer":"aleke salam","DateTime":"2021-05-01T08:25:39.347"}]}
                          if (e) {
                            // setData([
                            //   ...Data,
                            //   {
                            //     Message: MText,
                            //     DateTime: '',
                            //     TicketId: 0,
                            //     Answers: [
                            //       {
                            //         TicketId: 0,
                            //         Answer: '',
                            //         DateTime: '',
                            //       },
                            //     ],
                            //   },
                            // ]);
                            setQuestionsState([...questionsState,
                            {
                              "Id": questionsState.length + 1,
                              "Text": MText,
                              "Time": "12:07 PM",
                              "UserName": 'You'
                            }])
                            // console.log(e);
                            setMText('');
                            setModalVisible(false)
                          }
                        },
                      });
                    }}
                    style={{ backgroundColor: '#76767690', width: '45%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Text>Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>

  );
};

export default LiveScreen;
