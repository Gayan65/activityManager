import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import NotificationDropDown from "../Dynamic/NotificationDropDown";
import axios from "axios";

const TopNav = () => {
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
        <header className="main-header " id="header">
            <nav className="navbar navbar-static-top">
                <button id="sidebar-toggler" className="sidebar-toggle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-menu-button"
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z" />
                        <path d="m7.823 2.823-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                    </svg>
                </button>
                <div className="search-form d-none d-lg-inline-block">
                    <div className="input-group"></div>
                </div>
                <Navbar data-bs-theme="dark">
                    <Nav className="me-auto">
                        <Nav.Link href="/search" className="search-btn">
                            <div className="navbar-right ">
                                <ul className="nav navbar-nav">
                                    <li className="notifications-menu">
                                        <button className="dropdown-toggle notify-toggler custom-dropdown-toggler search">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="22"
                                                height="22"
                                                fill="currentColor"
                                                className="bi bi-search"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <div className="navbar-right ">
                                    <ul className="nav navbar-nav">
                                        <li className="dropdown notifications-menu custom-dropdown">
                                            <div className="notification-main dropdown-toggle notify-toggler custom-dropdown-toggler">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="25"
                                                    height="25"
                                                    fill="currentColor"
                                                    className="bi bi-bell"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                                                </svg>
                                                <sup className="notificationNumber">
                                                    {notifications.length}
                                                </sup>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Dropdown.Toggle>
                            {/* NOTIFICATION DROP DOWN START*/}
                            <Dropdown.Menu>
                                {notifications.length > 0 && (
                                    <Button
                                        className="clear-button"
                                        onClick={clearAllNotifications}
                                    >
                                        Clear All
                                    </Button>
                                )}
                                <NotificationDropDown />
                            </Dropdown.Menu>
                            {/* NOTIFICATION DROP DOWN END*/}
                        </Dropdown>
                    </Nav>
                </Navbar>
            </nav>
        </header>
    );
};

export default TopNav;
