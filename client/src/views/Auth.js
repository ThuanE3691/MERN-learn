import React from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  } else if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  } else {
    body = (
      <>
        {authRoute === "login" && <LoginForm></LoginForm>}
        {authRoute === "register" && <RegisterForm></RegisterForm>}
      </>
    );
  }

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
