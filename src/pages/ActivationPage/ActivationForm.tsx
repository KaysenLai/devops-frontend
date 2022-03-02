import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './ActivationForm.module.scss';

type Props = {
  email: string;
};

const ActivationForm: React.FC<Props> = ({ email }: Props) => {
  /**
 * @description
 * used for button "Next" clicked.
 */
  const history = useHistory();
  const forwardHandler = () => {
    history.push('/topics');
  };

  return (
    <Box
      className={styles.form}
    >
      <Box display="flex" flexDirection="row">
        <CheckCircleIcon className={styles.successIcon} />
        <Typography className={styles.title}>
          Congratulations!
        </Typography>
      </Box>
      <Typography className={styles.description} align="left">
        Your account
        <Typography className={styles.email} color="blue">
          {email}
        </Typography>
      </Typography>
      <Typography className={styles.description} align="left">
        on GoExpert has been set up.
      </Typography>
      <Button sx={{ my: 2 }} color="primary" fullWidth variant="contained" onClick={forwardHandler}>
        Next
      </Button>
    </Box>
  );
};

export default ActivationForm;
