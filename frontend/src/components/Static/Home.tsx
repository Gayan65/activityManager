import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav, Spinner, ListGroup, Card } from "react-bootstrap";

const Home = () => {
    //DEFINE THE TASK OBJ
    interface Task {
        id: number;
        name: string;
    }

    const [activeTasks, setActiveTasks] = useState<Task[] | null>(null);
    const [loader, setLoader] = useState(true);

    //CALLING APIS ONCE PAGE LOADED
    useEffect(() => {
        //(GETTING ALL ACTIVE TASKS AND SET IT TO STATE)
        axios
            .get("http://localhost:4000/task/active")
            .then((response) => {
                if (response.data.success) {
                    setActiveTasks(response.data.tasks as Task[]);
                    setLoader(false);
                } else {
                    setActiveTasks(null);
                    setLoader(false);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Container>
            <Nav className="flex-column">
                {/* LINKS TO PAGES START*/}
                <Nav.Link href="/tasks">Manage Tasks</Nav.Link>
                <Nav.Link href="/activities">Manage Activities</Nav.Link>
                <Nav.Link href="/performance">Performance</Nav.Link>
                <Nav.Link href="/notifications">Notifications</Nav.Link>
                {/* LINKS TO PAGES END*/}
            </Nav>
            <Container>
                {/* CURRENT TASKS VIEW START*/}
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>Active Tasks</Card.Title>
                        {activeTasks && activeTasks.length > 0 ? (
                            <ListGroup>
                                {activeTasks.map((task) => (
                                    <ListGroup.Item key={task.id}>
                                        {task.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>No active tasks available.</p>
                        )}
                        {loader && <Spinner animation="border" />}
                    </Card.Body>
                </Card>
                {/* CURRENT TASKS VIEW ENDS*/}
            </Container>
            <Container>{/* PERFORMANCE VIEW */}</Container>
            <Container>{/* NOTIFICATIONS TASKS VIEW */}</Container>
        </Container>
    );
};

export default Home;
