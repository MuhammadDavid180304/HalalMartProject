import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView, // Import ScrollView
} from 'react-native';
import EditProfileModal from './EditProfileModal'; // Rename EditProfileScreen to EditProfileModal
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {black, red, white} from '../utils/color';
interface ProfileProps {
  name: string;
  bio: string;
  followers: number;
  following: number;
}
const ProfileScreen: React.FC = () => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBio, setEditedBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [photoOptionModalVisible, setPhotoOptionModalVisible] = useState(false);
  const [photoProfileModalVisible, setPhotoProfileModalVisible] =
    useState(false);
  const [userProfile, setUserProfile] = useState<ProfileProps>({
    name: 'Muhammad David Yandre',
    bio: 'Mobile App ',
    followers: 1246,
    following: 348,
  });
  const [posts, setPosts] = useState<string[]>([]); // State untuk daftar postingan
  useEffect(() => {
    AsyncStorage.multiGet(['profileImage', 'coverImage']).then(values => {
      const profileImageUri = values[0][1];
      const coverImageUri = values[0][1];
      if (profileImageUri) {
        setProfileImage(profileImageUri);
      }
      if (coverImageUri) {
        setCoverImage(coverImageUri);
      }
    });
    // Simpan daftar postingan ke dalam state (dummy data)
    const dummyPosts = [
      'data:image/jpeg;base64,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',
      'data:image/jpeg;base64,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',
      'data:image/jpeg;base64,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',
      // Tambahkan URL gambar postingan sesuai kebutuhan
    ];
    setPosts(dummyPosts);
  }, []);

  const openCamera = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 1 as PhotoQuality,
    };
    launchCamera(options, res => {
      handleImageSelection(res);
    });
    setPhotoOptionModalVisible(false);
  };

  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 1 as PhotoQuality,
    };
    launchImageLibrary(options, res => {
      handleImageSelection(res);
    });
    setPhotoOptionModalVisible(false);
  };
  const openCameraProfile = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 1 as PhotoQuality,
    };
    launchCamera(options, res => {
      handleImageSelection(res);
    });
    setPhotoProfileModalVisible(false);
  };
  const openImageLibraryProfile = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 1 as PhotoQuality,
    };
    launchImageLibrary(options, res => {
      handleImageSelection(res);
    });
    setPhotoProfileModalVisible(false);
  };
  const handleImageSelection = (res: any) => {
    if (res.didCancel) {
      console.log('Pemilihan gambar dibatalkan');
    } else if (res.errorCode) {
      console.log(res.errorMessage);
    } else {
      const data = res.assets?.[0]?.uri;
      if (editingProfile) {
        setProfileImage(data || null);
        AsyncStorage.setItem('profileImage', data || '');
      } else {
        setCoverImage(data || null);
        AsyncStorage.setItem('coverImage', data || '');
      }
    }
  };

  const handleEditSave = () => {
    setUserProfile({
      ...userProfile,
      name: editedName,
      bio: editedBio,
    });
    setEditingProfile(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.coverImage}
        source={{
          uri:
            coverImage ||
            'https://cdn.pixabay.com/photo/2017/10/30/18/44/hacking-2903156_640.jpg',
        }}
      />
      <TouchableOpacity onPress={() => setPhotoOptionModalVisible(true)}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/11498/11498378.png',
          }}
          style={{
            width: 25,
            height: 25,
            left: '92%',
            bottom: 30,
            borderRadius: 15,
            backgroundColor: red,
          }}
        />
      </TouchableOpacity>
      <View style={styles.profileInfo}>
        <Image
          style={styles.profileImage}
          source={{
            uri:
              profileImage ||
              'data:image/jpeg;base64,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',
          }}
        />
        <TouchableOpacity onPress={() => setPhotoProfileModalVisible(true)}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/11498/11498378.png',
            }}
            style={{
              width: 25,
              height: 25,
              left: '10%',
              bottom: 35,
              borderRadius: 15,
              backgroundColor: red,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userBio}>{userProfile.bio}</Text>
        <View style={styles.counts}>
          <Text style={styles.countText}>Postingan</Text>
          <Text style={styles.countText}>Pengikut</Text>
          <Text style={styles.countText}>Mengikuti</Text>
        </View>
        <View style={styles.counts}>
          <Text style={styles.countValue}>{posts.length}</Text>
          {''}
          {/* Jumlah postingan */}
          <Text style={styles.countValue}>{userProfile.followers}</Text>
          <Text style={styles.countValue}>{userProfile.following}</Text>
        </View>
      </View>
      <View style={styles.editButtonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditingProfile(true)}>
          <Text style={styles.buttonText}>Edit Profil</Text>
        </TouchableOpacity>
        <Text style={styles.TextPost}>Postingan</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editingProfile}
        onRequestClose={() => setEditingProfile(false)}>
        <EditProfileModal
          editedName={editedName}
          setEditedName={setEditedName}
          editedBio={editedBio}
          setEditedBio={setEditedBio}
          handleEditSave={handleEditSave}
          onCancel={() => setEditingProfile(false)}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={photoOptionModalVisible}
        onRequestClose={() => setPhotoOptionModalVisible(false)}>
        <View style={styles.photoOptionModal}>
          <TouchableOpacity style={styles.photoOption} onPress={openCamera}>
            <Text style={styles.photoOptionText}>Ambil Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.photoOption}
            onPress={openImageLibrary}>
            <Text style={styles.photoOptionText}>Pilih dari Galeri</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.photoOptionCancel}
            onPress={() => setPhotoOptionModalVisible(false)}>
            <Text style={styles.photoOptionText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={photoProfileModalVisible}
        onRequestClose={() => setPhotoProfileModalVisible(false)}>
        <View style={styles.photoOptionModal}>
          <TouchableOpacity
            style={styles.photoOption}
            onPress={openCameraProfile}>
            <Text style={styles.photoOptionText}>Ambil Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.photoOption}
            onPress={openImageLibraryProfile}>
            <Text style={styles.photoOptionText}>Pilih dari Galeri</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.photoOptionCancel}
            onPress={() => setPhotoProfileModalVisible(false)}>
            <Text style={styles.photoOptionText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Daftar Postingan */}
      <ScrollView style={styles.postContainer}>
        {posts.map((post, index) => (
          <Image key={index} style={styles.postImage} source={{uri: post}} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImage: {
    height: 300,
    width: '100%',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: -130,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: red,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: 45,
  },
  userBio: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
  },
  counts: {
    flexDirection: 'row',
    marginTop: 10,
  },
  countText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  countValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  TextPost: {
    color: black,
    fontWeight: 'bold',
    fontSize: 25,
  },
  editButtonContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: red,
    paddingVertical: 8,
    borderRadius: 15,
  },
  photoOptionModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  photoOption: {
    backgroundColor: '#fff',
    width: 200,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 15,
  },
  photoOptionText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  photoOptionCancel: {
    backgroundColor: '#fff',
    width: 200,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 15,
  },
  postContainer: {
    flex: 1,
    padding: 15,
    margin: 10,
  },
  postImage: {
    width: '50%',
    height: 200,
    marginBottom: 10,
    top: 25,
  },
});
export default ProfileScreen;
