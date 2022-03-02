import React, { useState, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Button } from '@mui/material';
import { userSignup } from 'services';
import { TOKEN } from 'constants/localStorageKeys';
import { setCredentials } from 'store/slices/authSlice';
import { put as storagePut } from 'utils/localStorage';
import { validateEmail, validatePassword } from 'utils/validator';
import styles from './signupForm.module.scss';
import TermsAndConditionsDialog from './TermsAndConditionsDialog';

interface FuncProps {
  setEmailSucceedSendTo: Dispatch<SetStateAction<string>>;
}

const SignupForm: React.FC<FuncProps> = ({ setEmailSucceedSendTo }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [passwordVisiable, setPasswordVisiable] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setEmailHelperText('');
    setPasswordHelperText('');
    setErrMsg('');
    if (!validateEmail(email)) {
      return setEmailHelperText('Please enter a valid email');
    }
    if (!validatePassword(password)) {
      return setPasswordHelperText('Please enter a valid password');
    }
    if (!agreeTerms) {
      return setErrMsg('Please agree the terms and conditions.');
    }
    setIsLoading(true);
    const params = {
      firstName, lastName, email, password,
    };

    return userSignup(params).then((data) => {
      const { token } = data;
      if (!token) throw new Error();
      dispatch(setCredentials({ token }));
      storagePut(TOKEN, token);
      setEmailSucceedSendTo(email);
    }).catch((error) => {
      if (!error.response) {
        setErrMsg('Network error.');
      } else if (error.response.status === 400) {
        setErrMsg(error.response.data.error);
      } else {
        setErrMsg('Unknown error.');
      }
      setIsLoading(false);
    });
  };

  return (
    <Box
      component="form"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div className={styles.title}>
        <h2>SIGN UP</h2>
        <div className={styles.line} />
      </div>
      <h2 className={styles.decription}>Create Account</h2>

      <TextField
        required
        fullWidth
        className={styles.input}
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        variant="standard"
        autoFocus
      />

      <TextField
        required
        fullWidth
        className={styles.input}
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        variant="standard"
      />

      <TextField
        required
        fullWidth
        className={styles.input}
        label="Email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        variant="standard"
        error={Boolean(emailHelperText)}
        helperText={emailHelperText || ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="email">
                <EmailIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        required
        fullWidth
        className={styles.input}
        label="Password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type={passwordVisiable ? 'text' : 'password'}
        variant="standard"
        error={Boolean(passwordHelperText)}
        helperText={passwordHelperText || ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setPasswordVisiable((prev) => !prev)}
              >
                {passwordVisiable ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <p className={styles.list}>• Must be 8 characters at least</p>
      <p className={styles.list}>• Must include a number/special character</p>

      {errMsg ? <Alert severity="error">{errMsg}</Alert> : ''}

      <FormControlLabel
        className={styles.terms}
        control={(
          <Checkbox
            className={styles.check}
            checked={agreeTerms}
            onChange={(event) => setAgreeTerms(event.target.checked)}
          />
        )}
        label={(
          <span className={styles.terms}>
            I agree to the
            <TermsAndConditionsDialog text=" Terms and Conditions" />
          </span>
        )}
      />
      {isLoading
        ? <LoadingButton loading fullWidth className={styles.button} variant="contained">Sign up</LoadingButton>
        : <Button className={styles.button} type="submit" fullWidth variant="contained">Sign up</Button>}

      <Box className={styles.login}>
        Already had an account?
        <Link to="login" className={styles.link}> Log in </Link>
        here!
      </Box>
    </Box>
  );
};

export default SignupForm;
