import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import successIcon from '../../../assets/icons/success-icon.svg';

interface PassWordReminderProps {
  displayText: string
}
/**
 * @returns common user reset passwords successful UI
 */
const PasswordSuccessReminder: React.FC<PassWordReminderProps> = (props) => {
  const { displayText } = props;
  /**
 * @description
 * used for button "Back to login" clicked.
  */
  const history = useHistory();
  const backwardsHandler = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    history.push('/login');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        height: '100%',
        width: '70%',
        paddingLeft: '10%',
        paddingRight: '10%',
      }}
    >
      <img src={successIcon} alt="successful" />
      <p>{displayText}</p>
      <Button sx={{ my: 2 }} color="primary" fullWidth variant="contained" onClick={backwardsHandler}>
        Back to login
      </Button>
    </Box>
  );
};

export default PasswordSuccessReminder;
