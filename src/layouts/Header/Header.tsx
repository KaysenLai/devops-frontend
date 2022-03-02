import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUserRole } from 'store/slices/authSlice';
import userIconPlaceholder from 'assets/images/user-icon-placeholder.png';
import AppBar from './AppBar';
import Authentication from './Authentication';
import Logo from './Logo';
import Navigation from './Navigation';
import styles from './Header.module.scss';
import UserIcon from './UserIcon';

const Header = () => {
  const isAuthenticated = useSelector(selectCurrentUserRole);

  return (
    <>
      <div className={styles.desktopContainer}>
        <Logo />
        <Navigation />
        {isAuthenticated ? <UserIcon userIcon={userIconPlaceholder} /> : <Authentication />}
      </div>
      <div className={styles.mobileContainer}>
        <AppBar />
      </div>
    </>
  );
};
export default Header;
