import React from 'react';
import CollectionDetailContainer from '../containers/CollectionDetailContainer';

const CollectionDetail = ({params}) => (
  <CollectionDetailContainer collection={params.name} />
);

export default CollectionDetail;