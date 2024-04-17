import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
// import Orientation from 'react-native-orientation';
import store from './src/redux/reducers/index';
import Splash from './src/screens/Splash/index';
import MainScreenEvent from './src/screens/MainScreenEvent/index';
import Mainscreen from './src/screens/Mainscreen/index';
import WelcomeSplash from './src/screens/WelcomeSplash/index';
import Welmasone from './src/screens/Welmasone/index';
import BookMarks from './src/screens/BookMarks/index';
import MyAgendaBookmark from './src/screens/MyAgendaBookmark';
import Qrcode from './src/screens/Qrcode/index';
import RegisterEvent from './src/screens/Qrcode/RegisterEvent';
import Splashscr from './src/screens/Splashscr/index';
import WorkShop from './src/screens/WorkShop/index';
import WorkShoppage from './src/screens/WorkShoppage';
import NewsDetails from './src/screens/NewsDetails/index';
import WSDetaile from './src/screens/WorkShop/WSDetaile';
import WSPDFreader from './src/screens/WorkShop/WSPDFreader';
import Symposia from './src/screens/Symposia/index';
import SYDetaile from './src/screens/Symposia/SYDetaile';
import SYPDFreader from './src/screens/Symposia/SYPDFreader';
import Courses from './src/screens/Courses/index';
import Terms from './src/screens/Terms/index';
import ContactUs from './src/screens/ContactUs/index';
import CDetaile from './src/screens/Courses/CDetaile';
import CPDFreader from './src/screens/Courses/CPDFreader';
import Subdivision from './src/screens/Subdivision/index';
import ListEvents from './src/screens/ListEvents/index';
import Profile from './src/screens/Profile/index';
import Notifications from './src/screens/Notifications/index';
import DetailSubDiv from './src/screens/DetailSubDiv/index';
import Exhabitors from './src/screens/Exhabitors/index';
import ExhabitorsDetails from './src/screens/Exhabitors/details';
import SessionDetals from './src/screens/SessionDetals/index';
import Chairmans from './src/screens/Chairmans/index';
import ExhabitSubDev from './src/screens/ExhabitSubDev/index';
import Menue from './src/component/Menue/index';
import LiveSelection from './src/screens/LiveScreen/LiveSelection';
import Commitee from './src/screens/Commitee/index';
import EPoster from './src/screens/EPoster/index';
import ShowPdf from './src/screens/ShowPdf/index';
// import EPosterDetails from './src/screens/EPosterDtails/index';
import Information from './src/screens/Information/index';
import AddComment from './src/screens/AddComment/index';
import Program from './src/screens/Program/index';
// import EventsTime from './src/screens/EventsTime/index';
import EventsTime2 from './src/screens/EventsTime2/index';
import Speakers from './src/screens/Speakers/index';
import MyBadge from './src/screens/MyBadge/index';
import SponserDetail from './src/screens/SponserDetail/index';
import Registration from './src/screens/Registration/index';
import SpeachSchadule from './src/screens/SpeachSchadule/index';
import FaculityList from './src/screens/FaculityList/index';
import LiveScreen from './src/screens/LiveScreen/index';
import RegisterChat from './src/screens/RegisterChat/index';
import ChatScreen from './src/screens/ChatScreen/index';
// import MyPic from './src/screens/MyPic/index';
import Sponsers from './src/screens/Sponsers/Flexmail';
import SponsorList from './src/screens/SponsorList';
import WorkshopList from './src/screens/WorkshopList';
import Course from './src/screens/Course/index';
import Welcome from './src/screens/Welcome/index';
import MainChats from './src/screens/MainChats/index';
import Contactlist from './src/component/ContactList/index';
import Maps from './src/screens/Maps/Index';
import Previose from './src/screens/Previose';
import PrevePlayer from './src/screens/PrevePlayer';
import LoginNew from './src/screens/LoginNew';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import { request } from './src/component/services';
import QuizScreen from './src/screens/QuizScreen';
import DetailQuiz from './src/screens/QuizScreen/DetailQuiz';
import CMEInfo from './src/screens/CMEInfo';
import SocialNetwork from './src/screens/SocialNetwork';
import SplashAds from './src/screens/SplashAds';
import Webbroser from './src/screens/Webbroser';
import NewMenue from './src/component/Menue/NewMenue';
import NewEventsTime from './src/screens/EventsTime/NewEventsTime';
import SocialMedia from './src/screens/SocialMedia';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import CommiteMemberList from './src/screens/CommiteMemberList';
import TermsUse from './src/screens/TermsUse';
import Abstrack from './src/screens/Abstrack';
import AbstrackItem from './src/screens/AbstrackItem';
import FotterBar from './src/component/Menue/FotterBar';
// import {DrawerNavigator} from 'react-navigation';
// import Tabbuttom2 from './src/component/TabButtom2';
const { width, height } = Dimensions.get('screen');

