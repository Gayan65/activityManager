import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Spinner,
  Card,
  Accordion,
  Form,
  Button,
} from "react-bootstrap";

const TaskDetail = () => {
  //DEFINE THE TASK OBJ
  interface Task {
    id: number;
    name: string;
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
      {task && (
        <div>
          {/* DELETE TASK VIEW START*/}
          <Card style={{ width: "18rem" }} className="mt-5">
            <Card.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Delete Task</Accordion.Header>
                  <Accordion.Body>
                    Danger Zone: this section can be performed a delete activity
                    of a task.
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicTaskTile"
                      >
                        <Form.Control type="text" placeholder="Task title" />
                      </Form.Group>
                      <Button variant="danger" type="submit">
                        Delete
                      </Button>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>

          {/* DELETE TASK VIEW END*/}
        </div>
      )}
    </Container>
  );
};

export default TaskDetail;
