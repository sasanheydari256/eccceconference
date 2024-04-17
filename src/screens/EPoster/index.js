import React, { useState, useEffect } from 'react';
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
    TextInput,
} from 'react-native';
import { Icon } from 'native-base';
import Header from '../../component/Header/index';
import { connect } from 'react-redux';
import Styles from './Stayles';
import { request, requestGET, BASE_URL_IMG, getEpostEventList } from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
const { width, height } = Dimensions.get('screen');
const HEADER_MIN_HEIGHT = (12 * height) / 100;
const HEADER_MAX_HEIGHT = height / 2;
// const headerOpacity = scrollY.interpolate({
//   inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
//   outputRange: [0, 0, 1],
//   extrapolate: 'clamp',
//   useNativeDriver: true,
// });
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const EPoster = (props) => {
    const [Datas, setDatas] = useState([])
    const [Datas2, setDatas2] = useState([])
    const [Word, setWord] = useState('')
    const [loading, setLoading] = useState(false)
    const [scrollY, setscrollY] = useState(new Animated.Value(0));
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });
    const getData = async () => {
        const EventId = await AsyncStorage.getItem('eventId')
        // alert('ss')
        getEpostEventList({ EventId, loading: (e) => setLoading(e), callback: (e) => setDatas(e), callback2: (e) => setDatas2(e) })

    }
    useEffect(() => {
        getData()
    }, [])
    const Searches = (e) => {
        var results = [];
        if (e !== '') {
            if (Datas.length > 0) {
                for (var i = 0; i < Datas.length; i++) {
                    // for (key in ProgramsSessions[i]) {
                    if (Datas[i].FileName?.toLowerCase().indexOf(e.toLowerCase()) != -1) {
                        results.push(Datas[i]);
                    }
                    // }
                }
                setDatas2(results);
            } else {
                setDatas2([])
            }
        } else {
            //   if (Datas.Sessions.length > 0) {
            //     getsesion(Datas, indexHall, day, Word)
            //     // setSearchResault(Datas.Sessions)
            //   }
        }
    }
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('EPosterDetails', {
                        Datas: Datas[index]
                    })
                }}
                key={index}
                style={[Styles.touchflatmain, { marginTop: 5, overflow: 'hidden' }]}>
                <View style={{
                    marginRight: 10, justifyContent: 'center',
                    alignItems: 'center', width: '5%', height: '100%',
                    overflow: 'hidden', backgroundColor: '#6561fc'
                }}>
                    {/* <Image
                        resizeMode={'contain'}
                        style={{ width: '70%', height: '70%' }}
                        source={require('../../assets/img/pdf-file.png')}></Image> */}
                </View>
                <View
                    style={{
                        width: '75%',
                        flexDirection: 'column',
                    }}>
                    <Text
                        style={Styles.titlename}
                    >
                        {item.FileName}
                    </Text>
                    <Text style={Styles.titlename2}>{item.Text}</Text>

                </View>
                <View style={Styles.imgview}>
                    <Image
                        style={{ height: '100%', width: '100%' }}
                        resizeMode={'contain'}
                        source={require('../../assets/img/arrow.png')}></Image>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={Styles.mainscrview}>
            <Animated.View
                style={[
                    Styles.animindex,
                    { height: HEADER_MIN_HEIGHT, opacity: headerOpacity },
                ]}></Animated.View>
            <Header navigation={props.navigation}
                homepress={() => props.navigation.goBack()}
                // notif={() => props.navigation.navigate('Notifications')}
                iconright={5}
                backcolor={1}
                iconhome={1}
                menuonpress={() => props.setPosi(!props.posi)}></Header>
            <View style={Styles.headermainscr}>
                <View style={Styles.txtinpheader}>
                    <TextInput
                        onSubmitEditing={() => Searches()}
                        onChangeText={(e) => {
                            if (e == '') {
                                setDatas2(Datas)
                            } else {
                                Searches(e)
                            }
                            setWord(e)
                        }}
                        style={Styles.txtinp}
                        placeholderTextColor={'#bbbdc5'}
                        placeholder={'Find Events'}></TextInput>
                    <TouchableOpacity style={Styles.txtinptouch}>
                        <Icon
                            onPress={() => Searches()}
                            name={'search1'}
                            type={'AntDesign'}
                            style={Styles.menutxtinpIcon}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView

                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } },
                ])}>
                <View style={{ width, }}>
                    <View style={{ height: 20 }} />
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={Datas2}
                        renderItem={renderItem}></FlatList>
                    {/* {
            Datas.length > 0 &&
            Datas.map((item, index) => renderItem({ item: item, types: true }))
          } */}
                </View>
                <View style={{ height: 50 }} />
            </ScrollView>
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
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EPoster)
