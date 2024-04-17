import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import React, { useEffect } from 'react';
import Styles from './Styles';
// import Carousel from 'react-native-snap-carousel';
import {
  BASE_URL_IMG,
  request
} from '../../component/services';
import { Fab, Icon } from 'native-base';
import { Colors } from '../../component/services/Colors';
// import Maps from '../../src/screens/Maps';
import AsyncStorage from '@react-native-async-storage/async-storage'
const { width, height } = Dimensions.get('screen');

const PostItem = (props) => {

  const {
    MediaId,
    profImageUrl,
    Name,
    TimePost,
    Location,
    Liked,
    IsLike,
    Description,
    ImageUrl,
    key,
    ImageName,
  } = props.item;
  // console.log(MediaId, props.item.IsLike);
  // const LikedState = React.useRef(IsLike);
  const [LikedState, setLikedState] = React.useState(false);
  const [LikedCount, setLikedCount] = React.useState(0);
  useEffect(() => {
    setLikedState(IsLike);
    setLikedCount(Liked);
    
  }, [IsLike, Liked]);
  const sendLike = async (id) => {
    let Token = await AsyncStorage.getItem('Token');
    request(
      'POST',
      'LikePost',
      {
        Id: id,
        Email: Token,
      },
      () => { },
      () => { },
      (response) => {
      
        if(response.Answer === 'Add'){
          setLikedState(true)
          setLikedCount(LikedCount + 1)
        }
        if(response.Answer === 'Delete'){
          setLikedState(false)

          setLikedCount(LikedCount - 1)

        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      },
    );
  }

  return (
    <View key={key} style={Styles.PostItemView}>
      <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
        <Image
          source={{ uri: BASE_URL_IMG + profImageUrl }}
          style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              width: width - 100,
              justifyContent: 'space-between',
            }}>
            <Text>{Name}</Text>
            <Text style={{ color: Colors.Grey }}>{TimePost}</Text>
          </View>
          <Text style={{ color: Colors.Grey }}>{Location}</Text>
        </View>
      </View>
      {typeof ImageUrl == 'string' ? (
        <Image
          source={{ uri: BASE_URL_IMG + ImageUrl }}
          style={Styles.PostItemImage}
        />
      ) : (
        <Image source={ImageUrl} style={Styles.PostItemImage} />
      )}
      <View style={Styles.PostItemFoter}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
              sendLike(MediaId)
            }}>
            <Icon
              name={LikedState ? 'heart' : 'hearto'}
              type={'AntDesign'}
              style={[
                Styles.PostItemFoterIcons,
                { color: LikedState ? 'red' : Colors.MedionLightGrey },
              ]}
            />
            <Text style={{ color: Colors.Grey }}>{LikedCount}</Text>
          </TouchableOpacity>
          {/* <Icon
            name={'keyboard-arrow-right'}
            type={'MaterialIcons'}
            style={Styles.PostItemFoterIcons}
          /> */}
        </View>
        <Text style={Styles.PostItemFoterText}>{Description}</Text>
      </View>
    </View>
  );
};

export default PostItem;
