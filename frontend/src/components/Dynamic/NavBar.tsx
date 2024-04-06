import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Badge,
  Button,
  NavDropdown,
} from "react-bootstrap";
import NotificationDropDown from "./NotificationDropDown";
import axios from "axios";

const NavBar = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, [notifications]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/notification/all"
      );
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const clearAllNotifications = () => {
    axios
      .delete("http://localhost:4000/notification/clear")
      .catch((err) => console.log(err));
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
              Notifications <Badge bg="secondary">{notifications.length}</Badge>
            </Dropdown.Toggle>
            {/* NOTIFICATION DROP DOWN START*/}
            <Dropdown.Menu>
              {notifications.length > 0 && (
                <Button variant="primary" onClick={clearAllNotifications}>
                  Clear All
                </Button>
              )}
              <NotificationDropDown />
            </Dropdown.Menu>
            {/* NOTIFICATION DROP DOWN END*/}
          </Dropdown>

          {/* SEARCH DROP DOWN START*/}
          <NavDropdown title="Search" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          {/* SEARCH DROP DOWN END*/}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
