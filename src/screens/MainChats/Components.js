import {Alert} from 'react-native';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import {request, requestGET, BASE_URL_IMG} from '../../component/services';

export const MyGroupChat = async (props) => {
  // alert('dd')
  const Token = await AsyncStorage.getItem('Token');
  if (Token !== null && Token !== undefined && Token !== '') {
    request(
      'POST',
      'MyGroupSexChat',
      {Email: Token},
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response))
        if (response.Result == 'Success') {
          props.callback(response.Answer);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  }
  // else {
  //     // setModalVisible(false)
  //     Alert.alert(
  //         "Log In to Register",
  //         "Log in to your account to register for this event",
  //         [
  //             {
  //                 text: "Cancel",
  //                 onPress: () => console.log("Cancel "),
  //                 style: "cancel"
  //             },
  //             { text: "Log In", onPress: () => props.navigation.navigate('Qrcode', { PageNum: 0 }) }
  //         ],
  //         { cancelable: false }
  //     );
  // }
};
export const ListPeoplePrivateMessage = async (props) => {
  // alert('dd')
  const Token = await AsyncStorage.getItem('Token');
  if (Token !== null && Token !== undefined && Token !== '') {
    request(
      'POST',
      'ListUsersSendMessage',
      {
        Email: Token,
      },
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify({ Email: Token, }))
        // console.log(JSON.stringify(response))
        if (response.Result == 'Success') {
          props.callback(response.Answer);
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  } else {
    // setModalVisible(false)
  }
};
export default {MyGroupChat, ListPeoplePrivateMessage};
