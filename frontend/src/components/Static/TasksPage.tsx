import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Spinner, ListGroup, Card } from "react-bootstrap";

const TasksPage = () => {
  //DEFINE THE TASK OBJ
  interface Task {
    id: number;
    name: string;
  }

  const [allTasks, setAllTasks] = useState<Task[] | null>(null);
  const [loader, setLoader] = useState(true);

  //CALLING APIS ONCE PAGE LOADED
  useEffect(() => {
    //(GETTING ALL TASKS AND SET IT TO STATE)
    axios
      .get("http://localhost:4000/task/all")
      .then((response) => {
        if (response.data.success) {
          setAllTasks(response.data.tasks as Task[]);
          setLoader(false);
        } else {
          setAllTasks(null);
          setLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {/* MAP THE EXISTING TASKS, NEW TASKS */}
      Task Manage Page
      {/* ALL TASKS VIEW START*/}
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Active Tasks</Card.Title>
          {allTasks && allTasks.length > 0 ? (
            <ListGroup>
              {allTasks.map((task) => (
                <ListGroup.Item key={task.id} action href={`/task/${task.id}`}>
                  {task.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No tasks available.</p>
          )}
          {loader && <Spinner animation="border" />}
        </Card.Body>
      </Card>
      {/* ALL TASKS VIEW END*/}
    </Container>
  );
};

export default TasksPage;
