import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Home, Profile} from '../screens';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function Routes() {
  const [logined, setLogin] = React.useState<any>(false);
  console.log('logined', logined);
  //getting data from async storage

  const getDataFromAsyncStorage = async () => {
    try {
      AsyncStorage.getItem('userDetails').then(value => {
        if (value != null) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      });
    } catch (e) {
      Alert.alert('Fetching data failed');
    }
  };

  React.useEffect(() => {
    getDataFromAsyncStorage();
  });

  return (
    <NavigationContainer>
      {logined ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}></Stack.Screen>
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
