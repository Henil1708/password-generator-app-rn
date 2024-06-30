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
import {PasswordSchema} from '../validations/passwordSchema';
import {generatePasswordString} from '../utils/password';
import {
  LOWERCASEIMG,
  UPPERCASEIMG,
  DIGITIMG,
  SYMBOLSIMG,
  COPYIMG,
} from '../constants/images';
import Clipboard from '@react-native-clipboard/clipboard';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  // Function to reset password state
  const resetPasswordState = () => {
    setPassword('');
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  const handleCopyPassword = async () => {
    await Clipboard.setString(password);
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <StatusBar backgroundColor="#ACE1AF" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              const generatedPassword = generatePasswordString(
                values.passwordLength,
                {
                  lowerCase,
                  upperCase,
                  numbers,
                  symbols,
                },
              );
              setPassword(generatedPassword);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              isValid,
              handleReset,
              handleSubmit,
            }) => (
              <View style={styles.formContent}>
                <View style={{marginBottom: 20}}>
                  <Text style={styles.inputHeading}>Password Length</Text>
                  <TextInput
                    style={[styles.inputStyle, {paddingHorizontal: 15}]}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    placeholderTextColor="#C7C8CC"
                    keyboardType="numeric"
                    autoFocus
                  />
                  {touched.passwordLength && errors.passwordLength && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 14,
                        marginLeft: 15,
                        marginTop: 3,
                      }}>
                      {errors.passwordLength}
                    </Text>
                  )}
                </View>
                <Text style={styles.titleSettings}>Settings</Text>
                <View style={styles.conditionWrapper}>
                  <View
                    style={[styles.inputWrapper, lowerCase && styles.selected]}
                    onTouchEnd={() => setLowerCase(!lowerCase)}>
                    <Image source={LOWERCASEIMG} style={styles.cardImage} />
                    <Text style={styles.cardText}>Lowercase</Text>
                  </View>
                  <View
                    style={[styles.inputWrapper, upperCase && styles.selected]}
                    onTouchEnd={() => setUpperCase(!upperCase)}>
                    <Image source={UPPERCASEIMG} style={styles.cardImage} />
                    <Text style={styles.cardText}>Uppercase</Text>
                  </View>
                  <View
                    style={[styles.inputWrapper, numbers && styles.selected]}
                    onTouchEnd={() => setNumbers(!numbers)}>
                    <Image source={DIGITIMG} style={styles.cardImage} />
                    <Text style={styles.cardText}>Digits</Text>
                  </View>
                  <View
                    style={[styles.inputWrapper, symbols && styles.selected]}
                    onTouchEnd={() => setSymbols(!symbols)}>
                    <Image source={SYMBOLSIMG} style={styles.cardImage} />
                    <Text style={styles.cardText}>Special characters</Text>
                  </View>
                  {/* Add other conditions (uppercase, numbers, symbols) similarly */}
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryButton}
                    onPress={handleSubmit}>
                    <Text style={styles.btnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={[styles.btnTxt, {color: '#254336'}]}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          {password && (
            <View style={styles.copyContentRoot}>
              <View style={styles.copyContentWrapper}>
                <Text style={styles.copyContent}>Generated Password</Text>
                <View style={styles.passwordWrapper}>
                  <Text selectable style={{fontSize: 25, color: '#6B8A7A'}}>
                    {password}
                  </Text>
                  <TouchableOpacity onPress={handleCopyPassword}>
                    <Image source={COPYIMG} style={{width: 50, height: 50}} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PasswordGenerator;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#ACE1AF',
    color: '#254336',
  },
  titleSettings: {
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 4,
    borderRadius: 3,
    // backgroundColor: '#ACE1AF',
    color: '#254336',
  },
  subTitle: {
    padding: 4,
    color: '#B5C18E',
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formContent: {
    padding: 8,
  },
  inputHeading: {
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 4,
    borderRadius: 3,
    // backgroundColor: '#ACE1AF',
    color: '#254336',
  },
  formActions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  selected: {
    backgroundColor: '#ACE1AF',
  },
  conditionWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  inputWrapper: {
    width: '48%', // Adjust width to allow space for margin
    backgroundColor: '#EEEDEB',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 4, // Add margin for gap
    borderRadius: 8,
  },
  cardImage: {
    width: 50,
    height: 50,
  },
  inputStyle: {
    width: '100%',
    borderWidth: 3,
    borderRadius: 8,
    backgroundColor: '#254336',
    paddingVertical: 10,
    color: '#fff',
  },
  cardText: {
    color: '#254336',
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'semibold',
  },
  primaryButton: {
    backgroundColor: '#254336',
    padding: 10,
    paddingVertical: 20,
    borderRadius: 8,
    width: '100%',
  },
  secondaryBtn: {
    backgroundColor: '#F1EEDC',
    padding: 10,
    paddingVertical: 20,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
  },
  btnTxt: {
    color: '#DAD3BE',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    shadowColor: '#254336',
  },
  copyContentRoot: {
    padding: 8,
  },
  copyContentWrapper: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  copyContent: {
    color: '#254336',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
