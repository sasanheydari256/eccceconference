import React, {useState, useEffect} from 'react';
import {
  // TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Picker,
  Animated,
  Modal,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import {TextInput} from 'react-native-gesture-handler';
import {Icon, Spinner} from 'native-base';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  convertMonth,
  convertDay,
} from '../../component/services';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const EventsTime = (props) => {
  const [scrollY, setscrollY] = useState(new Animated.Value(0));
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
  const [Datas, setDatas] = useState([]);
  const [Programs, setPrograms] = useState([]);
  const [Halls, setHalls] = useState([]);
  const [NameHall, setNameHall] = useState('');
  const [showdrop, setshowdrop] = useState(false);
  const [indexHall, setindexHall] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [Word, setWord] = useState('');
  const [Chearman, setChearman] = useState({});
  const [ProgramsSessions, setProgramsSessions] = useState([]);
  const [SearchResault, setSearchResault] = useState([]);
  const [Count, setCount] = useState(10);
  const [Page, setPage] = useState(1);
  const [day, setday] = useState(0);
  useEffect(() => {
    // props.start?.();
    GetPrograms(props.route.params.Id);
  }, []);

  const GetPrograms = (EventId) => {
    // console.log(JSON.stringify(props))
    request(
      'POST',
      'GetPrograms',
      {EventId},
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response), 'programha');
        if (response.Result == 'Success' && response.Result != null) {
          let a = response.Answer;
          let ses = {
            Id: response.Answer.ChairMan.Id,
            Day: response.Answer.ChairMan.Day,
            Name: 'Chairman Speech',
            Start: response.Answer.ChairMan.Start,
            Expire: response.Answer.ChairMan.Expire,
            Hall: response.Answer.ChairMan.HallName,
            Colore: '#b34180',
          };
          // a.Sessions.splice(1, 0, ses)
          setDatas(a);
          setPrograms(response.Answer.DayList);
          getsesion(response.Answer, 0, 0, Word);
          setHalls(response.Answer.HallName);
          setNameHall(response.Answer.HallName[0]);
          setModalVisible(false);
          setChearman(response.Answer.ChairMan);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };
  const Searches = (e) => {
    var results = [];
    if (e !== '') {
      if (SearchResault.length > 0) {
        for (var i = 0; i < SearchResault.length; i++) {
          // for (key in ProgramsSessions[i]) {
          if (
            SearchResault[i].Name?.toLowerCase().indexOf(e.toLowerCase()) != -1
          ) {
            results.push(SearchResault[i]);
          }
          // }
        }
        setSearchResault(results);
      } else {
        setSearchResault([]);
      }
    } else {
      if (Datas.Sessions.length > 0) {
        getsesion(Datas, indexHall, day, Word);
        // setSearchResault(Datas.Sessions)
      }
    }

    // console.log(JSON.stringify(results));
  };

  const getsesion = (Datas, hall, day, Word) => {
    let D = [];
    // console.log(JSON.stringify(Datas), 'Datas')
    // console.log(JSON.stringify(hall), 'hall')
    // console.log(JSON.stringify(day), 'day')
    for (let i = 0; i < Datas.Sessions.length; i++) {
      const element = Datas.Sessions[i];
      if (
        element.Day == Datas.DayList[day] &&
        element.Hall == Datas.HallName[hall]
      ) {
        D.push(element);
      }
      setSearchResault(D);
    }
  };
  const renderDate = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setday(index);
          getsesion(Datas, indexHall, index, Word);
        }}>
        <LinearGradient
          key={index}
          style={Styles.seconddate}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.5}}
          colors={[
            day == index ? '#29ccf7' : '#FFFF',
            day == index ? '#2F9FD5' : '#FFFF',
          ]}>
          <View style={Styles.seconddate}>
            <Text
              style={[
                Styles.txtdatese,
                {color: day == index ? '#FFFF' : 'black'},
              ]}>
              {convertDay(item)}
            </Text>
            <Text
              style={[
                Styles.txtmonthse,
                {color: day == index ? '#FFFF' : 'black'},
              ]}>
              {convertMonth(item)}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  // "Day": response.Answer.ChairMan.Day,
  //               "Name": "Chairman Speech",
  //               "Start": response.Answer.ChairMan.Start,
  //               "Expire": response.Answer.ChairMan.Expire,
  //               "Hall": response.Answer.ChairMan.HallName,
  //               "Colore": "#49af12"
  const renderItem = ({item, index}) => {
    return item.Name != 'Registeration' ? (
      <TouchableOpacity
        onPress={() => {
          !item.IsChairMan
            ? props.navigation.navigate('Program', {
                Name: item.Name,
                Image: item.Image,
                SessionId: item.SessionId,
                StartTime: item.Start,
                StartDay: item.Day,
                Description: item.Description,
              })
            : props.navigation.navigate('Chairmans', {
                items: Chearman,
                Title: 'Chairman Speech',
              });
        }}
        key={index}
        style={[Styles.touchoricomm, {marginBottom: 20}]}>
        <View
          style={[
            Styles.timeview,
            {backgroundColor: item.Colore ? item.Colore : '#b34180'},
          ]}>
          <Text style={Styles.touchtxt}>{item.Start}</Text>
          <Text style={Styles.touchtxt}>{item.Expire}</Text>
        </View>
        <View style={[Styles.programtxt, {paddingVertical: 10}]}>
          <Text
            // onPress={() => {
            //   item.Name != 'register' && props.navigation.navigate('Program', {
            //     Name: item.Name,
            //     Image: item.Image,
            //     SessionId: item.SessionId
            //   })
            // }}
            style={Styles.txttitle}>
            {item.Name ? item.Name : 'Chairman Speech'}
          </Text>
          <Text numberOfLines={1} style={Styles.txttitledes}>
            {item.Hall}
          </Text>
        </View>
        {item.Name != 'Registeration' && (
          <View style={Styles.arroeright}>
            <Image
              resizeMode={'contain'}
              style={Styles.arrowimg}
              source={require('../../assets/img/arrowleft.png')}
            />
          </View>
        )}
      </TouchableOpacity>
    ) : (
      <View key={index} style={[Styles.touchoricomm, {marginBottom: 20}]}>
        <View
          style={[
            Styles.timeview,
            {backgroundColor: item.Colore ? item.Colore : '#b34180'},
          ]}>
          <Text style={Styles.touchtxt}>{item.Start}</Text>
          <Text style={Styles.touchtxt}>{item.Expire}</Text>
        </View>
        <View style={[Styles.programtxt, {paddingVertical: 10}]}>
          <Text
            // onPress={() => {
            //   item.Name != 'register' && props.navigation.navigate('Program', {
            //     Name: item.Name,
            //     Image: item.Image,
            //     SessionId: item.SessionId
            //   })
            // }}
            style={Styles.txttitle}>
            {item.Name}
          </Text>
          <Text numberOfLines={1} style={Styles.txttitledes}>
            {item.Hall}
          </Text>
        </View>
        {item.Name != 'Registeration' && (
          <View style={Styles.arroeright}>
            <Image
              resizeMode={'contain'}
              style={Styles.arrowimg}
              source={require('../../assets/img/arrowleft.png')}
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={Styles.mainscrview}>
      <Animated.View
        style={[
          Styles.animindex,
          {height: HEADER_MIN_HEIGHT, opacity: headerOpacity},
        ]}
      />
      {/* <View style={Styles.arbtn}>
        <View style={Styles.arbtnimg}>
          <Image
            resizeMode={'cover'}
            style={Styles.arimgbtn}
            source={require('../../assets/img/artab.png')}></Image>
        </View>
      </View> */}
      <Header
        navigation={props.navigation}
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        notif={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}
      />
      <ScrollView
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        <View style={Styles.headermainscr}>
          <ImageBackground
            resizeMode={'cover'}
            style={Styles.imgbackheader}
            source={{
              uri: BASE_URL_IMG + props.route.params.ImageGallery[0].ImageName,
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 0.5}}
              colors={['#3f62a4', 'transparent']}
              // style={Styles.linearGradient}
              style={{height: '100%', width: '100%'}}
            />
          </ImageBackground>
          <View style={Styles.headermainscr}>
            <View style={Styles.txtinpheader}>
              <TextInput
                onSubmitEditing={() => Searches()}
                onChangeText={(e) => {
                  if (e == '') {
                    setDatas2(Datas);
                  } else {
                    Searches(e);
                  }
                  setWord(e);
                }}
                style={Styles.txtinp}
                placeholderTextColor={'#bbbdc5'}
                placeholder={'Find Events'}
              />
              <TouchableOpacity style={Styles.txtinptouch}>
                <Icon
                  onPress={() => Searches()}
                  name={'search1'}
                  type={'AntDesign'}
                  style={Styles.menutxtinpIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={Styles.bookview}>
          {/* <View style={Styles.firstdate}>
            <Text style={Styles.txtdate}>01</Text>
            <Text style={Styles.txtmonth}>Apr</Text>
          </View> */}
          <FlatList
            style={{marginLeft: 10}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={Programs}
            renderItem={renderDate}
          />
        </View>
        <View style={Styles.searchview}>
          <View style={Styles.searchbox}>
            <TextInput
              onChangeText={(e) => {
                setWord(e);
                Searches(e);
              }}
              placeholder={'Search'}
              placeholderTextColor={'#b6b6b6'}
              style={Styles.txtsearch}
            />
            <Icon
              onPress={() => Searches()}
              name={'search1'}
              type={'AntDesign'}
              style={Styles.iconsearch}
            />
          </View>
          <View style={Styles.chooseview}>
            {
              Halls.length > 0 && (
                <View
                  style={{
                    zIndex: 900,
                    width: '100%',
                    minHeight: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      height: 50,
                      width: 120,
                      // backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setshowdrop(!showdrop)}>
                    <Text style={{color: '#FFFF'}}>{NameHall}</Text>
                  </TouchableOpacity>
                  {showdrop && (
                    <View
                      style={{
                        zIndex: 900,
                        width: '100%',
                        backgroundColor: '#FFFF',
                        position: 'absolute',
                        top: 50,
                        zIndex: 100,
                      }}>
                      <FlatList
                        data={Halls}
                        renderItem={({item, index}) => {
                          return (
                            <TouchableOpacity
                              style={{zIndex: 900}}
                              onPress={() => {
                                // alert(index)
                                setshowdrop(false);
                                setNameHall(item);
                                setindexHall(index);
                                getsesion(Datas, index, day, Word);
                              }}>
                              <Text style={{margin: 5, alignSelf: 'center'}}>
                                {item}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        // ListHeaderComponent={ListHeader}
                        keyExtractor={(item, index) => `${index}`}
                        // ref={refContainer}
                      />
                    </View>
                  )}
                </View>
              )
              // <Picker
              //   textStyle={{ color: '#FFFF' }}
              //   note
              //   mode="dialog"
              //   style={{ width: '100%', color: '#FFFF', fontSize: 8 }}
              //   selectedValue={NameHall}
              //   onValueChange={(e, index) => {
              //     setNameHall(e);
              //     setindexHall(index);
              //     getsesion(Datas, index, day, Word)
              //     // setindexCountry(index);
              //   }}>
              //   {/* <Picker.Item label={'Select'} value={'Select'} /> */}
              //   {Halls !== null &&
              //     Halls !== [] &&
              //     Halls !== undefined &&
              //     Halls.map((item, index) => (
              //       <Picker.Item key={index} label={item} value={index} />
              //     ))}
              // </Picker>
            }
            {/* <Text style={Styles.touchchoose}>{NameHall}</Text> */}

            {/* <Icon
              name={'keyboard-arrow-down'}
              type={'MaterialIcons'}
              style={Styles.icondown}></Icon> */}
          </View>
        </View>
        <View style={Styles.viewnamedetail}>
          <Text style={Styles.namedetail}>{props.route.params.infoName}</Text>
        </View>

        {/* <View style={{height: height * 0.6}}> */}
        {/* <ScrollView> */}
        {/* <View style={Styles.touchoricomm}>
          <View style={[Styles.timeview, { backgroundColor: '#6762fc' }]}>
            <Text style={Styles.touchtxt}>08:00 AM</Text>
            <Text style={Styles.touchtxt}>10:00 AM</Text>
          </View>
          <View style={Styles.programtxt}>
            <Text
              // onPress={() => props.navigation.navigate('Registration')}
              style={Styles.txtprodes}>
              Registration
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: width * 0.05,
                  height: height * 0.04,
                  marginRight: 10,
                }}>
                <Image
                  resizeMode={'contain'}
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../assets/img/Hallevent.png')}></Image>
              </View>
              <Text style={Styles.txtlocation}>Track I - Dubi - Hall I</Text>
            </View>
          </View>
        </View> */}
        {/* <View style={Styles.touchoricomm}>
          <View style={[Styles.timeview, { backgroundColor: '#bd47ff' }]}>
            <Text style={Styles.touchtxt}>10:00 AM</Text>
            <Text style={Styles.touchtxt}>11:00 AM</Text>
          </View>
          <View style={Styles.programtxt}>
            <Text
              onPress={() => props.navigation.navigate('SpeachSchadule')}
              style={Styles.txtprodes}>
              Chairman Speach
            </Text>
            <View
              style={{
                flexDirection: 'row',
                // marginTop: 5,
                alignItems: 'center',
                // justifyContent: 'center',
              }}>
              <View
                style={{
                  width: width * 0.05,
                  height: height * 0.04,
                  marginRight: 10,
                }}>
                <Image
                  resizeMode={'contain'}
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../assets/img/Hallevent.png')}></Image>
              </View>
              <Text style={Styles.txtlocation}>Track I - Dubi - Hall I</Text>
            </View>
          </View>
          <View style={Styles.arroeright}>
            <Image
              style={Styles.arrowimg}
              source={require('../../assets/img/arrowleft.png')}></Image>
          </View>
        </View> */}
        <View style={Styles.descview}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={SearchResault}
            renderItem={renderItem}
          />
        </View>
        <View style={{height: height * 0.05}} />
      </ScrollView>
      {/* </View> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   setModalVisible(false);
        // }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            backgroundColor: 'black',
            opacity: 0.5,
          }}>
          <Spinner color="#FFFF" />
          <Text style={{color: 'white'}}>Loding ...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default EventsTime;
