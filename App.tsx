import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {PasswordSchema} from './validations/passwordSchema';
import {generatePasswordString} from './utils/password';
import {
  LOWERCASEIMG,
  UPPERCASEIMG,
  DIGITIMG,
  SYMBOLSIMG,
  COPYIMG,
} from './constants/images';
import PasswordGenerator from './components/PasswordGenerator';

const App = () => {
  const [password, setPassword] = useState('');
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  // Function to generate password
  const handleGeneratePassword = () => {
    const newPassword = generatePasswordString(8, {
      lowerCase,
      upperCase,
      numbers,
      symbols,
    });
    setPassword(newPassword);
  };

  // Function to reset password state
  const resetPasswordState = () => {
    setPassword('');
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <>
      <PasswordGenerator />
      <Text style={styles.madeWithLove}>
        Made with ❤️ by{' '}
        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://dizilus.com/home')}>
          Dizilus
        </Text>
      </Text>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  madeWithLove: {
    textAlign: 'center',
    color: '#254336',
    paddingVertical: 10,
    backgroundColor: '#FFF8DB',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
