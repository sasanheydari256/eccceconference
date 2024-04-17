// const _ = require("lodash");
// export const BASE_URL = 'https://backendapp.uaehybrid.com/api/';
// export const BASE_URL_IMG = 'https://backendapp.uaehybrid.com/Images/';
export const BASE_URL_IMG = 'https://admin.plusregistration.com/Images/';
// import messaging from '@react-native-firebase/messaging';
// export const BASE_URL_Login = 'https://backendapp.uaehybrid.com/api/LoginSite';
import React from 'react';
// export const BASE_URL = 'https://account.uaehybrid.com/api/';
export const BASE_URL = 'https://admin.plusregistration.com/api/';
// export const BASE_URL_IMG = 'https://account.uaehybrid.com/Images/';
// export const BASE_URL_Login = 'https://account.uaehybrid.com/api/LoginSite';
export const BASE_URL_Login =
  'https://admin.plusregistration.com/api/LoginSite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, Platform, Text} from 'react-native';
// import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {SvgUri} from 'react-native-svg';
// export const BASE_URL = "http://192.168.1.105/apptis/public/api/";
// import { myStore as store } from "./App";
// import { setTempStateRequest } from "./redux/actions/index";
export const sendFirebaseToken = async () => {
  // const tokenF = await iid().getToken();
  const EventId = await AsyncStorage.getItem('eventId');
  const Email = await AsyncStorage.getItem('Token');
  // const tokenFCM = await messaging().getToken();
  EventId &&
    request(
      'POST',
      'GetFireBaseUserToken',
      {
        FireBaseToken: 'tokenFCM',
        Email,
        EventId,
        Allow: true,
      },
      () => {},
      () => {},
      async (response) => {
        if (response.Result == 'Success') {
          // alert(JSON.stringify(response.Result));
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
};
export const MyImage = (props) => {
  // if (Platform.OS === 'ios') {
  //   const resizeModeIOS =
  //     props?.resizeMode == 'contain'
  //       ? FastImage.resizeMode.contain
  //       : props?.resizeMode == 'cover'
  //       ? FastImage.resizeMode.cover
  //       : null;
  //   return <FastImage resizeMode={resizeModeIOS} {...props}></FastImage>;
  // } else {
  if (props?.urls) {
    if (props?.urls.split('.')[1] === 'svg') {
      // return <Text>{BASE_URL_IMG + props?.urls}</Text>;
      return <SvgUri uri={BASE_URL_IMG + props?.urls} {...props} />;
    } else {
      return <Image resizeMode={props?.resizeMode} {...props}></Image>;
    }
  } else {
    return <Image resizeMode={props?.resizeMode} {...props}></Image>;
  }
  // }
};
export const checkDats = (dat) => {
  let newdat = '';
  let dateArr = dat.split('-');
  if (
    dateArr[0] != '2021' &&
    dateArr[0] != '2022' &&
    dateArr[0] != '2023' &&
    dateArr[0] != '2024'
  ) {
    newdat = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
    // alert(dateArr);
    return newdat;
  } else {
    // alert(dat);
    newdat = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
    // alert(dateArr);
    return newdat;
  }
};
export const CompareWithToday = (Day) => {
  let today = new Date();
  if (
    Math.round(today.getTime() / 100000) * 100000 <=
    new Date(checkDats(Day)).getTime()
  ) {
    return 'upcoming';
  } else {
    return 'previous';
  }
};
export const FindeEventDefault = (arrEvent) => {
  // alert(JSON.stringify(arrEvent))
  let a = 'nadare';
  arrEvent.map((event, index) => {
    // alert(JSON.stringify(event))
    if (event.Default == true) {
      a = event;
      // return
    }
  });
  return a;
};

export const getDay = (time) => {
  const index = time.indexOf('T');
  if (index) {
    return time.split('T')[0];
  } else {
    return time;
  }
};

export const getTime = (time) => {
  const index = time.indexOf('T');
  if (index) {
    return time.split('T')[1];
  } else {
    return time;
  }
};

export const OrganizationId = 25;
export const AppName = 'ECCC2024';
export const HtmlOneLine = (texts) => {
  return texts.replace(/<\/?[^>]+(>|$)/g, '').replace(/&\/?[^;]+(;|$)/g, '');
};
export const getReminTime = (hourstart, MyDates) => {
  let valuestart = hourstart ? hourstart : '8:00';
  let objTime = {
    sec: '0',
    minut: '0',
    hour: '0',
    day: '0',
    remine: false,
  };
  const timeend = MyDates.split('-');
  //create date format
  let timeStart = new Date(
    timeend[0] + '/' + timeend[1] + '/' + timeend[2] + ' ' + valuestart,
  );
  let timeEnd = new Date();

  let Totalsec = timeStart - timeEnd;
  Totalsec = Totalsec / 1000;
  let totalDay = Math.floor(Totalsec / 86400);
  let leftSec = Totalsec - totalDay * 86400;

  let hours = Math.floor(leftSec / 3600);
  leftSec %= 3600;
  let minutes = Math.floor(leftSec / 60);
  let seconds = Math.floor(leftSec % 60);
  if (Totalsec < 0) {
  } else {
    objTime = {
      hour: hours,
      sec: seconds,
      minut: minutes,
      day: totalDay,
      remine: true,
    };
  }
  return objTime;
};

export const convertMonth = (dates) => {
  var monthShortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let month = dates.split('-');
  return monthShortNames[parseInt(month[1]) - 1];
};

export const convertDay = (dates) => {
  let month = dates.split('-');
  return month[2];
};

export const GetContactUs = (props) => {
  props.loading(true);
  requestGET(
    'GetContactUs',
    () => {},
    () => {},
    (response) => {
      // console.log(JSON.stringify(response), 'ss')
      // console.log(JSON.stringify(props))
      if (response.Result == 'Success') {
        props.callback(response);
      }
      props.loading(false);
    },
    (err) => {
      console.log(JSON.stringify(err));
      props.loading(false);
    },
  );
};

export const AddMyComment = async (props) => {
  const Token = await AsyncStorage.getItem('Token');
  // console.log(JSON.stringify({ EmailFrom: Token, EmailTo }))
  if (Token !== null && Token !== undefined && Token !== '') {
    props.loading(true);
    request(
      'POST',
      'AddComment',
      {
        EventId: props.EventId,
        Message: props.Message,
        AvgRate: props.AvgRate,
        Email: Token,
      },
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response))
        // console.log(JSON.stringify(props))
        if (response.Result == 'Success') {
          props.callback();
        }
        props.loading(false);
      },
      (err) => {
        // console.log(JSON.stringify(err))
        props.loading(false);
      },
    );
  } else {
    props.loading(false);
    // props.backerror('')
  }
};

