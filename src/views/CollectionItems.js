import React from 'react';
import CollectionItemsContainer from '../containers/CollectionItemsContainer';

const CollectionDetail = ({params}) => (
  <CollectionItemsContainer name={params.name} />
);

export default CollectionDetail;