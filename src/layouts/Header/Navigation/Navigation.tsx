import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

const Navigation = () => (
  <div>
    <Link className={styles.link} to="/">
      Home
    </Link>
    <Link className={styles.link} to="/expert">
      Expert
    </Link>
    <Link className={styles.link} to="/about">
      About
    </Link>
  </div>
);

export default Navigation;
