import React from 'react';
import './login.css'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import { useNavigate,Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);

  const validate = values => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    if (!values.password) errors.password = 'Required';
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      fetch('/user/login', {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
        .then((response) => response.json())
        .then((res) => {
          Swal.fire({
            icon: res.success ? 'success' : 'error',
            title: res.success ? 'Logged in successfully' : res.message,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            position: 'top-end',
            toast: true,
          })
          if(res.success){
            setCookie('user', res.userData, { path: '/' })
            navigate('/profile')
          }
        });
    },
  });
  if (cookies.user) {
    return <Navigate replace to="/profile" />;
  }
  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Login</h1>
        <form className='login-writeForm' autoComplete='off' onSubmit={formik.handleSubmit}>
          <div className="login-formGroup">
            <label>Email</label>
            <input type="email" placeholder='Email' name="email" onChange={formik.handleChange}
              value={formik.values.email} />
            {formik.errors.email ? <small>{formik.errors.email}</small> : null}
          </div>
          <div className="login-formGroup">
            <label>Password</label>
            <input type="password" placeholder='Password' name="password" onChange={formik.handleChange}
              value={formik.values.password} />
            {formik.errors.password ? <small>{formik.errors.password}</small> : null}
          </div>

          <div className="login-button">
            <button className='login-writeButton' type='submit'>Login</button>
            <Link to="/register">
              <button className='login-reg-writeButton' type='submit'>Register</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;
