import React, { useState } from 'react';
import ClientAuthLayout from 'layouts/ClientAuthLayout';
import Helmet from 'react-helmet';
import SignupForm from './SignupForm';
import SignupSuccess from './SignupSuccess/SignupSuccess';

const SignupPage = () => {
  const [emailSucceedSendTo, setEmailSucceedSendTo] = useState('');
  return (
    <div>
      <Helmet>
        <title> Sign Up | Go Expert One-on-One Consultation</title>
      </Helmet>
      <ClientAuthLayout text="sign up">
        {emailSucceedSendTo ? (
          <SignupSuccess email={emailSucceedSendTo} />
        ) : (
          <SignupForm setEmailSucceedSendTo={setEmailSucceedSendTo} />
        )}
      </ClientAuthLayout>
    </div>
  );
};

export default SignupPage;
