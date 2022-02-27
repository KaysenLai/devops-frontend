import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Box from '@mui/material/Box';
import { validateEmail } from 'utils/validator';
import { forgetPassword } from '../../../services';
import PasswordSuccessReminder from '../common/PasswordSuccessReminder';
import styles from '../common/passwordPageLayout.module.scss';

const ForgotPasswordForm: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  /**
 * @description
 * used for button "Back to login" clicked.
 */
  const history = useHistory();
  const backwardsHandler = () => {
    history.push('/login');
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmailAddress(value);
  };

  /**
* @description
* used for validating email input
*/
  const validateInput = () => {
    if (!validateEmail(emailAddress)) {
      setErrorMessage('Please enter valid email address');
      setIsInputError(true);
      return false;
    }
    return true;
  };

  /**
* @description
* Get user information by use email, then send user an reset password email
*/
  const sendUserResetPasswordEmail = () => {
    const params = { email: emailAddress };

    forgetPassword(params)
      .then(() => {
        // If successful
        setIsEmailSent(true);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Email address is not in our system.');
        // reset input field
        setEmailAddress('');
      });
  };

  /**
  * @description
  * If user exists, send user an reset password email
  */
  const sendEmailHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (validateInput()) {
      sendUserResetPasswordEmail();
    }
  };

  return (
    <Box
      className={styles.wrapper}
    >
      {!isEmailSent && (
        <Box
          className={styles.container}
        >
          <h2>Forgot your password?</h2>
          <TextField sx={{ mb: 2 }} value={emailAddress} variant="standard" fullWidth required onChange={handleTextChange} placeholder="Registered Email Address" name="email" type="email" />
          {isInputError && (
            <Alert
              onClose={() => { setIsInputError(false); }}
              variant="outlined"
              severity="error"
              icon={<CancelRoundedIcon fontSize="inherit" />}
            >
              {errorMessage}
            </Alert>
          )}
          <Button sx={{ my: 2 }} color="primary" fullWidth variant="contained" onClick={sendEmailHandler}>
            Send
          </Button>
          <Button sx={{ border: 1 }} color="secondary" variant="contained" onClick={backwardsHandler}>
            Back to login
          </Button>
        </Box>
      )}

      {
        isEmailSent && (
          <PasswordSuccessReminder displayText="Please check your email" />
        )
      }
    </Box>
  );
};

export default ForgotPasswordForm;
