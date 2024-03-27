import React, { useState } from "react";
import { Navbar, Container, Nav, Dropdown, Badge } from "react-bootstrap";
import NotificationDropDown from "./NotificationDropDown";

const NavBar = () => {
  const [notificationCount, setNotificationCount] = useState<number>(0);

  const updateNotificationCount = (count: number) => {
    setNotificationCount(count);
  };
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
              Notifications <Badge bg="secondary">{notificationCount}</Badge>
            </Dropdown.Toggle>
            {/* NOTIFICATION DROP DOWN START*/}
            <Dropdown.Menu>
              <NotificationDropDown
                updateNotificationCount={updateNotificationCount}
              />
            </Dropdown.Menu>
            {/* NOTIFICATION DROP DOWN END*/}
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
