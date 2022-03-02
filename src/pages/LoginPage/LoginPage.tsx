import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ClientAuthLayout from 'layouts/ClientAuthLayout';
import { TOKEN } from 'constants/localStorageKeys';
import { setCredentials } from 'store/slices/authSlice';
import { addUserToLocalStorage } from 'store/slices/userSlice';
import styles from './loginPage.module.scss';
import { validateEmail, validatePassword } from '../../utils/validator';
import { put as storagePut } from '../../utils/localStorage';
import { userLogin } from '../../services';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const dispatch = useDispatch();

  const text = 'log in';
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setAuthMessage('');

    if (!validateEmail(email) || !validatePassword(password)) {
      setIsEmailValid(validateEmail(email));
      setIsPasswordValid(validatePassword(password));
      return;
    }
    setIsLoading(true);
    const params = { email: e.target.email.value, password: e.target.password.value };
    userLogin(params)
      .then((data) => {
        const { token, user } = data;
        if (!token) throw new Error();
        dispatch(setCredentials({ token }));
        storagePut(TOKEN, token);
        dispatch(addUserToLocalStorage(user));
        history.push('/');
      })
      .catch((error) => {
        if (!error.response) {
          setAuthMessage('Network error.');
        } else if (error.response.status === 401) {
          setAuthMessage('The email or password is incorrect.');
        } else {
          setAuthMessage('Unknown error.');
        }
        setIsLoading(false);
      });
  };

  const handleEmailOnChange = () => setIsEmailValid(true);
  const handlePasswordOnChange = () => setIsPasswordValid(true);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <ClientAuthLayout text={text}>
      <Box component="form" className={styles.form} onSubmit={handleSubmit}>
        <Helmet>
          <title> Login | Go Expert One-on-One Consultation</title>
        </Helmet>
        <div className={styles.title}>
          <h2>{text.toUpperCase()}</h2>
          <div className={styles.line} />
        </div>
        <h2 className={styles.decription}>Log into your account</h2>
        <TextField
          required
          type="text"
          id="email"
          name="email"
          label="Email Address"
          variant="standard"
          onChange={handleEmailOnChange}
          className={styles.input}
          error={!isEmailValid}
          helperText={isEmailValid ? '' : 'Please enter a valid email'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          label="Password"
          variant="standard"
          onChange={handlePasswordOnChange}
          className={styles.input}
          error={!isPasswordValid}
          helperText={isPasswordValid ? '' : 'Please enter a valid password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={styles.remember}>
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Link className={styles.forget} to="forget-password">Forget Password?</Link>
        </div>
        {authMessage && <Alert severity="error">{authMessage}</Alert>}

        {isLoading
          ? <LoadingButton loading className={styles.button} variant="contained">Log in</LoadingButton>
          : <Button className={styles.button} variant="contained" type="submit">Log in</Button>}

        <div className={styles.signup}>
          No account?
          <Link to="signup" className={styles.link}> Sign up </Link>
          for free today!
        </div>
      </Box>
    </ClientAuthLayout>
  );
};

export default LoginPage;
