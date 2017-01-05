import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { login } from '../redux/modules/user';
import { SubmissionError } from 'redux-form';

const onSubmit = (data, dispatch) => {
  return dispatch(login(data))
    .catch((err) => {
      throw new SubmissionError({ _error: 'Username or password is incorrect.'});
    });
}

const renderField = ({input, label, type, meta: { touched, error}}) => (
  <div className={'form-group' + (error && touched && 'has-danger')}>
    <label htmlFor='password' className='text-white form-control-label'>{label}</label>
    <input type={type} {...input} className='form-control' />
    {
      touched && error &&
      <div className="form-control-feedback">
        { error }
      </div>
    }    
  </div>
)

const LoginForm = ({ error, submitting, handleSubmit}) => (
  <form className='form' onSubmit={handleSubmit(onSubmit)}>
    <Field type='text' name="username" id='username' label='Username' component={renderField} />
    <Field type='password' name="password" id='password' label='Password' component={renderField} />
  <div className="form-group">
    { error && <p className='alert alert-danger'>{error}</p> }
  </div>
  <div className='text-xs-center'>
    <button type='submit' disabled={submitting} className='btn btn-primary'>
      Login
    </button>
  </div>
</form>
)

export default reduxForm({ form: 'login'})(LoginForm);

