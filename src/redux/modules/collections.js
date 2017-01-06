import { getCollections } from '../../utils/apiClient';
import jwt from '../../utils/jwt';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

export const initialState = {
  error: null,
  data: []
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_COLLECTIONS_FULFILLED':
      return {error: null, data: action.collections};
    case 'FETCH_COLLECTIONS_REJECTED':
      return {...state, error: action.error};
    case 'DELETE_COLLECTIONS':
      return initialState;
    default:
      return state;
  }
}

//actions
export const fetchCollections = () => ({type: 'FETCH_COLLECTIONS'});
export const fetchCollectionsFulfilled = collections => ({type: 'FETCH_COLLECTIONS_FULFILLED', collections});
export const fetchCollectionsRejected = error => ({type: 'FETCH_COLLECTIONS_REJECTED', error});
export const deleteCollections = () => ({type: 'DELETE_COLLECTIONS'});

//epics
export const fetchCollectionsEpic = action$ =>
  action$.ofType('FETCH_COLLECTIONS')
    .mergeMap(action => 
      getCollections(jwt.get())
        .map(res => res.response.data)
        .map(data => fetchCollectionsFulfilled(data))
        .catch(err => Observable.of(fetchCollectionsRejected(err)))
    );  