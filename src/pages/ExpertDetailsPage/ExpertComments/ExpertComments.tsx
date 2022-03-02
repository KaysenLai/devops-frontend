import React from 'react';
import Typography from '@mui/material/Typography';
import ICommentInfo from 'types/ICommentInfo';
import Comment from '../Comment';
import styles from './expertComments.module.scss';

interface ExpertCommentsProps {
  comments: ICommentInfo[],
}

const ExpertComments = (props: ExpertCommentsProps) => {
  const { comments } = props;

  return (
    <div
      className={styles.accordion}
    >
      <Typography className={styles.title}>Review Comments</Typography>
      <div className={styles.detail}>
        {comments.map((comment) => (<Comment key={comment.meetingID} comment={comment} />))}
      </div>
    </div>
  );
};

export default ExpertComments;
