import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LocationScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    "I'm not in a branch",
    "I'm currently in a branch",
  ];

  const handleNext = () => {
    if (selectedOption !== null) {
      navigation.navigate('PersonalAccount'); // Replace with actual next screen
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.heading}>Where You Are</Text>
        <Text style={styles.subText}>
          To make your application easier for you, let us know where you are
        </Text>

        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => setSelectedOption(index)}
          >
            <View style={[styles.radioCircle, selectedOption === index && styles.selectedCircle]}>
              {selectedOption === index && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: selectedOption !== null ? '#e0004d' : '#ccc' },
          ]}
          onPress={handleNext}
          disabled={selectedOption === null}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    flex: 1,
  },
  backButton: {
    marginBottom: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    marginTop:0,
  },
  subText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0004d',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedCircle: {
    borderColor: '#e0004d',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#e0004d',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    marginTop: 'auto',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
