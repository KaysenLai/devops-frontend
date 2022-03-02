import {
  Checkbox,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Slider,
  Button,
  TextField,
  Select,
  SelectChangeEvent,
  InputLabel,
  MenuItem,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import australiaCities from 'constants/australiaCities';
import sortingMehods from 'constants/sortingMehods';
import React, { Dispatch, SetStateAction } from 'react';
import { fetchExperts } from 'store/slices/expertsSlice';
import {
  resetQuery,
  selectQueryState,
  setChattingOffline,
  setChattingOnline,
  setKeyword,
  setLocation,
  setPriceRange,
  setSortingMethod,
} from 'store/slices/querySlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import styles from './ExpertFilter.module.scss';

interface FuncProps {
  setFilterOpen: Dispatch<SetStateAction<boolean>>;
}

const ExpertFilter: React.FC<FuncProps> = ({ setFilterOpen }) => {
  const dispatch = useAppDispatch();
  const queries = useAppSelector(selectQueryState);
  const matcheLaptop = useMediaQuery('(min-width: 1024px)');

  const {
    online,
    offline,
    sort,
    priceFrom,
    priceTo,
    location,
    keyword,
  } = queries;

  const sliderMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '$100',
    },
    {
      value: 200,
      label: '$200',
    },
    {
      value: 300,
      label: '$300',
    },
    {
      value: 400,
      label: '$400',
    },
    {
      value: 500,
      label: '$500',
    },
  ];
  const getSliderText = (value: number) => `Expert service charge ${value}`;

  const handleChattingOnlineChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setChattingOnline({ checked: event.target.checked }));
  };

  const handleChattingOfflineChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setChattingOffline({ checked: event.target.checked }));
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = event.target.value;
    dispatch(setSortingMethod({ method }));
  };

  const handlePriceChange = (event: Event, value: number | number[]) => {
    const from = value[0];
    const to = value[1];
    dispatch(setPriceRange({ from, to }));
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    const newLocation = event.target.value;
    dispatch(setLocation({ newLocation }));
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changedKeyword = event.target.value;
    dispatch(setKeyword({ keyword: changedKeyword }));
  };

  const handleReset = () => {
    dispatch(resetQuery());
  };

  const handleSearch = () => {
    dispatch(fetchExperts(queries));
    setFilterOpen(false);
  };

  const handleCloseButtonClick = () => {
    setFilterOpen(false);
  };

  return (
    <Box className={matcheLaptop ? styles.box : styles.boxMobile}>
      {/* Header - Mobile or Tablet View */}
      {!matcheLaptop && (
        <Box className={styles.header}>
          <IconButton className={styles.hiddenButton}>
            <CloseIcon />
          </IconButton>
          <h2>Filter by</h2>
          <IconButton onClick={handleCloseButtonClick}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* Header - Laptop or Desktop View */}
      {matcheLaptop && (
        <>
          <h2>Filter</h2>
          <Divider className={styles.divider} />
        </>
      )}

      {/* Filters */}
      <h3>Chatting Method</h3>
      <FormControl variant="standard" component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={online}
                onChange={handleChattingOnlineChange}
                name="online"
                size="small"
              />
            )}
            label="Online"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={offline}
                onChange={handleChattingOfflineChange}
                name="offline"
                size="small"
              />
            )}
            label="Offline"
          />
        </FormGroup>
      </FormControl>
      <Divider className={styles.divider} />

      <h3>Display sort by:</h3>
      <FormControl>
        <FormGroup>
          <RadioGroup name="sort" value={sort} onChange={handleSortByChange}>
            {sortingMehods.map((method) => (
              <FormControlLabel
                key={method.value}
                control={<Radio value={method.value} size="small" />}
                label={method.label}
              />
            ))}
          </RadioGroup>
        </FormGroup>
      </FormControl>
      <Divider className={styles.divider} />

      <h3>Price Range</h3>
      <Slider
        size="small"
        defaultValue={0}
        value={[priceFrom, priceTo]}
        min={0}
        max={500}
        step={100}
        onChange={handlePriceChange}
        getAriaValueText={getSliderText}
        marks={sliderMarks}
      />
      <Divider className={styles.divider} />

      <h3>Location</h3>
      <Box display="flex" justifyContent="space-between">
        <p>City</p>
        <FormControl size="small">
          <InputLabel id="location-selector">Select City</InputLabel>
          <Select
            label="Select City"
            id="location-selector"
            className={styles.locationSelect}
            value={location}
            onChange={handleLocationChange}
          >
            {australiaCities.map((city) => (
              <MenuItem value={city} key={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider className={styles.divider} />

      <h3>Key word</h3>
      <TextField
        variant="outlined"
        placeholder="search keyword..."
        size="small"
        fullWidth
        value={keyword}
        onChange={handleKeywordChange}
      />
      <Divider className={styles.divider} />

      {/* Buttons */}
      <Box className={styles.buttonContainer}>
        <Button
          onClick={handleReset}
          variant="outlined"
          className={styles.resetButton}
        >
          Reset
        </Button>
        <Button
          onClick={handleSearch}
          variant="contained"
          className={styles.searchButton}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default ExpertFilter;
