import React, { useContext, useEffect, useRef, useMemo } from "react";
import { useFormik } from "formik";
import { login } from "../services/Service.js";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const LoginPage = () => {
  const { setIsLoggedIn, setUsername } = useContext(LoginContext);
  const navigate = useNavigate();
  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const validate = useMemo(() => {
    return (values) => {
      const errors = {};
      if (!values.username) errors.username = "Username is required";
      if (!values.password) errors.password = "Password is required";
      return errors;
    };
  }, []);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validate,
    onSubmit: (values) => {
      const result = login(values.username, values.password);
       if (result) {
      alert("Login Successful ✅");
      setIsLoggedIn(true);
      setUsername(values.username); // 👈 username save कर लिया context में
      navigate("/dashboard");
    } else {
      alert("Invalid username & password ❌");
    }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-4 text-primary fw-bold">🔐 Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              ref={usernameRef}
              type="text"
              className={`form-control ${
                formik.touched.username && formik.errors.username
                  ? "is-invalid"
                  : ""
              }`}
              name="username"
              placeholder="Enter username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="invalid-feedback">{formik.errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
              name="password"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
