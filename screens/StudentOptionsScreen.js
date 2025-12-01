import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StudentOptionScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const options = [
    "I'm with an Absa consultant on my campus",
    "I'm not in a branch",
    "I'm currently in a branch",
  ];

  const handleNext = () => {
    if (selectedOption !== null) {
      navigation.navigate('StudentAccount');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Where You Are</Text>
      <Text style={styles.description}>
        To make your application easier for you, let us know where you are
      </Text>

      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() => setSelectedOption(index)}
        >
          <View style={[styles.circle, selectedOption === index && styles.selectedCircle]} />
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[
          styles.nextButton,
          { backgroundColor: selectedOption !== null ? '#999' : '#d3d3d3' },
        ]}
        onPress={handleNext}
        disabled={selectedOption === null}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentOptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf: 'center',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f04e6a',
    marginRight: 12,
  },
  selectedCircle: {
    backgroundColor: '#f04e6a',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  nextButton: {
    marginTop: 'auto',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
