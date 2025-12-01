import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const GetStartedScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ChooseAccount'); // Navigates to LocationScreen
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>
      <Text style={styles.title}>Get a personal or business account using our app</Text>

      <Image
        source={require('../assets/selfie-icon.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Avoid paperwork, verify your identity using a few selfies</Text>

      <View style={styles.dots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Let's do this!</Text>
      </TouchableOpacity>
      
      <Text style={styles.link}>absa.co.za</Text>

    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
    marginTop: 10,
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 100,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
backButton: {
  position: 'absolute',
  top: 60,
  bottom: 40,
  left: 20,
  zIndex: 10,
},
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#e0004d',
  },
  link: {
    fontSize: 14,
    color: '#444',
    textDecorationLine: 'underline',
    marginTop:180,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0004d',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
