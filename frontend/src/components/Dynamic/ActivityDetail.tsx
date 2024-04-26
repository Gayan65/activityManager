import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Spinner,
    Card,
    ListGroup,
    Stack,
    Badge,
    ProgressBar,
    CardGroup,
} from "react-bootstrap";
import DeleteActivity from "./DeleteActivity";
import CancelActivity from "./CancelActivity";
import EditNavigatorActivity from "./EditNavigatorActivity";

const ActivityDetail = () => {
    //DEFINE THE ACTIVITY OBJ
    interface Activity {
        id: number;
        title: string;
        status: number;
        description: string;
        url: string;
        startdate: string;
        enddate: string;
        tags: string[];
        statustype: string;
    }

    //DEFINE THE TASK OBJ
    interface Task {
        id: number;
        name: string;
    }

    //DEFINE THE ProgressionBar OBJ
    interface Progress {
        percent: number;
        variant: string;
    }

    // Function to format enddate
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Adjust format as per your requirements
    };

    //USE PARAMS TO FETCH THE ID FOR AXIOS CALL
    const params = useParams();

    //USE FOR NAVIGATING TO URLS
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity | null>(null);
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const [loader, setLoader] = useState(true);
    const [progressBar, setProgressBar] = useState<Progress | null>(null);

    //FETCH THE ACTIVITY DATA ONE THE PAGE IS BEING RENDERED
    useEffect(() => {
        axios
            //GETTING ACTIVITY FROM THE ACTIVITY ID
            .get(`http://localhost:4000/activity/${params.id}`)
            .then((response) => {
                setActivity(response.data.activity[0] as Activity);
                setLoader(false);

                //HANDLING PROGRESS BAR
                if (response.data.activity[0].status === 1)
                    setProgressBar({ percent: 20, variant: "secondary" });
                else if (response.data.activity[0].status === 2)
                    setProgressBar({ percent: 50, variant: "primary" });
                else if (response.data.activity[0].status === 3)
                    setProgressBar({ percent: 100, variant: "success" });
                else if (response.data.activity[0].status === 4)
                    setProgressBar({ percent: 100, variant: "danger" });
            })
            .catch((err) => navigate("/error"));

        //GETTING TASKS WITH RELEVANT TO THE ACTIVITY ID
        axios
            .get(`http://localhost:4000/task/activity/${params.id}`)
            .then((response) => {
                setTasks(response.data.tasks as Task[]);
                setLoader(false);
            })
            .catch((err) => navigate("/error"));
    }, [navigate, params.id]);
    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                <div className="content">
                    <div className="mainHeader">
                        <h1>Activity View</h1>
                    </div>
                    {activity && (
                        <Card>
                            <Card.Body>
                                <Card.Title>{activity.title}</Card.Title>
                                <Card.Body>
                                    <Stack direction="horizontal" gap={2}>
                                        {activity.tags &&
                                            activity.tags.map((tag, i) => (
                                                <Badge bg="primary" key={i}>
                                                    {tag}
                                                </Badge>
                                            ))}
                                    </Stack>
                                </Card.Body>
                                <Card.Text>{activity.description}</Card.Text>
                                <Card.Text>{activity.url}</Card.Text>
                                <Card.Text>
                                    From {formatDate(activity.startdate)} to{" "}
                                    {formatDate(activity.enddate)}{" "}
                                </Card.Text>
                                <Card.Text>{activity.statustype}</Card.Text>
                                {loader && <Spinner animation="border" />}
                                <ListGroup>
                                    {tasks && tasks.length > 0 ? (
                                        tasks.map((task) => (
                                            <ListGroup.Item
                                                key={task.id}
                                                action
                                                href={`/task/${task.id}`}
                                            >
                                                {task.name}
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item>
                                            No tasks to display
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card.Body>
                            {progressBar && (
                                <ProgressBar
                                    variant={progressBar.variant}
                                    now={progressBar.percent}
                                />
                            )}
                            <CardGroup>
                                {" "}
                                {/* PASSING PROPS TO THE DELETE COMPONENT*/}
                                {activity && (
                                    <DeleteActivity
                                        id={activity.id}
                                        title={activity.title}
                                    />
                                )}
                                {/* PASSING PROPS TO THE CANCEL COMPONENT*/}
                                {activity && (
                                    <CancelActivity
                                        id={activity.id}
                                        status={activity.status}
                                    />
                                )}
                                {activity &&
                                    (activity.status === 1 ||
                                        activity.status === 2) && (
                                        <EditNavigatorActivity
                                            id={activity.id}
                                        />
                                    )}
                            </CardGroup>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityDetail;
