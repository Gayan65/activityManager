import React from "react";
import { Container, Nav } from "react-bootstrap";

const Home = () => {
    return (
        <Container>
            <Nav className="flex-column">
                {/* LINKS TO PAGES */}
                <Nav.Link href="/tasks">Tasks</Nav.Link>
                <Nav.Link href="/performance">Performance</Nav.Link>
                <Nav.Link href="/notifications">Notifications</Nav.Link>
            </Nav>
            <Container>{/* CURRENT TASKS VIEW */}</Container>
            <Container>{/* PERFORMANCE VIEW */}</Container>
            <Container>{/* NOTIFICATIONS TASKS VIEW */}</Container>
        </Container>
    );
};

export default Home;
