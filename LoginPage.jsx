import React, { createContext, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { login } from './Service';

const LoginContext = createContext();

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(LoginContext);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      const result = login(values.username, values.password);
      if (result) {
        alert('Login Successful ✅');
        setIsLoggedIn(true);
      } else {
        alert('Invalid username & password ❌');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ padding: '20px' }}>
      <h2>Login</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.username && formik.errors.username && (
        <div style={{ color: 'red' }}>{formik.errors.username}</div>
      )}
      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password && (
        <div style={{ color: 'red' }}>{formik.errors.password}</div>
      )}
      <br /><br />

      <button type="submit">Login</button>
    </form>
  );
};

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contextValue = { isLoggedIn, setIsLoggedIn };

  return (
    <LoginContext.Provider value={contextValue}>
      {isLoggedIn ? (
        <h2>Welcome! You are logged in</h2>
      ) : (
        <LoginForm />
      )}
    </LoginContext.Provider>
  );
};

export default LoginPage;
