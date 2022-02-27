import { Box, CircularProgress } from '@mui/material';
import ExpertCard from 'components/ExpertCard';
import React from 'react';
import IExpertInfo from '../../../types/IExpertInfo';
import styles from './ExpertDisplay.module.scss';

interface IExpertDisplayProps {
  experts: IExpertInfo[];
}

const ExpertDisplay: React.FC<IExpertDisplayProps | null> = ({
  experts,
}: IExpertDisplayProps) => (
  <Box className={styles.expertsDisplayBox}>
    {!experts[0] && <CircularProgress />}
    {experts[0]
      && experts.map((expert) => (
        <Box key={expert.expertID} className={styles.expertBox}>
          <ExpertCard expertInfo={expert} />
        </Box>
      ))}
  </Box>
);

export default ExpertDisplay;
