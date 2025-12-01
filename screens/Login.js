import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

export default function Login({ navigation }) {
  const [idNumber, setIdNumber] = useState('');

  const handleNext = () => {
    if (idNumber.trim()) {
      navigation.navigate('ScanDetails');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header section with image and greeting */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, There!</Text>
          <Text style={styles.title}>Let's get started</Text>
          <Image source={require('../assets/flexi.png')} style={styles.image} />
        </View>

        {/* Input field */}
        <Text style={styles.label}>ID number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your ID number"
          keyboardType="numeric"
          value={idNumber}
          onChangeText={setIdNumber}
        />

        {/* Note box */}
        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>ⓘ  Please note</Text>
          <Text style={styles.noteText}>
            If you have a <Text style={styles.bold}>Business</Text>, <Text style={styles.bold}>Joint</Text> or <Text style={styles.bold}>Power of Attorney</Text> account, you will not be able to register for digital banking here. Please visit your branch.
          </Text>
        </View>

        {/* ID Option Button */}
        <TouchableOpacity style={styles.noIdButton}>
          <Text style={styles.noIdText}>I don't have a South African ID</Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity 
          style={[styles.nextButton, idNumber ? { backgroundColor: '#a90533' } : { backgroundColor: '#ccc' }]}
          onPress={handleNext}
          disabled={!idNumber}
        >
          <Text style={[styles.nextText, idNumber ? { color: 'white' } : { color: '#888' }]}>Next</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 5,
  },
  header: {
    backgroundColor: '#a90533',
    paddingTop: 90,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  greeting: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 80,
    height: 160,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 30,
    fontWeight: '500',
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    fontSize: 16,
  },
  noteBox: {
    marginTop: 220,
    padding: 15,
    backgroundColor: '#f6f4f9',
    borderRadius: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteText: {
    color: '#444',
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  noIdButton: {
    borderColor: '#d6204e',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  noIdText: {
    color: '#d6204e',
    fontWeight: '600',
  },
  nextButton: {
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  nextText: {
    fontWeight: '600',
  },
});
