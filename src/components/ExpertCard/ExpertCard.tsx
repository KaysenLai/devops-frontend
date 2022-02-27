import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Divider,
  CardActionArea,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ExpertCard.module.scss';
import IExpertInfo from '../../types/IExpertInfo';

interface IExpertCardProps {
  expertInfo: IExpertInfo;
}

const ExpertCard: React.FC<IExpertCardProps> = ({
  expertInfo,
}: IExpertCardProps) => {
  const [hovered, setHovered] = useState(false);
  const {
    photo, firstName, lastName, jobTitle, location, price, averageRating, bookedAmount, expertID,
  } = expertInfo;
  const expertDetailLink = `/expert/expert-detail?id=${expertID}`;

  return (
    <Card
      className={styles.card}
      raised={hovered}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <CardActionArea component={Link} to={expertDetailLink}>
        <CardMedia
          component="img"
          height="210px"
          image={photo}
          alt="expert image"
        />
      </CardActionArea>
      <CardContent className={styles.cardContentContainer}>
        <div className={styles.userInfoContainer}>
          <div>
            <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
            <p className={styles.userJobTitle}>{jobTitle}</p>
            <p className={styles.userLocation}>
              <LocationOnIcon className={styles.locationOnIcon} />
              {location}
            </p>
          </div>
          <div className={styles.userPrice}>
            <p>
              $
              {price}
            </p>
          </div>
        </div>
        <Divider variant="middle" className={styles.divider} />
        <div className={styles.userMarkerplaceContainer}>
          <p>
            <span>Review</span>
            <span className={styles.userMarketplaceValue}>
              {averageRating}
              /10
            </span>
          </p>
          <p>
            <span>Booking amount</span>
            <span className={styles.userMarketplaceValue}>{bookedAmount}</span>
          </p>
        </div>
      </CardContent>
      <CardActions className={styles.cardActionContainer}>
        <Button component={Link} to={expertDetailLink} variant="contained" className={styles.button}>
          <p>More Detail</p>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExpertCard;
