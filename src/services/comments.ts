import request from 'utils/request';
import { AxiosRequestConfig } from 'axios';

const getCommentsByExpertId = (expertId : string) => {
  const config: AxiosRequestConfig = {
    url: `/meetings/comments/${expertId}`,
    method: 'GET',
  };
  return request(config).then((res) => res.data);
};

export default getCommentsByExpertId;
