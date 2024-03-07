import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Card } from "react-bootstrap";

const ActivityDetail = () => {
    //DEFINE THE ACTIVITY OBJ
    interface Activity {
        id: number;
        title: string;
    }

    //USE PARAMS TO FETCH THE ID FOR AXIOS CALL
    const params = useParams();

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
            .catch((err) => console.log(err)); // ++ THIS WILL APPEAR ONCE THE PARAM.ID BECOME UNDEFINE (URL/ID BECOME NOT EX), NEED TO DIRECT TO THE ERROR PAGE
    }, []);
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
