import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import PrivateRoute from './privateRoute';
import {
  HomePage, DetailPage, NotFoundPage, LoginPage, ExpertPage, AboutPage, SignupPage,
  ForgetPasswordPage, ResetPasswordPage, ActivationPage, ExpertDetailsPage,
  ProfilePage,
} from '../pages';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Redirect from="/home" to="/" />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route exact path="/expert" component={ExpertPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/expert/expert-detail" component={ExpertDetailsPage} />
      <Route path="/forget-password" component={ForgetPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/activation" component={ActivationPage} />
      <PrivateRoute path="/detail" component={DetailPage} />
      <PrivateRoute path="/profile" component={ProfilePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
