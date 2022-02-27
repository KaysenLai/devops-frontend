import React from 'react';
import IExpertInfo from 'types/IExpertInfo';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from './expertInformation.module.scss';

interface ExpertInformationParam {
  expert: IExpertInfo;
}

const ExpertInformation = (props: ExpertInformationParam) => {
  const { expert } = props;
  const {
    firstName,
    lastName,
    jobTitle,
    photo,
    location,
    price,
    averageRating,
    bookedAmount,
  } = expert;

  return (
    <Box className={styles.container}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={7} className={styles.imageContainer}>
          <img className={styles.image} src={photo} alt="expert" />
        </Grid>
        <Grid item xs={12} md={5} className={styles.informationContainer}>
          <div className={styles.information}>
            <h2 className={styles.name}>
              {firstName}
              &nbsp;
              {lastName}
            </h2>
            <h3 className={styles.jobTitle}>
              {jobTitle}
            </h3>
            <p className={styles.location}>
              <LocationOnIcon className={styles.locationOnIcon} />
              &nbsp;
              {location}
            </p>
            <p className={styles.price}>
              $
              {price}
            </p>
            <p className={styles.booking}>
              <span>Booking amount </span>
              <span className={styles.bookingValue}>{bookedAmount}</span>
            </p>
            <p className={styles.review}>
              <span>Review </span>
              <span className={styles.reviewValue}>
                {averageRating}
                &nbsp;
                / 10
              </span>
            </p>
            <Button className={styles.button} variant="contained">Booking Now</Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpertInformation;
