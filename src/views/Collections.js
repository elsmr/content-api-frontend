import React from 'react';
import CollectionsContainer from '../containers/CollectionsContainer';
import PageTitle from '../components/header/PageTitle';

const Collections = () => (
  <div className="main-content">
    <PageTitle title='Collections' />
    <div className='container'>
      <CollectionsContainer />
    </div>
  </div>
);

export default Collections;