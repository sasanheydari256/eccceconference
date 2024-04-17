import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList, TextInput, Image, Alert, KeyboardAvoidingView } from 'react-native';
import Header from '../../component/Header/index';
import Styles from './Stayles';
// import { request, requestGET, BASE_URL_IMG } from '../../component/services';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import AsyncStorage from  '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context';
import SM from './SendMassage'
import AsyncStorage from  '@react-native-async-storage/async-storage'
export const ChatScreen = (props) => {
  const [Count, setCount] = useState(15)
  const [Page, setPage] = useState(1)
  const [EndL, setEndL] = useState(false)
  const [fisttime, setfisttime] = useState(false)
  const [MText, setMText] = useState('')
  const [Data, setData] = useState([])
  const [Data2, setData2] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      SM.ListMessageGroup({
        Count: 10, Page: 1,
        EmailClient: props.route.params.itemx.Email,
        callback: (e) => {
          setData2(e);
        }
      })
    }, 10000);

    return () => clearInterval(interval);
  }, [Data]);
  useEffect(() => {
    if (Data.length > 0 && Data2.length > 0) {
      SM.CompareObject({
        objectFirst: Data.slice(-1)[0], objectSecend: Data2.slice(-1)[0],
        callback: (r) => !r && SM.AddDatas({
          Arr1: Data, Arr2: Data2, callback: (e) => {
            setData([...Data, ...e])
          }
        })
      })
    }
  }, [Data2])
  useEffect(() => {
    SM.ListMessageGroup({
      Count, Page,
      EmailClient: props.route.params.itemx.Email,
      callback: (e) => setData([...Data, ...e])
    })

  }, [])

  const renderItem = ({ item, index }) => {
    return (
      // Data.length > 0 && Data.slice(0).reverse().map((item, indexs) => (
      // Data.length > 0 && Data.map((item, indexs) => (
      item.Email != props.Token ?
        <View key={index} style={{
          alignSelf: 'flex-start',
          width: '50%', backgroundColor: '#dff8fd',
          padding: 10, margin: 10, borderRadius: 10,
        }}>
          <Text style={[Styles.textTitle3, {
            fontSize: 10, color: 'grey',
            marginBottom: 5, opacity: .7, borderRadius: 3,
            backgroundColor: '#FFFF',
            width: '90%'
          }]}>{item.Name}</Text>
          <Text style={Styles.textTitle3}>{item.Text}</Text>
        </View>
        :
        <View key={index} style={{
          alignSelf: 'flex-end',
          width: '50%', backgroundColor: '#f0f4fd',
          padding: 10, margin: 10, borderRadius: 10,
        }}>
          <Text style={[Styles.textTitle2, { fontSize: 10, color: 'grey' }]}>Me</Text>
          <Text style={Styles.textTitle6}>{item.Text}</Text>
        </View>
      // ))

    );
  };
  return (
    // <SafeAreaView>
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}
      enabled keyboardVerticalOffset={50}>


      <ScrollView style={Styles.mainscrview}>
        <Header navigation={props.navigation}
          homepress={() => props.navigation.navigate('MainScreenEvent')}
          notif={() => props.navigation.navigate('Notifications')}
          iconright={3}
          backcolor={1}
          iconhome={1}
          menuonpress={() => props.setPosi(!props.posi)}></Header>
        <View style={Styles.headermainscr}>
        </View>
        {/* <Text>{props.route.params.itemx.Email}</Text> */}
        <View style={Styles.mainviewchat}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            data={Data}
            inverted contentContainerStyle={{
              flexDirection: 'column-reverse'
            }}
            onEndReached={() => {
              // fisttime ?
              //   !EndL &&
              //   SM.ListMessageGroup({
              //     GroupId: props.route.params.GroupId,
              //     Count, Page: Page + 1,
              //     grupo: props.route.params.grupo,
              //     EmailClient: props.route.params.EmailClient,
              //     callback: (e) => { if (e.length > 0) { setData([...e, ...Data]); setPage(Page + 1); } else { setEndL(true); } }
              //   })
              //   : setfisttime(true)
            }}
            onEndReachedThreshold={.1}
            // initialScrollIndex={Data.length - 1}
            renderItem={renderItem} ></FlatList>
          <View style={{ height: 60 }} />
          <View style={{
            backgroundColor: '#f0f4fd',
            marginBottom: 10, position: 'absolute', bottom: 0,
            width: '100%',
            height: 35,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            alignItems: 'center',
            marginHorizontal: 3,
          }}>
            <View style={{ width: '85%', }}>
              <TextInput
                style={{ width: '100%', }}
                value={MText}
                onChangeText={(e) => {
                  setMText(e)
                }}
                placeholder={'Type a Message'}
              ></TextInput>
            </View>
            <TouchableOpacity
              onPress={() => {
                SM.SendMessageToGroup({
                  navigation: props.navigation,
                  Text: MText,
                  EmailClient: props.route.params.itemx.Email,
                  callback: (e) => {
                    if (e) {
                      setData([...Data, { "Email": props.Token, "Text": MText }]);
                      setMText('')
                    }
                  }
                })
              }
              }
              style={{
                justifyContent: 'center', alignSelf: 'center',
                height: '100%', alignItems: 'center',

              }}>
              <Image
                style={{ height: 25, width: 25 }}
                source={require('../../assets/icon/Send.png')}></Image>
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({ Token: state.Customer.Token, });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
