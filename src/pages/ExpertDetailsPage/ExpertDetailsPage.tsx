import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from 'layouts/Header';
import Breadcrumbs from 'components/Breadcrumb';
import {
  fetchExpertById,
  selectCurrentExpertDetails,
  selectCurrentExpertDetailsStatus,
} from 'store/slices/expertsSlice';
import {
  fetchCommentsByExpertId,
  selectComments,
  selectCommentsStatus,
} from 'store/slices/commentsSlice';
import STATE_ASYNC_STATUS from 'types/stateAsyncStatus';
import Footer from 'layouts/Footer';
import ExpertInformation from './ExpertInformation';
import ExpertTab from './ExpertTab';
import ExpertComments from './ExpertComments';
import styles from './expertDetailsPage.module.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ExpertDetailsPage = () => {
  const expertId = useQuery().get('id') || '';

  const expert = useSelector(selectCurrentExpertDetails);
  const expertStatus = useSelector(selectCurrentExpertDetailsStatus);
  const comments = useSelector(selectComments);
  const commentsStatus = useSelector(selectCommentsStatus);

  const matchMobile = useMediaQuery('(min-width:900px)');

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (expertStatus === STATE_ASYNC_STATUS.idle) {
      dispatch(fetchExpertById(expertId));
    }
    if (expertStatus === STATE_ASYNC_STATUS.failed) {
      history.push('not-found');
    }
    if (commentsStatus === STATE_ASYNC_STATUS.idle) {
      dispatch(fetchCommentsByExpertId(expertId));
    }
  }, [expertStatus, commentsStatus, dispatch]);

  return (
    <>
      <Helmet>
        <title>
          {`${expert.firstName} ${expert.lastName} - ${expert.jobTitle}`}
          | Go Expert One-on-One Consultation
        </title>
      </Helmet>
      <Header />
      <Container className={styles.container} maxWidth="lg">
        {matchMobile
          ? <Breadcrumbs />
          : <h2 className={styles.title}>Expert Detail</h2> }
        <ExpertInformation expert={expert} />
        <ExpertTab title="Topic Detail" content={expert.topic} />
        <ExpertTab title="Expert Self-Introduction" content={expert.personalIntroduction} />
        <ExpertComments comments={comments} />
      </Container>
      <Footer />
    </>
  );
};

export default ExpertDetailsPage;
