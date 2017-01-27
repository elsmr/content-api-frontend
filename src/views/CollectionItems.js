import React from 'react';
import CollectionItemsContainer from '../containers/CollectionItemsContainer';

const CollectionItems = ({params}) => (
  <CollectionItemsContainer name={params.name} />
);

export default CollectionItems;
