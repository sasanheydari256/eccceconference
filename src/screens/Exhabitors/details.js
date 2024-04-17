import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
  View,
  Linking,
  Modal,
} from 'react-native';
import { Icon, Spinner } from 'native-base';
import Header from '../../component/Header/index';
import Styles from './Stayles';
import { request, MyImage, BASE_URL_IMG } from '../../component/services';
const { width, height } = Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'

const ExhabitorsDetails = (props) => {
  const [Datas, setDatas] = useState([]);
  const [Count, setCount] = useState(100);
  const [Page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedList, setSelectedList] = useState('');
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    GetEventExhibitor(props.route.params.Id);
  }, []);

  const GetEventExhibitor = async (Id) => {
    const Token = await AsyncStorage.getItem('Token');
    request(
      'POST',
      'GetDetailsSponsser',
      { Id: Id, Email: Token },
      () => { },
      () => { },
      (response) => {
        console.log(JSON.stringify(response))
        if (response.Result == 'Success') {
          setDatas(response.Answer);

          // console.log(JSON.stringify(response.Answer))

        }
        setModalVisible(false);
      },
      (err) => {
        // console.log(JSON.stringify(err))
        setModalVisible(false);
      },
    );
  };
  const SocialIcons = ({ itemdata }) => {
    return (
      <View style={{
        flexDirection: 'row', bottom: 10,
        width: '100%', height: '16%', backgroundColor: '#f0f4fd40', justifyContent: 'flex-start'
      }}>
        <SocialIcon url={itemdata?.Linkedin} iconUri={'https://cdn-icons-png.flaticon.com/256/174/174857.png'} label="linkedin" />
        <SocialIcon url={itemdata?.Facebook} iconUri={'https://cdn-icons-png.flaticon.com/256/124/124010.png'} label="facebook" />
        <SocialIcon url={itemdata?.Instagram} iconUri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs4FkCUIuic05V5RGMdyXQoAgSqcJ4A8OvcbwIoy9plBOqlbBH3UXQyaFiFOV5xabCHgc&usqp=CAU'} label="instagram" />
        <SocialIcon url={itemdata?.Whatsapp} iconUri={'https://cdn-icons-png.flaticon.com/512/3670/3670051.png'} label="youtube" />
        <SocialIcon url={itemdata?.Twitter} iconUri={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSliA-u0FD-0E_TgNOK1aqpvi1Vymb47nPcug&usqp=CAU'} label="twitter" />
      </View>
    );
  };

  const SocialIcon = ({ url, iconUri, label }) => {
    const handlePress = () => {
      if (url === "#" || url === null || url === "") {
        return false
      } else {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
      }
    };

    return (
      (url === "#" || url === null || url === "") ?

        <View
        >

        </View>
        :
        <TouchableOpacity
          onPress={handlePress}
          style={{ height: '100%', width: width / 5.1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            resizeMode='contain'
            style={{ width: '50%', height: '50%' }}
            source={{ uri: iconUri }} />
          <Text style={Styles.websitetxt}>{label}</Text>
        </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ExhabitSubDev', { Id: item.Id })
        }
        style={Styles.touchflatmain}>
        <View style={{ width: '35%', height: '100%' }}>
          <View style={Styles.numroom}>
            <Text style={Styles.numberroom}>{item.Code}</Text>
          </View>
          <Image
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              overflow: 'hidden',
            }}
            source={{ uri: BASE_URL_IMG + item.Image }}></Image>
        </View>
        <View style={Styles.flatcontainname}>
          <Text style={Styles.titlename}>{item.Title}</Text>
          <View style={Styles.bottcarevents}>
            <View style={Styles.reeventbott}>
              <View style={Styles.hallicon}>
                <Image
                  style={Styles.imgbottcarevents}
                  resizeMode={'contain'}
                  source={require('../../assets/img/hallA.png')}></Image>
              </View>
              <Text style={Styles.txtcareventdate}>{item.HallName}</Text>
            </View>
            {/* <View style={Styles.addevedate}>
              <View style={Styles.hallicon}>
                <Image
                  style={Styles.imgbottcarevents}
                  resizeMode={'contain'}
                  source={require('../../assets/img/location.png')}></Image>
              </View>
              <Text style={Styles.txtcareventdate}>UAE Abu Dhabi</Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={Styles.mainscrview}>
      {/* <View style={Styles.arbtn}>
        <View style={Styles.arbtnimg}>
          <Image
            resizeMode={'cover'}
            style={Styles.arimgbtn}
            source={require('../../assets/img/artab.png')}></Image>
        </View>
      </View> */}
      <Header
        navigation={props.navigation}
        homepress={() => props.navigation.navigate('MainScreenEvent')}
        notif={() => props.navigation.navigate('Notifications')}
        iconright={3}
        backcolor={1}
        iconhome={1}
        menuonpress={() => props.setPosi(!props.posi)}></Header>
      {/* header top */}
      <View style={{ backgroundColor: '#532', height: '30%' }}>
        {
          Datas.Gallery?.length > 1 ?
            (<Carousel
              // ref={(c) => { this._carousel = c; }}
              autoplay={true}
              loop={true}
              autoplayInterval={5000}
              // onSnapToItem={(index) => setitemindex(index)}
              data={Datas.Gallery}
              renderItem={({ item, index }) => {
                // console.log(BASE_URL_IMG + item.ImageName);
                return (
                  <View key={index} style={Styles.headermainscr}>
                    <MyImage
                      style={Styles.imgbackheader}
                      source={{
                        uri: BASE_URL_IMG + item.ImageName,
                      }}
                      resizeMode={'stretch'}
                    />

                  </View>
                );
              }}
              sliderWidth={width}
              // itemHeight={width * .1}
              itemWidth={width} />)
            :
            (
              <View style={Styles.headermainscr}>
                <MyImage
                  style={{ height: '100%' }}
                  source={{
                    uri: BASE_URL_IMG + Datas.Image
                  }}
                  resizeMode={'stretch'}
                />

              </View>
            )

        }
      </View>
      {/* title */}
      <View style={{ width: '100%', height: '10%', flexDirection: 'row' }}>
        <View style={{ width: '70%', marginLeft: '2%', backgroundColor: '#f0f4fd', height: '100%', flexDirection: "column" }}>
          <View style={{ padding: '2%' }}>
            <Text style={{ fontSize: 24, fontWeight: '500' }}>{Datas.Name}</Text>
          </View>
          <View style={{
            alignItems: 'flex-start', borderRadius: 5,
            margin: '1%'
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold', color: '#f0f4fd', paddingVertical: '1%',
              backgroundColor: '#D6374F', paddingRight: '2%', borderRadius: 5
            }}> {Datas.HalName}</Text>
          </View>

        </View>
        {/* logo */}
        <View style={{
          width: '28%', marginLeft: 0, alignItems: 'center',
          backgroundColor: '#f0f4fd', height: '100%', flexDirection: "column"
        }}>
          <View style={{
            width: '70%', marginLeft: 0, top: -10,
            backgroundColor: '#f0f4fd', height: '90%', borderRadius: 7
            , borderColor: '#f0f4fd', borderWidth: 2
          }}>
            <MyImage
              style={{ height: '100%' }}
              source={{
                uri: BASE_URL_IMG + Datas.Logo
              }}
              resizeMode={'stretch'}
            />
          </View>
        </View>
      </View>

      {/* row list */}
      <View style={{ backgroundColor: '#f32288', height: '6%' }}>
        <LinearGradient
          // key={index}
          style={{ height: '100%', width: '100%', flexDirection: 'row' }}
          start={{ x: 0.4, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            '#D6374F',
            '#E68997',
          ]}>
          <View style={{ padding: '3%' }}>
            <Text style={{ color: '#f0f4fd99', fontWeight: '600', fontSize: 14 }}>
              Contact Us
            </Text>
          </View>
          <View style={{ width: 2, height: '36%', backgroundColor: '#f0f4fd40', alignSelf: 'center' }} />
          <View style={{ padding: '3%' }}>
            <Text style={{ color: '#f0f4fd99', fontWeight: '600', fontSize: 14 }}>
              WebSite
            </Text>
          </View>
          <View style={{ width: 2, height: '36%', backgroundColor: '#f0f4fd40', alignSelf: 'center' }} />
          <View style={{ padding: '3%' }}>
            <Text style={{ color: '#f0f4fd99', fontWeight: '600', fontSize: 14 }}>
              Social Media
            </Text>
          </View>
        </LinearGradient>
      </View>
      {/* tab names */}
      <View style={{ backgroundColor: '#f0f4fd', height: '7%' }}>
        <View style={Styles.tabheaderbuttom}>
          <TouchableOpacity
            onPress={() => {
              setSelected(1);
            }}
            style={[Styles.touchtabheader, { borderBottomWidth: selected === 1 ? 1 : 0, borderColor: 'red' }]}>
            <Icon
              style={{ fontSize: 18, marginRight: 5, color: '#808080' }}
              name={'home-work'}
              type={'MaterialIcons'}
            />
            <Text style={[Styles.tabheadertxtbottom,
            { color: selected === 1 ? 'red' : '#808080' }]}>Company</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setSelected(2);
            }}
            style={[Styles.touchtabheader, { borderBottomWidth: selected === 2 ? 1 : 0, borderColor: 'red' }]}>
            <Icon
              style={{ fontSize: 18, marginRight: 5, color: '#808080' }}
              name={'play-circle-o'}
              type={'FontAwesome'}
            />
            <Text style={[Styles.tabheadertxtbottom,
            { color: selected === 2 ? 'red' : '#808080' }]}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setSelected(3);
            }}
            style={[Styles.touchtabheader, { borderBottomWidth: selected === 3 ? 1 : 0, borderColor: 'red' }]}>
            <Icon
              style={{ fontSize: 18, marginRight: 5, color: '#808080' }}
              name={'file-download'}
              type={'MaterialCommunityIcons'}
            />
            <Text style={[Styles.tabheadertxtbottom,
            { color: selected === 3 ? 'red' : '#808080' }]}>Doucuments</Text>
          </TouchableOpacity>

        </View>
      </View>
      {/* body */}
      <View style={{ backgroundColor: '#f0f4fd40', height: '37%' }}>
        {selected === 1 && (
          <View style={{ height: '100%' }}>



            <ScrollView style={{
              height: height * 0.3
            }}>
              <View>
                <View style={{ paddingVertical: 0, paddingHorizontal: 10 }}>
                  {/* <Text style={{ fontSize: 24 }}>Title</Text> */}
                </View>
                <View style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
                  <Text>
                    {Datas.Decription}
                  </Text>
                </View>
              </View>

            </ScrollView>
            {/* social mwdia */}

            <SocialIcons itemdata={Datas} />
          </View>

        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      // onRequestClose={() => {
      //   setModalVisible(false);
      // }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            backgroundColor: 'black',
            opacity: 0.5,
          }}>
          <Spinner color="#FFFF" />
          <Text style={{ color: 'white' }}>Loding ...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default ExhabitorsDetails;
