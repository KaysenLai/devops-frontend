import React, {
  MouseEventHandler,
} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Divider } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from './sideCategoryMenu.module.scss';
import ICategory from '../../../types/ICategory';

interface SideSubCategoryProps {
  categories: Array<ICategory>;
  activeItem: string;
  closeClick: MouseEventHandler;
  backClick: MouseEventHandler;
  desktopClick: Function;
}

const SideSubCategory: React.FC<SideSubCategoryProps> = ({
  categories, activeItem, desktopClick, closeClick, backClick,
}) => (
  <>
    <div className={styles.topWrapper}>
      <IconButton className={styles.iconBack} onClick={backClick}>
        <ArrowBackIosNewIcon className={styles.closeIcon} />
      </IconButton>
      <h2 className={styles.title}>
        {activeItem}
      </h2>
      <IconButton className={styles.iconClose} onClick={closeClick}>
        <CloseIcon />
      </IconButton>
    </div>
    {(categories.filter((category) => category.name === activeItem))[0]
      .subcategory.map((subitem) => (
        <div key={subitem}>
          <button type="button" className={styles.sidemenuItem} onClick={() => desktopClick(activeItem, subitem)}>
            <p>{subitem}</p>
          </button>
          <Divider className={styles.divider} />
        </div>
      ))}
  </>
);

export default SideSubCategory;
