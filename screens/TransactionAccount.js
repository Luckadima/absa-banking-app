import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TransactionAccount = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transact Account</Text>
      </View>

      <View style={styles.banner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.mainTitle}>Ideal for day-to-day banking</Text>
        </View>
        <Image
          source={require('../assets/transaction.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.description}>
        Enjoy the flexibility that comes with a pay as you transact pricing
        structure from as little as R6.50 per month, it's frills free and allows
        you to determine what fees you pay.
      </Text>

      <Text style={styles.feeTitle}>Monthly fee: R 6.50 pm</Text>
      <Text style={styles.feeNote}>
        This amount will change according to transactions you will make every month
      </Text>

      <Text style={styles.whatYouGet}>What you get</Text>

      <View style={styles.bulletItem}><Text style={styles.bullet}>✓</Text><Text style={styles.bulletText}> Embedded life cover of R5 000</Text></View>
      <View style={styles.bulletItem}><Text style={styles.bullet}>✓</Text><Text style={styles.bulletText}> Unlimited debit card swipes</Text></View>
      <View style={styles.bulletItem}><Text style={styles.bullet}>✓</Text><Text style={styles.bulletText}> CashSend lets you send money to anyone even if they don't have a bank account</Text></View>
      <View style={styles.bulletItem}><Text style={styles.bullet}>✓</Text><Text style={styles.bulletText}> Top-up electricity or airtime or buy lotto</Text></View>

      <TouchableOpacity style={styles.tellMeMore}>
        <Text style={styles.tellMeMoreText}>Tell me more</Text>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyButton}
    onPress={() => navigation.navigate('ApplicantDetails')} >
    <Text style={styles.applyButtonText}>Apply now</Text>
    </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    marginTop:60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    marginLeft:60
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F34B74',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  mainTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 10
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15
  },
  feeTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5
  },
  feeNote: {
    fontSize: 13,
    color: '#555',
    marginBottom: 20
  },
  whatYouGet: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  bullet: {
    fontSize: 16,
    color: '#000',
    marginRight: 5
  },
  bulletText: {
    fontSize: 14,
    color: '#333',
    flex: 1
  },
  tellMeMore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  tellMeMoreText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    flex: 1
  },
  chevron: {
    fontSize: 24,
    color: '#888'
  },
  applyButton: {
    backgroundColor: '#F34B74',
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center'
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
});

export default TransactionAccount;
