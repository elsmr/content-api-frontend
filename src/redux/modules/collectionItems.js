import { getCollectionItems } from '../../utils/apiClient';
import jwt from '../../utils/jwt';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

export const initialState = {
  collection: {},
  error: null,
  data: []
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ITEMS_FULFILLED':
      return {error: null, data: action.items};
    case 'FETCH_ITEMS_REJECTED':
      return {...state, error: action.error};
    case 'DELETE_ITEMS':
      return initialState;
    default:
      return state;
  }
}

//actions
export const fetchItems = collName => ({type: 'FETCH_ITEMS', collName});
export const fetchItemsFulfilled = items => ({type: 'FETCH_ITEMS_FULFILLED', items});
export const fetchItemsRejected = error => ({type: 'FETCH_ITEMS_REJECTED', error});
export const deleteItems = () => ({type: 'DELETE_ITEMS'});

//epics
export const fetchItemsEpic = action$ =>
  action$.ofType('FETCH_ITEMS')
    .mergeMap(action => 
      getCollectionItems(jwt.get(), action.collName)
        .map(res => res.response.data)
        .map(data => fetchItemsFulfilled(data))
        .catch(err => Observable.of(fetchItemsRejected(err)))
    );