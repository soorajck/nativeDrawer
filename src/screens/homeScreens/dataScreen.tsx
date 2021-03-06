import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Modal, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useStore from '../../store/useStore';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

const DataScreen = ({navigation, route}: Props) => {
  ///getting states from zustad
  const setLoggedIn = useStore(state => state.setLoggedIn);
  const data = useStore(state => state.data);

  //managing local states
  const [userData, setUserData] = useState<any>(false);
  const [drawer, setDrawer] = useState(false);

  //getting data from async storage

  const getDataFromAsyncStorage = async () => {
    try {
      AsyncStorage.getItem('userDetails').then(value => {
        if (value != null) {
          let data = JSON.parse(value);
          setUserData(data);
        }
      });
    } catch (e) {
      Alert.alert('Fetching data failed');
    }
  };

  //calling fetting data from async storage function
  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  //clearing login data

  const Logout = async () => {
    setLoggedIn(false);
    setDrawer(false);
    try {
      await AsyncStorage.removeItem('userDetails');
      setUserData('');

      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('Logout Failed');
    }
  };

  //getting age from dob

  const getExactAge = (dob: string) => {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0) {
      return age - 1;
    } else {
      return age;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Hi {data?.userName! || userData?.userName}{' '}
      </Text>
      <Text style={styles.welcomeText}>
        Email :{data?.email || userData?.email}{' '}
      </Text>
      <Text style={styles.welcomeText}>
        Age : {getExactAge(data?.dob || userData?.dob)}{' '}
      </Text>
      <Pressable style={styles.logoutButton} onPress={() => setDrawer(true)}>
        <Text style={styles.logoutButtonText}>LOGOUT</Text>
      </Pressable>
      <Modal
        transparent={true}
        visible={drawer}
        animationType="slide"
        onRequestClose={() => {
          setDrawer(false);
        }}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Are you sure ? </Text>
          <Pressable
            style={styles.modalButtons && styles?.modalButtonsBorder}
            onPress={() => Logout()}>
            <Text style={styles.modalButtonsLogoutText}>Logout</Text>
          </Pressable>
          <Pressable
            style={styles.modalButtons}
            onPress={() => {
              setDrawer(false);
            }}>
            <Text style={styles.modalButtonsCancelText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
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
  welcomeText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  logoutButton: {
    color: 'white',
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
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    height: '25%',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgb(2,0,36)`,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
  },
  modalHeading: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonsBorder: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButtonsLogoutText: {
    color: 'red',
    padding: 20,
  },
  modalButtonsCancelText: {
    color: 'white',
    padding: 10,
  },
});
export default DataScreen;
