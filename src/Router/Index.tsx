import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screen/Splash';
import Login from '../LoginRegister/Login';
import Register from '../LoginRegister/Register';
import BottomTabs from '../components/BottomTabs';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import SettingScreen from '../pages/SettingScreen';
export type RootStackParams = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  BottomTabs: undefined;
  ProfileScreen: undefined;
  SettingScreen: undefined;
};
const Stack = createNativeStackNavigator<RootStackParams>();
const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;

const styles = StyleSheet.create({});
