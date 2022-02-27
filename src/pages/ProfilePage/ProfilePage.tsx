import React from 'react';
import Header from 'layouts/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breadcrumb } from 'components';
import { useSelector } from 'react-redux';
import { selectCurrentUserRole } from 'store/slices/authSlice';
import { selectCurrentUserEmail, selectCurrentUserFirstName } from 'store/slices/userSlice';
import { useHistory } from 'react-router-dom';
import ProfileTabs from './ProfileTabs';
import ProfileCard from './ProfileCard';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const history = useHistory();
  // get login user basic information: role, email and firstname
  const isAuthenticated = useSelector(selectCurrentUserRole);
  const email = useSelector(selectCurrentUserEmail) as string;
  const firstName = useSelector(selectCurrentUserFirstName) as string;
  // redirect to home page if cannot read token
  if (!isAuthenticated || email == null || firstName == null) {
    history.push('/');
  }

  const matchMobile = useMediaQuery('(min-width:900px)');

  return (
    <>
      <Header />
      {matchMobile
        ? <Breadcrumb />
        : <h2 className={styles.title}>My Profile</h2>}
      <ProfileCard email={email} name={firstName} />
      <ProfileTabs />
    </>
  );
};

export default ProfilePage;
