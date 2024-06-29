import * as Yup from 'yup';

export const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number('Should be a number')
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});