export const getListComment = (props) => {
  props.loading(true);
  request(
    'POST',
    'ListComment',
    {EventId: props.EventId},
    () => {},
    () => {},
    (response) => {
      // console.log(JSON.stringify(response))
      // console.log(JSON.stringify(props))
      if (response.Result == 'Success') {
        props.callback(response.Answer);
      }
      props.loading(false);
    },
    (err) => {
      console.log(JSON.stringify(err));
      props.loading(false);
    },
  );
};

export const getEpostEventList = (props) => {
  props.loading(true);
  request(
    'POST',
    'EpostEventList',
    {EventId: props.EventId},
    () => {},
    () => {},
    (response) => {
      // console.log(JSON.stringify(response), 'ss');
      // console.log(JSON.stringify(props))
      if (response.Result == 'Success') {
        props.callback(response.Answer);
        props.callback2(response.Answer);
      }
      props.loading(false);
    },
    (err) => {
      console.log(JSON.stringify(err));
      props.loading(false);
    },
  );
};

export const getGetBackgroundImage = (props) => {
  props.loading(true);
  requestGET(
    'GetBackgroundImage',
    () => {},
    () => {},
    (response) => {
      // console.log(JSON.stringify(response), 'ss')
      // console.log(JSON.stringify(props))
      if (response.Result == 'Success') {
        props.callback(response.Answer);
      }
      props.loading(false);
    },
    (err) => {
      console.log(JSON.stringify(err));
      props.loading(false);
    },
  );
};

