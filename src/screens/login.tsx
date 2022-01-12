import React, {useEffect} from 'react';
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

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

const Login = ({navigation, route}: Props) => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  //getting data from async storage

  const getDataFromAsyncStorage = async () => {
    try {
      AsyncStorage.getItem('userDetails').then(value => {
        if (value != null) {
          navigation.navigate('Home');
        }
      });
    } catch (e) {
      Alert.alert('Fetching data failed');
    }
  };

  //handling storing in asynch storage

  const storeData = async (value: {}) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userDetails', jsonValue);
      navigation.navigate('Home');
    } catch (e) {
      Alert.alert('saving data failed');
    }
  };

  //handling login button

  const handleLogin = ({}) => {
    if (userName.length < 3) {
      Alert.alert('Invalid UserName');
    } else if (password.length < 8) {
      Alert.alert('Password must be at least 8 characters');
    } else {
      const value = {
        userName: userName,
        password: password,
      };
      storeData(value);
    }
  };

  //redirect to home if login already

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login Screen</Text>
      <TextInput
        style={styles.textInput}
        placeholder="User Name"
        onChangeText={value => {
          setUserName(value);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="password"
        onChangeText={value => {
          setPassword(value);
        }}
        secureTextEntry={true}
      />
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles?.loginButtonText}>Login</Text>
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
export default Login;