const Stack = createStackNavigator();
const MyDrawer = (props) => {
  const [posi, setPosi] = useState(false);
  const VerticAnim = useRef(new Animated.Value(height)).current;
  const horizonAnim = useRef(new Animated.Value(0)).current;
  const clickmenu = () => {
    Animated.timing(horizonAnim, {
      toValue: !posi ? -(width * 0.75) : 0,
      duration: 500,
    }).start(() => { });
    Animated.timing(VerticAnim, {
      toValue: !posi ? height * 0.8 : height,
      duration: 500,
    }).start(() => {
      setPosi(!posi);
    });
  };
  const onlineUser = async () => {
    const ID = await AsyncStorage.getItem('eventId');
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'OnlinUser',
        {
          EventId: ID,
        },
        () => { },
        () => { },
        (response) => {
          // alert(Token)
          // console.log(JSON.stringify(response));
        },
        (err) => {
          // console.log(JSON.stringify(err));
        },
      );
    }
  };
  useEffect(() => {
    onlineUser();
    // const interval = setInterval(() => {
    //   onlineUser();
    // }, 60000);
    // Orientation.lockToPortrait();
    //   const lang = await AsyncStorage.getItem('LanguageId')
    //   switch (lang) {
    //     case '1':
    //       stringsoflanguages.setLanguage('en')
    //       break;
    //     case '5':
    //       stringsoflanguages.setLanguage('fa')
    //       break;
    //     case '2':
    //       stringsoflanguages.setLanguage('ar')
    //       break;
    //     case '6':
    //       stringsoflanguages.setLanguage('tr')
    //       break;
    //     default:
    //       break;
    //   }
    // return () => clearInterval(interval);
  }, []);
  
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FotterBar navigation={props.navigation}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            height: '100%',
            width: '68%',
          }}>
          <NewMenue
            {...props}
            nEvent={false}
            setPosi={clickmenu}
            clickmenu={clickmenu}
            navigation={props.navigation}
          />
        </View>
        <StatusBar hidden />
        <Animated.View
          style={{
            height: height,
            width: '100%',
            right: horizonAnim,
            position: 'absolute',
            // backgroundColor: 'red',
          }}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Splash">
              {(props) => (
                <Splash
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="MainScreenEvent">
              {(props) => (
                <MainScreenEvent
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Mainscreen">
              {(props) => (
                <Mainscreen
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Previose">
              {(props) => (
                <Previose
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="QuizScreen">
              {(props) => (
                <QuizScreen
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen> 
            <Stack.Screen name="DetailQuiz">
              {(props) => (
                <DetailQuiz
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="WelcomeSplash">
              {(props) => (
                <WelcomeSplash
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Menue">
              {(props) => <Menue {...props}  />}
            </Stack.Screen>
            <Stack.Screen name="Qrcode">
              {(props) => (
                <Qrcode
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RegisterEvent">
              {(props) => (
                <RegisterEvent
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SocialMedia">
              {(props) => (
                <SocialMedia
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="BookMarks">
              {(props) => (
                <BookMarks
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="MyAgendaBookmark">
              {(props) => (
                <MyAgendaBookmark
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {(props) => (
                <Profile
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ContactUs">
              {(props) => (
                <ContactUs
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            {/* <Stack.Screen name="MyPic">
              {(props) => (
                <MyPic
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen> */}
            <Stack.Screen name="Welmasone">
              {(props) => (
                <Welmasone
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Sponsers">
              {(props) => (
                <Sponsers
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            {/* <Stack.Screen name="EPosterDetails">
              {(props) => (
                <EPosterDetails
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen> */}
            <Stack.Screen name="Terms">
              {(props) => (
                <Terms
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="EPoster">
              {(props) => (
                <EPoster
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ShowPdf">
              {(props) => (
                <ShowPdf
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="MyBadge">
              {(props) => (
                <MyBadge
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SponserDetail">
              {(props) => (
                <SponserDetail
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Chairmans">
              {(props) => (
                <Chairmans
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SponsorList">
              {(props) => (
                <SponsorList
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>


            <Stack.Screen name="LiveScreen">
              {(props) => (
                <LiveScreen
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="PrevePlayer">
              {(props) => (
                <PrevePlayer
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="LoginNew">
              {(props) => (
                <LoginNew
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ListEvents">
              {(props) => (
                <ListEvents
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="LiveSelection">
              {(props) => (
                <LiveSelection
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Splashscr">
              {(props) => (
                <Splashscr
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Commitee">
              {(props) => (
                <Commitee
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Notifications">
              {(props) => (
                <Notifications
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SessionDetals">
              {(props) => (
                <SessionDetals
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Subdivision">
              {(props) => (
                <Subdivision
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="DetailSubDiv">
              {(props) => (
                <DetailSubDiv
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Exhabitors">
              {(props) => (
                <Exhabitors
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ExhabitorsDetails">
              {(props) => (
                <ExhabitorsDetails
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="ExhabitSubDev">
              {(props) => (
                <ExhabitSubDev
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Information">
              {(props) => (
                <Information
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>


            <Stack.Screen name="CMEInfo">
              {(props) => (
                <CMEInfo
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>


            <Stack.Screen name="SocialNetwork">
              {(props) => (
                <SocialNetwork
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="AddComment">
              {(props) => (
                <AddComment
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>


            <Stack.Screen name="Program">
              {(props) => (
                <Program
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="EventsTime">
              {(props) => (
                <EventsTime
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>


            <Stack.Screen name="NewEventsTime">
              {(props) => (
                <NewEventsTime
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="EventsTime2">
              {(props) => (
                <EventsTime2
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Registration">
              {(props) => (
                <Registration
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SpeachSchadule">
              {(props) => (
                <SpeachSchadule
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Contactlist">
              {(props) => (
                <Contactlist
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="FaculityList">
              {(props) => (
                <FaculityList
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Speakers">
              {(props) => (
                <Speakers
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="RegisterChat">
              {(props) => (
                <RegisterChat
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
             <Stack.Screen name="ChatScreen">
              {(props) => (
                <ChatScreen
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>


            <Stack.Screen name="Course">
              {(props) => (
                <Course
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen> 
            <Stack.Screen name="Welcome">
              {(props) => (
                <Welcome
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SplashAds">
              {(props) => (
                <SplashAds
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Webbroser">
              {(props) => (
                <Webbroser
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="MainChats">
              {(props) => (
                <MainChats
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="WSDetaile">
              {(props) => (
                <WSDetaile
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SYDetaile">
              {(props) => (
                <SYDetaile
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="WSPDFreader">
              {(props) => (
                <WSPDFreader
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SYPDFreader">
              {(props) => (
                <SYPDFreader
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="WorkShop">
              {(props) => (
                <WorkShop
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="WorkShoppage">
              {(props) => (
                <WorkShoppage
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="NewsDetails">
              {(props) => (
                <NewsDetails
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Symposia">
              {(props) => (
                <Symposia
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="CDetaile">
              {(props) => (
                <CDetaile
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>


            <Stack.Screen name="CPDFreader">
              {(props) => (
                <CPDFreader
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Courses">
              {(props) => (
                <Courses
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Maps">
              {(props) => (
                <Maps
                  {...props}
                  setPosi={clickmenu}
                  posi={posi}
                  VerticAnim={VerticAnim}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="PrivacyPolicy">
              {(props) => (
                <PrivacyPolicy
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="TermsUse">
              {(props) => (
                <TermsUse
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Abstrack">
              {(props) => (
                <Abstrack
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="AbstrackItem">
              {(props) => (
                <AbstrackItem
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="CommiteMemberList">
              {(props) => (
                <CommiteMemberList
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="WorkshopList">
              {(props) => (
                <WorkshopList
                  {...props}
                  VerticAnim={VerticAnim}
                  setPosi={clickmenu}
                  posi={posi}
                />
              )}
            </Stack.Screen>

          </Stack.Navigator>
        </Animated.View>
      </FotterBar>
    </View>
  );
};

// const majorVersionIOS = parseInt(Platform.Version, 10);
// const Tabbuttom = (props) => {
//   return (
//     <SafeAreaView
//       style={{
//         ...Platform.select({
//           ios: {
//             flex: majorVersionIOS > 14 ? 0.96 : 1,
//           },
//           android: {
//             flex: 1,
//           },
//         }),
//       }}>
//       <View style={{height: '100%'}}>
//         {/* <Text>{majorVersionIOS}</Text> */}
//         <View style={{height: '92%'}}>
//           <MyDrawer MyAlert={props.route.params?.MyAlert} />
//         </View>
//         <Tabbuttom2 navigation={props.navigation} />
//       </View>
//     </SafeAreaView>
//   );
// };

const Stack2 = createStackNavigator();
const App = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack2.Navigator screenOptions={{ headerShown: false }}>
          <Stack2.Screen name="MyDrawer" component={MyDrawer} />
        </Stack2.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;