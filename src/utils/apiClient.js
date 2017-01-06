const endpoint = require('../../config/api.js').endpoint;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';

export const auth = user =>
	Observable.ajax({
    url: `${endpoint}/auth`,
    method: 'POST',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  });