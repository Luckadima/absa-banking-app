import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from "expo-linking";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// RadioButton Component
const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioButton} onPress={onPress}>
    <View style={[styles.radioCircle, selected && styles.selectedCircle]}>
      {selected && <View style={styles.innerCircle} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

// CheckboxButton Component
const CheckboxButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.checkboxButton} onPress={onPress}>
    <View style={[styles.checkbox, selected && styles.selectedCheckbox]}>
      {selected && <Ionicons name="checkmark" size={16} color="#fff" />}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

// InputField Component
const InputField = ({ label, value, onChangeText, placeholder, multiline = false, keyboardType = 'default', secureTextEntry = false }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.multilineInput]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiline}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

// Main Component
const ChooseAccountScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [islamicOption, setIslamicOption] = useState('');
  const [entityType, setEntityType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [contactDetails, setContactDetails] = useState({ phone: '', email: '' });
  const [businessDetails, setBusinessDetails] = useState({
    applicationType: '',
    businessName: '',
    businessAddress: '',
    telephone: '',
    cell: '',
    fax: '',
    email: '',
    yearsInBusiness: '',
    businessType: '',
    registrationNumber: '',
    taxClearance: '',
    vatNumber: '',
  });
  const [isSoleOwned, setIsSoleOwned] = useState(null);
  const [stakeholderCount, setStakeholderCount] = useState('');
  const [stakeholders, setStakeholders] = useState([]);
  const [currentStep, setCurrentStep] = useState('account-selection');
  const [currentStakeholderIndex, setCurrentStakeholderIndex] = useState(0);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  const options = ['Personal account', 'Business account', 'Student account'];


  // // Generate a 13-digit random account number
  // const generateAccountNumber = () => {
  //   let number = '';
  //   for (let i = 0; i < 13; i++) {
  //     number += Math.floor(Math.random() * 10);
  //   }
  //   return number;
  // };

  // Timer helper function
  function fetchWithTimeout(url, options = {}, timeout = 100000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      ),
    ]);
  }

  // Handlers
  const handleBusinessDetailsChange = (field, value) => {
    setBusinessDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleStakeholderChange = (index, field, value) => {
    const updatedStakeholders = [...stakeholders];
    updatedStakeholders[index] = { ...updatedStakeholders[index], [field]: value };
    setStakeholders(updatedStakeholders);
  };

  const initializeStakeholders = () => {
    const count = parseInt(stakeholderCount);
    if (isNaN(count) || count < 2) {
      Alert.alert('Error', 'Please enter a valid number of stakeholders (minimum 2)');
      return;
    }
    const newStakeholders = Array.from({ length: count }, (_, i) => ({
      title: '',
      surname: '',
      firstName: '',
      gender: '',
      placeOfBirth: '',
      dateOfBirth: '',
      idNumber: '',
      ethnicGroup: '',
      saResident: '',
      address: '',
      telephone: '',
      email: '',
      postalCode: '',
      residenceYears: '',
      residenceMonths: '',
      propertyOwned: '',
      propertyRented: '',
      maritalStatus: '',
      spouseInfo: '',
      employerName: '',
      employerAddress: '',
      employerTelephone: '',
      position: '',
      annualIncome: '',
      dependants: '',
      childrenCount: '',
      childrenAges: '',
      privilegeLevel: i + 1,
      verified: false,
      pin: '',
      selfieUri: null,
    }));
    setStakeholders(newStakeholders);
  };

  const validateBusinessDetails = () => {
    const required = ['applicationType', 'businessName', 'businessAddress', 'telephone', 'email'];
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessDetails.email);
    return required.every((field) => businessDetails[field].trim()) && isValidEmail;
  };

  const validateStakeholders = () => {
    return stakeholders.every((s) =>
      [s.surname, s.firstName, s.idNumber, s.dateOfBirth, s.address, s.telephone, s.email].every(Boolean)
    );
  };

  const validateContactDetails = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactDetails.email);
    return contactDetails.phone.trim() && contactDetails.email.trim() && isValidEmail;
  };

  const handleNext = () => {
    if (selectedOption === null) {
      Alert.alert('Error', 'Please select an account type');
      return;
    }
    // setAccountNumber(generateAccountNumber());
    if (selectedOption === 0 || selectedOption === 2) {
      setCurrentStep('contact-details');
    } else if (selectedOption === 1 && islamicOption && entityType) {
      setCurrentStep('business-details');
    } else {
      Alert.alert('Error', 'Please complete all selections');
    }
  };

  const handleContactDetailsNext = () => {
    if (!validateContactDetails()) {
      Alert.alert('Error', 'Please enter a valid phone number and email');
      return;
    }
    setCurrentStep('verification');
  };

  const handleBusinessDetailsNext = () => {
    if (!validateBusinessDetails()) {
      Alert.alert('Error', 'Please fill in all required business details');
      return;
    }
    setCurrentStep('stakeholder-setup');
  };

  // Updated with timer
  const handleStakeholderSetupNext = async () => {
    try {
      const response = await fetchWithTimeout('http://192.168.137.1:3001/api/save-stakeholders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          stakeholders,
        }),
      }, 10000); // 10s timeout

      const data = await response.json();

      if (data.success) {
        setCurrentStep('verification');
      } else {
        Alert.alert('Error', 'Failed to save stakeholders');
      }
    } catch (error) {
      console.error('Error saving stakeholders:', error);
      Alert.alert('Error', 'Network error while saving stakeholders: ' + error.message);
    }
  };

  const handlePinSubmit = () => {
    if (pin.length !== 4 || isNaN(pin)) {
      Alert.alert('Error', 'Please enter a valid 4-digit PIN');
      return;
    }
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }
    if (isSoleOwned === false && stakeholders.length > 0) {
      handleStakeholderChange(currentStakeholderIndex, 'pin', pin);
    }
    setPin('');
    setConfirmPin('');
    setShowCameraModal(true);
  };

  const takePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Camera Permission Required', 'Camera access is required for identity verification.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        cameraType: ImagePicker.CameraType.front,
      });
      if (!result.canceled && result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        if (isSoleOwned === false && stakeholders.length > 0) {
          handleStakeholderChange(currentStakeholderIndex, 'selfieUri', imageUri);
        }
        setIsVerifying(true);
        const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
        setTimeout(() => {
          setIsVerifying(false);
          handleSelfieComplete();
        }, delay);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to access camera. Please try again.');
    }
  };

  const handleSelfieComplete = () => {
    setShowCameraModal(false);
    if (isSoleOwned === false && stakeholders.length > 0) {
      handleStakeholderChange(currentStakeholderIndex, 'verified', true);
      if (currentStakeholderIndex < stakeholders.length - 1) {
        setCurrentStakeholderIndex(currentStakeholderIndex + 1);
      } else {
        setCurrentStep('declaration');
      }
    } else {
      setCurrentStep('declaration');
    }
    Alert.alert('Success', 'Identity verification completed successfully!');
  };

  // Account selection render
