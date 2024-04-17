import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
    View, Text, ScrollView, FlatList, TextInput, Image,
    TouchableOpacity,
    Alert, Dimensions
} from 'react-native';
import { Icon, } from 'native-base';
import Video from 'react-native-video';
import Header from '../../component/Header';
import Styles from './styles';
import WebView from 'react-native-webview';
const { width, height } = Dimensions.get('screen');
// import AsyncStorage from  '@react-native-async-storage/async-storage'
const PrevePlayer = (props) => {
    const [Bigshow, setBigshow] = useState(height * .45)
    const [videoUrl, setvideoUrl] = useState('https://vimeo.com/624303519')
    useEffect(() => {

    }, [])
    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={Styles.mainscrview}>
                <Header navigation={props.navigation}
                    homepress={() => props.navigation.navigate('MainScreenEvent')}
                    notif={() => props.navigation.navigate('Notifications')}
                    iconright={3}
                    backcolor={1}
                    iconhome={1}
                // menuonpress={() => props.setPosi(!props.posi)}
                ></Header>
                <View style={Styles.headermainscr}>
                </View>
                <View style={{
                    transform: [{ rotate: Bigshow == height ? '90deg' : '0deg' }],
                    position: Bigshow == height ? 'absolute' : 'relative',
                    width: Bigshow == height ? height : width,
                    height: Bigshow == height ? width : (height * .45),
                    zIndex: 8888,
                    backgroundColor: 'black',
                    top: Bigshow == height ? height * .27 : 0,
                    left: Bigshow == height ? -width * .58 : 0,
                }}>
                    {/* <Text>{JSON.stringify(props.route.params.items)}</Text> */}
                    <WebView source={{ uri: props.route.params.items.Link, headers: { "Referer": "https://yourwebsite.com" } }} />

                </View>
                <TouchableOpacity
                    style={{
                        position: 'absolute', bottom: 100,
                        padding: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
                        backgroundColor: '#3e52c8',
                        borderWidth: .5, borderColor: 'grey',
                        right: 0, zIndex: 99999
                    }}
                    onPress={() => {
                        // Orientation.lockToLandscape();
                        setBigshow(Bigshow == height ? 1 : height)
                    }}>
                    <Icon
                        style={{ fontSize: 18, color: '#FFFF' }}
                        name={'resize-full-screen'}
                        type={'Entypo'}
                    ></Icon>
                </TouchableOpacity>

                <View style={Styles.mainviewchat}>
                    <Text>{props.route.params.items.Description}</Text>

                </View>

            </View>

        </ScrollView>
    )
}

export default PrevePlayer
