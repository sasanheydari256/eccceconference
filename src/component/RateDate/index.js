import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {getReminTime} from '../../component/services/index';
import Styles from './Styles';

export const index = (props) => {
  const [timetrack, setTimetrack] = useState(
    getReminTime(itemdata.Hour, itemdata.Day),
  );

  useEffect(() => {
    console.log(JSON.stringify(props));
    const intervalM = setInterval(() => {
      timetrack.remine &&
        setTimetrack((pas) => ({
          ...pas,
          sec: pas.sec === 0 ? pas.sec + 59 : pas.sec - 1,
          minut:
            pas.sec === 0
              ? pas.minut === 0
                ? pas.minut + 59
                : pas.minut - 1
              : pas.minut,
          hour:
            pas.sec === 0 && pas.minut === 0
              ? pas.hour > 0
                ? pas.hour - 1
                : pas.hour
              : pas.hour,
          day:
            pas.sec === 0 && pas.minut === 0 && pas.hour === 0
              ? pas.day > 0
                ? pas.day - 1
                : pas.day
              : pas.day,
        }));
    }, 1000);
    return () => clearInterval(intervalM);
  }, []);

  return (
    <View>
      <View style={Styles.mainviewCount}>
        <View style={Styles.countview}>
          <Text style={Styles.counttxt}>383</Text>
          <Text style={Styles.countDaytxt}>Days</Text>
        </View>
        <View style={Styles.countview}>
          <Text style={Styles.counttxt}>14</Text>
          <Text style={Styles.countDaytxt}>Hours</Text>
        </View>
        <View style={Styles.countview}>
          <Text style={Styles.counttxt}>22</Text>
          <Text style={Styles.countDaytxt}>Minuts</Text>
        </View>
        <View style={Styles.countview}>
          <Text style={Styles.counttxt}>05</Text>
          <Text style={Styles.countDaytxt}>sec</Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
