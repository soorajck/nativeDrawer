import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {DataScreen, CitySearch} from './homeScreens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DataScreen"
        component={DataScreen}
        options={{
          headerTitle: 'Home Screen',
          tabBarLabel: 'Home Screen',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused ? 'blue' : 'gray',
                }}
                source={require('../assets/images/home.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="CitySearch"
        component={CitySearch}
        options={{
          headerTitle: 'City Search',
          tabBarLabel: 'Search  City',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused ? 'blue' : 'gray',
                }}
                source={require('../assets/images/explore.png')}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
