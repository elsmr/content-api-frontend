import React from 'react';
import CollectionDetailContainer from '../containers/CollectionDetailContainer';

const CollectionDetail = ({params, user}) => (
  <div>
     <CollectionDetailContainer user={user} name={params.name} />
  </div>
);

export default CollectionDetail;