import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './clientAuthLayout.module.scss';

interface ClientAuthLayoutProps {
  text: string
  children: React.ReactChild
}

const ClientAuthLayout: React.FC<ClientAuthLayoutProps> = (props) => {
  const { text, children } = props;
  return (
    <Grid container className={styles.wrapper}>
      <Grid item md={4} className={styles.information}>
        <div className={styles.title}>
          <h2>{text.toUpperCase()}</h2>
          <div className={styles.line} />
        </div>
      </Grid>
      <Grid item xs={12} md={8} className={styles.children}>
        <div className={styles.content}>
          {children}
        </div>
      </Grid>
    </Grid>
  );
};

export default ClientAuthLayout;
