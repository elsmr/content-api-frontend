import React from 'react';

const FormField = ({input, label, type, meta: { touched, error}, ...others}) => (
  <div className={'form-group' + (error && touched && 'has-danger')}>
    <label htmlFor='password' className='text-white form-control-label'>{label}</label>
    <input type={type} {...input} {...others} className='form-control' />
    {
      touched && error &&
      <div className="form-control-feedback">
        { error }
      </div>
    }    
  </div>
);

export default FormField;