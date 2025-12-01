import React from 'react';

import {View,Text,Image,TouchableOpacity,StyleSheet,StatusBar,Dimensions,} from 'react-native';
// import GetStartedScreen from '..screens/GetStartedScreen';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const LandingScreen = () => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B0028" />

      {/* Logo in a circle */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./absa_logo.jpeg')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Illustration */}
      <Image
        source={require('./front.jpeg')} // Replace with your image path
        style={styles.image}
        resizeMode="cover"
      />

      {/* Buttons */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.openBtn} onPress={() => navigation.navigate('GetStarted')}>
          <Text style={styles.openText}>Open an account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B0028',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 80,
    borderWidth: 2,
   //orderColor: 'white',
    borderRadius: 90,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    //ckgroundColor: 'white',
  },
  logoImage: {
    width: 100,
    height: 900,
  },
  image: {
    marginTop: 50,
    width: width,
    height: height * 0.5,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '85%',
  },
  openBtn: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  openText: {
    textAlign: 'center',
    color: '#8B0028',
    fontWeight: '600',
    fontSize: 16,
  },
  loginBtn: {
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
  },
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
