const apiMiddleware = store => next => action => {
  if(!action.meta || action.meta.type !== 'api') {
    return next(action);
  }

  const {url} = action.meta;
  const fetchOptions = Object.assign({}, action.meta);
  fetch(url, fetchOptions)
    .then(res => res.json())
    .then(json => {
      if (typeof action.meta.onSuccess === 'function') {
        action.meta.onSuccess(json);
      }
      return json;
    })
    .then(json => {
      Object.assign(action, {json});
      delete action.meta;
      store.dispatch(action);
    })
    .catch((err) => {
      console.log(err)
    })
}

export default apiMiddleware;
