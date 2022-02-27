/* eslint-disable no-console */
import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Box, TextField, Button, Alert, IconButton, InputAdornment,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { validatePassword } from 'utils/validator';
import { resetPassword } from '../../../services';
import styles from './ResetPasswordForm.module.scss';

interface FuncProps {
  setIsResetPasswordSuccess: Dispatch<SetStateAction<boolean>>;
}
/**
 * @description
 * This is the Reset Password Page, users enter this page via requested email
 * which contains url
 */
const ResetPasswordForm: React.FC<FuncProps> = ({ setIsResetPasswordSuccess }) => {
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [passwordVisiable, setPasswordVisiable] = useState(false);
  const [confirmedPasswordVisiable, setConfirmedPasswordVisiable] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  /** Function is triggered once users hits reset button
   *  Validation and Matching will be checked before requesting to backend
   */
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPasswordHelperText('');
    setErrMsg('');

    /** Check password's validation */
    if (!validatePassword(password)) {
      return setPasswordHelperText('Please enter a valid password');
    }

    /** Check if two passwords match */
    if (password !== confirmedPassword) {
      return setIsPasswordMatch(false);
    }

    /** Get one time token from url */
    const urlParams = new URLSearchParams(window.location.search);
    const oneTimeToken = urlParams.get('token');
    if (!oneTimeToken) {
      return setErrMsg('Invalid token, please try again later');
    }

    /** Send reset password request to backend, start with button loading animation */
    setIsLoading(true);

    /** Submit this reset password request to backend */
    const params = {
      password,
      confirmedPassword,
      token: oneTimeToken,
    };

    return resetPassword(params).then(() => {
      /** Reset password success, Jump to success page */
      setIsResetPasswordSuccess(true);
      setErrMsg('');
    }).catch(() => {
      setErrMsg('Password reset failed, please try again later');
      setIsLoading(false);
    });
  };

  return (
    <Box component="form" className={styles.wrapper} onSubmit={handleSubmit}>
      <Box
        className={styles.container}
      >
        <h2>Reset your password</h2>
        <TextField
          required
          fullWidth
          type={passwordVisiable ? 'text' : 'password'}
          id="password"
          name="password"
          label="Password"
          value={password}
          error={Boolean(passwordHelperText)}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          variant="standard"
          helperText={passwordHelperText || ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setPasswordVisiable(!passwordVisiable);
                  }}
                >
                  {passwordVisiable ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <p className={styles.list}>• Must be 8 characters at least</p>
        <p className={styles.list}>• Must include a number/special character</p>
        <TextField
          required
          fullWidth
          type={confirmedPasswordVisiable ? 'text' : 'password'}
          id="confirmedPassword"
          name="confirmedPassword"
          label="Confirm password"
          value={confirmedPassword}
          onChange={(event) => {
            setConfirmedPassword(event.target.value);
          }}
          variant="standard"
          error={!isPasswordMatch}
          helperText={isPasswordMatch ? '' : 'Reset password failed, please make sure your passwords match.'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setConfirmedPasswordVisiable(!confirmedPasswordVisiable);
                  }}
                >
                  {confirmedPasswordVisiable ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errMsg ? <Alert onClose={() => { setErrMsg(''); }} severity="error" variant="outlined">{errMsg}</Alert> : ''}
        {isLoading
          ? <LoadingButton loading variant="contained">Reset password</LoadingButton>
          : <Button variant="contained" sx={{ my: 4 }} type="submit">Reset password</Button>}
      </Box>
    </Box>
  );
};

export default ResetPasswordForm;
