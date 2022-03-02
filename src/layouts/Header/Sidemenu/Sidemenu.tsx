import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUserRole } from 'store/slices/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton } from '@mui/material';
import styles from './sidemenu.module.scss';

interface SideMenuProps {
  handleClick: MouseEventHandler;
}

const Sidemenu: React.FC<SideMenuProps> = ({ handleClick }) => {
  const isAuthenticated = useSelector(selectCurrentUserRole);

  return (
    <>
      <div className={styles.topWrapper}>
        <h2 className={styles.title}>
          <MenuIcon className={styles.menuIcon} />
          Menu
        </h2>
        <IconButton className={styles.iconButton} onClick={handleClick}>
          <CloseIcon className={styles.closeIcon} />
        </IconButton>
      </div>
      <Link className={styles.sidemenuItem} to="/">Home</Link>
      <Divider className={styles.divider} />
      <Link className={styles.sidemenuItem} to="/expert">Expert</Link>
      <Divider className={styles.divider} />
      <Link className={styles.sidemenuItem} to="/about">About</Link>
      <Divider className={styles.divider} />
      {isAuthenticated
        ? (
          <>
            <Link className={styles.sidemenuItem} to="/profile">Profile</Link>
            <Divider className={styles.divider} />
          </>
        )
        : (
          <>
            <Link className={styles.sidemenuItem} to="/login">Login</Link>
            <Divider className={styles.divider} />
            <Link className={styles.sidemenuItem} to="/signup">Sign Up</Link>
            <Divider className={styles.divider} />
          </>
        )}
    </>
  );
};

export default Sidemenu;
