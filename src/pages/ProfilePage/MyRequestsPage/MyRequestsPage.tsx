import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IParams from 'services/profile';
import { getMeetingByUserId } from 'services';
import { IMyRequest } from 'types/IProfileRequest';
import { useSelector } from 'react-redux';
import { get as storageGet } from 'utils/localStorage';
import { TOKEN } from 'constants/localStorageKeys';
import { PROFILE_SETTINGS_SUB_MENU } from 'constants/profileMenus';
import RequestCard from 'components/RequestCard';
import styles from './MyRequestsPage.module.scss';
import { selectCurrentUserID } from '../../../store/slices/userSlice';

interface propTypes {
  children: React.ReactChild,
  index: number,
  value: number,
}

const TabPanel: React.FC<propTypes> = (props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
};

/**
 * this function is used for material ui
 * for making a dynamic object and using them as props and reduce code size
 * id is used for all HTML element, and aria-controls used for making tabs
*/
function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const MyRequestsPage = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userID = useSelector(selectCurrentUserID);
  const token = JSON.parse(storageGet(TOKEN));

  const myRequestParams = {
    userID,
    token,
  } as IParams;
  const [myRequests, setMyRequests] = useState<IMyRequest[]>([]);
  const [myAwatingResponses, setMyAwatingResponses] = useState<IMyRequest[]>([]);
  const [myNotCompleted, setMyNotCompleted] = useState<IMyRequest[]>([]);
  const [myNotReviewed, setMyNotReviewed] = useState<IMyRequest[]>([]);

  useEffect(() => {
    getMeetingByUserId(myRequestParams)
      .then((data) => {
        setMyRequests(data);
        const myRequestData = data as IMyRequest[];
        setMyAwatingResponses(myRequestData.filter(
          (item) => (item.status === PROFILE_SETTINGS_SUB_MENU[1]),
        ));
        setMyNotCompleted(myRequestData.filter(
          (item) => (item.status === PROFILE_SETTINGS_SUB_MENU[2]),
        ));
        setMyNotReviewed(myRequestData.filter(
          (item) => (item.status === PROFILE_SETTINGS_SUB_MENU[3]),
        ));
      })
      .catch((error) => error.response);
  }, []);

  return (
    <Box
      className={styles.container}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab
          label={PROFILE_SETTINGS_SUB_MENU[0]}
          {...a11yProps(0)}
        />
        <Tab label={PROFILE_SETTINGS_SUB_MENU[1]} {...a11yProps(1)} />
        <Tab label={PROFILE_SETTINGS_SUB_MENU[2]} {...a11yProps(2)} />
        <Tab label={PROFILE_SETTINGS_SUB_MENU[3]} {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <>
          {myRequests[0]
            && myRequests.map((myRequest) => (
              <div key={myRequest.meetingID}>
                <RequestCard myRequest={myRequest} />
              </div>
            ))}
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <>
          {myAwatingResponses[0]
            && myAwatingResponses.map((item) => (
              <div key={item.meetingID}>
                <RequestCard myRequest={item} />
              </div>
            ))}
        </>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <>
          {myNotCompleted[0]
            && myNotCompleted.map((item) => (
              <div key={item.meetingID}>
                <RequestCard myRequest={item} />
              </div>
            ))}
        </>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <>
          {myNotReviewed[0]
            && myNotReviewed.map((item) => (
              <div key={item.meetingID}>
                <RequestCard myRequest={item} />
              </div>
            ))}
        </>
      </TabPanel>
    </Box>
  );
};

export default MyRequestsPage;
