import React from 'react';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import Helmet from 'react-helmet';
import Search from './Search';
import CategoryMenu from '../../components/CategoryMenu';
import ProcessInfo from './ProcessInfo';
import StoryInfo from './StoryInfo';
import RecommendedExperts from './RecommendedExperts';

export const HomePage = () => (
  <div>
    <Helmet>
      <title> Home | Go Expert One-on-One Consultation</title>
    </Helmet>
    <Header />
    <Search />
    <CategoryMenu />
    <RecommendedExperts />
    <StoryInfo />
    <ProcessInfo />
    <Footer />
  </div>
);

export default HomePage;
