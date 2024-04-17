import {request, requestGET, BASE_URL_IMG} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import {Alert} from 'react-native';

// {"Email":"saeid6658@yahoo.com","Text":"chemikoni?","DateTime":"2021-04-20T04:43:01.697"}
export const CompareObject = (props) => {
  if (
    props.objectFirst.Email == props.objectSecend.Email &&
    props.objectFirst.Text == props.objectSecend.Text
  ) {
    props.callback(true);
  } else {
    props.callback(false);
  }
};

export const AddDatas = (props) => {
  let a1 = props.Arr1;
  let b2 = props.Arr2;
  let a1Index = 0;
  for (let index = 0; index < b2.length; index++) {
    const element = b2[index];
    const element2 = a1.slice(-1)[0];
    CompareObject({
      objectFirst: element,
      objectSecend: element2,
      callback: (e) => {
        if (e) {
          a1Index = index;
        }
      },
    });
  }
  // console.log(a1)
  // console.log(b2.slice(a1Index + 1))
  props.callback(b2.slice(a1Index + 1));
  // console.log(a1Index)
};

export const SendMessageToGroup = async (props) => {
  if (props.Text != '') {
    const Token = await AsyncStorage.getItem('Token');
    if (Token !== null && Token !== undefined && Token !== '') {
      request(
        'POST',
        'SendMessagePrivate',
        {
          Email: Token,
          ToEmail: props.EmailClient,
          Text: props.Text,
        },
        () => {},
        () => {},
        (response) => {
          // console.log(JSON.stringify({
          //     Email: Token,
          //     ToEmail: props.EmailClient,
          //     Text: props.Text
          // }))
          // console.log(JSON.stringify(response))
          if (response.Result == 'Success') {
            // setGroups(response.Answer)
            if (response.Answer == 'Success') {
              props.callback(true);
            } else {
              props.callback(false);
            }
          } else {
            props.callback(false);
          }
        },
        (err) => {
          console.log(JSON.stringify(err));
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
  }
};

export const ListMessageGroup = async (props) => {
  // alert('dd')
  const Token = await AsyncStorage.getItem('Token');
  if (Token !== null && Token !== undefined && Token !== '') {
    request(
      'POST',
      'ListPrivateMessage',
      {
        Email: Token,
        EmailClient: props.EmailClient,
        Count: props.Count,
        Page: props.Page,
      },
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify({
        //     Email: Token,
        //     EmailClient: props.EmailClient,
        //     Count: props.Count,
        //     Page: props.Page
        // }))
        // console.log(JSON.stringify(response))
        if (response.Result == 'Success') {
          props.callback(response.Answer.reverse());
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  } else {
    // setModalVisible(false)
    // Alert.alert(
    //     "Log In to Register",
    //     "Log in to your account to register for this event",
    //     [
    //         {
    //             text: "Cancel",
    //             onPress: () => console.log("Cancel "),
    //             style: "cancel"
    //         },
    //         { text: "Log In", onPress: () => props.navigation.navigate('Qrcode', { PageNum: 0 }) }
    //     ],
    //     { cancelable: false }
    // );
  }
};

export default {SendMessageToGroup, ListMessageGroup, CompareObject, AddDatas};
