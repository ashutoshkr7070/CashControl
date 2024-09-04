import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const submitHandler = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values); // Ensure this URL is correct
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong during registration.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      
      <Form className="register-form" layout="vertical" onFinish={submitHandler}>
      <Link className="brand-title" to={"/"}>
          CashControl
        </Link>
        <h2 className="form-title">Register</h2>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input className="input-field" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" className="input-field" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input
            type={passwordVisible ? "text" : "password"}
            className="input-field"
            suffix={
              passwordVisible ? (
                <EyeInvisibleOutlined
                  onClick={() => setPasswordVisible(false)}
                  className="toggle-password-icon"
                />
              ) : (
                <EyeOutlined
                  onClick={() => setPasswordVisible(true)}
                  className="toggle-password-icon"
                />
              )
            }
          />
        </Form.Item>
        <div className="form-footer">
          <Link to="/login" className="login-link">
            Already registered? Click here to login
          </Link>
          <button type="submit" className="register-button">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
}
