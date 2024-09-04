import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { message } from "antd";
import "../Header.css";

export default function Header() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/");
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid custom">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
                <img src="./money-box.png" className="navbar-logo" alt="CashControl" />
                <h5 className="navbar-logo">CashControl</h5>
             
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <h4 className=" user-name nav-link">
                  {loginUser && loginUser.name}
                </h4>
              </li>
              <li className="nav-item ms-3">
                <button
                  onClick={logoutHandler}
                  className="btn btn-light logout-btn"
                  aria-label="Logout"
                  title="Logout"
                >
                  <FaSignOutAlt size={20} className="logout-icon" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
