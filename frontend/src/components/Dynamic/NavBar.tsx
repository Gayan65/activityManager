import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Activity_Manager</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/tasks">Manage Tasks</Nav.Link>
          <Nav.Link href="/activities">Manage Activities</Nav.Link>
          <Nav.Link href="/performance">Performance</Nav.Link>
          <Nav.Link href="/notifications">Notifications</Nav.Link>
          <Nav.Link href="/create/task">Add Task</Nav.Link>
          <Nav.Link href="/create/activity">Add Activity</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
