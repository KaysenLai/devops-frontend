import request from 'utils/request';
import { AxiosRequestConfig } from 'axios';

interface UserLoginParams {
  email: string;
  password: string;
}

interface ForgetPasswordParams {
  email: string;
}

interface IResetPasswordParams {
  token: string;
  password: string;
  confirmedPassword: string;
}

interface UserSignupParams {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

interface IUserVerifyParams {
  token: string;
}

const userLogin = (params : UserLoginParams) => {
  const { email, password } = params;
  const config: AxiosRequestConfig = {
    url: 'token',
    method: 'POST',
    data: { email, password },
  };

  return request(config).then((res) => res.data);
};

const forgetPassword = (params: ForgetPasswordParams) => {
  const { email } = params;
  const config: AxiosRequestConfig = {
    url: '/users/password-reset-link',
    method: 'PUT',
    data: { email },
  };
  return request(config).then((res) => res.data);
};

const resetPassword = (params: IResetPasswordParams) => {
  const { password, confirmedPassword, token } = params;
  const config: AxiosRequestConfig = {
    url: '/users/password',
    method: 'PUT',
    data: { password, confirmedPassword, token },
  };
  return request(config).then((res) => res.data);
};

const userSignup = (params : UserSignupParams) => {
  const config: AxiosRequestConfig = {
    url: 'users',
    method: 'POST',
    data: params,
  };
  return request(config).then((res) => res.data);
};

const userVerify = (params: IUserVerifyParams) => {
  const { token } = params;
  const config: AxiosRequestConfig = {
    url: '/users/verification/email',
    method: 'GET',
    // params is used for backend req.query
    params: { token },
  };
  return request(config).then((res) => res.data);
};

export {
  userLogin, userSignup, userVerify, forgetPassword, resetPassword,
};
