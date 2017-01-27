import React from 'react';
import ItemDetailContainer from '../containers/ItemDetailContainer';

const ItemDetail = ({params, user}) => (
  <div>
     <ItemDetailContainer user={user} id={params.id} name={params.name}/>
  </div>
);

export default ItemDetail;
