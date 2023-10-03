import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import HomeScreen from '../pages/HomeScreen';
import Whislist from '../pages/Whislist';
import CardScreen from '../pages/CardScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import SettingScreen from '../pages/SettingScreen';
import {blue, red} from '../utils/color';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {height: 50},
        tabBarIcon: ({focused, size, color}) => {
          let iconImage;

          if (route.name === 'HomeScreen') {
            iconImage = focused
              ? require('../Images/Icons/home(1).png')
              : require('../Images/Icons/home.png');
            color = focused ? red : blue;
            size = focused ? size + 3 : size + 1;
          } else if (route.name === 'Whislist') {
            iconImage = focused
              ? require('../Images/Icons/wishlist.png')
              : require('../Images/Icons/wishlist.png');
            color = focused ? red : blue;
            size = focused ? size + 5 : size + 1;
          } else if (route.name === 'CardScreen') {
            iconImage = focused
              ? require('../Images/Icons/love.png')
              : require('../Images/Icons/lovey.png');
            color = focused ? red : blue;
            size = focused ? size + 8 : size + 5;
          } else if (route.name === 'SettingScreen') {
            iconImage = focused
              ? require('../Images/Icons/settings.png')
              : require('../Images/Icons/settings.png');
            color = focused ? red : blue;
            size = focused ? size + 5 : size + 1;
          } else if (route.name === 'ProfileScreen') {
            iconImage = focused
              ? require('../Images/Icons/profile-user.png')
              : require('../Images/Icons/user.png');
            color = focused ? red : blue;
            size = focused ? size + 5 : size + 1;
          }
          return (
            <Image
              source={iconImage}
              style={{width: size, height: size, tintColor: color}}
            />
          );
        },
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Whislist" component={Whislist} />
      <Tab.Screen name="CardScreen" component={CardScreen} />
      <Tab.Screen name="SettingScreen" component={SettingScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
