import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Spinner,
  Card,
  ProgressBar,
  CardGroup,
  Stack,
  Badge,
} from "react-bootstrap";
import DeleteTask from "./DeleteTask";
import CancelTask from "./CancelTask";
import EditNavigator from "./EditNavigator";

const TaskDetail = () => {
  //DEFINE THE TASK OBJ
  interface Task {
    id: number;
    name: string;
    status: number;
    content: string;
    startdate: string;
    enddate: string;
    statustype: string;
    tags: string[];
  }

  //DEFINE THE ProgressionBar OBJ
  interface Progress {
    percent: number;
    variant: string;
  }

  //USE PARAMS TO FETCH THE ID FOR AXIOS CALL
  const params = useParams();

  //USE FOR NAVIGATING TO URLS
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loader, setLoader] = useState(true);
  const [progressBar, setProgressBar] = useState<Progress | null>(null);

  // Function to format enddate
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format as per your requirements
  };

  //CALLING BACKEND API TO FETCH THE DATA
  useEffect(() => {
    axios
      .get(`http://localhost:4000/task/${params.id}`)
      .then((response) => {
        setTask(response.data.task[0] as Task);
        setLoader(false);
        console.log(response.data.task[0]);

        //HANDLING PROGRESS BAR
        if (response.data.task[0].status === 1)
          setProgressBar({ percent: 20, variant: "secondary" });
        else if (response.data.task[0].status === 2)
          setProgressBar({ percent: 50, variant: "primary" });
        else if (response.data.task[0].status === 3)
          setProgressBar({ percent: 100, variant: "success" });
        else if (response.data.task[0].status === 4)
          setProgressBar({ percent: 100, variant: "danger" });
      })
      .catch((err) => navigate("/error"));
  }, [navigate, params.id]);

  return (
    <Container>
      Task Detail Page
      {task && (
        <Card>
          <Card.Body>
            <Card.Title>{task.name}</Card.Title>
            {loader && <Spinner animation="border" />}
            <Stack direction="horizontal" gap={2}>
              {task.tags.map((tag, i) => (
                <Badge bg="primary" key={i}>
                  {tag}
                </Badge>
              ))}
            </Stack>

            <Card.Text>{task.content}</Card.Text>
            <Card.Text>
              From {formatDate(task.startdate)} to {formatDate(task.enddate)}
            </Card.Text>
            <Card.Text>{task.statustype}</Card.Text>
            {progressBar && (
              <ProgressBar
                variant={progressBar.variant}
                now={progressBar.percent}
              />
            )}
          </Card.Body>
          <CardGroup>
            {/* PASSING PROPS TO THE DELETE COMPONENT*/}
            {task && <DeleteTask id={task.id} name={task.name} />}
            {/* PASSING PROPS TO THE CANCEL TASK COMPONENT*/}
            {task && <CancelTask id={task.id} status={task.status} />}
            {/* EDIT TASK COMPONENT VISIBILITY LOGIC*/}
            {task && (task.status === 1 || task.status === 2) && (
              <EditNavigator id={task.id} />
            )}
          </CardGroup>
        </Card>
      )}
    </Container>
  );
};

export default TaskDetail;
