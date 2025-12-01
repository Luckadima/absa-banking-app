import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StudentApplicationScreen = () => {
  const navigation = useNavigation();

  const handleStartApplication = () => {
    
    navigation.navigate('ApplicantDetails'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Application</Text>
        <View style={{ width: 28 }} /> 
      </View>

      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Please make sure of the following to open a student account:
        </Text>

        <View style={styles.listItem}>
          <Text style={styles.check}>✓</Text>
          <Text style={styles.itemText}>Must be 18 - 27 years old</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.check}>✓</Text>
          <Text style={styles.itemText}>South African ID Booklet / Smart Card ID</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.check}>✓</Text>
          <Text style={styles.itemText}>Your proof of registration will be accepted as proof of residence</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.check}>✓</Text>
          <Text style={styles.itemText}>
            Must be a full-time student studying towards an undergraduate or postgraduate degree, or qualification of one year or more
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.check}>✓</Text>
          <Text style={styles.itemText}>Only South African citizens can apply</Text>
        </View>
      </ScrollView>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleStartApplication}>
        <Text style={styles.buttonText}>Start Application</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentApplicationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: '500',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  check: {
    fontSize: 18,
    marginRight: 10,
    marginTop: 2,
    color: '#000',
  },
  itemText: {
    fontSize: 15,
    color: '#000',
    flex: 1,
  },
  button: {
    backgroundColor: '#e0004d',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
