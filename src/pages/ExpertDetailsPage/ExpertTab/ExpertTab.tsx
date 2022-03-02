import React, { useState, useEffect, useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';
import styles from './expertTab.module.scss';

interface ExpertTabParam {
  title: string
  content: string
}

const ExpertTab = (props: ExpertTabParam) => {
  const { title, content } = props;
  const [isViewMore, setIsViewMore] = useState(true);
  const [showViewMore, setShowViewMore] = useState(false);
  const MAX_HEIGHT = 200;

  const ref = useRef<HTMLElement>(null!);

  useEffect(() => {
    if (ref.current.clientHeight >= MAX_HEIGHT) {
      setShowViewMore(true);
    } else {
      setShowViewMore(false);
    }
  }, [content]);

  const handleViewMoreClick = () => {
    setIsViewMore(false);
    ref.current.style.maxHeight = 'none';
  };

  const handleShowLessClick = () => {
    setIsViewMore(true);
    ref.current.style.maxHeight = `${MAX_HEIGHT}px`;
  };

  return (
    <div
      className={styles.container}
    >
      <Typography className={styles.title}>{title}</Typography>
      <div className={styles.detail}>
        <Typography
          className={styles.content}
          ref={ref}
          style={{ maxHeight: MAX_HEIGHT }}
        >
          {content}
        </Typography>
        {showViewMore && (
          <div>
            {isViewMore ? (
              <Typography onClick={handleViewMoreClick} className={styles.viewMore}>
                <ExpandMoreIcon />
                <span>View More</span>
              </Typography>
            ) : (
              <Typography onClick={handleShowLessClick} className={styles.viewMore}>
                <ExpandLessIcon />
                <span>Show Less</span>
              </Typography>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertTab;
