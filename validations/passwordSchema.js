import * as Yup from 'yup';

export const PasswordSchema = Yup.object().shape({
  passwordLength:
    Yup.number('Should be a number').required('Length is required'),
});
