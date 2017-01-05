const decodeJwt = require('jwt-decode');
const TOKEN_NAME = 'capi-auth-token';

const decode = (jwt) => {
	return decodeJwt(jwt);
}

const store = (jwt) => {
	sessionStorage.setItem(TOKEN_NAME, jwt);
}

const remove = () => {
	sessionStorage.removeItem(TOKEN_NAME);
}

const get = () => {
	return sessionStorage.getItem(TOKEN_NAME);
}

const getDecoded = () => {
  const token = get();
  return token ? decode(token) : null;
}

export default {
	decode,
	store,
	remove,
	get,
  getDecoded
};