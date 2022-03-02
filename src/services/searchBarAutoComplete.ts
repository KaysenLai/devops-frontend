import request from 'utils/request';
import { AxiosRequestConfig } from 'axios';

const fetchAutoCompleteOptions = async (word: string) => {
  const config: AxiosRequestConfig = {
    url: `/search/?search=${word}`,
    method: 'GET',
  };

  const res = await request(config);
  return res.data;
};

export default fetchAutoCompleteOptions;
