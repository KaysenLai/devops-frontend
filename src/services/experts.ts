import request from 'utils/request';
import { AxiosRequestConfig } from 'axios';
import IExpertsQuery from 'types/IExpertsQuery';

export const getRecommendedExperts = () => {
  const config: AxiosRequestConfig = {
    url: 'experts/recommendationList',
    method: 'GET',
  };

  return request(config);
};

export const getExpertById = (expertId : string) => {
  const config: AxiosRequestConfig = {
    url: `/experts/${expertId}`,
    method: 'GET',
  };

  return request(config).then((res) => res.data);
};

export const getExperts = (query: IExpertsQuery) => {
  const config: AxiosRequestConfig = {
    url: `experts/?page=${query.page}&online=${query.online}&offline=${query.offline}&sort=${query.sort}&priceFrom=${query.priceFrom}&priceTo=${query.priceTo}&location=${query.location}&keyword=${query.keyword}`,
    method: 'GET',
  };

  return request(config);
};
