import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Spinner, ListGroup, Card } from "react-bootstrap";

const ActivityPage = () => {
    //DEFINE THE ACTIVITY OBJ
    interface Activity {
        id: number;
        title: string;
    }

    const [allActivities, setAllActivities] = useState<Activity[] | null>(null);
    const [loader, setLoader] = useState(true);

    //CALLING APIS ONCE PAGE LOADED
    useEffect(() => {
        //(GETTING ALL ACTIVITIES AND SET IT TO STATE)
        axios
            .get("http://localhost:4000/activity/all")
            .then((response) => {
                if (response.data.success) {
                    setAllActivities(response.data.activities as Activity[]);
                    setLoader(false);
                } else {
                    setAllActivities(null);
                    setLoader(false);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Container>
            {/* MAP THE EXISTING ACTIVITIES, NEW ACTIVITIES */}
            Activity Manage Page
            {/* ALL ACTIVITY VIEW START*/}
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>Activity Manager</Card.Title>
                    {allActivities && allActivities.length > 0 ? (
                        <ListGroup>
                            {allActivities.map((activity) => (
                                <ListGroup.Item
                                    action
                                    key={activity.id}
                                    href={`/activity/${activity.id}`}
                                >
                                    {activity.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No tasks available.</p>
                    )}
                    {loader && <Spinner animation="border" />}
                </Card.Body>
            </Card>
            {/* ALL ACTIVITY VIEW END*/}
        </Container>
    );
};

export default ActivityPage;
