import React, { useState } from 'react';
import { PROFILE_SETTINGS_MENU } from 'constants/profileMenus';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Divider } from '@mui/material';
import styles from './ProfileTabs.module.scss';
import MyRequestsPage from '../MyRequestsPage';
import ReceivedRequestPage from '../ReceivedRequestPage';
import AccountSettingsPage from '../AccountSettingsPage';

const ProfileTabs = () => {
  const [active, setActive] = useState(PROFILE_SETTINGS_MENU[0]);
  return (
    <>
      <div className={styles.desktopContainer}>
        <section className={styles.menu}>
          {PROFILE_SETTINGS_MENU.map((type) => (
            <button
              key={type}
              className={active === type ? styles.activetab : styles.tab}
              onClick={() => setActive(type)}
            >
              {type}
            </button>
          ))}
        </section>
        {active === PROFILE_SETTINGS_MENU[0] && <MyRequestsPage />}
        {active === PROFILE_SETTINGS_MENU[1] && <ReceivedRequestPage />}
        {active === PROFILE_SETTINGS_MENU[2] && <AccountSettingsPage />}
      </div>
      <>
        <div className={styles.mobileContainer}>
          {PROFILE_SETTINGS_MENU.map((item) => (
            <div key={item}>
              <button type="button" className={styles.sidemenuItem}>
                <span className={styles.text}>{item}</span>
                <ArrowRightIcon className={styles.arrow} />
              </button>
              <Divider className={styles.divider} />
            </div>
          ))}
        </div>
      </>
    </>
  );
};

export default ProfileTabs;
