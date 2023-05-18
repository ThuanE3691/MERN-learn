import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  // Context

  const { registerUser } = useContext(AuthContext);

  const [alert, setAlert] = useState(null);

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password do not match" });
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    
    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success === false) {
        setAlert({ type: "danger", message: registerData.message });
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
      <Form onSubmit={register}>
      <AlertMessage info={alert}></AlertMessage>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            className="mt-4"
            value = {username}
            onChange = {onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            className="mt-4"
            value = {password}
            onChange = {onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            className="mt-4"
            value = {confirmPassword}
            onChange = {onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-4">
          Register
        </Button>
      </Form>
      <div className="loginform-register">
        <p>Already have an account ?</p>
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-4">
            Login Now
          </Button>
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
