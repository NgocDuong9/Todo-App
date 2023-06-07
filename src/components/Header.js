import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "./context/Context";

const Header = (props) => {
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogOut = () => {
    if (localStorage.getItem("token")) {
      logout();
      navigate("/");
      toast.success("Logout success!");
    } else {
      toast.error("You need login!");
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <span>Duong-AppTodo</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-nav-dropdown">
            {((user && user.auth) || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto" activeKey={location.pathname}>
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="users" className="nav-link">
                    Manage User
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.email && (
                    <span className="nav-link">Welcome {user.email}</span>
                  )}
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {user && user.auth === true ? (
                      <NavDropdown.Item
                        onClick={() => {
                          handleLogOut();
                        }}
                      >
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
