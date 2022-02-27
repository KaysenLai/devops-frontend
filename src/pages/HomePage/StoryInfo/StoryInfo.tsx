import React from 'react';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import expertImage from 'assets/images/expert-story.png';
import styles from './storyInfo.module.scss';

const StoryInfo = () => (
  <Container maxWidth="lg" className={styles.container}>
    <h2>GoExpert Story</h2>
    <div className={styles.card}>
      <img src={expertImage} alt="expert avatar" />
      <div className={styles.content}>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ha
          s been the industry&apos;s standard dummy text ever since the 1500s. When an unknown pri
          nter took a galley of type and scrambled it to make a tpe specimen book. It has survived
          not only five centuries, but also the leap into electronic typesetting, remaining essenti
          ally unchanged.
        </p>
        <Button variant="contained" onClick={() => { window.location.href = '#'; }}>
          Learn More
        </Button>
      </div>
    </div>
  </Container>
);

export default StoryInfo;
