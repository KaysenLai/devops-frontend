import React from 'react';
import ClientAuthLayout from 'layouts/ClientAuthLayout';
import ForgotPasswordForm from './ForgetPasswordForm';

/**
 * User clicks froget password in signin page,
 * will redirect to this page.
 * * @returns ForgetPasswordPage
 */
const ForgetPasswordPage = () => (
  <ClientAuthLayout text="Log in">
    <ForgotPasswordForm />
  </ClientAuthLayout>
);
export default ForgetPasswordPage;
