import { getCollectionItems, getItem } from '../../utils/apiClient';
import jwt from '../../utils/jwt';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

export const initialState = {
  error: null,
  list: [],
  selected: {}
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ITEMS_FULFILLED':
      return {...state, error: null, list: action.items};
    case 'FETCH_ITEMS_REJECTED':
      return {...state, error: action.error};
    case 'FETCH_ITEM_FULFILLED':
      return {...state, error: null, selected: action.item};
    case 'FETCH_ITEM_REJECTED':
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
export const fetchItem = (collName, id) => ({type: 'FETCH_ITEM', id, collName});
export const fetchItemFulfilled = item => ({type: 'FETCH_ITEM_FULFILLED', item});
export const fetchItemRejected = error => ({type: 'FETCH_ITEM_REJECTED', error});
export const deleteItems = () => ({type: 'DELETE_ITEMS'});

//epics
export const fetchItemsEpic = action$ =>
  action$.ofType('FETCH_ITEMS')
    .mergeMap(action =>
      getCollectionItems(jwt.get(), action.collName)
        .map(res => res.response.data)
        .map(items => fetchItemsFulfilled(items))
        .catch(err => Observable.of(fetchItemsRejected(err)))
    );

export const fetchItemEpic = action$ =>
  action$.ofType('FETCH_ITEM')
    .mergeMap(action =>
      getItem(jwt.get(), action.collName, action.id)
        .map(res => res.response.data)
        .map(item => fetchItemFulfilled(item))
        .catch(err => Observable.of(fetchItemRejected(err)))
    );
