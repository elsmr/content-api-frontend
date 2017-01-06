import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { login } from '../../redux/modules/user';
import FormField from './FormField';

const onSubmit = (data, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(login(data, resolve, reject))
  }).catch((err) => {
      throw new SubmissionError({ _error: 'Username or password is incorrect.'});
    });
}

const LoginForm = ({ error, submitting, handleSubmit}) => (
  <form className='form' onSubmit={handleSubmit(onSubmit)}>
    <Field type='text' required name="username" id='username' label='Username' component={FormField} />
    <Field type='password' required name="password" id='password' label='Password' component={FormField} />
  <div className="form-group">
    { error && <p className='alert alert-danger'>{error}</p> }
  </div>
  <div className='text-xs-center'>
    <button type='submit' disabled={submitting} className={'btn btn-primary' + (submitting ? ' is-loading' : '') }>
      Login
    </button>
  </div>
</form>
)

export default reduxForm({ form: 'login'})(LoginForm);

