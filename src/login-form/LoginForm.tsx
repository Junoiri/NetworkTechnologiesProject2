import { Button, Grid, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './LoginForm.css';
import { useCallback, useMemo, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import bgImage from '../assets/bg_lf.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import { LinearProgress } from '@mui/material';

type LoginFormProps = {
  onLogin: () => void;
};

function LoginForm({ onLogin }: LoginFormProps) {
  const navigate = useNavigate();
  const apiClient = useApi();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { t } = useTranslation();

  const onSubmit = useCallback(
    async (values: { username: string; password: string }, formik: any) => {
      setIsLoggingIn(true);
      try {
        const response = await apiClient.login(values);
        if (response.success) {
          if (response.data) {
            localStorage.setItem('token', response.data);
            console.log(response.data);
          }
          onLogin();
          navigate('/home');
        } else {
          formik.setFieldError('username', t('Invalid username or password'));
          toast.error(t('Invalid username or password'));
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 400:
              toast.error(t('Bad request.'));
              break;
            case 401:
              toast.error(t('Unauthorized. Please check your credentials.'));
              break;
            case 404:
              toast.error(t('Resource not found.'));
              break;
            case 500:
              toast.error(t('Internal server error.'));
              break;
            default:
              toast.error(t('An error occurred. Please try again.'));
          }
        } else {
          formik.setFieldError(
            'username',
            t('An error occurred. Please try again.'),
          );
          if (axiosError instanceof Error) {
            toast.error(
              axiosError.message || t('An error occurred. Please try again.'),
            );
          } else {
            toast.error(t('An error occurred. Please try again.'));
          }
        }
      } finally {
        setIsLoggingIn(false);
      }
    },
    [navigate, apiClient, onLogin, t],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required(t('Required')),
        password: yup
          .string()
          .required(t('Required'))
          .min(5, t('Password too short')),
      }),
    [t],
  );
  if (isLoggingIn) {
    return (
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow={75}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: '75%' }}
        ></div>
      </div>
    );
  }
  return (
    <Grid container className="login-form-container">
      <ToastContainer />
      <Grid item xs={4}>
        <img src={bgImage} alt="Background" className="background-image" />
      </Grid>
      <Grid
        item
        xs={8}
        className="login-form"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoggingIn ? (
          <div>{t('Loading...')}</div>
        ) : (
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
                  label={t('Username')}
                  variant="standard"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && !!formik.errors.username}
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  id="password"
                  label={t('Password')}
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
                  {t('Sign in')}
                </Button>
              </form>
            )}
          </Formik>
        )}
      </Grid>
    </Grid>
  );
}

export default LoginForm;
