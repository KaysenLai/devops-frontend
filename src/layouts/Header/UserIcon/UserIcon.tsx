import React, { useState, MouseEvent } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'hooks';
import { removeCredentials } from 'store/slices/authSlice';
import { removeUserFromLocalStorage } from 'store/slices/userSlice';
import styles from './UserIcon.module.scss';

interface UserIconProps {
    userIcon: string;
}

const UserIcon: React.FC<UserIconProps> = ({ userIcon }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch(removeCredentials());
    dispatch(removeUserFromLocalStorage());
    history.push('/');
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <img className={styles.userIcon} alt="user icon" src={userIcon} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => history.push('/profile')}>
          Profile
        </MenuItem>
        <MenuItem onClick={onLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserIcon;
