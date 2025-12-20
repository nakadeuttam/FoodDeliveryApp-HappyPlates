import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogin } from "../../services/adminAuthService";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await adminLogin(credentials);
      if (response.status === 200) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Admin privileges required.");
      } else if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unable to login. Please try again");
      }
    }
  };

  return (
    <div className="admin-login-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-3">
                  Admin Login
                </h5>
                <form onSubmit={onSubmitHandler}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      onChange={onChangeHandler}
                      value={credentials.email}
                      required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      onChange={onChangeHandler}
                      value={credentials.password}
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;