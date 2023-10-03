import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {black, blue, red} from '../utils/color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../Router/Index';

const Splash = () => {
  const Navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  setTimeout(() => {
    Navigation.replace('Login');
  }, 2500);
  return (
    <View style={styles.Container}>
      <Image
        source={require('../Images/Image/HalalMart.png')}
        style={{width: 200, height: 200, top: 10}}
      />
      <Text
        style={{
          fontSize: 55,
          color: blue,
          fontFamily: 'Poppins-SemiBold',
          left: '60%',
          bottom: '12%',
        }}>
        حلال
      </Text>
      <Text
        style={{
          fontFamily: 'Pacifico-Regular',
          left: '89%',
          fontSize: 20,
          color: red,
          bottom: '20%',
        }}>
        Mart
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '45%',
  },
});
