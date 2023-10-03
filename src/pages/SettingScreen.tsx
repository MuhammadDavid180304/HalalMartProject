import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {red, white} from '../utils/color';

const SettingScreen = () => {
  const navigateToEditProfile = () => {
    // Navigasi ke layar Edit Profile
  };

  const navigateToSecurity = () => {
    // Navigasi ke layar Security
  };

  const navigateToNotifications = () => {
    // Navigasi ke layar Notifications
  };

  const navigateToPrivacy = () => {
    // Navigasi ke layar Privacy
  };

  const logout = () => {
    // Logika logout
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/93/93634.png',
            }}
            style={{width: 30, height: 30, left: 15, top: 15}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'Poppins-SemiBold',
            color: white,
            paddingLeft: '25%',
            bottom: 15,
          }}>
          Settings
        </Text>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row} onPress={navigateToEditProfile}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/64/64572.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={navigateToSecurity}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/6865/6865349.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>Securityy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={navigateToNotifications}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1827/1827425.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>Notificationss</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={navigateToPrivacy}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/5185/5185421.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.label}>Privacyy</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row} onPress={logout}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/4400/4400629.png',
            }}
            style={styles.icon}
          />
          <Text style={[styles.label, {color: red}]}>Logoutt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'yellow',
    width: '150%',
    height: '7%',
  },
  section: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
  },
});

export default SettingScreen;
