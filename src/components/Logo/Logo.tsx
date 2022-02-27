import React from 'react';
import styles from './logo.module.scss';

interface LogoProps {
  imgUrl: string;
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ imgUrl, alt }) => (
  <img className={styles.logo} src={imgUrl} alt={alt} />
);

export default Logo;
