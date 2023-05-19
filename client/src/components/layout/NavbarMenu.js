import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {
  const {
    authState: { user: {username} },
    logoutUser,
  } = useContext(AuthContext);
  

  const logout = () => logoutUser();

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="fw-bold text-white ms-4">
        <img
          src={learnItLogo}
          alt="learnItLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        LearnIt
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav d-flex align-items-center">
        <Nav className="me-auto">
          <Nav.Link className="fw-bold text-white" to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>
          <Nav.Link className="fw-bold text-white" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>
        <Nav className="me-4">
          <Nav.Link className="fw-bold text-white" disable = "true">
            Welcome {username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="fw-bolder text-white"
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="Logout Icon"
              width="32"
              height="32"
              className="me-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
