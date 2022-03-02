import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './Authentication.module.scss';

const Authentication = () => {
  const history = useHistory();

  return (
    <div className={styles.authentication}>
      <Button className={styles.button} variant="outlined" onClick={() => history.push('/signup')} sx={{ mx: 3 }}>Sign up</Button>
      <Button className={styles.button} variant="contained" onClick={() => history.push('/login')}>Log in</Button>
    </div>
  );
};

export default Authentication;
