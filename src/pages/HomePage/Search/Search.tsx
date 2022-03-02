import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import SearchBar from 'components/SearchBar';
import { debounce, isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSearchbarAutoCompleteOptions,
  getSearchbarAutoCompleteStatus,
  fetchSearchbarAutoComplete,
} from 'store/slices/searchbarAutoCompleteSlice';
import styles from './search.module.scss';

const Search = () => {
  const [InputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const trimed = searchQuery.trim();
  const history = useHistory();
  const dispatch = useDispatch();
  const results = useSelector(getSearchbarAutoCompleteOptions);
  const loading = useSelector(getSearchbarAutoCompleteStatus);

  const debouncedSave = useCallback(
    debounce((word) => setSearchQuery(word), 800),
    [],
  );

  useEffect(() => {
    if (!isEmpty(trimed)) {
      dispatch(fetchSearchbarAutoComplete(trimed));
    }
  }, [trimed]);

  const updateInputValue = (word: string) => {
    setInputValue(word);
    debouncedSave(word);
  };

  const onClick = (event: any) => {
    if (InputValue !== event.target.innerHTML) {
      updateInputValue(event.target.innerHTML);
    }
  };
  const handleChange = (event: any) => updateInputValue(event.target.value);
  const handleClick = () => history.push(`/expert?input=${InputValue}`);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Typography className={styles.searchTitle}>
          Find Your Optimal Adviser
        </Typography>
        <div className={styles.seachBarWrapper}>
          <SearchBar
            loading={loading}
            value={InputValue}
            handleChange={handleChange}
            handleClick={handleClick}
            options={results}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
