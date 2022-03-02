import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import logo from 'assets/images/logo2.png';
import { Link } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <Grid container className={styles.container}>
      <Grid item xs={12} md={6} className={styles.linksWrap}>
        <div className={styles.links}>
          <img className={styles.logo} alt="Go Expert" src={logo} />
          <div className={styles.publics}>
            <YouTubeIcon className={styles.icon} fontSize="large" sx={{ color: '#6368AB' }} />
            <TwitterIcon className={styles.icon} fontSize="large" sx={{ color: '#657CAF' }} />
            <FacebookIcon className={styles.icon} fontSize="large" sx={{ color: '#668EB3' }} />
            <LinkedInIcon className={styles.icon} fontSize="large" sx={{ color: '#689FB7' }} />
            <InstagramIcon className={styles.icon} fontSize="large" sx={{ color: '#69AEBB' }} />
          </div>
          <div className={styles.copyRight}>
            Copyright © 2021 GoExpert
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={2} className={styles.menu}>
        <Link to="/" className={styles.menuItem}>
          Home
        </Link>
        <Link to="/expert" className={styles.menuItem}>
          Expert
        </Link>
        <Link to="/become-expert" className={styles.menuItem}>
          Become Expert
        </Link>
      </Grid>
      <Grid item xs={12} md={4} className={styles.informationWrap}>
        <div className={styles.information}>
          <div className={styles.item}>
            Subscribe & Receive exclusive information
          </div>
          <div className={styles.subscribe}>
            <InputBase
              className={styles.input}
              placeholder="Email Address"
            />
            <Button
              className={styles.button}
            >
              Subscribe
            </Button>
          </div>
          <div className={styles.item}>
            Phone Number:
            <span className={styles.value}> 0412 345 678</span>
          </div>
          <div className={styles.item}>
            Email Address:
            <span className={styles.value}> GOEXPERT69@gmail.com</span>
          </div>
          <div className={styles.item}>
            Address:
            <span className={styles.value}> 6 Elizabeth, Brisbane, Australia</span>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
export default Footer;
