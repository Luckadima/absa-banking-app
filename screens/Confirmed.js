import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';

const ConfirmationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Exact checkmark image */}
        <Image
          source={require('../assets/checkmark.png')}
          style={styles.checkImage}
          resizeMode="contain"
        />

        <Text style={styles.heading}>Your details have been submitted</Text>

        <Text style={styles.subtext}>
          Account status to be provided within 24 hours.
        </Text>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.popToTop()}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  content: {
    alignItems: 'center',
    marginTop: 80,
  },
  checkImage: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  subtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    paddingHorizontal: 20,
  },
  doneButton: {
    backgroundColor: '#f5295c',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
