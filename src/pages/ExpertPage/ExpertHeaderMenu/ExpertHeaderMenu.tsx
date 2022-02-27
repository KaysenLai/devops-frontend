import { Box, IconButton } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import React, { Dispatch, SetStateAction } from 'react';
import styles from './ExpertHeaderMenu.module.scss';

interface FuncProps {
  setFilterOpen: Dispatch<SetStateAction<boolean>>;
}

const ExpertHeaderMenu: React.FC<FuncProps> = ({ setFilterOpen }) => {
  const handleFilterButtonClick = () => {
    setFilterOpen(true);
  };
  return (
    <Box className={styles.container}>
      <h1>Expert</h1>
      <h2>Selected category (e.g. Finance)</h2>
      <Box className={styles.buttonContainer}>
        <Box>
          <IconButton size="small">
            <ViewDayIcon />
          </IconButton>
          Category
        </Box>
        <Box onClick={handleFilterButtonClick}>
          <IconButton size="small">
            <FilterAltIcon />
          </IconButton>
          Filter by
        </Box>
      </Box>
    </Box>
  );
};

export default ExpertHeaderMenu;
