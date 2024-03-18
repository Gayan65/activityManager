import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner, Card } from "react-bootstrap";
import DeleteTask from "./DeleteTask";
import CancelTask from "./CancelTask";

const TaskDetail = () => {
  //DEFINE THE TASK OBJ
  interface Task {
    id: number;
    name: string;
    status: number;
  }

  //USE PARAMS TO FETCH THE ID FOR AXIOS CALL
  const params = useParams();

  //USE FOR NAVIGATING TO URLS
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loader, setLoader] = useState(true);

  //CALLING BACKEND API TO FETCH THE DATA
  useEffect(() => {
    axios
      .get(`http://localhost:4000/task/${params.id}`)
      .then((response) => {
        setTask(response.data.activity[0] as Task);
        setLoader(false);
      })
      .catch((err) => navigate("/error"));
  }, [navigate, params.id]);

  return (
    <Container>
      Task Detail Page
      {task && (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{task.name}</Card.Title>
            {loader && <Spinner animation="border" />}
          </Card.Body>
        </Card>
      )}
      {/* PASSING PROPS TO THE DELETE COMPONENT*/}
      {task && <DeleteTask id={task.id} name={task.name} />}
      {/* PASSING PROPS TO THE CANCEL TASK COMPONENT*/}
      {task && <CancelTask id={task.id} />}
    </Container>
  );
};

export default TaskDetail;
