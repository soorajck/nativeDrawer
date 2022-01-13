import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import useStore from '../store/useStore';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const Profile = ({navigation, route}: Props) => {
  const setLoggedIn = useStore(state => state.setLoggedIn);
  const setData = useStore(state => state.setData);
  const data = useStore(state => state.data);
  const [userName, setUserName] = React.useState('');

  //date picker functions and items
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
  };

  //handling storing in asynch storage

  const storeData = async (value: {}) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.mergeItem('userDetails', jsonValue);
      navigation.navigate('Home');
    } catch (e) {
      Alert.alert('saving data failed');
    }
  };

  //handling login button

  const handleProceed = ({}) => {
    if (userName.length < 3) {
      Alert.alert('Invalid User Name');
    } else if (!date) {
      Alert.alert('Please enter your date of birth');
    } else {
      const value = {
        userName: userName,
        dob: moment(date).format('L'),
      };
      storeData(value);
      //setLoggedIn(true);
      setData(value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Please fill profile details</Text>
      <TextInput
        style={styles.textInput}
        placeholder="User Name"
        onChangeText={value => {
          setUserName(value);
        }}
      />

      <View style={styles.datePickerContainer}>
        <Text style={styles.dobText}>Select Date of Birth</Text>
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display="default"
            onChange={onChange}
          />
        </View>
      </View>
      <Pressable style={styles.loginButton} onPress={handleProceed}>
        <Text style={styles?.loginButtonText}>Continue </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c3259',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
  },
  dobText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
  datePickerContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  textInput: {
    width: '80%',
    marginTop: 30,
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
  },
  loginButton: {
    borderRadius: 30,
    backgroundColor: 'blue',
    textAlign: 'center',
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    color: 'white',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default Profile;
