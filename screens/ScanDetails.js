import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  ScrollView,
} from 'react-native';

export default function ScanDetails() {
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCheckboxToggle = () => {
    if (!checked) {
      setModalVisible(true);
    } else {
      setChecked(false);
    }
  };

  const handleAllow = () => {
    setChecked(true);
    setModalVisible(false);
  };

  const handleDeny = () => {
    setChecked(false);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Verify Your Identity</Text>
      <Text style={styles.heading}>Scan your face to verify your identity</Text>

      <Image source={require('../assets/selfie-icon.png')} style={styles.image} />

      <Text style={styles.description}>
        Please note this is a facial biometric scan, not a selfie. You won't be able to see your
        face and you don’t need to position the phone perfectly in front of your face.
      </Text>

      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://example.com')}>
        Learn more
      </Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={handleCheckboxToggle} style={styles.checkbox}>
          {checked && <View style={styles.checked} />}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          I agree to Absa using my biometric data to verify my identity so I can access my account.
          I have read the{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('https://example.com')}>
            Privacy Statement.
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !checked && styles.buttonDisabled]}
        disabled={!checked}>
        <Text style={[styles.buttonText, !checked && styles.buttonTextDisabled]}>
          Scan face
        </Text>
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Camera Permission</Text>
            <Text style={styles.modalText}>
              Do you allow the app to use your camera to scan your face?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={handleDeny}>
                <Text style={styles.modalCancelText}>Don't Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonAllow} onPress={handleAllow}>
                <Text style={styles.modalAllowText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingTop: 80,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  link: {
    color: '#d6204e',
    fontWeight: '500',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#d6204e',
    marginRight: 10,
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#d6204e',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#d6204e',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#888',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonCancel: {
    flex: 1,
    marginRight: 10,
    padding: 12,
    backgroundColor: '#e5e5e5',
    borderRadius: 6,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#333',
    fontWeight: 'bold',
  },
  modalButtonAllow: {
    flex: 1,
    marginLeft: 10,
    padding: 12,
    backgroundColor: '#d6204e',
    borderRadius: 6,
    alignItems: 'center',
  },
  modalAllowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
