import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import {Icon, Spinner, Picker} from 'native-base';
import {connect} from 'react-redux';
import Styles from './Stayles';
const {width, height} = Dimensions.get('screen');
import {
  request,
  requestGET,
  BASE_URL_IMG,
  requestLogin,
} from '../../component/services';
// import AsyncStorage from  '@react-native-async-storage/async-storage'
// import Welcome from '../Welcome';
// import RNRestart from 'react-native-restart';
// import styles from '../../component/ContactList/styles';

let Mselections = [
  {sortname: 'AF', datacode: '+93', value: 'Afghanistan'},
  {sortname: 'AX', datacode: '+358-18', value: 'Aland Islands'},
  {sortname: 'AL', datacode: '+355', value: 'Albania'},
  {sortname: 'DZ', datacode: '+213', value: 'Algeria'},
  {sortname: 'AS', datacode: '+1-684', value: 'American Samoa'},
  {sortname: 'AD', datacode: '+376', value: 'Andorra'},
  {sortname: 'AO', datacode: '+244', value: 'Angola'},
  {sortname: 'AI', datacode: '+1-264', value: 'Anguilla'},
  {sortname: 'AQ', datacode: '+', value: 'Antarctica'},
  {sortname: 'AG', datacode: '+1-268', value: 'Antigua And Barbuda'},
  {sortname: 'AR', datacode: '+54', value: 'Argentina'},
  {sortname: 'AM', datacode: '+374', value: 'Armenia'},
  {sortname: 'AW', datacode: '+297', value: 'Aruba'},
  {sortname: 'AU', datacode: '+61', value: 'Australia'},
  {sortname: 'AT', datacode: '+43', value: 'Austria'},
  {sortname: 'AZ', datacode: '+994', value: 'Azerbaijan'},
  {sortname: 'BS', datacode: '+1-242', value: 'Bahamas The'},
  {sortname: 'BH', datacode: '+973', value: 'Bahrain'},
  {sortname: 'BD', datacode: '+880', value: 'Bangladesh'},
  {sortname: 'BB', datacode: '+1-246', value: 'Barbados'},
  {sortname: 'BY', datacode: '+375', value: 'Belarus'},
  {sortname: 'BE', datacode: '+32', value: 'Belgium'},
  {sortname: 'BZ', datacode: '+501', value: 'Belize'},
  {sortname: 'BJ', datacode: '+229', value: 'Benin'},
  {sortname: 'BM', datacode: '+1-441', value: 'Bermuda'},
  {sortname: 'BT', datacode: '+975', value: 'Bhutan'},
  {sortname: 'BO', datacode: '+591', value: 'Bolivia'},
  {sortname: 'BA', datacode: '+387', value: 'Bosnia and Herzegovina'},
  {sortname: 'BW', datacode: '+267', value: 'Botswana'},
  {sortname: 'BV', datacode: '+', value: 'Bouvet Island'},
  {sortname: 'BR', datacode: '+55', value: 'Brazil'},
  {sortname: 'IO', datacode: '+246', value: 'British Indian Ocean Territory'},
  {sortname: 'BN', datacode: '+673', value: 'Brunei'},
  {sortname: 'BG', datacode: '+359', value: 'Bulgaria'},
  {sortname: 'BF', datacode: '+226', value: 'Burkina Faso'},
  {sortname: 'BI', datacode: '+257', value: 'Burundi'},
  {sortname: 'KH', datacode: '+855', value: 'Cambodia'},
  {sortname: 'CM', datacode: '+237', value: 'Cameroon'},
  {sortname: 'CA', datacode: '+1', value: 'Canada'},
  {sortname: 'CV', datacode: '+238', value: 'Cape Verde'},
  {sortname: 'KY', datacode: '+1-345', value: 'Cayman Islands'},
  {sortname: 'CF', datacode: '+236', value: 'Central African Republic'},
  {sortname: 'TD', datacode: '+235', value: 'Chad'},
  {sortname: 'CL', datacode: '+56', value: 'Chile'},
  {sortname: 'CN', datacode: '+86', value: 'China'},
  {sortname: 'CX', datacode: '+61', value: 'Christmas Island'},
  {sortname: 'CC', datacode: '+61', value: 'Cocos (Keeling) Islands'},
  {sortname: 'CO', datacode: '+57', value: 'Colombia'},
  {sortname: 'KM', datacode: '+269', value: 'Comoros'},
  {sortname: 'CG', datacode: '+242', value: 'Congo'},
  {
    sortname: 'CD',
    datacode: '+243',
    value: 'Congo The Democratic Republic Of The',
  },
  {sortname: 'CK', datacode: '+682', value: 'Cook Islands'},
  {sortname: 'CR', datacode: '+506', value: 'Costa Rica'},
  {sortname: 'CI', datacode: '+225', value: "Cote D'Ivoire (Ivory Coast)"},
  {sortname: 'HR', datacode: '+385', value: 'Croatia (Hrvatska)'},
  {sortname: 'CU', datacode: '+53', value: 'Cuba'},
  {sortname: 'CY', datacode: '+357', value: 'Cyprus'},
  {sortname: 'CZ', datacode: '+420', value: 'Czech Republic'},
  {sortname: 'DK', datacode: '+45', value: 'Denmark'},
  {sortname: 'DJ', datacode: '+253', value: 'Djibouti'},
  {sortname: 'DM', datacode: '+1-767', value: 'Dominica'},
  {sortname: 'DO', datacode: '+1-809 and 1-829', value: 'Dominican Republic'},
  {sortname: 'TL', datacode: '+670', value: 'East Timor'},
  {sortname: 'EC', datacode: '+593', value: 'Ecuador'},
  {sortname: 'EG', datacode: '+20', value: 'Egypt'},
  {sortname: 'SV', datacode: '+503', value: 'El Salvador'},
  {sortname: 'GQ', datacode: '+240', value: 'Equatorial Guinea'},
  {sortname: 'ER', datacode: '+291', value: 'Eritrea'},
  {sortname: 'EE', datacode: '+372', value: 'Estonia'},
  {sortname: 'ET', datacode: '+251', value: 'Ethiopia'},
  {sortname: 'FK', datacode: '+500', value: 'Falkland Islands'},
  {sortname: 'FO', datacode: '+298', value: 'Faroe Islands'},
  {sortname: 'FJ', datacode: '+679', value: 'Fiji Islands'},
  {sortname: 'FI', datacode: '+358', value: 'Finland'},
  {sortname: 'FR', datacode: '+33', value: 'France'},
  {sortname: 'GF', datacode: '+594', value: 'French Guiana'},
  {sortname: 'PF', datacode: '+689', value: 'French Polynesia'},
  {sortname: 'TF', datacode: '+', value: 'French Southern Territories'},
  {sortname: 'GA', datacode: '+241', value: 'Gabon'},
  {sortname: 'GM', datacode: '+220', value: 'Gambia The'},
  {sortname: 'GE', datacode: '+995', value: 'Georgia'},
  {sortname: 'DE', datacode: '+49', value: 'Germany'},
  {sortname: 'GH', datacode: '+233', value: 'Ghana'},
  {sortname: 'GI', datacode: '+350', value: 'Gibraltar'},
  {sortname: 'GR', datacode: '+30', value: 'Greece'},
  {sortname: 'GL', datacode: '+299', value: 'Greenland'},
  {sortname: 'GD', datacode: '+1-473', value: 'Grenada'},
  {sortname: 'GP', datacode: '+590', value: 'Guadeloupe'},
  {sortname: 'GU', datacode: '+1-671', value: 'Guam'},
  {sortname: 'GT', datacode: '+502', value: 'Guatemala'},
  {sortname: 'GG', datacode: '+44-1481', value: 'Guernsey and Alderney'},
  {sortname: 'GN', datacode: '+224', value: 'Guinea'},
  {sortname: 'GW', datacode: '+245', value: 'Guinea-Bissau'},
  {sortname: 'GY', datacode: '+592', value: 'Guyana'},
  {sortname: 'HT', datacode: '+509', value: 'Haiti'},
  {sortname: 'HM', datacode: '+ ', value: 'Heard and McDonald Islands'},
  {sortname: 'HN', datacode: '+504', value: 'Honduras'},
  {sortname: 'HK', datacode: '+852', value: 'Hong Kong S.A.R.'},
  {sortname: 'HU', datacode: '+36', value: 'Hungary'},
  {sortname: 'IS', datacode: '+354', value: 'Iceland'},
  {sortname: 'IN', datacode: '+91', value: 'India'},
  {sortname: 'ID', datacode: '+62', value: 'Indonesia'},
  {sortname: 'IR', datacode: '+98', value: 'Iran'},
  {sortname: 'IQ', datacode: '+964', value: 'Iraq'},
  {sortname: 'IE', datacode: '+353', value: 'Ireland'},
  {sortname: 'IL', datacode: '+972', value: 'Israel'},
  {sortname: 'IT', datacode: '+39', value: 'Italy'},
  {sortname: 'JM', datacode: '+1-876', value: 'Jamaica'},
  {sortname: 'JP', datacode: '+81', value: 'Japan'},
  {sortname: 'JE', datacode: '+44-1534', value: 'Jersey'},
  {sortname: 'JO', datacode: '+962', value: 'Jordan'},
  {sortname: 'KZ', datacode: '+7', value: 'Kazakhstan'},
  {sortname: 'KE', datacode: '+254', value: 'Kenya'},
  {sortname: 'KI', datacode: '+686', value: 'Kiribati'},
  {sortname: 'KP', datacode: '+850', value: 'Korea North'},
  {sortname: 'KR', datacode: '+82', value: 'Korea South'},
  {sortname: 'KW', datacode: '+965', value: 'Kuwait'},
  {sortname: 'KG', datacode: '+996', value: 'Kyrgyzstan'},
  {sortname: 'LA', datacode: '+856', value: 'Laos'},
  {sortname: 'LV', datacode: '+371', value: 'Latvia'},
  {sortname: 'LB', datacode: '+961', value: 'Lebanon'},
  {sortname: 'LS', datacode: '+266', value: 'Lesotho'},
  {sortname: 'LR', datacode: '+231', value: 'Liberia'},
  {sortname: 'LY', datacode: '+218', value: 'Libya'},
  {sortname: 'LI', datacode: '+423', value: 'Liechtenstein'},
  {sortname: 'LT', datacode: '+370', value: 'Lithuania'},
  {sortname: 'LU', datacode: '+352', value: 'Luxembourg'},
  {sortname: 'MO', datacode: '+853', value: 'Macau S.A.R.'},
  {sortname: 'MK', datacode: '+389', value: 'Macedonia'},
  {sortname: 'MG', datacode: '+261', value: 'Madagascar'},
  {sortname: 'MW', datacode: '+265', value: 'Malawi'},
  {sortname: 'MY', datacode: '+60', value: 'Malaysia'},
  {sortname: 'MV', datacode: '+960', value: 'Maldives'},
  {sortname: 'ML', datacode: '+223', value: 'Mali'},
  {sortname: 'MT', datacode: '+356', value: 'Malta'},
  {sortname: 'IM', datacode: '+44-1624', value: 'Man (Isle of)'},
  {sortname: 'MH', datacode: '+692', value: 'Marshall Islands'},
  {sortname: 'MQ', datacode: '+596', value: 'Martinique'},
  {sortname: 'MR', datacode: '+222', value: 'Mauritania'},
  {sortname: 'MU', datacode: '+230', value: 'Mauritius'},
  {sortname: 'YT', datacode: '+262', value: 'Mayotte'},
  {sortname: 'MX', datacode: '+52', value: 'Mexico'},
  {sortname: 'FM', datacode: '+691', value: 'Micronesia'},
  {sortname: 'MD', datacode: '+373', value: 'Moldova'},
  {sortname: 'MC', datacode: '+377', value: 'Monaco'},
  {sortname: 'MN', datacode: '+976', value: 'Mongolia'},
  {sortname: 'ME', datacode: '+382', value: 'Montenegro'},
  {sortname: 'MS', datacode: '+1-664', value: 'Montserrat'},
  {sortname: 'MA', datacode: '+212', value: 'Morocco'},
  {sortname: 'MZ', datacode: '+258', value: 'Mozambique'},
  {sortname: 'MM', datacode: '+95', value: 'Myanmar'},
  {sortname: 'NA', datacode: '+264', value: 'Namibia'},
  {sortname: 'NR', datacode: '+674', value: 'Nauru'},
  {sortname: 'NP', datacode: '+977', value: 'Nepal'},
  {sortname: 'AN', datacode: '+', value: 'Netherlands Antilles'},
  {sortname: 'NL', datacode: '+31', value: 'Netherlands The'},
  {sortname: 'NC', datacode: '+687', value: 'New Caledonia'},
  {sortname: 'NZ', datacode: '+64', value: 'New Zealand'},
  {sortname: 'NI', datacode: '+505', value: 'Nicaragua'},
  {sortname: 'NE', datacode: '+227', value: 'Niger'},
  {sortname: 'NG', datacode: '+234', value: 'Nigeria'},
  {sortname: 'NU', datacode: '+683', value: 'Niue'},
  {sortname: 'NF', datacode: '+672', value: 'Norfolk Island'},
  {sortname: 'MP', datacode: '+1-670', value: 'Northern Mariana Islands'},
  {sortname: 'NO', datacode: '+47', value: 'Norway'},
  {sortname: 'OM', datacode: '+968', value: 'Oman'},
  {sortname: 'PK', datacode: '+92', value: 'Pakistan'},
  {sortname: 'PW', datacode: '+680', value: 'Palau'},
  {sortname: 'PS', datacode: '+970', value: 'Palestinian Territory Occupied'},
  {sortname: 'PA', datacode: '+507', value: 'Panama'},
  {sortname: 'PG', datacode: '+675', value: 'Papua new Guinea'},
  {sortname: 'PY', datacode: '+595', value: 'Paraguay'},
  {sortname: 'PE', datacode: '+51', value: 'Peru'},
  {sortname: 'PH', datacode: '+63', value: 'Philippines'},
  {sortname: 'PN', datacode: '+870', value: 'Pitcairn Island'},
  {sortname: 'PL', datacode: '+48', value: 'Poland'},
  {sortname: 'PT', datacode: '+351', value: 'Portugal'},
  {sortname: 'PR', datacode: '+1-787 and 1-939', value: 'Puerto Rico'},
  {sortname: 'QA', datacode: '+974', value: 'Qatar'},
  {sortname: 'RE', datacode: '+262', value: 'Reunion'},
  {sortname: 'RO', datacode: '+40', value: 'Romania'},
  {sortname: 'RU', datacode: '+7', value: 'Russia'},
  {sortname: 'RW', datacode: '+250', value: 'Rwanda'},
  {sortname: 'SH', datacode: '+290', value: 'Saint Helena'},
  {sortname: 'KN', datacode: '+1-869', value: 'Saint Kitts And Nevis'},
  {sortname: 'LC', datacode: '+1-758', value: 'Saint Lucia'},
  {sortname: 'PM', datacode: '+508', value: 'Saint Pierre and Miquelon'},
  {
    sortname: 'VC',
    datacode: '+1-784',
    value: 'Saint Vincent And The Grenadines',
  },
  {sortname: 'BL', datacode: '+590', value: 'Saint-Barthelemy'},
  {sortname: 'MF', datacode: '+590', value: 'Saint-Martin (French part)'},
  {sortname: 'WS', datacode: '+685', value: 'Samoa'},
  {sortname: 'SM', datacode: '+378', value: 'San Marino'},
  {sortname: 'ST', datacode: '+239', value: 'Sao Tome and Principe'},
  {sortname: 'SA', datacode: '+966', value: 'Saudi Arabia'},
  {sortname: 'SN', datacode: '+221', value: 'Senegal'},
  {sortname: 'RS', datacode: '+381', value: 'Serbia'},
  {sortname: 'SC', datacode: '+248', value: 'Seychelles'},
  {sortname: 'SL', datacode: '+232', value: 'Sierra Leone'},
  {sortname: 'SG', datacode: '+65', value: 'Singapore'},
  {sortname: 'SK', datacode: '+421', value: 'Slovakia'},
  {sortname: 'SI', datacode: '+386', value: 'Slovenia'},
  {sortname: 'SB', datacode: '+677', value: 'Solomon Islands'},
  {sortname: 'SO', datacode: '+252', value: 'Somalia'},
  {sortname: 'ZA', datacode: '+27', value: 'South Africa'},
  {sortname: 'GS', datacode: '+', value: 'South Georgia'},
  {sortname: 'SS', datacode: '+211', value: 'South Sudan'},
  {sortname: 'ES', datacode: '+34', value: 'Spain'},
  {sortname: 'LK', datacode: '+94', value: 'Sri Lanka'},
  {sortname: 'SD', datacode: '+249', value: 'Sudan'},
  {sortname: 'SR', datacode: '+597', value: 'Suriname'},
  {sortname: 'SJ', datacode: '+47', value: 'Svalbard And Jan Mayen Islands'},
  {sortname: 'SZ', datacode: '+268', value: 'Swaziland'},
  {sortname: 'SE', datacode: '+46', value: 'Sweden'},
  {sortname: 'CH', datacode: '+41', value: 'Switzerland'},
  {sortname: 'SY', datacode: '+963', value: 'Syria'},
  {sortname: 'TW', datacode: '+886', value: 'Taiwan'},
  {sortname: 'TJ', datacode: '+992', value: 'Tajikistan'},
  {sortname: 'TZ', datacode: '+255', value: 'Tanzania'},
  {sortname: 'TH', datacode: '+66', value: 'Thailand'},
  {sortname: 'TG', datacode: '+228', value: 'Togo'},
  {sortname: 'TK', datacode: '+690', value: 'Tokelau'},
  {sortname: 'TO', datacode: '+676', value: 'Tonga'},
  {sortname: 'TT', datacode: '+1-868', value: 'Trinidad And Tobago'},
  {sortname: 'TN', datacode: '+216', value: 'Tunisia'},
  {sortname: 'TR', datacode: '+90', value: 'Turkey'},
  {sortname: 'TM', datacode: '+993', value: 'Turkmenistan'},
  {sortname: 'TC', datacode: '+1-649', value: 'Turks And Caicos Islands'},
  {sortname: 'TV', datacode: '+688', value: 'Tuvalu'},
  {sortname: 'UG', datacode: '+256', value: 'Uganda'},
  {sortname: 'UA', datacode: '+380', value: 'Ukraine'},
  {sortname: 'AE', datacode: '+971', value: 'United Arab Emirates'},
  {sortname: 'GB', datacode: '+44', value: 'United Kingdom'},
  {sortname: 'US', datacode: '+1', value: 'United States'},
  {
    sortname: 'UM',
    datacode: '+1',
    value: 'United States Minor Outlying Islands',
  },
  {sortname: 'UY', datacode: '+598', value: 'Uruguay'},
  {sortname: 'UZ', datacode: '+998', value: 'Uzbekistan'},
  {sortname: 'VU', datacode: '+678', value: 'Vanuatu'},
  {sortname: 'VA', datacode: '+379', value: 'Vatican City State (Holy See)'},
  {sortname: 'VE', datacode: '+58', value: 'Venezuela'},
  {sortname: 'VN', datacode: '+84', value: 'Vietnam'},
  {sortname: 'VG', datacode: '+1-284', value: 'Virgin Islands (British)'},
  {sortname: 'VI', datacode: '+1-340', value: 'Virgin Islands (US)'},
  {sortname: 'WF', datacode: '+681', value: 'Wallis And Futuna Islands'},
  {sortname: 'EH', datacode: '+212', value: 'Western Sahara'},
  {sortname: 'YE', datacode: '+967', value: 'Yemen'},
  {sortname: 'ZM', datacode: '+260', value: 'Zambia'},
  {sortname: 'ZW', datacode: '+263', value: 'Zimbabwe'},
];

