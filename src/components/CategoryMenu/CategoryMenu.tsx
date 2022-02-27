import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import styles from './categoryMenu.module.scss';
import SideCategoryMenu from './SideCategoryMenu';
import SideSubCategory from './SideCategoryMenu/sideSubCategory';

const CategoryMenu = () => {
  const categories = [{
    name: 'Industry Experience',
    subcategory: ['Commerce', 'Media', 'Retail', 'Education', 'Advertising', 'Food and Beverage', 'Energy Industry'],
  },
  {
    name: 'Internet Plus',
    subcategory: ['Product Manager', 'UI/UX', 'Back-end Developer', 'Font-end Developer', 'Data Analyst', 'Interaction Design', 'New Media Operation'],
  },
  {
    name: 'Career Planing',
    subcategory: ['Intenview & Resume', 'Team Management', 'Career Transition', 'Branding', 'Operation Management', 'Career Promotion'],
  },
  {
    name: 'Finance',
    subcategory: ['Stock Market', 'Hedge Funds', 'Securities Analyst', 'Cryptocurrency', 'Investment Strategy'],
  },
  {
    name: 'Counselling',
    subcategory: ['Family Relationship', 'Couple Consulting', 'Mental Health', 'Interpersonal Relationship'],
  },
  {
    name: 'Daily Service',
    subcategory: ['Cosmetic & Skincare', 'Travel', 'Pet', 'Daily Nutrition', 'Plastic Surgery'],
  },
  {
    name: 'Others',
    subcategory: ['Legal Aid', 'Immigration'],
  }];

  const history = useHistory();
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [show, setShow] = useState(false);
  const [subShow, setSubShow] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isHover, setIsHover] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSubCategory(location.search.substring(7));
    categories.map((item) => {
      const subitem = item.subcategory.filter((element) => element === subCategory);
      if (subitem.length > 0) {
        setMainCategory(item.name);
      }
    });
  }, [location, categories]);

  const desktopClick = (name, category) => {
    setMainCategory(name);
    setSubCategory(category);
    setSubShow(false);
    setShow(false);
    history.push(`/expert?input=${category}`);
  };

  const mobileClick = () => {
    setShow(!show);
  };

  const subHandleClick = (name) => {
    setSubShow(!subShow);
    setShow(!show);
    setActiveItem(name);
  };

  const closeClick = () => {
    setSubShow(false);
    setShow(false);
  };

  const backClick = () => {
    setSubShow(!subShow);
    setShow(!show);
  };

  const mouseOver = () => {
    setIsHover(true);
  };

  const mouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <div className={styles.desktopContainer}>
        <div className={styles.wrapper}>
          <div className={styles.navbar}>
            {categories.map((item) => (
              <div className={`${styles.navitem} ${mainCategory === item.name ? styles.activeitem : ''}`} onMouseOver={mouseOver} onMouseLeave={mouseLeave} key={item.name}>
                <button className={`${styles.navbtn} ${mainCategory === item.name ? styles.activebtn : ''}`} type="button">
                  {item.name}
                  <ArrowDropDownIcon className={styles.icon} />
                </button>
                <div className={`${styles.subcontent} ${isHover ? '' : mainCategory === item.name ? styles.staysub : ''}`} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
                  {item.subcategory.map((subitem) => {
                    if (subCategory === subitem) {
                      return (
                        <button type="button" className={styles.activesub} onClick={() => desktopClick(item.name, subitem)} key={subitem}>{subitem}</button>
                      );
                    }
                    return (
                      <button type="button" onClick={() => desktopClick(item.name, subitem)} key={subitem}>{subitem}</button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.mobileContainer}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar className={styles.appBar} position="static">
            <Toolbar className={styles.toolBar} variant="dense">
              <IconButton
                color="primary"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={mobileClick}
              >
                <CalendarViewDayIcon />
                <p>Category</p>
              </IconButton>
            </Toolbar>
            {show && (
              <div className={styles.sidemenu}>
                <SideCategoryMenu
                  categories={categories}
                  handleClick={mobileClick}
                  subHandleClick={subHandleClick}
                />
              </div>
            )}
            {subShow && (
              <div className={styles.sidemenu}>
                <SideSubCategory
                  categories={categories}
                  activeItem={activeItem}
                  backClick={backClick}
                  closeClick={closeClick}
                  desktopClick={desktopClick}
                />
              </div>
            )}
          </AppBar>
        </Box>
      </div>
    </>
  );
};

export default CategoryMenu;
