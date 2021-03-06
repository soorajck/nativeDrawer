import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Home, Profile} from '../screens';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../store/useStore';

//stack creation for navigation
const Stack = createNativeStackNavigator();

function Routes() {
  //states from zustad store
  const loggedIn = useStore(state => state.loggedIn);
  const setLoggedIn = useStore(state => state.setLoggedIn);
  //getting data from async storage
  const getDataFromAsyncStorage = async () => {
    try {
      AsyncStorage.getItem('userDetails').then(value => {
        if (value != null) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      });
    } catch (e) {
      Alert.alert('Fetching data failed');
    }
  };

  //running fetch data from asycn storage

  React.useEffect(() => {
    getDataFromAsyncStorage();
  });

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Routes;
