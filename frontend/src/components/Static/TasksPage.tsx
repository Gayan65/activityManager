import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Spinner,
  ListGroup,
  Card,
  Badge,
  Button,
  Stack,
  ProgressBar,
} from "react-bootstrap";

const TasksPage = () => {
  //DEFINE THE TASK OBJ
  interface Task {
    id: number;
    name: string;
    content: string;
    tagnames: string[];
    enddate: string;
    statustype: number;
  }

  // Function to format enddate
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format as per your requirements
  };

  const [allTasks, setAllTasks] = useState<Task[] | null>(null);
  const [loader, setLoader] = useState(true);

  //CALLING APIS ONCE PAGE LOADED
  useEffect(() => {
    //(GETTING ALL TASKS AND SET IT TO STATE)
    axios
      .get("http://localhost:4000/task/all")
      .then((response) => {
        console.log(response.data);
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
      <Card style={{ width: "45rem" }}>
        <Card.Body>
          <Card.Title>All Tasks</Card.Title>
          {allTasks && allTasks.length > 0 ? (
            <ListGroup>
              {allTasks.map((task, id) => (
                <Card key={id}>
                  <Card.Body>
                    <Card.Title>
                      <Badge className="me-3" bg="secondary">
                        {id + 1}
                      </Badge>
                      {task.name}
                    </Card.Title>
                    <Card.Text>{task.content}</Card.Text>
                    <Button variant="primary" href={`/task/${task.id}`}>
                      View Task
                    </Button>
                    <Stack direction="horizontal" className="mt-2" gap={2}>
                      {task.tagnames &&
                        task.tagnames.map((tag, tagId) => (
                          <Badge key={tagId} pill bg="secondary">
                            {tag}
                          </Badge>
                        ))}
                      Due on {formatDate(task.enddate)}
                    </Stack>
                  </Card.Body>
                  <ProgressBar
                    variant={
                      task.statustype === 1
                        ? "secondary"
                        : task.statustype === 2
                        ? "primary"
                        : task.statustype === 3
                        ? "success"
                        : task.statustype === 4
                        ? "danger"
                        : "default"
                    }
                    now={
                      task.statustype === 1
                        ? 20
                        : task.statustype === 2
                        ? 50
                        : task.statustype === 3
                        ? 100
                        : task.statustype === 4
                        ? 100
                        : 100
                    }
                  />
                </Card>
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
