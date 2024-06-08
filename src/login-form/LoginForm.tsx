import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './LoginForm.css';
import { useCallback, useMemo, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

type LoginFormProps = {
  onLogin: () => void;
};

function LoginForm({ onLogin }: LoginFormProps) {
  const navigate = useNavigate();
  const apiClient = useApi();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onSubmit = useCallback(
    async (values: { username: string; password: string }, formik: any) => {
      setIsLoggingIn(true);
      try {
        const response = await apiClient.login(values);
        if (response.success) {
          onLogin(); // Call the onLogin callback when login is successful
          navigate('/home');
        } else {
          // If the login was not successful, show an error message
          formik.setFieldError('username', 'Invalid username or password');
        }
      } catch (error) {
        // If there was an error making the request, show an error message
        formik.setFieldError(
          'username',
          'An error occurred. Please try again.',
        );
      } finally {
        setIsLoggingIn(false);
      }
    },
    [navigate, apiClient, onLogin],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(5, 'Password too short'),
      }),
    [],
  );
  if (isLoggingIn) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
    >
      {(formik) => (
        <form
          className="Login-form"
          id="signInForm"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <TextField
            id="username"
            label="Username"
            variant="standard"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            variant="contained"
            startIcon={<LoginIcon />}
            type="submit"
            form="signInForm"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Sign in
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
