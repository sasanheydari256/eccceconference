import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { Icon, Spinner } from 'native-base';
import Styles from '../Header/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import {
  request,
  requestGET,
  BASE_URL_IMG,
  MyImage,
} from '../../component/services';
const { width, height } = Dimensions.get('screen');
const Contactlist = (props) => {
  const refContainer = useRef(null);
  const [Datas, setDatas] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [myData, setmyData] = useState([{ A: [] }]);
  const horof = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '#',
  ];
  const getdatasss = async (dt) => {
    let data2 = [
      { A: [] },
      { B: [] },
      { C: [] },
      { D: [] },
      { E: [] },
      { F: [] },
      { G: [] },
      { H: [] },
      { I: [] },
      { J: [] },
      { K: [] },
      { L: [] },
      { M: [] },
      { N: [] },
      { O: [] },
      { P: [] },
      { Q: [] },
      { R: [] },
      { S: [] },
      { T: [] },
      { U: [] },
      { V: [] },
      { W: [] },
      { X: [] },
      { Y: [] },
      { Z: [] },
      { '#': [] },
    ];
    let ddd = [];
    for (let i = 0; i < dt.length; i++) {
      const a = dt[i].Name.charAt(0).toUpperCase();
      const indexf = horof.findIndex((element) => element == a);
      if (indexf != -1) {
        if (Object.keys(data2[indexf])[0] == a) {
          Object.values(data2[indexf])[0].push(dt[i]);
        }
      } else {
        Object.values(data2[26])[0].push(dt[i]);
      }
    }
    for (let j = 0; j < data2.length; j++) {
      // const element = data2[j];
      if (Object.values(data2[j])[0].length > 0) {
        // console.log(Object.keys(data2[j]))
        ddd.push(data2[j]);
      }
    }

    setmyData(ddd);
    // console.log(JSON.stringify(data2))
  };
  const GetEventFaculty = (Id) => {
    // console.log(JSON.stringify(props))
    request(
      'POST',
      'GetEventFaculty',
      { Id, Count: 0, Page: 0 },
      () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify(response));
        if (response.Result == 'Success') {
          // setDatas()
          getdatasss(response.Answer);
          setModalVisible(false);
        }
      },
      (err) => {
        // console.log(JSON.stringify(err));
      },
    );
    // setPage((prevState) => prevState + 1);
  };
  useEffect(() => {
    GetEventFaculty(props.Id, props.Count);

    if (refContainer.current) {
      refContainer.current.scrollToIndex({ animated: true, index: 0 });
    }
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.txtshortw}>{Object.keys(item)[0]}</Text>
        </View>
        <View style={styles.mainrow}>
          {Object.values(item)[0].map((item, index) => (
            <TouchableOpacity
              // onPress={() => {
              // props.speakerde == 1
              // ? props.speaker && props.speaker()
              // : props.otherpage && props.otherpage();
              // }}
              onPress={() => {
                props.navigation.navigate('Speakers', {
                  data: {
                    "Id": item.Id,
                  }

                })
              }
              }
              style={styles.listname}>
              <View style={styles.imgview}>
                <MyImage
                  style={{ width: '100%', height: '100%' }}
                  source={{
                    uri: BASE_URL_IMG + item.Image,
                    // headers: { Authorization: 'someAuthToken' },
                    // priority: FastImage.priority.normal,
                  }}
                  resizeMode={'cover'}
                />
                {/* <Image
                  resizeMode={'contain'}
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: BASE_URL_IMG + item.Image }}></Image> */}
              </View>
              <View style={styles.nameview}>
                <Text style={styles.namecontact}>
                  {item?.UserPreFix}
                  {item.Name}
                </Text>
                <Text style={styles.datepre}>{item.phone}</Text>
                <Text style={styles.datepre} numberOfLines={1}>
                  
                </Text>
              </View>
              {props.arrow == 1 ? (
                <View style={styles.arrowview}>
                  <Icon
                    name={'keyboard-arrow-right'}
                    type={'MaterialIcons'}
                    style={styles.imgarrow}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  // onPress={() => props.navigation.navigate('ChatScreen')}
                  onPress={() => props.chatscr && props.chatscr()}
                  style={styles.registertouch}>
                  <Text style={styles.txtregister}>Request</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.bookmarkview}>
        {/* {props.headerspeaker == 1 ? (
          <View>
            <Text style={styles.bookmark}>BOOKMARK</Text>
            <View>
              <View
                style={[
                  styles.mainrow,
                  { borderBottomColor: '#eaeaea', borderBottomWidth: 0.05 },
                ]}>
                <TouchableOpacity
                  // onPress={() => {
                  // props.speakerde == 1
                  // ? props.speaker && props.speaker()
                  // : props.otherpage && props.otherpage();
                  // }}
                  onPress={() => props.speaker && props.speaker()}
                  style={styles.listname}>
                  <View style={styles.imgview}>
                    <Image
                      resizeMode={'contain'}
                      style={{ width: '100%', height: '100%' }}
                      source={require('../../assets/img/people.png')}></Image>
                  </View>
                  <View style={styles.nameview}>
                    <Text style={styles.namecontact}>Ms. Lorem Ipsum</Text>
                    <Text style={styles.datepre}>03 April - 13:30 PM</Text>
                  </View>
                  <View style={styles.arrowview}>
                    <Icon
                      name={'keyboard-arrow-right'}
                      type={'MaterialIcons'}
                      style={styles.imgarrow}></Icon>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
            <View></View>
          )} */}
      </View>
    );
  };
  return (
    // <ScrollView>
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'row-reverse',
          // backgroundColor: 'red',
        }}>
        <View
          style={{
            height: '95%',
            width: '5%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            backgroundColor: '#f0f4fd',
            paddingVertical: 15,
            borderRadius: 25,
            marginRight: 15,
          }}>
          <View
            style={{
              width: width * 0.03,
              height: height * 0.02,
              marginBottom: 5,
            }}>
            <Image
              resizeMode={'cover'}
              style={{ width: '100%', height: '100%' }}
              source={require('../../assets/img/Bookmarkc.png')}></Image>
          </View>
          <FlatList
            data={myData}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              for (const [key, value] of Object.entries(item)) {
                return (
                  <TouchableOpacity>
                    <Text
                      style={styles.wordkey}
                      onPress={() => {
                        if (refContainer.current) {
                          refContainer.current.scrollToIndex({
                            animated: true,
                            index: index,
                          });
                        }
                      }}>
                      {key}
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(item, index) => `${index}`}
          // ref={refContainer}
          />
        </View>
        <View style={{ width: '85%' }}>
          <FlatList
            data={myData}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeader}
            keyExtractor={(item, index) => `${index}`}
            ref={refContainer}
          />
        </View>
      </View>
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
          <Text style={{ color: 'white' }}>Loding ...</Text>
        </View>
      </Modal>
    </SafeAreaView>
    // </ScrollView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Contactlist);
