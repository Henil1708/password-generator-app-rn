export const generatePasswordString = (passwordLength, preference) => {
  const {upperCase, lowerCase, numbers, symbols} = preference;

  let characterList = '';

  const lowerCaseChras = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digitChars = '0123456789';
  const specialChars = '!@#$%^&*()_+';

  if (upperCase) {
    characterList += upperCaseChars;
  }
  if (lowerCase) {
    characterList += lowerCaseChras;
  }
  if (numbers) {
    characterList += digitChars;
  }
  if (symbols) {
    characterList += specialChars;
  }

  if (!upperCase && !lowerCase && !numbers && !symbols) {
    characterList += lowerCaseChras;
  }

  const passwordResult = createPassword(characterList, passwordLength);

  return passwordResult;
};

export const createPassword = (characters, passwordLength) => {
  let result = '';

  for (let index = 0; index < passwordLength; index++) {
    const characterIndex = Math.round(Math.random() * characters.length);

    result += characters.charAt(characterIndex);
  }

  return result;
};
