import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AlertMessage from "../layout/AlertMessage";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  // Context

  const { loginUser } = useContext(AuthContext);

  const [alert, setAlert] = useState(null);

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success === false) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={login}>
        <AlertMessage info={alert}></AlertMessage>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            className="mt-4"
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            className="mt-4"
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-4">
          Login
        </Button>
      </Form>
      <div className="loginform-register">
        <p>Don't have an account ?</p>
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-4">
            Register Now
          </Button>
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
