const decodeJwt = require('jwt-decode');
const TOKEN_NAME = 'capi-auth-token';

const store = (jwt) => {
	sessionStorage.setItem(TOKEN_NAME, jwt);
}

const remove = () => {
	sessionStorage.removeItem(TOKEN_NAME);
}

const decode = (jwt) => {
  try{
    return decodeJwt(jwt);
  } catch(e) {
    remove();
    return null;
  } 
}

const get = () => {
	return sessionStorage.getItem(TOKEN_NAME);
}

const getDecoded = () => {
  return decode(get());
}

export default {
	decode,
	store,
	remove,
	get,
  getDecoded
};