import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Spinner,
  ListGroup,
  Card,
  Button,
  Badge,
  Stack,
} from "react-bootstrap";

const Home = () => {
  //DEFINE THE TASK OBJ
  interface Task {
    id: number;
    name: string;
    content: string;
    tagnames: string[];
    enddate: string;
  }

  // Function to format enddate
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format as per your requirements
  };

  const [activeTasks, setActiveTasks] = useState<Task[] | null>(null);
  const [loader, setLoader] = useState(true);

  //CALLING APIS ONCE PAGE LOADED
  useEffect(() => {
    //(GETTING ALL ACTIVE TASKS AND SET IT TO STATE)
    axios
      .get("http://localhost:4000/task/active")
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setActiveTasks(response.data.tasks as Task[]);
          setLoader(false);
        } else {
          setActiveTasks(null);
          setLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Container>
        {/* CURRENT TASKS VIEW START*/}
        <Card style={{ width: "40rem" }}>
          <Card.Body>
            <Card.Title>Current Tasks</Card.Title>
            {activeTasks && activeTasks.length > 0 ? (
              <ListGroup>
                {activeTasks.map((task, id) => (
                  <Card style={{ width: "35rem" }} key={id}>
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
                  </Card>
                ))}
              </ListGroup>
            ) : (
              <p>No active tasks available.</p>
            )}
            {loader && <Spinner animation="border" />}
          </Card.Body>
        </Card>
        {/* CURRENT TASKS VIEW ENDS*/}
      </Container>
      <Container>{/* PERFORMANCE VIEW */}</Container>
      <Container>{/* NOTIFICATIONS TASKS VIEW */}</Container>
    </Container>
  );
};

export default Home;