const RegisterEvent = (props) => {
  const [err, setErr] = useState('');
  const [pageIndex, setpageIndex] = useState(props.route.params.PageNum);
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Title, setTitle] = useState('');
  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [Profession, setProfession] = useState('');
  const [Country, setCountry] = useState('');
  const [Company, setCompany] = useState('');
  const [datacode, setdatacode] = useState('');
  const [ConferenceCode, setConferenceCode] = useState('');
  const [Indexcountry, setIndexcountry] = useState(-1);
  const [Mobile, setMobile] = useState('');
  const [Code, setCode] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [DWMassage, setDWMassage] = useState({
    Image: '',
    Welcom1: '',
    Splash: '',
  });

  const RegisterUser = async () => {
    setModalVisible(true);
    const EventId = props.route.params.eventId;
    if (
      EventId != undefined &&
      EventId != null &&
      EventId != 'undefined' &&
      EventId != undefined &&
      EventId != 'null'
    ) {
      if (
        Email == '' ||
        Title == '' ||
        LName == '' ||
        FName == '' ||
        Mobile == '' ||
        Company == '' ||
        Country == '' ||
        Profession == '' ||
        Country == '0'
      ) {
        alert('Please fill in all fields');
        setModalVisible(false);
      } else {
        request(
          'POST',
          'RegisterUser',
          {
            EventId: EventId,
            ConferenceCode: ConferenceCode,
            Phone: PhoneNumber,
            Email,
            FName: Title + FName,
            LName,
            Nationality: Profession,
            Country,
            Company,
            Mobile: datacode + Mobile,
          },
          () => {},
          () => {},
          async (response) => {
            // console.log(JSON.stringify({
            //     EventId: EventId,
            //     Phone: PhoneNumber, Email, FName: Title + FName, LName, Nationality: Profession, Country, Company, Mobile: datacode + Mobile
            // }))
            // console.log(JSON.stringify(response))
            if (response.Result == 'Success') {
              // alert(JSON.stringify(response))
              // setDATA2(response.Answer)
              alert(
                `Dear ${Title + FName} ${LName}, Thank you for registering.`,
              );
              setTimeout(() => {
                props.navigation.replace('Qrcode', {
                  PageNum: 0,
                  eventId: EventId,
                  Image: props.route.params.Image,
                });
              }, 1000);
              // await AsyncStorage.setItem('Token', Email)
              // props.chengToken(Email)
              // await AsyncStorage.setItem('eventId', EventId)
              // await AsyncStorage.setItem('', Email)
              setModalVisible(false);
              // WelcomMessage()
              // setpageIndex(1)
              // RNRestart.Restart();
              // props.navigation.replace('Welcome')
              // } else if (response.Result == 'Faild' && response.Type == 'Physical') {
              // // setDATA2(response.Answer)
              // // alert('You are Login successful')
              // await AsyncStorage.setItem('Type', response.Type)
              // await AsyncStorage.setItem('Token', Email)
              // props.chengToken(Email)
              // await AsyncStorage.setItem('eventId', EventId)
              // // await AsyncStorage.setItem('', Email)
              setModalVisible(false);
              // // WelcomMessage()
              // // setpageIndex(1)
              // RNRestart.Restart();
              // props.navigation.replace('Welcome')
            } else {
              // alert(response.Answer);
              setModalVisible(false);
              // props.navigation.goBack()
            }
          },
          (err) => {
            alert(err);
            // console.log(JSON.stringify(err))
            setModalVisible(false);
          },
        );
      }
    } else {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    // WelcomMessage()
  });
  const login = () => {
    return (
      <View style={Styles.qrcontain}>
        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              width: '30%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              resizeMode={'contain'}
              style={{
                height: height * 0.02,
                width: width * 0.08,
                borderRadius: 7,
              }}
              source={require('../../assets/img/arrowRBack.png')}></Image>
            <Text style={Styles.txtqrhead2}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.qrviewf}>
          <Text style={Styles.txtqrhead}>Register</Text>
        </View>
        <View
          style={{
            height: height - (height * 0.2 + height * 0.1 + height * 0.12),
          }}>
          <ScrollView>
            <View style={Styles.qrviews}>
              <View style={Styles.scancode}>
                <View style={{height: height * 0.3}}>
                  <View
                    style={{
                      width: '90%',
                      height: '100%',
                      alignSelf: 'center',
                    }}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      resizeMode={'contain'}
                      source={{uri: props.route.params.Image}}></Image>
                  </View>
                </View>
                <View style={Styles.linedott} />
                <View style={[Styles.codeinput2, {marginVertical: 5}]}>
                  <Picker
                    textStyle={{
                      color: '#FFFF',
                      // backgroundColor: 'red',
                      width: '100%',
                      alignItems: 'flex-start',
                      writingDirection: 'ltr',
                      justifyContent: 'flex-start',
                    }}
                    note
                    mode="dropdown"
                    style={{width: '100%', color: '#FFFF'}}
                    selectedValue={Title}
                    placeholder={'Title'}
                    onValueChange={(e, index) => {
                      setTitle(e);
                      // console.log(JSON.stringify(e))
                    }}>
                    <Picker.Item key={0} label={'Title'} value={''} />
                    <Picker.Item key={0} label={'Dr.'} value={'Dr.'} />
                    <Picker.Item key={1} label={'Mr.'} value={'Mr.'} />
                    <Picker.Item key={2} label={'Mrs.'} value={'Mrs.'} />
                    <Picker.Item key={3} label={'Ms.'} value={'Ms.'} />
                    <Picker.Item key={4} label={'Prof.'} value={'Prof.'} />
                    <Picker.Item key={5} label={'Engr.'} value={'Engr.'} />
                  </Picker>
                  {/* <TextInput
                                        onChangeText={(e) => setTitle(e)}
                                        value={Title}
                                        style={Styles.textinputlogin}
                                        placeholderTextColor={'#FFFF'}
                                        placeholder={'Title'}></TextInput> */}
                </View>
                <View style={[Styles.codeinput, {marginVertical: 5}]}>
                  <TextInput
                    onChangeText={(e) => setFName(e)}
                    value={FName}
                    style={Styles.textinputlogin}
                    placeholderTextColor={'#FFFF'}
                    placeholder={'First Name'}></TextInput>
                </View>
                <View style={[Styles.codeinput, {marginVertical: 5}]}>
                  <TextInput
                    onChangeText={(e) => setLName(e)}
                    value={LName}
                    style={Styles.textinputlogin}
                    placeholderTextColor={'#FFFF'}
                    placeholder={'Last Name'}></TextInput>
                </View>
                <View style={[Styles.codeinput, {marginVertical: 5}]}>
                  <TextInput
                    onChangeText={(e) => setProfession(e)}
                    value={Profession}
                    style={Styles.textinputlogin}
                    placeholderTextColor={'#FFFF'}
                    placeholder={'Profession'}></TextInput>
                </View>
                <View style={[Styles.codeinput, {marginVertical: 5}]}>
                  <TextInput
                    onChangeText={(e) => setCompany(e)}
                    value={Company}
                    style={Styles.textinputlogin}
                    placeholderTextColor={'#FFFF'}
                    placeholder={'Facility'}></TextInput>
                </View>
                <View style={[Styles.codeinput, {marginVertical: 5}]}>
                  <TextInput
                    onChangeText={(e) => setEmail(e)}
                    value={Email}
                    style={Styles.textinputlogin}
                    placeholderTextColor={'#FFFF'}
                    placeholder={'Enter Your Email Address'}></TextInput>
                </View>
                <View style={[Styles.codeinput2, {marginVertical: 5}]}>
                  {/* <TextInput
                                        onChangeText={(e) => setCountry(e)}
                                        value={Country}
                                        style={Styles.textinputlogin}
                                        placeholderTextColor={'#FFFF'}
                                        placeholder={'Country'}></TextInput> */}
                  <Picker
                    textStyle={{
                      color: '#FFFF',
                      textAlign: 'left',
                      width: width / 2.4,
                    }}
                    note
                    mode="dropdown"
                    style={{width: '100%', color: '#FFFF'}}
                    selectedValue={Indexcountry}
                    placeholder={'Country'}
                    onValueChange={(e, index) => {
                      setIndexcountry(e);
                      setdatacode(e == '-1' ? '' : Mselections[e].datacode);
                      setCountry(e == '-1' ? '' : Mselections[e].value);
                      // console.log(JSON.stringify(e))
                    }}>
                    <Picker.Item key={0} label={'Country'} value={-1} />
                    {Mselections.map((item, index) => (
                      <Picker.Item
                        key={index + 1}
                        label={item.value}
                        value={index}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={[Styles.codeinput, {marginVertical: 5}]}>
                  <TextInput
                    onChangeText={(e) => {}}
                    editable={false}
                    value={datacode != '-1' ? datacode : ''}
                    style={Styles.textinputlogin}
                    placeholderTextColor={'#FFFF'}
                    placeholder={'Country Code (Auto Select)'}></TextInput>
                </View>
                <View style={[Styles.codeinput, {marginVertical: 5}]}>
                  <TextInput
                    onChangeText={(e) => setMobile(e)}
                    value={Mobile}
                    keyboardType={'numeric'}
                    style={Styles.textinputlogin}
                    placeholderTextColor={'#FFFF'}
                    placeholder={'Contact Number'}></TextInput>
                </View>
                {/* <View style={[Styles.codeinput, { marginVertical: 5, }]}>
                                    <TextInput
                                        onChangeText={(e) => setConferenceCode(e)}
                                        value={ConferenceCode}
                                        keyboardType={'numeric'}
                                        style={Styles.textinputlogin}
                                        placeholderTextColor={'#FFFF'}
                                        placeholder={'Conference Code'}></TextInput>
                                </View> */}
                {/* <View style={[Styles.codeinput, { marginBottom: 20 }]}>
              <TextInput
                onChangeText={(e) => setCode(e)}
                value={Code}
                placeholderTextColor={'#FFFF'}
                style={Styles.textinputlogin}
                placeholder={'Enter Your Registration ID'}></TextInput>
              
            </View> */}
              </View>
              <Text
                style={[
                  Styles.txtqrhead,
                  {bottom: '20%', position: 'absolute', color: 'red'},
                ]}>
                {err}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={Styles.qrviewth}>
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('Splashscr')}
            onPress={() => RegisterUser()}
            style={Styles.btnnext}>
            {/* <Text></Text> */}
            <Icon
              name={'arrowright'}
              type={'AntDesign'}
              style={Styles.arrow}></Icon>
            <Text style={Styles.next}>Register</Text>
          </TouchableOpacity>
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
            <Text style={{color: 'white'}}>Loding ...</Text>
          </View>
        </Modal>
      </View>
    );
  };
  const pages = () => {
    switch (pageIndex) {
      case 0:
        return login();

      case 1:
        return login();
      // <Welcome

      //   WelcomMessage={() => WelcomMessage()}
      //   DWMassage={DWMassage}
      //   navigation={props.navigation} setpageIndex={setpageIndex} />
      default:
        return login();
    }
  };
  return pages();
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterEvent);