export const getUserInformation = async (props) => {
  props.loading(true);
  const Token = await AsyncStorage.getItem('Token');
  if (Token !== null && Token !== undefined && Token !== '') {
    request(
      'POST',
      'UserInformation',
      {Email: Token},
      () => {},
      () => {},
      (response) => {
        // console.log(JSON.stringify(response), 'ss')
        // console.log(JSON.stringify(props))
        if (response.Result == 'Success') {
          props.callback(response.Answer);
        }
        props.loading(false);
      },
      (err) => {
        props.callback({
          Name: 'User Name',
          Familly: '',
          Company: '',
          Address: '',
          Phone: '',
          Mobile: '',
          RegisterId: '',
        });
        console.log(JSON.stringify(err));
        props.loading(false);
      },
    );
  } else {
    props.loading(false);
    props.callback({
      Name: 'User Name',
      Familly: '',
      Company: '',
      Address: '',
      Phone: '',
      Mobile: '',
      RegisterId: '',
    });
  }
};

export const request = async (
  method,
  url,
  data,
  startCB,
  successCA,
  successCB,
  errorCB,
) => {
  startCB && startCB();
  fetch(BASE_URL + url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      // console.log(JSON.stringify(response))
      if (response.status !== 200) {
        // alert('سرور از دسترس خارج است')
      } else {
        successCA && successCA(response);
        return response.json();
      }
    })
    .then((result) => {
      // console.log(JSON.stringify(result))
      successCB && successCB(result);
    })
    .catch((err) => {
      // console.log(JSON.stringify(err))
      errorCB && errorCB(err);
    });
};

export const requestLogin = async (
  method,
  data,
  startCB,
  successCA,
  successCB,
  errorCB,
) => {
  startCB && startCB();
  fetch(BASE_URL_Login, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((response) => {
      // console.log(JSON.stringify(response))
      if (response.status !== 200) {
        // alert('سرور از دسترس خارج است')
      } else {
        successCA && successCA(response);
        return response.json();
      }
    })
    .then((result) => {
      // console.log(JSON.stringify(result))
      successCB && successCB(result);
    })
    .catch((err) => {
      // console.log(JSON.stringify(err))
      errorCB && errorCB(err);
    });
};

export const requestGET = async (
  url,
  startCB,
  successCA,
  successCB,
  errorCB,
) => {
  startCB && startCB();
  fetch(BASE_URL + url, {
    method: 'GET',
    // body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((response) => {
      // console.log(JSON.stringify(response))
      if (response.status !== 200) {
        // alert('سرور از دسترس خارج است')
      } else {
        successCA && successCA(response);
        return response.json();
      }
    })
    .then((result) => {
      // console.log(JSON.stringify(result))
      successCB && successCB(result);
    })
    .catch((err) => {
      // console.log(JSON.stringify(err))
      errorCB && errorCB(err);
    });
};

export const converttimes = (times) => {
  var dateTime = new Date(times).toLocaleDateString('fa-IR');
  return dateTime;
};

export const openCameras = (props) => {
  ImagePicker.openCamera({
    width: 417,
    height: 417,
    cropping: true,
    includeBase64: true,
    // cropperCircleOverlay: true,
  }).then((image) => {
    // console.log(image);
    props.setMyImage(image.path);
  });
};

export const openEmagefolder = (props) => {
  ImagePicker.openPicker({
    width: 417,
    height: 417,
    cropping: true,
    includeBase64: true,
    // cropperCircleOverlay: true,
  }).then((image) => {
    props.setMyImage(image.path);
    // console.log(image);
  });
};
// dateTime.toISOString().substring(0, 10).replaceAll('-', '/');
