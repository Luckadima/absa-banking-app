import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const PersonalAccountScreen = () => {
  const navigation = useNavigation();

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Choose Your Account</Text>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#A00026' }]}
        onPress={() => navigation.navigate('TransactionAccount')}
      >
        <Text style={styles.price}>For R 240.00 pm you get</Text>
        <Text style={styles.heading}>Premium Banking</Text>
        <Image source={require('../assets/premium.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#F57200' }]}
        onPress={() => navigation.navigate('TransactionAccount')}
      >
        <Text style={styles.price}>For R 135.00 pm you get</Text>
        <Text style={styles.heading}>Gold Value Bundle</Text>
        <Image source={require('../assets/gold.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#FFA000' }]}
        onPress={() => navigation.navigate('TransactionAccount')}
      >
        <Text style={styles.price}>For R 55.00 pm you get</Text>
        <Text style={styles.heading}>Flexi Account</Text>
        <Image source={require('../assets/flexi.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#B00020' }]}
        onPress={() => navigation.navigate('TransactionAccount')}
      >
        <Text style={styles.price}>Transaction Account</Text>
        <Text style={styles.heading}>Everyday Essentials</Text>
        <Image source={require('../assets/transaction.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#7C4DFF' }]}
        onPress={() => navigation.navigate('TransactionAccount')}
      >
        <Text style={styles.price}>Credit Card Options</Text>
        <Text style={styles.heading}>Instant Credit Access</Text>
        <Image source={require('../assets/credit.png')} style={styles.image} />
      </TouchableOpacity>

      <Text style={styles.footer}>
        Please visit{' '}
        <Text style={styles.link} onPress={() => openLink('https://www.absa.co.za')}>
          absa.co.za
        </Text>{' '}
        to see all our products and all our{' '}
        <Text style={styles.link} onPress={() => openLink('https://www.absa.co.za/fees')}>
          fees
        </Text>.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#fff',
  },
  backIcon: {
    marginTop: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    height: 200,
    justifyContent: 'space-between',
  },
  price: {
    color: '#fff',
    fontSize: 14,
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    position: 'absolute',
    right: 1,
    bottom: 16,
    width: 150,
    height: 120,
    resizeMode: 'contain',
  },
  footer: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginTop: 20,
  },
  link: {
    color: '#0000EE',
    textDecorationLine: 'underline',
  },
});

export default PersonalAccountScreen;
