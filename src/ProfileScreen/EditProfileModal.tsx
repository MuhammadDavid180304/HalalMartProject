import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type EditProfileProps = {
  editedName: string;
  setEditedName: React.Dispatch<React.SetStateAction<string>>;
  editedBio: string;
  setEditedBio: React.Dispatch<React.SetStateAction<string>>;
  handleEditSave: () => void;
  onCancel: () => void;
};

const EditProfileModal: React.FC<EditProfileProps> = ({
  editedName,
  setEditedName,
  editedBio,
  setEditedBio,
  handleEditSave,
  onCancel,
}) => {
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const savedName = await AsyncStorage.getItem('editedName');
        const savedBio = await AsyncStorage.getItem('editedBio');
        const savedDOB = await AsyncStorage.getItem('dateOfBirth');

        if (savedName) {
          setEditedName(savedName);
        }
        if (savedBio) {
          setEditedBio(savedBio);
        }
        if (savedDOB) {
          setDateOfBirth(savedDOB);
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    }

    fetchData();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    const selectedDate = date.toISOString().split('T')[0];
    setDateOfBirth(selectedDate);
    hideDatePicker();
  };

  const onSave = async () => {
    try {
      await AsyncStorage.setItem('editedName', editedName);
      await AsyncStorage.setItem('editedBio', editedBio);
      await AsyncStorage.setItem('dateOfBirth', dateOfBirth);

      handleEditSave();
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }

    console.log('Nama yang diubah:', editedName);
    console.log('Bio yang diubah:', editedBio);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profil</Text>
      <TextInput
        style={styles.input}
        value={editedName}
        onChangeText={setEditedName}
        placeholder="Edit nama"
      />
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={editedBio}
        onChangeText={setEditedBio}
        placeholder="Edit bio"
        multiline
      />
      <View style={styles.dateOfBirthContainer}>
        <Text style={styles.dateOfBirthLabel}>Tanggal Lahir</Text>
        <TouchableOpacity
          style={styles.dateOfBirthValue}
          onPress={showDatePicker}>
          <Text style={styles.dateOfBirthText}>
            {dateOfBirth || 'Belum Dipilih'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.tipText}>
        Tip: Anda dapat memperbarui nama, bio, dan tanggal lahir Anda untuk
        membuat profil Anda lebih menarik dan menarik perhatian!
      </Text>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  multilineInput: {
    height: 50,
  },
  dateOfBirthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateOfBirthLabel: {
    flex: 1,
    fontSize: 16,
  },
  dateOfBirthValue: {
    flex: 2,
    backgroundColor: '#f0f2f5',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  dateOfBirthText: {
    fontSize: 16,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'gray',
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  tipText: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#555',
    fontSize: 14,
  },
});

export default EditProfileModal;
