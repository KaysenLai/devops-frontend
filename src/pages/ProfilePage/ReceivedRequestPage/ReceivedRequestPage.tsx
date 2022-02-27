import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IParams from 'services/profile';
import { getMeetingByExpertId } from 'services';
import { IRecievedRequest } from 'types/IProfileRequest';
import { useSelector } from 'react-redux';
import { get as storageGet } from 'utils/localStorage';
import { TOKEN } from 'constants/localStorageKeys';
import { PROFILE_SETTINGS_SUB_MENU } from 'constants/profileMenus';
import ReceivedCard from 'components/ReceivedCard';
import styles from './ReceivedRequestPage.module.scss';
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

const ReceivedRequestPage = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userID = useSelector(selectCurrentUserID);
  const token = JSON.parse(storageGet(TOKEN));

  const receivedRequestParams = {
    userID,
    token,
  } as IParams;
  const [receivedRequests, setReceivedRequests] = useState<IRecievedRequest[]>([]);
  const [receivedAwatingResponses, setReceivedAwatingResponses] = useState<IRecievedRequest[]>([]);
  const [receivedNotCompleted, setReceivedNotCompleted] = useState<IRecievedRequest[]>([]);
  const [receivedNotReviewed, setReceivedNotReviewed] = useState<IRecievedRequest[]>([]);

  useEffect(() => {
    getMeetingByExpertId(receivedRequestParams)
      .then((data) => {
        setReceivedRequests(data);
        const receivedRequestData = data as IRecievedRequest[];
        setReceivedAwatingResponses(receivedRequestData.filter(
          (item) => (item.status === PROFILE_SETTINGS_SUB_MENU[1]),
        ));
        setReceivedNotCompleted(receivedRequestData.filter(
          (item) => (item.status === PROFILE_SETTINGS_SUB_MENU[2]),
        ));
        setReceivedNotReviewed(receivedRequestData.filter(
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
        className={styles.tabs}
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label={PROFILE_SETTINGS_SUB_MENU[0]} {...a11yProps(0)} />
        <Tab label={PROFILE_SETTINGS_SUB_MENU[1]} {...a11yProps(1)} />
        <Tab label={PROFILE_SETTINGS_SUB_MENU[2]} {...a11yProps(2)} />
        <Tab label={PROFILE_SETTINGS_SUB_MENU[3]} {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <>
          {receivedRequests[0]
            && receivedRequests.map((item) => (
              <div key={item.meetingID}>
                <ReceivedCard receivedRequest={item} />
              </div>
            ))}
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <>
          {receivedAwatingResponses[0]
            && receivedAwatingResponses.map((item) => (
              <div key={item.meetingID}>
                <ReceivedCard receivedRequest={item} />
              </div>
            ))}
        </>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <>
          {receivedNotCompleted[0]
            && receivedNotCompleted.map((item) => (
              <div key={item.meetingID}>
                <ReceivedCard receivedRequest={item} />
              </div>
            ))}
        </>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <>
          {receivedNotReviewed[0]
            && receivedNotReviewed.map((item) => (
              <div key={item.meetingID}>
                <ReceivedCard receivedRequest={item} />
              </div>
            ))}
        </>
      </TabPanel>
    </Box>
  );
};

export default ReceivedRequestPage;
