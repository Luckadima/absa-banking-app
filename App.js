import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FaceIOPage from './FaceIOPage'; // Your WebView FaceIO page

// Screens
import LandingScreen from './screens/LandingScreen';
import GetStartedScreen from './screens/GetStartedScreen';
import LocationScreen from './screens/LocationScreen';
import ChooseAccountScreen from './screens/ChooseAccountScreen';
import BusinessAccountScreen from './screens/BusinessAccountScreen';
import PersonalAccountScreen from './screens/PersonalAccountScreen';
import StudentOptionScreen from './screens/StudentOptionsScreen';
import StudentAccountScreen from './screens/StudentAccountScreen';
import StudentApplicationScreen from './screens/StudentApplicationScreen';
import ApplicantDetails from './screens/ApplicantDetails';
import TransactionAccount from './screens/TransactionAccount';
import ContactDetailsScreen from './screens/ContactDetails';
import ConfirmationScreen from './screens/Confirmed';
import Login from './screens/Login';
import ScanDetails from './screens/ScanDetails';

const Stack = createNativeStackNavigator();

// ✅ Root navigator wrapper with Linking listener
function RootNavigator() {
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const { queryParams } = Linking.parse(url);

      if (queryParams?.status === 'success') {
        console.log('✅ FaceIO Success, Facial ID:', queryParams.facialId);
        // Navigate to ChooseAccountScreen automatically
        navigation.reset({
          index: 0,
          routes: [{ name: 'ChooseAccount' }],
        });
      } else {
        console.log('❌ FaceIO failed or canceled');
      }
    });

    return () => subscription.remove();
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="LandingScreen">
      <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChooseAccount" component={ChooseAccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BusinessAccount" component={BusinessAccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PersonalAccount" component={PersonalAccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudentOptions" component={StudentOptionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudentAccount" component={StudentAccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudentApplication" component={StudentApplicationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ApplicantDetails" component={ApplicantDetails} options={{ headerShown: false }} />
      <Stack.Screen name="TransactionAccount" component={TransactionAccount} options={{ headerShown: false }} />
      <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Confirmed" component={ConfirmationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="ScanDetails" component={ScanDetails} options={{ headerShown: false }} />

      {/* ✅ Add FaceIO WebView screen */}
      <Stack.Screen name="FaceIO" component={FaceIOPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

