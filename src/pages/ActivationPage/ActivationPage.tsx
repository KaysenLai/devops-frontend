import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ClientAuthLayout from 'layouts/ClientAuthLayout';
import { userVerify } from 'services';
import ActivationForm from './ActivationForm';

const ActivationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [emailAddress, setEmailAddress] = useState('');
  const history = useHistory();

  /** Get one time token from url */
  const urlParams = new URLSearchParams(window.location.search);
  const oneTimeToken = urlParams.get('token');

  // if token is empty, redirect to NotFoundPage
  if (!oneTimeToken) {
    history.push('/notfound');
  } else {
    useEffect(() => {
      const params = {
        token: oneTimeToken,
      };
      userVerify(params)
        .then((data) => {
          const { email } = data;
          setEmailAddress(email);
          setIsLoading(false);
        })
        .catch(() => {
          // if error, redirect to NotFoundPage
          history.push('/notfound');
        });
    }, []);
  }

  return (
    <ClientAuthLayout text="SIGN UP">
      {isLoading
        ? <CircularProgress />
        : <ActivationForm email={emailAddress} />}
    </ClientAuthLayout>
  );
};
export default ActivationPage;
