import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image
} from 'react-native';

import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Header from '../../component/Header';
import Stylesnew from './Stylesnew';
import LinearGradient from 'react-native-linear-gradient';
import { convertDay, BASE_URL_IMG, request } from '../../component/services';
// import {Icon} from 'native-base';
import { CheckBox, Tab, Tabs, TabHeading, Icon, ListItem, Body } from 'native-base';
import { useMemo } from 'react';

const { width, height } = Dimensions.get('screen');

export const NewEventsTime = (props) => {
  const [Programs, setPrograms] = useState([]);
  const [day, setday] = useState(0);
  const [Datas, setDatas] = useState([]);
  const [Datas2, setDatas2] = useState([]);
  const [indexHall, setindexHall] = useState(0);
  const [Word, setWord] = useState('');
  const [Halls, setHalls] = useState([]);
  const [FilltedHalls, setFilltedHalls] = useState([]);
  const [NameHall, setNameHall] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [Chearman, setChearman] = useState({});
  const [Days, setDays] = useState([]);
  const [ShowsData, setShowsData] = useState([]);
  const [fullAgendadata, setFullAgendadata] = useState([]);
  const [tracksdata, setTraksdata] = useState([]);
  const [EventFaculty] = useState([
    {
      Name: 'ramin',
      Id: '1',
      UserPreFix: 'mr.',
      Image: '3.jpg',
      Biography: 'biografy',
    },
  ]);

  function filterSessions(data, hallsToInclude) {
    const allowedHalls = hallsToInclude;
    const filteredData = [];
    data.forEach(timeSlot => {
      for (const time in timeSlot) {
        const sessions = timeSlot[time];
        const filteredSessions = sessions.filter(session => {
          return session && session.Hall && allowedHalls.includes(session.Hall);
        });

        if (filteredSessions.length > 0) {
          const newTimeSlot = { [time]: filteredSessions };
          filteredData.push(newTimeSlot);
        }
      }
    });

    return filteredData;
  }
  const getSelectedCheckboxes = (halls) => {
    const selectedCheckboxes = Object.values(halls)
      .filter((checkbox) => checkbox.state)
      .map((checkbox) => checkbox.name);
    return selectedCheckboxes;
  };

  const handleCheckBoxToggle = (checkboxName) => {
    // console.log(checkboxName);
    setHalls((prevHalls) => {
      const updatedHalls = Object.keys(prevHalls).map((hallName) => {
        if (hallName === checkboxName) {
          return {
            [hallName]: {
              ...prevHalls[hallName],
              state: !prevHalls[hallName]?.state,
            },
          };
        }
        return { [hallName]: prevHalls[hallName] };
      });
  
      return Object.assign({}, ...updatedHalls);
    });
  };
  const resetCheckBoxes = () => {
    setHalls((prevHalls) => {
      const updatedCheckboxes = {};
      Object.keys(prevHalls).forEach((checkboxName) => {
        updatedCheckboxes[checkboxName] = {
          ...prevHalls[checkboxName],
          state: false,
        };
      });
      return updatedCheckboxes;
    });
  };
  const isMounted = useRef(true); // Track mounted state

  useEffect(() => {
    return () => {
      // Component will unmount, set isMounted to false
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    // props.start?.();
    // alert(JSON.stringify(props.route.params));

    GetPrograms(props.route.params?.Id);

  }, [props.route.params?.Id]);
  const formatedDate = (today) => {
    let parts = today.split('-');
    let mydate = (parts[0] + '-' + (parts[1]).toString().padStart(2, '0') + '-' + parts[2].toString().padStart(2, '0'))
    //mydate = mydate.toISOString().split('T')[0]
    return mydate
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  };
  const fullAgenda = (Sessions, dayList) => {
    let Lsession = Sessions;
    // let today = dayList;
    // فرمت صحیح 2024-02-01
    // فرمت اشتباه 2024-2-1
    // today = formatedDate(today)
    const filteredSessionsDate = [];
    let i = 0;
    let added = [];
    while (i < Lsession.length) {
      const session = Lsession[i];
      let foundkey = added.find(key => key === session.Start);
      if (foundkey === undefined) {
        // عملیات مربوط به عدم پیدا شدن عنصر
        if (session.Day === dayList) {
          const key = session.Start;
          // فیلتر کردن روز خاص
          let value = Sessions.filter((Rsession) => {
            return Rsession.Start >= session.Start && Rsession.Expire <= session.Expire;
          });
          // alert(value)
          added.push(key);
          let sessionObject = {};
          sessionObject[key] = value;
          filteredSessionsDate.push(sessionObject);
        }
      }
      i++;
    }
    setFullAgendadata(filteredSessionsDate)
    if (FilltedHalls.length > 0) {
      const filteredSessions = filterSessions(filteredSessionsDate, FilltedHalls);
      setTraksdata(filteredSessions)
    }


  }
  const convertDataForCheckBox = (hallNames) => {
    const result = {};

    hallNames.forEach((hallName, index) => {
      const optionKey = `option${index + 1}`;
      result[optionKey] = {
        nameOption: optionKey,
        name: hallName,
        state: false,
      };
    });
    return result;
  };
  const GetPrograms = (EventId) => {
    // console.log(JSON.stringify(props))
    request(
      'POST',
      'GetPrograms',
      { EventId },
      () => { },
      () => { },
      (response) => {
        // console.log(JSON.stringify(response), 'neweventssssssss');
        if (response.Result == 'Success' && response.Result != null) {
          let a = response.Answer;
          setDatas(a);
          setDatas2(response.Answer);
          setDays(response.Answer.DayList);
          setHalls(convertDataForCheckBox(response.Answer.HallName))
          setday(SelectedDay(response.Answer.DayList[0]))
          fullAgenda(response.Answer.Sessions, response.Answer.DayList[0]);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  };
  const SelectedDay = (date) => {
    const dateString = date;
    const parts = dateString.split('-');
    const dayNumber = parseInt(parts[2], 10);
    return dayNumber;
  }
  function getMonthName(date) {
    const dateString = date;
    const parts = dateString.split('-');
    const monthNumber = parseInt(parts[1], 10);
    const monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun",
      "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"
    ];

    return monthNames[monthNumber - 1];
  }
  const renderDate = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(Datas2.Sessions,'ajab');
          fullAgenda(Datas2.Sessions, Days[index]);

          setday(SelectedDay(Days[index]))
          // console.log(Days[index]);
          // getsesion(Datas, indexHall, index, Word);
        }}
        style={Stylesnew.touchdate}>
        <LinearGradient
          key={index}
          style={Stylesnew.seconddate}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.5 }}
          colors={[
            day == SelectedDay(Days[index]) ? '#26A1F3' : '#E3F3FD',
            day == SelectedDay(Days[index]) ? '#26A1F3' : '#E3F3FD',
          ]}>
          <View style={Stylesnew.seconddate}>
            <Text
              style={[
                Stylesnew.txtdatese,
                { color: day == index ? '#FFFF' : 'black' },
              ]}>
              {convertDay(item)}
            </Text>
            <Text>
              {getMonthName(Days[index])}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={Stylesnew.facultypersonv}>
        <Image
          resizeMode={'cover'}
          style={Stylesnew.facultypersonimg}
          source={{ uri: BASE_URL_IMG + item.UserImage }}></Image>
      </View>
    );
  };
  const renderDatecontent = ({ item, i }) => {
    return (
      <View
        onPress={() => {
        }}
        style={Stylesnew.renderheadtime}>
        <View style={Stylesnew.headtimeview}>
          <Text style={Stylesnew.headtimetxt}>{Object.keys(item)}</Text>
        </View>
        {Object.keys(item).map((key) => {
          return item[key].map((session, index) => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('SessionDetals', { session })
                // console.log(session.Speakers);
              }}
              style={Stylesnew.rendercontentview} key={index}>
              <View style={{ flexDirection: 'column', width: '15%', backgroundColor: '#F4F5F7' }}>

                <View style={Stylesnew.timeleftview}>
                  <Text>{session.Start}</Text>
                  <Text>{session.Expire}</Text>
                </View>
                <View style={{ justifyContent: 'flex-start', backgroundColor: '#F4F5F7' }}>
                  <Icon
                    name={'checkbox-blank-circle'}
                    type={'MaterialCommunityIcons'}
                    style={{ color: session.Colore, width: '100%', fontSize: 12, padding: '11%' }}
                  />
                </View>
              </View>
              <View style={Stylesnew.renderleftcontent}>
                <View style={Stylesnew.renderlocationview}>

                  <Text style={{ padding: '2%', fontSize: 16 }}>{session.Name}</Text>

                </View>
                <View style={Stylesnew.renderlocationview}>
                  <Icon
                    name={'location-pin'}
                    type={'Entypo'}
                    style={Stylesnew.iconimg}
                  />
                  <Text>{session.Hall}</Text>
                </View>
                {/* speakers */}
                {session.Speakers?.length > 0 && (
                  <View style={Stylesnew.profileimg}>
                    <FlatList
                      style={{

                      }}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      data={session.Speakers}
                      renderItem={renderItem}
                    // keyExtractor={(item, index) => `${index}`}
                    ></FlatList>

                  </View>
                )}
              </View>

            </TouchableOpacity>
          ));
        })}

      </View>
    );
  };
  function TabComponent({ children }) {
    // useMemo برای محاسبه این قسمت
    // تنها زمانی است که props تغییر کند
    const memoizedValue = useMemo(() => {
      return children
    }, [children]);
    return (
      <View>
        {memoizedValue}
      </View>
    )

  }
  return (
    <View>
     

      <View style={Stylesnew.maincontentview}>
      <Header
          navigation={props.navigation}
          homepress={() => props.navigation.navigate('MainScreenEvent')}
          notif={() => props.navigation.navigate('Notifications')}
          iconright={3}
          // backcolor={1}
          iconhome={1}
          menuonpress={() => props.setPosi(!props.posi)}
        />
        <View style={{ height: '85%' ,paddingTop:'7%'}}>
     
          <Tabs
            onChangeTab={(e) => {
              e.i === 1 && tracksdata.length <= 0 && setModalVisible(true);
            }}
            initialPage={0}
          >

            <Tab heading={<TabHeading style={Stylesnew.eachTabStyle}><Text>Full Agenda</Text></TabHeading>}>
              {/* full agenda */}
              <TabComponent>
                <View style={{ width: width, alignItems: 'center', backgroundColor: '#fff' }}>
                  <FlatList
                    style={{}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={Days}
                    renderItem={renderDate}
                  />
                </View>
                {/* body full agenda */}
                <FlatList
                  style={{ height: '82%' }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  // horizontal={true}
                  data={fullAgendadata}
                  renderItem={renderDatecontent}
                />
              </TabComponent>

            </Tab>
            <Tab heading={<TabHeading style={Stylesnew.eachTabStyle}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  setModalVisible(true)
                }}
              >
                <View style={{ alignSelf: 'center' }}>
                  <Text>Tracks</Text>

                </View>
                <View style={{ paddingLeft: 10, }}>
                  <Icon
                    name={'caretdown'}
                    type={'AntDesign'}
                    style={{ color: '#E3F3FD' }}
                  />
                </View>

              </TouchableOpacity>
            </TabHeading>}>
              <TabComponent>
                <View style={{ width: width, alignItems: 'center', backgroundColor: '#fff' }}>
                  <FlatList
                    style={{}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={Days}
                    renderItem={renderDate}
                  />
                </View>
                <View style={{ width: width, height: (height * 3.8) / 100, backgroundColor: '#C9CCD3', flexDirection: 'row' }}>
                  <View style={{ width: '10%' }}>
                    <Icon
                      name={'filter'}
                      type={'AntDesign'}
                      style={{ color: '#E3F3FD' }}
                    />
                  </View>
                  <Text numberOfLines={1} style={{ padding: '1%', width: (width * 90) / 100, flexDirection: 'row' }}>
                    {FilltedHalls.map((i => {
                      return (
                        <Text numberOfLines={1} style={{ fontSize: 12 }}> {i} , {' '} </Text>
                      )
                    }))}
                  </Text>
                </View>
                <FlatList
                  style={{ height: '82%' }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  // horizontal={true}
                  data={tracksdata}
                  renderItem={renderDatecontent}
                />

              </TabComponent>
            </Tab>
          </Tabs>
        </View>
      </View>

      <Modal transparent={true} visible={modalVisible} onDismiss={() => setModalVisible(false)} >

        <View style={{ width: width, height: height, backgroundColor: '#ffffff40', alignItems: 'center' }}>
          <View style={{ borderRadius: 10, backgroundColor: '#E3F3FD', top: '12%', width: '85%', height: '60%' }}>

            <View style={{ position: 'absolute', top: "-3%", right: '15%' }}>
              <Icon
                name={'caretup'}
                type={'AntDesign'}
                style={{ color: '#E3F3FD' }}
              />
            </View>
            <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', borderRadius: 10, position: 'absolute', bottom: 0, height: '10%', width: '100%' }}>
              <TouchableOpacity style={{ justifyContent: 'center', width: '30%', height: '75%' }} onPress={() => resetCheckBoxes()}>
                <Text style={{ textAlign: 'center', color: '#26A1F3' }}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center', borderRadius: 10,
                  backgroundColor: '#26A1F3', width: '30%', height: '75%',
                }}
                onPress={() => {
                  setModalVisible(false)
                  const selectedHalls = getSelectedCheckboxes(Halls);
                  setFilltedHalls(selectedHalls);
                  const filteredSessions = filterSessions(fullAgendadata, selectedHalls);
                  setTraksdata(filteredSessions)
                }
                }>
                <Text style={{ textAlign: 'center', color: '#E3F3FD' }}>Apply</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: '89%' }}>
              {Object.values(Halls).map((i) => (
                <ListItem onPress={() => handleCheckBoxToggle(i.nameOption)}>
                  {i.state ? (<Icon
                    name={'checkbox-blank-circle'}
                    type={'MaterialCommunityIcons'}
                    style={{ color: '#f22', width: '10%', fontSize: 12, padding: '2%' }}
                  />) : (<Icon
                    name={'checkbox-blank-circle-outline'}
                    type={'MaterialCommunityIcons'}
                    style={{ color: '#f22', width: '10%', fontSize: 12, padding: '2%' }}
                  />)}
                  <Body>
                    <Text>{i.name}</Text>
                  </Body>
                  <CheckBox onPressIn={() => handleCheckBoxToggle(i.nameOption)} checked={i.state} />
                </ListItem>
              ))}
            </ScrollView>

          </View>

        </View>
      </Modal>
    </View >
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewEventsTime);
