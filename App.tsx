import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

// Form validation
import {PasswordSchema} from './validations/passwordSchema';
import {generatePasswordString} from './utils/password';
import {Form, Formik} from 'formik';

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const handleGeneratePassword = () => {
    const password = generatePasswordString(8, {
      lowerCase,
      upperCase,
      numbers,
      symbols,
    });
    setPassword(password);
  };

  const resetPasswordState = () => {
    // reset the password all states whereever you need it

    setPassword('');
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <StatusBar backgroundColor={'#ACE1AF'} barStyle={'dark-content'} />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
        </View>
        <Formik
          initialValues={{passwordLength: ''}}
          validationSchema={PasswordSchema}
          onSubmit={(values, {setSubmitting}) => {}}>
          {({
            values,
            errors,
            touched,
            handleChange,
            isValid,
            handleReset,
            isSubmitting,
          }) => (
            <>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputHeading}>Password Length</Text>
                {touched.passwordLength && errors.passwordLength && (
                  <Text>{errors.passwordLength}</Text>
                )}
                <TextInput
                  style={styles.inputStyle}
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  placeholder="Ex. 8"
                  placeholderTextColor="#C7C8CC"
                  keyboardType="numeric"
                  autoFocus
                />
              </View>
              <View
                style={[styles.inputWrapper, lowerCase && styles.selected]}
                onTouchEnd={() => setLowerCase(!lowerCase)}>
                <Text style={styles.inputHeading}>
                  Include lowercase {lowerCase && <Text>(Selected)</Text>}
                </Text>
              </View>
              <View
                style={[styles.inputWrapper, upperCase && styles.selected]}
                onTouchEnd={() => setUpperCase(!upperCase)}>
                <Text style={styles.inputHeading}>
                  Include upperCase {upperCase && <Text>(Selected)</Text>}
                </Text>
              </View>
              <View
                style={[styles.inputWrapper, numbers && styles.selected]}
                onTouchEnd={() => setNumbers(!numbers)}>
                <Text style={styles.inputHeading}>
                  Include numbers {numbers && <Text>(Selected)</Text>}
                </Text>
              </View>
              <View
                style={[styles.inputWrapper, symbols && styles.selected]}
                onTouchEnd={() => setSymbols(!symbols)}>
                <Text style={styles.inputHeading}>
                  Include symbols {symbols && <Text>(Selected)</Text>}
                </Text>
              </View>
              <View style={styles.formActions}>
                <TouchableOpacity
                  disabled={!isValid || isSubmitting}
                  style={styles.primaryButton}
                  onPress={handleGeneratePassword}>
                  <Text>Generate Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleReset();
                    resetPasswordState();
                  }}>
                  <Text>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#ACE1AF',
    color: '#254336',
  },
  formContainer: {},
  inputWrapper: {},
  inputHeading: {},
  formActions: {},
  selected: {},
});
