import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidemenu from '../Sidemenu';
import styles from './AppBar.module.scss';

export default function DenseAppBar() {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={styles.appBar} position="static">
        <Toolbar className={styles.toolBar} variant="dense">
          <IconButton
            color="primary"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        {show && (<div className={styles.sidemenu}><Sidemenu handleClick={handleClick} /></div>)}
      </AppBar>
    </Box>
  );
}
