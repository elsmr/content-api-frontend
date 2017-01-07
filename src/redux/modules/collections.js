import { getCollections, getCollection } from '../../utils/apiClient';
import jwt from '../../utils/jwt';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

export const initialState = {
  pending: true,
  selected: {},
  error: null,
  list: []
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_COLLECTION':
      return {...state, pending: true};
    case 'FETCH_COLLECTION_FULFILLED':
      return {...state, selected: action.collection, pending: false};    
    case 'FETCH_COLLECTIONS':
      return {...state, pending: true, error: null};
    case 'FETCH_COLLECTIONS_FULFILLED':
      return {...state, list: action.collections, pending: false};
    case 'FETCH_COLLECTION_REJECTED':
    case 'FETCH_COLLECTIONS_REJECTED':
      return {...state, error: action.error, pending: false};
    case 'DELETE_COLLECTIONS':
      return {...state, list: []};
    case 'DELETE_COLLECTION':
      return {...state, selected: {}};
    default:
      return state;
  }
}

//actions
export const fetchCollection = (name) => ({type: 'FETCH_COLLECTION', name});
export const fetchCollections = () => ({type: 'FETCH_COLLECTIONS'});
export const fetchCollectionFulfilled = collection => ({type: 'FETCH_COLLECTION_FULFILLED', collection});
export const fetchCollectionRejected = error => ({type: 'FETCH_COLLECTION_REJECTED', error});
export const fetchCollectionsPending = () => ({type: 'FETCH_COLLECTIONS_PENDING'});
export const fetchCollectionsFulfilled = collections => ({type: 'FETCH_COLLECTIONS_FULFILLED', collections});
export const fetchCollectionsRejected = error => ({type: 'FETCH_COLLECTIONS_REJECTED', error});
export const deleteCollection = () => ({type: 'DELETE_COLLECTION'});
export const deleteCollections = () => ({type: 'DELETE_COLLECTIONS'});

//epics
export const fetchCollectionsEpic = action$ =>
  action$.ofType('FETCH_COLLECTIONS')
    .mergeMap(action => 
      getCollections(jwt.get())
        .map(res => res.response.data)
        .map(colls => fetchCollectionsFulfilled(colls))
        .catch(err => Observable.of(fetchCollectionsRejected(err)))
    );

export const fetchCollectionEpic = action$ =>
  action$.ofType('FETCH_COLLECTION')
    .map(action => action.name)
    .mergeMap(name => 
        getCollection(jwt.get(), name)
          .map(res => res.response.data)
          .map(colls => fetchCollectionFulfilled(colls))
          .catch(err => Observable.of(fetchCollectionRejected(err)))
      );