import React, { useState, useEffect } from 'react'
import { View, Alert, Text, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import Header from '../../component/Header/index';
import Styles from './Stayles';
import { request, requestGET, BASE_URL_IMG } from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import Com from './Components'
const { width, height } = Dimensions.get('screen');

export const MainChats = (props) => {
    const [MyPChat, setMyPChat] = useState([])
    const [Groups, setGroups] = useState([
        // { "GroupId": 1, "GroupName": "Family", "Image": "9202e7d5075e41bf83d96fc0adb346ee.png" }
    ])
    useEffect(() => {
        const myinterval = setInterval(() => {
            Com.ListPeoplePrivateMessage({ navigation: props.navigation, callback: (e) => setMyPChat(e) })
        }, 10000);

        Com.ListPeoplePrivateMessage({ navigation: props.navigation, callback: (e) => setMyPChat(e) })
        // Com.MyGroupChat({ navigation: props.navigation, callback: (e) => setGroups(e) })
        return () => clearInterval(myinterval);
    }, []);
    // const ListPeoplePrivateMessage = async () => {
    //     const Token = await AsyncStorage.getItem('Token');
    //     if (Token !== null && Token !== undefined && Token !== '') {
    //         request('POST', 'ListPeoplePrivateMessage', {
    //             Email: Token,
    //         }, () => { },
    //             () => { },
    //             (response) => {
    //                 console.log(JSON.stringify(response))
    //                 if (response.Result == 'Success') {
    //                     props.callback(response.Answer)
    //                 }
    //             },
    //             (err) => { console.log(JSON.stringify(err)) })
    //     } else {
    //         // setModalVisible(false)
    //         Alert.alert(
    //             "Log In to Register",
    //             "Log in to your account to register for this event",
    //             [
    //                 {
    //                     text: "Cancel",
    //                     onPress: () => props.navigation.goBack(),
    //                     style: "cancel"
    //                 },
    //                 { text: "Log In", onPress: () => props.navigation.replace('Qrcode', { PageNum: 0 }) }
    //             ],
    //             { cancelable: false }
    //         );
    //     }
    // }
    const renderItem = (item, index,) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => props.navigation.navigate('ChatScreen', { itemx: { Email: item.Email, UserName: item.Name } })}
                style={Styles.touchflatmain}>
                {/* {
                    grupo &&
                    <View style={{ width: .1 * width, height: .1 * width, }}>
                        <Image
                            resizeMode={'cover'}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 100,
                            }}
                            source={{ uri: BASE_URL_IMG + item.Image }}></Image>
                    </View>
                } */}
                <View style={Styles.flatcontainname}>
                    <Text
                        style={Styles.titlename}
                    >
                        {item.Name}
                    </Text>

                </View>
                <TouchableOpacity
                    style={Styles.toucharrowaa}
                >
                    <Image
                        resizeMode={'cover'}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        source={require('../../assets/img/arrow.png')}></Image>
                </TouchableOpacity>

            </TouchableOpacity>
        );
    };
    return (
        <View style={Styles.mainscrview}>
            <Header navigation={props.navigation}
                homepress={() => props.navigation.navigate('MainScreenEvent')}
                notif={() => props.navigation.navigate('Notifications')}
                iconright={3}
                backcolor={1}
                iconhome={1}
                menuonpress={() => props.setPosi(!props.posi)}></Header>
            <View style={Styles.headermainscr}>
            </View>
            <ScrollView style={{
                // width, height: '80%',
                // backgroundColor: 'red',
                marginTop: 15
            }}>
                <View >
                    <TouchableOpacity
                        onPress={async () => {
                            let Token = await AsyncStorage.getItem('Token')
                            if (Token !== null && Token !== undefined && Token !== '') {
                                props.navigation.navigate('RegisterChat')
                            } else {
                                // alert('Please login.')
                                Alert.alert(
                                    "Log In to Register",
                                    "Log in to your account to register for this event",
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel "),
                                            style: "cancel"
                                        },
                                        { text: "Log In", onPress: () => props.navigation.navigate('Qrcode', { PageNum: 0 }) }
                                    ],
                                    { cancelable: false }
                                );
                            }

                        }}
                        style={Styles.touchflatmain}>
                        <View style={Styles.flatcontainname}>
                            <Text
                                style={Styles.titlename}
                            >Contacts</Text>
                        </View>
                        <TouchableOpacity style={Styles.toucharrowaa}>
                            <Image
                                resizeMode={'cover'}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                source={require('../../assets/img/arrow.png')}></Image>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ padding: 5, margin: 5 }}>
                    {Groups.length > 0 &&
                        <Text style={{}}>
                            Room
                    </Text>
                    }
                </View> */}
                {/* {
                    Groups.length > 0 && Groups.map((item, index) => renderItem(item, index))
                } */}
                <View style={{ padding: 5, margin: 5 }}>
                    {
                        MyPChat.length > 0 && <Text style={{}}>
                            Private
                    </Text>}
                </View>
                {
                    MyPChat.length > 0 && MyPChat.map((item, index) => renderItem(item, index))
                }
                {/* <FlatList

                    showsVerticalScrollIndicator={false}
                    data={Datas}
                    renderItem={renderItem}></FlatList>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Datas}
                    renderItem={renderItem}></FlatList> */}
                <View style={{ height: height * 0.05 }} />
            </ScrollView>


        </View>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainChats)
