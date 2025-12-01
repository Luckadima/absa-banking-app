import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioButton} onPress={onPress}>
    <View style={[styles.radioCircle, selected && styles.selectedCircle]} />
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

const BusinessAccountScreen = () => {
  const [accountType, setAccountType] = useState('');
  const [islamicOption, setIslamicOption] = useState('');
  const [entityType, setEntityType] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Islamic Account Option */}
      {accountType === 'business' && (
        <View style={styles.section}>
          <Text style={styles.subHeading}>
            Are you interested in an Islamic (Shari'ah compliant) account?
          </Text>
          <RadioButton label="No" selected={islamicOption === 'no'} onPress={() => setIslamicOption('no')} />
          <RadioButton label="Yes" selected={islamicOption === 'yes'} onPress={() => setIslamicOption('yes')} />
        </View>
      )}

      {/* Business Entity Types */}
      {islamicOption !== '' && (
        <View style={styles.section}>
          <Text style={styles.subHeading}>What is your business Entity type?</Text>
          <Text style={styles.linkText}>ⓘ What is an entity type?</Text>

          <RadioButton label="Pty (Ltd)" selected={entityType === 'pty'} onPress={() => setEntityType('pty')} />
          <RadioButton label="Closed Corporation" selected={entityType === 'cc'} onPress={() => setEntityType('cc')} />
          <RadioButton label="Other" selected={entityType === 'other'} onPress={() => setEntityType('other')} />
          <RadioButton label="Sole Trader(Proprietor)" selected={entityType === 'sole'} onPress={() => setEntityType('sole')} />
        </View>
      )}

      {/* Footer */}
      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>ⓘ Please note:</Text>
        <Text style={styles.noteText}>
          Absa is an authorised Financial Services Provider and Registered Credit Provider NCRCP7.
        </Text>
      </View>

      {/* Next Button */}
      
<TouchableOpacity
  style={[
    styles.nextButton,
    accountType === 'business' && islamicOption && entityType
      ? styles.nextButtonActive
      : styles.nextButtonInactive,
  ]}
  disabled={!(accountType === 'business' && islamicOption && entityType)}
>
  <Text
    style={[
      styles.nextButtonText,
      accountType === 'business' && islamicOption && entityType
        ? styles.nextButtonTextActive
        : styles.nextButtonTextInactive,
    ]}
  >
    Next
  </Text>
</TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop:100,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 108,
    fontWeight: '600',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0004d',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedCircle: {
    backgroundColor: '#e0004d',
  },
  radioLabel: {
    fontSize: 16,
  },
  section: {
    marginTop: 25,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '500',
  },
  linkText: {
    color: '#555',
    marginBottom: 12,
  },
  noteBox: {
    backgroundColor: '#f2f2f6',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  noteTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
    color: '#333',
  },
  nextButton: {
  paddingVertical: 12,
  alignItems: 'center',
  borderRadius: 8,
  marginTop: 20,
},

nextButtonInactive: {
  backgroundColor: '#ccc',
},

nextButtonActive: {
  backgroundColor: '#e0004d', // burgundy red
},

nextButtonText: {
  fontSize: 16,
  fontWeight: '500',
},

nextButtonTextInactive: {
  color: '#888',
},

nextButtonTextActive: {
  color: '#fff',
},
});

export default BusinessAccountScreen;
