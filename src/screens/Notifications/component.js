import {request, requestGET, BASE_URL_IMG} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import {Alert} from 'react-native';
export const AcceptRequestToUser = async (props) => {
  const Token = await AsyncStorage.getItem('Token');
  if (Token !== null && Token !== undefined && Token !== '') {
    request(
      'POST',
      'AcceptRequestToUser',
      {
        MyEmail: Token,
        RequestEmail: props.RequestEmail,
      },
      () => {},
      () => {},
      (response) => {
        // console.log({
        //     MyEmail: Token,
        //     RequestEmail: props.RequestEmail,
        // })
        // console.log(response)
        if (response.Result == 'Success') {
          props.callback();
        } else if (response.Result == 'Faild') {
          alert('Not Found');
        }
      },
      (err) => {
        // console.log(JSON.stringify(err));
        props.callback(false);
      },
    );
  } else {
    // setModalVisible(false)
    Alert.alert(
      'Log In to Register',
      'Log in to your account to register for this event',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel '),
          style: 'cancel',
        },
        {
          text: 'Log In',
          onPress: () => props.navigation.navigate('Qrcode', {PageNum: 0}),
        },
      ],
      {cancelable: false},
    );
    props.callback(false);
  }
};
export const RejectRequestToUser = async (props) => {
  const Token = await AsyncStorage.getItem('Token');
  if (Token !== null && Token !== undefined && Token !== '') {
    request(
      'POST',
      'RejectRequestToUser',
      {
        MyEmail: Token,
        RequestEmail: props.RequestEmail,
      },
      () => {},
      () => {},
      (response) => {
        // console.log({
        //   MyEmail: Token,
        //   RequestEmail: props.RequestEmail,
        // });
        // console.log(response);
        if (response.Result == 'Success') {
          props.callback();
        } else if (response.Result == 'Faild') {
          alert('Not Found');
        }
      },
      (err) => {
        // console.log(JSON.stringify(err));
        props.callback(false);
      },
    );
  } else {
    // setModalVisible(false)
    Alert.alert(
      'Log In to Register',
      'Log in to your account to register for this event',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel '),
          style: 'cancel',
        },
        {
          text: 'Log In',
          onPress: () => props.navigation.navigate('Qrcode', {PageNum: 0}),
        },
      ],
      {cancelable: false},
    );
    props.callback(false);
  }
};
export const ListRequestsChat = async (props) => {
  const Token = await AsyncStorage.getItem('Token');
  if (Token !== null && Token !== undefined && Token !== '') {
    request(
      'POST',
      'ListRequestsChat',
      {
        Email: Token,
        Page: props.Page,
        Count: props.Count,
      },
      () => {},
      () => {},
      (response) => {
        // console.log({
        //   Email: Token,
        //   Page: props.Page,
        //   Count: props.Count,
        // });
        // console.log(response);
        if (response.Result == 'Success') {
          props.callback(response.Answer);
        }
      },
      (err) => {
        // console.log(JSON.stringify(err));
        props.callback(false);
      },
    );
  }

  //  else {
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
  //     props.callback(false)
  // }
};
export default {ListRequestsChat, AcceptRequestToUser, RejectRequestToUser};
