import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import Checkbox from 'expo-checkbox'; // ✅ using expo-checkbox

const ApplicantDetails = ({ navigation }) => {
  const [idNumber, setIdNumber] = useState('');
  const [surname, setSurname] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  const isFormValid = idNumber && surname && cellphone && email && agree;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.step}>Step 1 of 8</Text>
      <Text style={styles.title}>Who You Are</Text>

      <Text style={styles.label}>SA ID Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your ID number"
        placeholderTextColor="#aaa"
        value={idNumber}
        onChangeText={setIdNumber}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Surname</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your surname"
        placeholderTextColor="#aaa"
        value={surname}
        onChangeText={setSurname}
      />

      <Text style={styles.label}>Cellphone number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your cellphone number"
        placeholderTextColor="#aaa"
        value={cellphone}
        onChangeText={setCellphone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.agreementRow}>
        <Checkbox
          value={agree}
          onValueChange={setAgree}
          color={agree ? '#000' : undefined}
        />
        <Text style={styles.agreementText}>
          I understand and agree to the{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://example.com')}>
            Personal Client Agreement
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        disabled={!isFormValid}
        style={[styles.button, { backgroundColor: isFormValid ? '#d6204e' : '#ccc' }]}
        onPress={() => navigation.navigate('NextStepScreen')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  
  step: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  agreementText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10
  },
  link: {
    textDecorationLine: 'underline',
    color: '#000'
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  }
});

export default ApplicantDetails;
