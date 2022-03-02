import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styles from './signupSuccess.module.scss';

type Props = {
  email: string;
};

const SignupSuccess: React.FC<Props> = ({ email }: Props) => (
  <Box className={styles.information}>
    <Typography className={styles.title} align="left" variant="h2">
      Activate your email
    </Typography>
    <Typography className={styles.sent} align="left">
      A confirmation email has been sent to
    </Typography>
    <Typography className={styles.sent} align="left" color="blue">
      {email}
    </Typography>
    <Typography className={styles.sent} align="left">
      Please check the email to activate your account.
    </Typography>

    <Button
      href="/signup"
      fullWidth
      variant="outlined"
      sx={{ mt: 10 }}
    >
      Previous
    </Button>
  </Box>
);

export default SignupSuccess;
