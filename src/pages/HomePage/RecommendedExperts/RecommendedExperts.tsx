import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import ExpertCard from 'components/ExpertCard';
import {
  fetchRecommendedExperts,
  selectExpertsStatus,
  selectRecommendedExports,
} from 'store/slices/expertsSlice';
import stateAsyncStatus from 'types/stateAsyncStatus';
import styles from './RecommendedExperts.module.scss';

const RecommendedExperts = () => {
  const [expersPageNum, setExpersPageNum] = useState(0);

  const experts = useSelector(selectRecommendedExports);
  const status = useSelector(selectExpertsStatus);

  const matcheLaptop = useMediaQuery('(min-width:1024px)');

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === stateAsyncStatus.idle) {
      dispatch(fetchRecommendedExperts());
    }
  }, [status, dispatch]);

  const displayedExpertsPages = Math.ceil(experts.length / 3);
  const selectedExperts = experts.slice(
    expersPageNum * 3,
    expersPageNum * 3 + 3,
  );

  return (
    <Container maxWidth="lg" className={styles.container}>
      <h2>Recommended Experts</h2>
      {/* No Expert Case */}
      {!selectedExperts[0] && <CircularProgress />}

      {/* Mobile or Tablet View */}
      {experts && !matcheLaptop && (
        <Box className={styles.expertsContainer}>
          {experts.map((expert) => (
            <Box key={expert.expertID} className={styles.expertBox}>
              <ExpertCard expertInfo={expert} />
            </Box>
          ))}
        </Box>
      )}

      {/* Laptop or Desktop View */}
      {selectedExperts[0] && matcheLaptop && (
        <Box className={styles.expertsContainerLaptop}>
          <Box className={styles.arrowContainer}>
            <IconButton
              disabled={expersPageNum === 0}
              onClick={() => setExpersPageNum(expersPageNum - 1)}
            >
              <ArrowBackIosIcon className={styles.arrow} />
            </IconButton>
          </Box>
          {selectedExperts.map((expert) => (
            <Box key={expert.expertID}>
              <ExpertCard expertInfo={expert} />
            </Box>
          ))}
          <Box className={styles.arrowContainer}>
            <IconButton
              disabled={expersPageNum + 1 === displayedExpertsPages}
              onClick={() => setExpersPageNum(expersPageNum + 1)}
            >
              <ArrowForwardIosIcon className={styles.arrow} />
            </IconButton>
          </Box>
        </Box>
      )}

      <Box className={styles.buttonContainer}>
        <Button
          component={Link}
          to="/expert"
          variant="contained"
          className={styles.button}
        >
          More Experts
        </Button>
      </Box>
    </Container>
  );
};
export default RecommendedExperts;
