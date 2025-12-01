const [contactDetails, setContactDetails] = useState({
  phone: '',
  email: '',
});

const generatePin = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // e.g., "4572"
};

const sendPinToEmail = async (email, pin) => {
  try {
    const response = await fetch("http://<YOUR-IP-OR-DOMAIN>:3001/api/send-pin-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pin }),
    });

    if (!response.ok) throw new Error("Failed to send PIN");
    Alert.alert("Success", "A 4-digit PIN has been sent to your email.");
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Could not send PIN.");
  }
};

const handleContactDetailsNext = async () => {
  const { email, phone } = contactDetails;

  if (!email && !phone) {
    Alert.alert("Missing Info", "Please enter a phone number or email.");
    return;
  }

  const pin = generatePin();
  console.log("Generated PIN:", pin); // For debugging

  if (email) {
    await sendPinToEmail(email, pin);
  } else {
    Alert.alert("Info", "SMS PIN sending not set up. Please use email.");
  }

  // Optionally: Navigate to next screen with email + pin for verification
  // navigation.navigate('VerifyPin', { email, pin });
};
