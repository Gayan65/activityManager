import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner, Card } from "react-bootstrap";

const ActivityDetail = () => {
    //DEFINE THE ACTIVITY OBJ
    interface Activity {
        id: number;
        title: string;
    }

    //DEFINE THE TASK OBJ
    interface Task {
        id: number;
        name: string;
    }

    //USE PARAMS TO FETCH THE ID FOR AXIOS CALL
    const params = useParams();

    //USE FOR NAVIGATING TO URLS
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity | null>(null);
    const [tasks, setTasks] = useState<Task | null>(null);
    const [loader, setLoader] = useState(true);

    //FETCH THE ACTIVITY DATA ONE THE PAGE IS BEING RENDERED
    useEffect(() => {
        axios
            //GETTING ACTIVITY FROM THE ACTIVITY ID
            .get(`http://localhost:4000/activity/${params.id}`)
            .then((response) => {
                setActivity(response.data.activity[0] as Activity);
                setLoader(false);
            })
            .catch((err) => navigate("/error"));

        //GETTING TASKS WITH RELEVANT TO THE ACTIVITY ID
        axios
            .get(`http://localhost:4000/task/activity/${params.id}`)
            .then((response) => {
                setTasks(response.data.tasks as Task);
                //MAKE A CONSOLE.LOG TO SEE THE TASKS
                setLoader(false);
            })
            .catch((err) => navigate("/error"));
    }, [navigate, params.id]);
    return (
        <Container>
            Activity Detail Page
            {activity && (
                <Card style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title>{activity.title}</Card.Title>
                        {loader && <Spinner animation="border" />}
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default ActivityDetail;
