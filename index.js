// index.js
import { AppRegistry } from 'react-native';
import { LogBox } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
// import  firebase  from "@react-native-firebase/app";
LogBox.ignoreLogs([
    // Exact message
    'Warning: componentWillReceiveProps has been renamed',
  
  ]);
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreLogs([' WARN  ']); // Ignore log notification by message
// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
    
//     console.log('Message handled in the background!', remoteMessage);
// });
console.disableYellowBox = true;

    AppRegistry.registerComponent(appName, () => App);