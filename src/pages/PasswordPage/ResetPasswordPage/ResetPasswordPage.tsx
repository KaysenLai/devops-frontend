import React, { useState } from 'react';
import ClientAuthLayout from 'layouts/ClientAuthLayout';
import ResetPasswordForm from './ResetPasswordForm';
import PasswordSuccessReminder from '../common/PasswordSuccessReminder';

/**
 * User clicks froget password in signin page,
 * will redirect to this page.
 * * @returns ResetPasswordPage
 */
const ResetPasswordPage = () => {
  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);

  return (
    <ClientAuthLayout text="Log in">
      {isResetPasswordSuccess ? (
        <PasswordSuccessReminder displayText="Reset Password Successfully" />
      ) : (
        <ResetPasswordForm setIsResetPasswordSuccess={setIsResetPasswordSuccess} />
      )}

    </ClientAuthLayout>
  );
};
export default ResetPasswordPage;
