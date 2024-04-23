import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

const Performance = () => {
  //DEFINE THE TASK OBJ
  interface TasksPerformance {
    createTask: number;
    completedTask: number;
    onGoingTask: number;
    canceledTask: number;
  }

  const [taskPerformance, setTaskPerformance] =
    useState<TasksPerformance | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/task/performance/task")
      .then((response) => {
        setTaskPerformance(response.data as TasksPerformance);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      Performance
      <div>
        {taskPerformance && (
          <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {" "}
                Nos of created Tasks {taskPerformance.createTask}
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Nos of Ongoing Tasks {taskPerformance.onGoingTask}
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Nos of completed Tasks {taskPerformance.completedTask}
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Nos of canceled Tasks {taskPerformance.canceledTask}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default Performance;
