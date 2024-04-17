import {Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {request, requestGET} from '../../component/services';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import AutoHeightWebView from '../../component/services/autoHeightWebview';
import Styles from './Styles';
import HeaderNew from '../../component/HeaderNew';

export const index = (props) => {
  const [policy, setPolicy] = useState('');
  const [terms, setTerms] = useState('');

  // GetTerms
  const Getterms = async () => {
    let EventId = await AsyncStorage.getItem('eventId');
    // alert(EventId);
    request(
      'POST',
      'GetTerms',
      {EventId},
      () => {},
      () => {},
      async (e) => {
        console.log(JSON.stringify(e), 'gettermsss');
        // setModalVisible(false)
        if (e.Result == 'Success') {
          setPolicy(e.Answer.Policy);
          setTerms(e.Answer.Policy);
        }
      },
      (e) => {
        setModalVisible(false);
        // console.log(e)
      },
    );
  };

  useEffect(() => {
    Getterms();
  }, []);

  return (
    <View style={Styles.boxview}>
      <HeaderNew
        navigation={props.navigation}
        // EventDetails={'Event Details'}
        // Events={'Events'}
      />
      <ScrollView>
        {/* <Text style={Styles.termsTitle}>Policy</Text> */}
        {/* <Text>{policy}</Text>
      <Text>{terms}</Text> */}

        {/* <AutoHeightWebView
          scrollEnabled={false}
          // automaticallyAdjustContentInsets={false}
          source={{
            html:
              '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
              policy,
          }}
          style={{width: '90%', margin: 5, marginTop: 4}}
        /> */}
        <Text style={Styles.termsTitle}>Terms of Use</Text>
        <AutoHeightWebView
          scrollEnabled={false}
          // automaticallyAdjustContentInsets={false}
          source={{
            html:
              '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
              terms,
          }}
          style={{width: '90%', margin: 5, marginTop: 4}}
        />
        {/* <Text>{terms}</Text> */}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
