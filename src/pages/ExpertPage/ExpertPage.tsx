import { Container, useMediaQuery } from '@mui/material';
import { Breadcrumb } from 'components';
import CategoryMenu from 'components/CategoryMenu';
import Helmet from 'react-helmet';
import { useAppDispatch, useAppSelector } from 'hooks';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { fetchExperts, selectExports } from 'store/slices/expertsSlice';
import { selectQueryState, setKeyword } from 'store/slices/querySlice';
import ExpertDisplay from './ExpertDisplay';
import ExpertFilter from './ExpertFilter';
import ExpertHeaderMenu from './ExpertHeaderMenu';
import ExpertPagination from './ExpertPagination';
import styles from './expertPage.module.scss';

const ExpertPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const experts = useAppSelector(selectExports);
  const dispatch = useAppDispatch();
  const urlQuery = new URLSearchParams(useLocation().search);
  const input = urlQuery.get('input') || '';
  const queries = useAppSelector(selectQueryState);

  const matcheLaptop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    dispatch(setKeyword({ keyword: input }));
  }, [dispatch, input]);

  useEffect(() => {
    dispatch(fetchExperts({ ...queries, keyword: input }));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Experts | Go Expert One-on-One Consultation</title>
      </Helmet>
      {/* Mobile or Tablet View - Filter Open */}
      {!matcheLaptop && filterOpen && (
        <ExpertFilter setFilterOpen={setFilterOpen} />
      )}

      {/* Mobile or Tablet View - Filter Close */}
      {!matcheLaptop && !filterOpen && (
        <>
          <Header />
          <ExpertHeaderMenu setFilterOpen={setFilterOpen} />
          <ExpertDisplay experts={experts} />
          <ExpertPagination />
          <Footer />
        </>
      )}

      {/* Laptop or Desktop View */}
      {matcheLaptop && (
        <>
          <Header />
          <div className={styles.main}>
            <Breadcrumb />
            <CategoryMenu />
            <Container
              className={styles.container}
              maxWidth="xl"
            >
              <ExpertFilter setFilterOpen={setFilterOpen} />
              <Container>
                <ExpertDisplay experts={experts} />
                <ExpertPagination />
              </Container>
            </Container>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ExpertPage;
