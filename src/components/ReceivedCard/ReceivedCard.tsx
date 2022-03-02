import React from 'react';
import { IRecievedRequest } from 'types/IProfileRequest';
import { Grid, Avatar, Button } from '@mui/material';
import avatar from 'assets/images/profile-avatar.jpg';
import RECEIVED_CARD_STATUS from 'constants/receivedCardStatus';
import styles from './ReceivedCard.module.scss';

interface ReceivedCardProps {
  receivedRequest: IRecievedRequest;
}

const ReceivedCard: React.FC<ReceivedCardProps> = ({ receivedRequest }) => {
  const {
    client, date, price, status,
  } = receivedRequest;
  const { firstName, lastName } = client;
  const showPrice = `$${price}`;
  const requestDate = new Date(date);
  const [month, day, year, hour, minutes] = [
    requestDate.getMonth(), requestDate.getDate(), requestDate.getFullYear(),
    requestDate.getHours(), requestDate.getMinutes()];
  const showDate = `${hour}:${minutes} ${day}/${month}/${year}`;
  const buttonContent = RECEIVED_CARD_STATUS.filter((item) => status === item.name);

  return (
    <div className={styles.card}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Avatar alt="avatar" src={avatar} />
        </Grid>
        <Grid item xs={5}>
          <div className={styles.name}>
            <span className={styles.firstName}>{firstName}</span>
            <span className={styles.lastName}>{lastName}</span>
          </div>
          <div className={styles.details}>
            <span className={styles.title}>Price</span>
            <span className={styles.info}>{showPrice}</span>
          </div>
          <div className={styles.details}>
            <span className={styles.title}>Request Time</span>
            <span className={styles.info}>{showDate}</span>
          </div>
          <div className={styles.details}>
            <span className={styles.title}>Status</span>
            <span className={styles.info}>
              <span className={styles.status}>{status}</span>
            </span>
          </div>
        </Grid>
        <Grid item xs={2}>
          {buttonContent.length > 0 && (
            <>
              <Button variant="contained" className={styles.acceptButton}>
                <p>{buttonContent[0].acceptButton}</p>
              </Button>
              <Button variant="contained" className={styles.rejectedButton}>
                <p>{buttonContent[0].rejectButton}</p>
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ReceivedCard;
