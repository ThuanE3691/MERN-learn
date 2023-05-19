import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../layout/NavbarMenu";
import Loading from "../layout/Loading";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return <Loading></Loading>
  }

  return isAuthenticated ? (
    <>
      <NavbarMenu />
      <Component></Component>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default ProtectedRoute;
