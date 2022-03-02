import React from 'react';
import { IMyRequest } from 'types/IProfileRequest';
import { Grid, Avatar, Button } from '@mui/material';
import avatar from 'assets/images/profile-avatar.jpg';
import REQUEST_CARD_STATUS from 'constants/requestCardStatus';
import styles from './requestCard.module.scss';

interface RequestCardProps {
    myRequest: IMyRequest;
}

const RequestCard: React.FC<RequestCardProps> = ({ myRequest }) => {
  const {
    expert, date, price, status,
  } = myRequest;
  const { firstName, lastName, jobTitle } = expert;
  const showPrice = `$${price}`;
  const requestDate = new Date(date);
  const [month, day, year, hour, minutes] = [
    requestDate.getMonth(), requestDate.getDate(), requestDate.getFullYear(),
    requestDate.getHours(), requestDate.getMinutes()];
  const showDate = `${hour}:${minutes} ${day}/${month}/${year}`;
  const buttonContent = REQUEST_CARD_STATUS.filter((item) => status === item.name);

  return (
    <div className={styles.card}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Avatar alt="avatar" src={avatar} />
        </Grid>
        <Grid item xs={6}>
          <div className={styles.name}>
            <p className={styles.firstName}>{firstName}</p>
            <p className={styles.lastName}>{lastName}</p>
          </div>
          <p className={styles.jobTitle}>{jobTitle}</p>

          <div className={styles.details}>
            <p className={styles.title}>Price</p>
            <p className={styles.info}>{showPrice}</p>
          </div>
          <div className={styles.details}>
            <p className={styles.title}>Request Time</p>
            <p className={styles.info}>{showDate}</p>
          </div>
          <div className={styles.details}>
            <p className={styles.title}>Status</p>
            <p className={styles.info}>
              <p className={styles.status}>{status}</p>
            </p>
          </div>
        </Grid>
        <Grid item xs>
          {buttonContent.length > 0 && (
            <Button variant="contained" className={styles.button}>
              <p>{buttonContent[0].button}</p>
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default RequestCard;
