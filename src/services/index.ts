/* Please export all services at here by export = {} format
All API calls should be defined under this folder
*/
import {
  userLogin,
  userSignup,
  userVerify,
  forgetPassword,
  resetPassword,
} from './users';

import fetchAutoCompleteOptions from './searchBarAutoComplete';

import { getRecommendedExperts, getExperts, getExpertById } from './experts';

import getCommentsByExpertId from './comments';

import { getMeetingByExpertId, getMeetingByUserId } from './profile';

export {
  userLogin,
  userSignup,
  userVerify,
  forgetPassword,
  resetPassword,
  getRecommendedExperts,
  getExpertById,
  getExperts,
  fetchAutoCompleteOptions,
  getCommentsByExpertId,
  getMeetingByExpertId,
  getMeetingByUserId,
};
