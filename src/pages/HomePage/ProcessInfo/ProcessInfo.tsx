import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PageviewIcon from '@mui/icons-material/Pageview';
import ForumIcon from '@mui/icons-material/Forum';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Container, List, ListItem } from '@mui/material';
import styles from './processInfo.module.scss';

const ProcessInfo = () => (
  <Container maxWidth="lg" className={styles.container}>
    <h2>Easy Appointment</h2>
    <List className={styles.list}>
      <ListItem className={styles.item}>
        <div className={styles.circle}>
          <AccountCircleIcon className={styles.icon} />
        </div>
        <span className={styles.span}>Register Account</span>
      </ListItem>
      <ArrowRightIcon className={styles.arrow} />
      <ListItem className={styles.item}>
        <div className={styles.circle}>
          <PageviewIcon className={styles.icon} />
        </div>
        <span className={styles.span}>Find Expert</span>
      </ListItem>
      <ArrowRightIcon className={styles.arrow} />
      <ListItem className={styles.item}>
        <div className={styles.circle}>
          <ForumIcon className={styles.icon} />
        </div>
        <span className={styles.span}>Communicate</span>
      </ListItem>
    </List>
  </Container>
);

export default ProcessInfo;
