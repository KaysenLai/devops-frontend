import axios, { AxiosRequestConfig } from 'axios';
import { DEVELOPMENT_API_URL, UAT_API_URL, PRODUCTION_API_URL } from 'constants/apiUrl';
import { UAT, PRODUCTION } from 'constants/environment';

/**
 * Returns api url based on the current environment
 * @return corresponding api url
 */
const getApiUrl = () => {
  const environment = process.env.NODE_ENV;

  switch (environment) {
    case PRODUCTION:
      return PRODUCTION_API_URL;
    case UAT:
      return UAT_API_URL;
    default:
      return DEVELOPMENT_API_URL;
  }
};

const baseURL = `${getApiUrl()}/api/`;
const timeout = 30000;

/**
 * Requests a path, returning a promise.
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options: AxiosRequestConfig) {
  const axiosInstance = axios.create({
    baseURL,
    timeout,
  });

  return axiosInstance(options);
}
