import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { isEmpty } from 'lodash';
import styles from './searchBar.module.scss';

interface SearchBarProps {
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleClick: MouseEventHandler;
  options: string[] | null;
  loading: boolean;
  onClick: MouseEventHandler;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value, handleChange, handleClick, options, loading, onClick,
}) => (
  <div>
    <div className={styles.searchbar}>
      <input
        className={styles.input}
        placeholder="e.g. Internet Plus"
        value={value}
        onChange={handleChange}
      />
      <IconButton
        className={styles.searchButton}
        onClick={handleClick}
      >
        <SearchIcon className={styles.icon} />
      </IconButton>
    </div>
    <div className={styles.suggestContainer}>
      {loading && <div className={styles.item}>Loading...</div>}
      {options?.length === 0
        && !loading
        && !isEmpty(value.trim())
        && <div className={styles.item}>No result for your search.</div>}
      {options
        && !isEmpty(value.trim())
        && options?.length > 0
        && !loading
        && options?.map((element, index) => {
          if (element !== value) {
            return (
              <div
                className={styles.item}
                onClick={onClick}
                onKeyDown={() => {}}
                role="menuitem"
                tabIndex={index}
              >
                {element}
              </div>
            );
          }
          return (<></>);
        })}
    </div>
  </div>
);

export default SearchBar;
