import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {black, blue, red, white} from '../utils/color';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../Router/Index';
const Register = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.Container}>
      <View style={styles.Register}>
        <Image
          source={require('../Images/Image/HalalMart.png')}
          style={{width: '40%', height: '20%', top: 35, right: 30}}
        />
        <Text
          style={{
            fontSize: 35,
            color: blue,
            fontFamily: 'Poppins-SemiBold',
            left: '30%',
            bottom: '5%',
          }}>
          حلال
        </Text>
        <Text
          style={{
            fontFamily: 'Pacifico-Regular',
            left: '45%',
            fontSize: 20,
            color: red,
            bottom: '14%',
          }}>
          Mart
        </Text>
        <View style={styles.TextInputContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/2102/2102647.png',
            }}
            style={styles.icon}
          />
          <TextInput placeholder="Username " style={styles.TextInput} />
        </View>
        <View style={styles.TextInputContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3178/3178158.png',
            }}
            style={styles.icon}
          />
          <TextInput placeholder="Masukkan Email" style={styles.TextInput} />
        </View>
        <View style={styles.TextInputContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/2889/2889676.png',
            }}
            style={styles.icon}
          />
          <TextInput
            secureTextEntry={!isPasswordVisible}
            placeholder="Enter your password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.TextInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                isPasswordVisible
                  ? require('../Images/Icons/hide.png')
                  : require('../Images/Icons/visible.png')
              }
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.TextInputContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/2889/2889676.png',
            }}
            style={styles.icon}
          />
          <TextInput
            secureTextEntry={!isPasswordVisible}
            placeholder="Confirmation Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.TextInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                isPasswordVisible
                  ? require('../Images/Icons/hide.png')
                  : require('../Images/Icons/visible.png')
              }
              style={styles.passwordIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              lineHeight: 58,
              color: white,
              backgroundColor: red,
              width: 366,
              height: 58,
              textAlign: 'center',
              borderRadius: 15,
              top: 25,
              left: 33,
            }}>
            Register
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            lineHeight: 85,
            color: black,
            letterSpacing: 0.7,
            right: '25%',
          }}>
          Forgot Password?
        </Text>
        <View style={styles.viewor}>
          <View style={styles.border1}></View>
          <Text style={styles.textor}>OR</Text>
          <View style={styles.border2}></View>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: white,
            width: 180,
            height: 55,
            top: 25,
            right: '20%',
          }}>
          <Image
            source={require('../Images/Image/google.png')}
            style={{width: 30, height: 30, left: 30, top: 12}}
          />
          <Text style={{fontSize: 20, color: red, left: '50%', bottom: 18}}>
            Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: white,
            width: 180,
            height: 55,
            left: '36%',
            bottom: 30,
          }}>
          <Image
            source={require('../Images/Image/facebook.png')}
            style={{width: 30, height: 30, left: 30, top: 12}}
          />
          <Text style={{fontSize: 20, color: blue, left: '40%', bottom: 18}}>
            Facebook
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Poppins-Regular',
            color: black,
            paddingLeft: 25,
          }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Poppins-Black',
              bottom: 2,
              marginLeft: 35,
              color: red,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Register;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    position: 'absolute',
  },
  Register: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '40%',
  },
  TextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 366,
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    marginLeft: 65,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  passwordIcon: {
    width: 25,
    height: 25,
    right: 10,
  },
  TextInput: {
    flex: 1,
    height: '100%',
    padding: 10,
  },
  textor: {
    height: 20,
    width: 20,
    left: 75,
  },
  border1: {
    borderBottomWidth: 0.5,
    width: 170,
    right: 110,
    top: 10,
    paddingleft: 10,
  },
  border2: {
    borderBottomWidth: 0.5,
    width: 170,
    right: 130,
    top: 10,
    left: 110,
    marginTop: -20,
  },
  viewor: {
    bottom: 15,
    left: 35,
  },
});
