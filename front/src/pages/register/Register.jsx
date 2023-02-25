import React from 'react';
import { useFormik } from 'formik';
import './register.css'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2'
import { useNavigate, Navigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['user']);

  const validate = values => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Required';
    if (!values.userName) errors.userName = 'Required';
    if (!new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(values.email)) errors.email = 'Incorrect email format';
    if (!values.email) errors.email = 'Required';
    if (!new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).test(values.password)) errors.password = 'A minimum of eight characters, at least one letter and one number and one special character is required';
    if (!values.password) errors.password = 'Required';
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {

      fetch('/user/register', {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
        .then((response) => response.json())
        .then((res) => {
          Swal.fire({
            icon: res.user ? 'success' : 'error',
            title: res.user ? 'Created successfully' : 'Error',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            position: 'top-end',
            toast: true,
          })
          if (res.user) {
            setCookie('user', res.user, { path: '/' })
            navigate('/profile')
          }
        });
    },
  });
  if (cookies.user) {
    return <Navigate replace to="/profile" />;
  }
  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>register</h1>
        <form className='register-writeForm' autoComplete='off' onSubmit={formik.handleSubmit}>
          <div className={`register-formGroup ${formik.errors.fullName && 'error'}`}>
            <label>Full Name</label>
            <input type="text" placeholder='Name' name="fullName" onChange={formik.handleChange}
              value={formik.values.fullName} />
            {formik.errors.fullName ? <small>{formik.errors.fullName}</small> : null}

          </div>
          <div className={`register-formGroup ${formik.errors.userName && 'error'}`}>
            <label>Username</label>
            <input type="text" placeholder='Username' name="userName" onChange={formik.handleChange}
              value={formik.values.userName} />
            {formik.errors.userName ? <small>{formik.errors.userName}</small> : null}

          </div>
          <div className={`register-formGroup ${formik.errors.email && 'error'}`}>
            <label>Email</label>
            <input type="email" placeholder='Email' name="email" onChange={formik.handleChange}
              value={formik.values.email} />
            {formik.errors.email ? <small>{formik.errors.email}</small> : null}

          </div>
          <div className={`register-formGroup ${formik.errors.password && 'error'}`}>
            <label>Password</label>
            <input type="password" placeholder='Password' name="password" onChange={formik.handleChange}
              value={formik.values.password} />
            {formik.errors.password ? <small>{formik.errors.password}</small> : null}

          </div>
          <div className="register-button">
            <button className='register-writeButton'>register</button>
            <Link to="/login">
              <button className='reg-login-writeButton' >Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Register;
