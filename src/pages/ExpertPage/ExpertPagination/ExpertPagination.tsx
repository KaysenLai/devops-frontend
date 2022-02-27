import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'hooks';
import React from 'react';
import { fetchExperts, selectTotalPage } from 'store/slices/expertsSlice';
import { selectQueryState, setPage } from 'store/slices/querySlice';
import styles from './ExpertPagination.module.scss';

const ExpertPagination: React.FC = () => {
  const totalPage = useAppSelector(selectTotalPage);
  const queries = useAppSelector(selectQueryState);
  const { page } = queries;
  const dispatch = useAppDispatch();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    dispatch(setPage({ page: value }));
    dispatch(fetchExperts(queries));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const goTo = data.get('goTo') as string;
    const pageNum = parseInt(goTo, 10);
    if (pageNum > 0 && pageNum <= totalPage) {
      dispatch(setPage({ page: pageNum }));
      dispatch(fetchExperts(queries));
    }
  };

  return (
    <Box className={styles.PaginationContainer}>
      <Pagination
        count={totalPage}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
        page={page}
      />
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          id="goTo"
          name="goTo"
          variant="outlined"
          InputProps={{ style: { height: 32, width: 64 } }}
        />
        <Button type="submit" className={styles.button}>
          Go
        </Button>
      </Box>
    </Box>
  );
};

export default ExpertPagination;
