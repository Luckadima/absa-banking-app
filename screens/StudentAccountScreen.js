import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StudentAccountScreen = () => {
  const navigation = useNavigation();

  const openAbsaWebsite = () => {
    Linking.openURL('https://www.absa.co.za');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Account</Text>
        <Text style={styles.subheading}>All your essential banking needs at no cost</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.description}>
          With a Student Account, you pay no monthly fee while you study, along with unlimited card swipes, the ability to manage your money 24/7 and a range of value-added services.
        </Text>

        <Text style={styles.feeTitle}>Monthly fee: R 0.00 pm</Text>

        <Text style={styles.benefitTitle}>Better everyday banking</Text>

        <View style={styles.benefitRow}>
          <Ionicons name="checkmark" size={20} color="#f04e6a" />
          <Text style={styles.benefitText}>No monthly account fee</Text>
        </View>
        <View style={styles.benefitRow}>
          <Ionicons name="checkmark" size={20} color="#f04e6a" />
          <Text style={styles.benefitText}>Unlimited Absa Online, mobile and telephone banking</Text>
        </View>
        <View style={styles.benefitRow}>
          <Ionicons name="checkmark" size={20} color="#f04e6a" />
          <Text style={styles.benefitText}>Mailed or eStatements</Text>
        </View>
        <View style={styles.benefitRow}>
          <Ionicons name="checkmark" size={20} color="#f04e6a" />
          <Text style={styles.benefitText}>Unlimited electronic payments including debit and stop orders</Text>
        </View>

        <TouchableOpacity style={styles.linkRow}>
          <Ionicons name="bookmark-outline" size={20} color="#333" />
          <Text style={styles.linkText}>Tell me more</Text>
          <Ionicons name="chevron-forward" size={20} color="#333" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <Text style={styles.note}>
          <Text style={styles.noteBold}>Please note:</Text> To get a cheque account with an overdraft, apply at your nearest branch or on{' '}
          <Text style={styles.link} onPress={openAbsaWebsite}>absa.co.za</Text>.
        </Text>

        <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('StudentApplication')}>
          <Text style={styles.applyText}>Apply now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StudentAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#e0004d',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  subheading: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  body: {
    padding: 20,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  feeTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  linkText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  note: {
    fontSize: 13,
    color: '#333',
    marginBottom: 20,
  },
  noteBold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#e0004d',
    textDecorationLine: 'underline',
  },
  applyButton: {
    backgroundColor: '#e0004d',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
