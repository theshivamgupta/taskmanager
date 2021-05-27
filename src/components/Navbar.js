import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function NavbarComponent() {
  const { logout } = useAuth();

  const history = useHistory();

  async function handleLogout(event) {
    event.preventDefault();
    try {
      await logout();
      history.push("/accounts/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Navbar bg="light" expand="true" animation="false">
      <Navbar.Brand as={Link} to="/" animation="false">
        TaskManager
      </Navbar.Brand>
      <Nav animation="false">
        <Nav.Item
          as={Button}
          variant="danger"
          to="/user"
          onClick={handleLogout}
          animation="false"
        >
          Logout
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
