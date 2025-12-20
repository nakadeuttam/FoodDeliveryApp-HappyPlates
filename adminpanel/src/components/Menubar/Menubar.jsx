import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogout } from "../../services/adminAuthService";

const Menubar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <button className="btn btn-primary" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;