const renderAccountSelection = () => {
  const handleSaveAccountSelection = async () => {
    try {
      const response = await fetchWithTimeout(
        'http://192.168.137.1:3001/api/save-account-selection',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accountNumber,
            selectedOption,
            islamicOption,
            entityType,
          }),
        },
        10000 // 10s timeout
      );

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        console.log('Account selection saved:', data);

        if (data.success) {
          setApplicationId(data.applicationId);
          setAccountNumber(data.accountNumber); // ✅ save account number
        } else {
          alert('Failed to save account selection');
        }
      } catch (err) {
        console.error('Invalid JSON from backend:', text);
        alert('Invalid response from server');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Could not connect to backend: ' + error.message);
    }
  };

  return (
    <>
      <Text style={styles.subText}>Select which account you want to open</Text>

      {/* ✅ Show account number if available */}
      {accountNumber && (
        <Text style={styles.accountNumber}>
          Your account number: {accountNumber}
        </Text>
      )}

      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => {
            setSelectedOption(index);
            setIslamicOption('');
            setEntityType('');
          }}
        >
          <View
            style={[
              styles.radioCircle,
              selectedOption === index && styles.selectedCircle,
            ]}
          >
            {selectedOption === index && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {selectedOption === 1 && (
        <>
          <View style={styles.section}>
            <Text style={styles.subHeading}>
              Interested in an Islamic (Shari'ah compliant) account?
            </Text>
            <RadioButton
              label="No"
              selected={islamicOption === 'no'}
              onPress={() => setIslamicOption('no')}
            />
            <RadioButton
              label="Yes"
              selected={islamicOption === 'yes'}
              onPress={() => setIslamicOption('yes')}
            />
          </View>

          {islamicOption && (
            <View style={styles.section}>
              <Text style={styles.subHeading}>Business Entity Type</Text>
              <Text style={styles.linkText}>ⓘ What is an entity type?</Text>
              <RadioButton
                label="Pty (Ltd)"
                selected={entityType === 'pty'}
                onPress={() => setEntityType('pty')}
              />
              <RadioButton
                label="Closed Corporation"
                selected={entityType === 'cc'}
                onPress={() => setEntityType('cc')}
              />
              <RadioButton
                label="Other"
                selected={entityType === 'other'}
                onPress={() => setEntityType('other')}
              />
              <RadioButton
                label="Sole Trader"
                selected={entityType === 'sole'}
                onPress={() => setEntityType('sole')}
              />
            </View>
          )}

          {islamicOption && entityType && (
            <TouchableOpacity
              style={[styles.nextButton, styles.nextButtonActive]}
              onPress={async () => {
                await handleSaveAccountSelection();
                handleNext();
              }}
            >
              <Text
                style={[styles.nextButtonText, styles.nextButtonTextActive]}
              >
                Next
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {(selectedOption === 0 || selectedOption === 2) && (
        <>
          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>ⓘ Please note:</Text>
            <Text style={styles.noteText}>
              Absa is an authorised Financial Services Provider and Registered
              Credit Provider NCRCP7.
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedOption !== null
                ? styles.nextButtonActive
                : styles.nextButtonInactive,
            ]}
            onPress={handleNext}
          >
            <Text
              style={[
                styles.nextButtonText,
                selectedOption !== null
                  ? styles.nextButtonTextActive
                  : styles.nextButtonTextInactive,
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};



  //it ends here for business account

// Your existing renderContactDetails function
const renderContactDetails = () => (
  <>
    <Text style={styles.sectionTitle}>Contact Details</Text>
    <Text style={styles.accountNumber}>Account Number: {accountNumber}</Text>
    <InputField
      label="Phone Number"
      value={contactDetails.phone}
      onChangeText={(value) =>
        setContactDetails((prev) => ({ ...prev, phone: value }))
      }
      placeholder="Enter phone number"
      keyboardType="phone-pad"
    />
    <InputField
      label="Email Address"
      value={contactDetails.email}
      onChangeText={(value) =>
        setContactDetails((prev) => ({ ...prev, email: value }))
      }
      placeholder="Enter email address"
      keyboardType="email-address"
    />
    <TouchableOpacity
      style={[styles.nextButton, styles.nextButtonActive]}
      onPress={handleContactDetailsNexts} // Updated to match function name
    >
      <Text style={[styles.nextButtonText, styles.nextButtonTextActive]}>Next</Text>
    </TouchableOpacity>
  </>
);

// The function to call your backend
const handleContactDetailsNexts = () => {
  if (!contactDetails.email || !contactDetails.phone) {
    Alert.alert('Validation', 'Please enter both phone number and email.');
    return;
  }

  fetch('http://192.168.137.1:3001/api/save-contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactDetails),
  })
    .then((res) => res.json())
    .then((data) => {
      Alert.alert('Success', 'Contact details saved!');
      navigation.navigate('ChooseAccountScreen'); // <-- added navigation line
    })
    .catch((err) => {
      console.error(err);
      Alert.alert('Error', 'Failed to save contact details.');
    });
};



//it continues here for business account
const renderBusinessDetails = () => {
  // Function to save business details to backend
  const submitBusinessDetailsAndNext = async () => {
    try {
      const response = await fetch('http://192.168.137.1:3001/api/save-business-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          applicationType: businessDetails.applicationType,
          businessName: businessDetails.businessName,
          businessAddress: businessDetails.businessAddress,
          telephone: businessDetails.telephone,
          cell: businessDetails.cell,
          fax: businessDetails.fax,
          email: businessDetails.email, // use the user's email from the form
          yearsInBusiness: businessDetails.yearsInBusiness,
          registrationNumber: businessDetails.registrationNumber,
          taxClearance: businessDetails.taxClearance,
          vatNumber: businessDetails.vatNumber,
          businessEntityType: entityType,
        }),
      });

      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Business details saved:', data);

        if (data.success) {
          // Send PIN after business details saved
          try {
            const pinResponse = await fetch('http://192.168.137.1:3001/api/send-verification-pin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: businessDetails.email }), // pass email here
            });

            const pinData = await pinResponse.json();
            console.log('Verification PIN sent:', pinData);

            if (pinData.success) {
              setCurrentStep('stakeholder-setup'); // Move to next step
            } else {
              Alert.alert('Error', pinData.message || 'Failed to send verification PIN');
            }
          } catch (pinError) {
            console.error('PIN error:', pinError);
            Alert.alert('Error', 'Could not send verification PIN');
          }
        } else {
          Alert.alert('Error', 'Failed to save business details');
        }
      } else {
        const text = await response.text();
        console.error('Expected JSON but received:', text);
        Alert.alert('Error', 'Unexpected response format from server.');
      }
    } catch (error) {
      console.error('Error saving business details:', error);
      Alert.alert('Error', 'Could not save business details. Please try again.');
    }
  };

  // JSX for business details form
  return (
    <>
      <Text style={styles.sectionTitle}>Business Details</Text>
      <Text style={styles.accountNumber}>Account Number: {accountNumber}</Text>
      <Text style={styles.subHeading}>Type of Application</Text>
      <View style={styles.checkboxContainer}>
        <CheckboxButton
          label="Start-up Business"
          selected={businessDetails.applicationType === 'startup'}
          onPress={() => handleBusinessDetailsChange('applicationType', 'startup')}
        />
        <CheckboxButton
          label="Existing Business"
          selected={businessDetails.applicationType === 'existing'}
          onPress={() => handleBusinessDetailsChange('applicationType', 'existing')}
        />
      </View>
<InputField 
  label="Business Name"
  value={businessDetails.businessName}
  onChangeText={async (value) => {
    handleBusinessDetailsChange('businessName', value);

    try {
      await AsyncStorage.setItem('businessName', value); // ✅ Save business name
    } catch (error) {
      console.error("Error saving business name", error);
    }
  }}
  placeholder="Enter business name"
/>



      <InputField
        label="Business Address"
        value={businessDetails.businessAddress}
        onChangeText={(value) => handleBusinessDetailsChange('businessAddress', value)}
        placeholder="Enter business address"
        multiline
      />
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <InputField
            label="Telephone"
            value={businessDetails.telephone}
            onChangeText={(value) => handleBusinessDetailsChange('telephone', value)}
            placeholder="Telephone"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.halfWidth}>
          <InputField
            label="Cell"
            value={businessDetails.cell}
            onChangeText={(value) => handleBusinessDetailsChange('cell', value)}
            placeholder="Cell"
            keyboardType="phone-pad"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <InputField
            label="Fax"
            value={businessDetails.fax}
            onChangeText={(value) => handleBusinessDetailsChange('fax', value)}
            placeholder="Fax"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.halfWidth}>
          <InputField
            label="Email"
            value={businessDetails.email}
            onChangeText={(value) => handleBusinessDetailsChange('email', value)}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
      </View>
      <InputField
        label="Years in Business"
        value={businessDetails.yearsInBusiness}
        onChangeText={(value) => handleBusinessDetailsChange('yearsInBusiness', value)}
        placeholder="Number of years"
        keyboardType="numeric"
      />
      <InputField
        label="Registration/Company Number"
        value={businessDetails.registrationNumber}
        onChangeText={(value) => handleBusinessDetailsChange('registrationNumber', value)}
        placeholder="Registration number"
      />
      <Text style={styles.subHeading}>Tax Clearance Certificate</Text>
      <View style={styles.radioContainer}>
        <RadioButton
          label="Yes"
          selected={businessDetails.taxClearance === 'yes'}
          onPress={() => handleBusinessDetailsChange('taxClearance', 'yes')}
        />
        <RadioButton
          label="No"
          selected={businessDetails.taxClearance === 'no'}
          onPress={() => handleBusinessDetailsChange('taxClearance', 'no')}
        />
      </View>
      <InputField
        label="VAT Registration Number"
        value={businessDetails.vatNumber}
        onChangeText={(value) => handleBusinessDetailsChange('vatNumber', value)}
        placeholder="VAT number (if applicable)"
      />
      <TouchableOpacity style={[styles.nextButton, styles.nextButtonActive]} onPress={submitBusinessDetailsAndNext}>
        <Text style={[styles.nextButtonText, styles.nextButtonTextActive]}>Next</Text>
      </TouchableOpacity>
    </>
  );
};




  const renderStakeholderSetup = () => (
    <>
      <Text style={styles.sectionTitle}>Stakeholder Information</Text>
      <Text style={styles.accountNumber}>Account Number: {accountNumber}</Text>
      <Text style={styles.subHeading}>Is this account solely owned?</Text>
      <View style={styles.radioContainer}>
        <RadioButton label="Yes" selected={isSoleOwned === true} onPress={() => setIsSoleOwned(true)} />
        <RadioButton label="No" selected={isSoleOwned === false} onPress={() => setIsSoleOwned(false)} />
      </View>
      {isSoleOwned === false && (
        <>
          <InputField
            label="Number of Stakeholders (including yourself)"
            value={stakeholderCount}
            onChangeText={setStakeholderCount}
            placeholder="Enter number of stakeholders"
            keyboardType="numeric"
          />
          {stakeholderCount && parseInt(stakeholderCount) > 1 && (
            <TouchableOpacity style={[styles.nextButton, styles.nextButtonSecondary]} onPress={initializeStakeholders}>
              <Text style={styles.nextButtonText}>Setup Stakeholder Details</Text>
            </TouchableOpacity>
          )}
          {stakeholders.map((stakeholder, index) => (
            <View key={index} style={styles.stakeholderCard}>
              <Text style={styles.stakeholderTitle}>
                Stakeholder {index + 1} (Privilege Level: {stakeholder.privilegeLevel})
              </Text>
              <View style={styles.row}>
                <View style={styles.quarterWidth}>
                  <Text style={styles.inputLabel}>Title</Text>
                  <View style={styles.titleContainer}>
                    {['Mr', 'Mrs', 'Miss'].map((title) => (
                      <CheckboxButton
                        key={title}
                        label={title}
                        selected={stakeholder.title === title}
                        onPress={() => handleStakeholderChange(index, 'title', title)}
                      />
                    ))}
                  </View>
                </View>
                <View style={styles.quarterWidth}>
                  <Text style={styles.inputLabel}>Gender</Text>
                  <View style={styles.titleContainer}>
                    {['Male', 'Female'].map((gender) => (
                      <CheckboxButton
                        key={gender}
                        label={gender}
                        selected={stakeholder.gender === gender}
                        onPress={() => handleStakeholderChange(index, 'gender', gender)}
                      />
                    ))}
                  </View>
                </View>
              </View>
              <InputField
                label="Surname"
                value={stakeholder.surname}
                onChangeText={(value) => handleStakeholderChange(index, 'surname', value)}
                placeholder="Enter surname"
              />
              <InputField
                label="First Name(s)"
                value={stakeholder.firstName}
                onChangeText={(value) => handleStakeholderChange(index, 'firstName', value)}
                placeholder="Enter first name(s)"
              />
              <InputField
                label="ID Number"
                value={stakeholder.idNumber}
                onChangeText={(value) => handleStakeholderChange(index, 'idNumber', value)}
                placeholder="Enter ID number"
                keyboardType="numeric"
              />
              <InputField
                label="Date of Birth"
                value={stakeholder.dateOfBirth}
                onChangeText={(value) => handleStakeholderChange(index, 'dateOfBirth', value)}
                placeholder="YYYY-MM-DD"
              />
              <InputField
                label="Place of Birth"
                value={stakeholder.placeOfBirth}
                onChangeText={(value) => handleStakeholderChange(index, 'placeOfBirth', value)}
                placeholder="Enter place of birth"
              />
              <InputField
                label="Residential Address"
                value={stakeholder.address}
                onChangeText={(value) => handleStakeholderChange(index, 'address', value)}
                placeholder="Enter residential address"
                multiline
              />
              <InputField
                label="Telephone"
                value={stakeholder.telephone}
                onChangeText={(value) => handleStakeholderChange(index, 'telephone', value)}
                placeholder="Enter telephone"
                keyboardType="phone-pad"
              />
              <InputField
                label="Email"
                value={stakeholder.email}
                onChangeText={(value) => handleStakeholderChange(index, 'email', value)}
                placeholder="Enter email"
                keyboardType="email-address"
              />
              <InputField
                label="Postal Code"
                value={stakeholder.postalCode}
                onChangeText={(value) => handleStakeholderChange(index, 'postalCode', value)}
                placeholder="Enter postal code"
                keyboardType="numeric"
              />
              <InputField
                label="Ethnic Group"
                value={stakeholder.ethnicGroup}
                onChangeText={(value) => handleStakeholderChange(index, 'ethnicGroup', value)}
                placeholder="Enter ethnic group"
              />
              <Text style={styles.inputLabel}>SA Resident</Text>
              <View style={styles.radioContainer}>
                <RadioButton
                  label="Yes"
                  selected={stakeholder.saResident === 'yes'}
                  onPress={() => handleStakeholderChange(index, 'saResident', 'yes')}
                />
                <RadioButton
                  label="No"
                  selected={stakeholder.saResident === 'no'}
                  onPress={() => handleStakeholderChange(index, 'saResident', 'no')}
                />
              </View>
            </View>
          ))}
        </>
      )}
      <TouchableOpacity style={[styles.nextButton, styles.nextButtonActive]} onPress={handleStakeholderSetupNext}>
        <Text style={[styles.nextButtonText, styles.nextButtonTextActive]}>Proceed to Verification</Text>
      </TouchableOpacity>
    </>
  );

  const renderVerification = () => {
    const currentStakeholder = isSoleOwned === false && stakeholders.length > 0 ? stakeholders[currentStakeholderIndex] : null;
    return (
      <>
        <Text style={styles.sectionTitle}>Identity Verification</Text>
        <Text style={styles.accountNumber}>Account Number: {accountNumber}</Text>
        {currentStakeholder ? (
          <Text style={styles.verificationText}>
            Verifying: {currentStakeholder.firstName} {currentStakeholder.surname}
            {'\n'}Stakeholder {currentStakeholderIndex + 1} of {stakeholders.length}
          </Text>
        ) : (
          <Text style={styles.verificationText}>
            {selectedOption === 0 ? 'Personal Account Verification' : 'Student Account Verification'}
          </Text>
        )}
        <Text style={styles.instructionText}>Enter and confirm your 4-digit PIN</Text>
        <InputField
          label="PIN"
          value={pin}
          onChangeText={setPin}
          placeholder="Enter 4-digit PIN"
          keyboardType="numeric"
          secureTextEntry
        />
        <InputField
          label="Confirm PIN"
          value={confirmPin}
          onChangeText={setConfirmPin}
          placeholder="Confirm 4-digit PIN"
          keyboardType="numeric"
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.nextButton, pin.length === 4 && confirmPin.length === 4 ? styles.nextButtonActive : styles.nextButtonInactive]}
          onPress={handlePinSubmit}
          disabled={pin.length !== 4 || confirmPin.length !== 4}
        >
          <Text
            style={[styles.nextButtonText, pin.length === 4 && confirmPin.length === 4 ? styles.nextButtonTextActive : styles.nextButtonTextInactive]}
          >
            Verify with Selfie
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderDeclaration = () => (
    <>
      <Text style={styles.sectionTitle}>Declaration Terms</Text>
      <Text style={styles.accountNumber}>Account Number: {accountNumber}</Text>
      <View style={styles.declarationBox}>
        <Text style={styles.declarationTitle}>Declaration</Text>
        <Text style={styles.declarationText}>
          All information provided is true and correct. This application is subject to South African laws and Absa Bank Limited’s terms.
        </Text>
      </View>
      <Text style={styles.confirmationText}>
        {isSoleOwned === false
          ? `All ${stakeholders.length} stakeholders verified.`
          : 'Identity verified successfully.'}
      </Text>
      <TouchableOpacity style={[styles.nextButton, styles.nextButtonActive]} onPress={() => navigation.navigate('Confirmed')}>
        <Text style={[styles.nextButtonText, styles.nextButtonTextActive]}>Accept & Continue</Text>
      </TouchableOpacity>
    </>
  );

  const renderCameraModal = () => {
    if (isVerifying) {
      return (
        <Modal visible={showCameraModal} animationType="slide">
          <View style={styles.cameraContainer}>
            <Text style={styles.cameraTitle}>Verifying Identity</Text>
            <ActivityIndicator size="large" color="#c8102e" />
            <Text style={styles.cameraInstructions}>Processing your selfie...</Text>
          </View>
        </Modal>
      );
    }
    const currentStakeholder = isSoleOwned === false && stakeholders.length > 0 ? stakeholders[currentStakeholderIndex] : null;
    return (
      <Modal visible={showCameraModal} animationType="slide">
        <View style={styles.cameraContainer}>
          <Text style={styles.cameraTitle}>Identity Verification</Text>
          {currentStakeholder ? (
            <Text style={styles.cameraSubtitle}>
              {currentStakeholder.firstName} {currentStakeholder.surname}
            </Text>
          ) : (
            <Text style={styles.cameraSubtitle}>
              {selectedOption === 0 ? 'Personal Account' : 'Student Account'} Verification
            </Text>
          )}
          <Text style={styles.cameraInstructions}>Take a clear selfie for verification</Text>
<TouchableOpacity
  style={[styles.cameraActionButton, styles.cameraButton]}
  onPress={() => {
    // Deep link your app will listen for
    const redirectUrl = "myapp://faceio"; 

    // ✅ Use your Ngrok URL instead of localhost or local IP
    const faceioPageUrl = `https://b2f014d39f28.ngrok-free.app/index.html?redirect=${encodeURIComponent(redirectUrl)}`;

    // Open FaceIO page in browser
    Linking.openURL(faceioPageUrl);
  }}
>
  <Ionicons name="camera" size={24} color="#fff" />
  <Text style={styles.cameraButtonText}>Take Selfie</Text>
</TouchableOpacity>


          <TouchableOpacity
            style={[styles.cameraActionButton, styles.cancelButton]}
            onPress={() => setShowCameraModal(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        {currentStep === 'account-selection' && renderAccountSelection()}
        {currentStep === 'contact-details' && renderContactDetails()}
        {currentStep === 'business-details' && renderBusinessDetails()}
        {currentStep === 'stakeholder-setup' && renderStakeholderSetup()}
        {currentStep === 'verification' && renderVerification()}
        {currentStep === 'declaration' && renderDeclaration()}
        {renderCameraModal()}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles (Updated to reflect Absa-like branding)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingTop: 10 },
  backButton: { marginBottom: 10 },
  subText: { fontSize: 15, textAlign: 'center', color: '#333', marginBottom: 20 },
  option: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  radioButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#c8102e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: { backgroundColor: '#c8102e' },
  innerCircle: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' },
  optionText: { fontSize: 18, color: '#333', marginLeft: 10 },
  radioLabel: { fontSize: 16, marginLeft: 10 },
  checkboxButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#c8102e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCheckbox: { backgroundColor: '#c8102e' },
  checkboxLabel: { fontSize: 16 },
  section: { marginTop: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#c8102e' },
  subHeading: { fontSize: 16, marginBottom: 12, fontWeight: '500' },
  linkText: { color: '#555', marginBottom: 12 },
  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 14, fontWeight: '500', marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' },
  multilineInput: { height: 80, textAlignVertical: 'top' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfWidth: { width: '48%' },
  quarterWidth: { width: '48%' },
  checkboxContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  radioContainer: { flexDirection: 'row', marginBottom: 15 },
  titleContainer: { flexDirection: 'column' },
  stakeholderCard: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#e9ecef' },
  stakeholderTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#c8102e' },
  verificationText: { fontSize: 16, textAlign: 'center', marginBottom: 20, fontWeight: '500' },
  instructionText: { fontSize: 14, textAlign: 'center', marginBottom: 20, color: '#666' },
  accountNumber: { fontSize: 16, textAlign: 'center', marginBottom: 20, fontWeight: '500', color: '#333' },
  declarationBox: { backgroundColor: '#f8f9fa', padding: 20, borderRadius: 10, marginBottom: 20 },
  declarationTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  declarationText: { fontSize: 14, lineHeight: 20, color: '#333' },
  confirmationText: { fontSize: 14, textAlign: 'center', marginBottom: 20, color: '#28a745', fontWeight: '500' },
  noteBox: { backgroundColor: '#f2f2f6', padding: 15, borderRadius: 8, marginTop: 30 },
  noteTitle: { fontWeight: '600', marginBottom: 5 },
  noteText: { fontSize: 14, color: '#333' },
  nextButton: { paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  nextButtonInactive: { backgroundColor: '#ccc' },
  nextButtonActive: { backgroundColor: '#c8102e' },
  nextButtonSecondary: { backgroundColor: '#6c757d' },
  nextButtonText: { fontSize: 16, fontWeight: '600' },
  nextButtonTextInactive: { color: '#888' },
  nextButtonTextActive: { color: '#fff' },
  cameraContainer: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  cameraTitle: { fontSize: 24, fontWeight: 'bold', color: '#c8102e', marginBottom: 10, textAlign: 'center' },
  cameraSubtitle: { fontSize: 18, color: '#333', marginBottom: 20, textAlign: 'center' },
  cameraInstructions: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center', lineHeight: 22 },
  cameraActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  cameraButton: { backgroundColor: '#28a745' },
  cancelButton: { backgroundColor: '#c8102e' },
  cameraButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 10 },
  cancelButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default ChooseAccountScreen;