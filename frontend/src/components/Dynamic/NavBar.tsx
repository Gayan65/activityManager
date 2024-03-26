import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import NotificationDropDown from "./NotificationDropDown";

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Activity_Manager</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/tasks">Manage Tasks</Nav.Link>
          <Nav.Link href="/activities">Manage Activities</Nav.Link>
          <Nav.Link href="/performance">Performance</Nav.Link>
          <Nav.Link href="/create/task">Add Task</Nav.Link>
          <Nav.Link href="/create/activity">Add Activity</Nav.Link>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Notification
            </Dropdown.Toggle>
            {/* NOTIFICATION DROP DOWN START*/}
            <Dropdown.Menu>
              <NotificationDropDown />
            </Dropdown.Menu>
            {/* NOTIFICATION DROP DOWN END*/}
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
