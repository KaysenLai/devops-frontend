import React, {
  MouseEventHandler,
} from 'react';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styles from './sideCategoryMenu.module.scss';
import ICategory from '../../../types/ICategory';

interface SideCategoryMenuProps {
  categories: Array<ICategory>;
  handleClick: MouseEventHandler;
  subHandleClick: Function;
}

const SideCategoryMenu: React.FC<SideCategoryMenuProps> = ({
  categories, handleClick, subHandleClick,
}) => (
  <>
    <div className={styles.topWrapper}>
      <h2 className={styles.title}>
        <CalendarViewDayIcon className={styles.menuIcon} />
        Category
      </h2>
      <IconButton className={styles.iconClose} onClick={handleClick}>
        <CloseIcon />
      </IconButton>
    </div>
    {categories.map((item) => (
      <div key={item.name}>
        <button type="button" className={styles.sidemenuItem} onClick={() => subHandleClick(item.name)}>
          <p>{item.name}</p>
          <ArrowRightIcon />
        </button>
        <Divider className={styles.divider} />
      </div>
    ))}
  </>
);

export default SideCategoryMenu;
