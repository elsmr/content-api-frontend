const endpoint = require('../../config/api.js').endpoint;
import 'whatwg-fetch';

export const auth = (user) => {
	return fetch(`${endpoint}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
}