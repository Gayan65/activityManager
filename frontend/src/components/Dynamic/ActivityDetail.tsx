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

    //USE PARAMS TO FETCH THE ID FOR AXIOS CALL
    const params = useParams();

    //USE FOR NAVIGATING TO URLS
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity | null>(null);
    const [loader, setLoader] = useState(true);

    //FETCH THE ACTIVITY DATA ONE THE PAGE IS BEING RENDERED
    useEffect(() => {
        axios
            .get(`http://localhost:4000/activity/${params.id}`)
            .then((response) => {
                setActivity(response.data.activity[0] as Activity);
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
