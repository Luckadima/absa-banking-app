import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactDetailsScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [altContactNumber, setAltContactNumber] = useState('');
  const [comments, setComments] = useState('');

  const isFormFilled = name && surname && contactNumber;

  const handleNext = () => {
    if (isFormFilled) {
      // Navigate or handle submit
      navigation.navigate('Confirmed'); // Replace with your actual next screen
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Contact Details</Text>
          <View style={{ width: 24 }} /> {/* Placeholder to balance header layout */}
        </View>

        {/* Input Fields */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Surname</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your surname"
          value={surname}
          onChangeText={setSurname}
        />

        <Text style={styles.label}>Contact number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter contact number"
          keyboardType="phone-pad"
          value={contactNumber}
          onChangeText={setContactNumber}
        />

        <Text style={styles.label}>Alternate contact number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter alternate contact number"
          keyboardType="phone-pad"
          value={altContactNumber}
          onChangeText={setAltContactNumber}
        />

        <Text style={styles.label}>Comments</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter any additional information"
          value={comments}
          onChangeText={setComments}
        />

        <TouchableOpacity
          style={[styles.nextButton, isFormFilled ? styles.nextActive : styles.nextDisabled]}
          onPress={handleNext}
          disabled={!isFormFilled}
        >
          <Text style={isFormFilled ? styles.nextTextActive : styles.nextTextDisabled}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 12,
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 4,
  },
  nextButton: {
    marginTop: 40,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextDisabled: {
    backgroundColor: '#ccc',
  },
  nextActive: {
    backgroundColor: '#e0004d',
  },
  nextTextDisabled: {
    color: '#888',
    fontWeight: '600',
    fontSize: 16,
  },
  nextTextActive: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
