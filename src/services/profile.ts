import request from 'utils/request';
import { AxiosRequestConfig } from 'axios';

export default interface IParams {
  userID: string
  token: string;
}

export const getMeetingByExpertId = (params: IParams) => {
  const { userID, token } = params;
  const config: AxiosRequestConfig = {
    url: `/meetings/experts/${userID}`,
    method: 'GET',
    headers: {
      authorization: token,
    },
  };
  return request(config).then((res) => res.data);
};

export const getMeetingByUserId = (params: IParams) => {
  const { userID, token } = params;
  const config: AxiosRequestConfig = {
    url: `/meetings/users/${userID}`,
    method: 'GET',
    headers: {
      authorization: token,
    },
  };
  return request(config).then((res) => res.data);
};
