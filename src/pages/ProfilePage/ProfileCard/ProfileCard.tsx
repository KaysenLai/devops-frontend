import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import avatar from 'assets/images/profile-avatar.jpg';

import styles from './ProfileCard.module.scss';

interface IProfileCardProps {
  email: string;
  name: string;
}

const ProfileCard: React.FC<IProfileCardProps> = (props) => {
  const { email, name } = props;

  return (
    <Box className={styles.container}>
      <Card className={styles.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={avatar}
            alt="user profile"
            className={styles.avatar}
          />
          <CardContent>
            <Typography className={styles.name}>
              {name}
            </Typography>
            <Typography className={styles.email}>
              {email}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ProfileCard;
