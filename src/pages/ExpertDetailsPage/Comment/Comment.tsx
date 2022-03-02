import React from 'react';
import ICommentInfo from 'types/ICommentInfo';
import userIconPlaceholder from 'assets/images/user-icon-placeholder.png';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './comment.module.scss';

interface CommentProps {
  comment: ICommentInfo,
}

const Comment = (props: CommentProps) => {
  const { comment } = props;
  return (
    <div className={styles.container}>
      <div className={styles.client}>
        <CardMedia
          component="img"
          className={styles.avatar}
          image={userIconPlaceholder}
          alt="user"
        />
        <Typography className={styles.name}>
          {comment.client.firstName}
          {' '}
          {comment.client.lastName}
        </Typography>
      </div>
      <Typography className={styles.comment}>
        {comment.comment}
      </Typography>
      <Typography className={styles.date}>
        {comment.date.toString().slice(0, 10)}
      </Typography>
    </div>
  );
};

export default Comment;
