import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Spinner";
import '../styles/Loginpage.css'

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const submitHandler = async (values) => {
    console.log(values)
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      message.success("Login Successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      setLoading(false);
      navigate("/add-expense");
    } catch (error) {
      setLoading(false);
      message.error("Wrong credentials");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-page">
      {loading && <Spinner />}
      <div className="login-container">
        <Link className="brand-title" to={"/"}>
          CashControl
        </Link>
        <div className="login-form-container">
          <Form
            layout="vertical"
            onFinish={submitHandler}
            className="login-form"
          >
            <h2 className="form-title">Login</h2>
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
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
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
              <Link to="/register" className="register-link">
                Not a user? Register here!
              </Link>
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
