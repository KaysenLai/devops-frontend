import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import logo from '../../../assets/images/logo.png';
import styles from './Logo.module.scss';

const Logo = () => {
  const history = useHistory();
  return (
    <Box onClick={() => history.push('/')}>
      <img className={styles.logo} alt="Go Expert" src={logo} />
    </Box>
  );
};

export default Logo;
