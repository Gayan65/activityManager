import React, { useState } from "react";
import qs from "qs";
import axios from "axios";
import { Form, Button, Card, Container, Alert, Badge } from "react-bootstrap";

const Search = () => {
  //DEFINE THE TASK OBJ
  interface Task {
    id: number;
    name: string;
    content: string;
    enddate: string;
    statustype: number;
  }

  //DEFINE THE TASK OBJ
  interface Activity {
    id: number;
    title: string;
    description: string;
    enddate: string;
    statustype: number;
  }

  //FORM DATA ONCE PAGE LOAD
  const defaultFormData = {
    name: "",
    status: 1,
    startdate: "",
    enddate: "",
  };

  //-------------FORM DATA SET TO THE STATE-----------------
  const [formData, setFormData] = useState(defaultFormData); // FORM DATA
  const [selectedOption, setSelectedOption] = useState<string>("Activity"); //STATE FOR RADIO BUTTONS
  const [errorMessage, setErrorMessage] = useState("");
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [activities, setActivities] = useState<Activity[] | null>(null);

  //HANDLING RADIO BUTTON EVENTS
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  //--------------HANDLE INPUT CHANGE-----------------
  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prevSate) => ({
      ...prevSate,
      [e.target.name]: e.target.value,
    }));
  };

  //--------------HANDLE FORM SUBMIT-------------------
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //ADD A HANDLER FOR CHECK START DATE NO CHECK YET
    if (formData.startdate > formData.enddate) {
      setErrorMessage("Please check the date fields");
      return;
    }

    //Making a query string
    const data = qs.stringify(formData);

    //Calling axios to send the data to api
    console.log(formData);
    setErrorMessage("Data add successfully");
    if (selectedOption === "Task") {
      axios
        .post("http://localhost:4000/task/search", data)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setTasks(response.data.tasks as Task[]);
          } else {
            setTasks(null);
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:4000/activity/search", data)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setActivities(response.data.Activities as Activity[]);
          } else {
            setTasks(null);
          }
        })
        .catch((err) => console.log(err));
    }

    setFormData(defaultFormData);

    //THE ERROR MESSAGE WILL BE GONE IN 3S
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  return (
    <Container className="mt-5">
      <Card style={{ width: "45rem" }}>
        <Card.Body>
          <Card.Title>Search here</Card.Title>

          <Form method="POST" onSubmit={onSubmit}>
            <Form.Check
              inline
              label="Activity"
              name="group1"
              type="radio"
              id="radio1"
              value="Activity"
              checked={selectedOption === "Activity"}
              onChange={handleRadioChange}
            />
            <Form.Check
              inline
              label="Task"
              name="group1"
              type="radio"
              id="radio2"
              value="Task"
              checked={selectedOption === "Task"}
              onChange={handleRadioChange}
            />
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Name"
                onChange={onChange}
                name="name"
                value={formData.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Select Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                onChange={onChange}
                value={formData.status}
              >
                <option value={1}>New</option>
                <option value={2}>In Process</option>
                <option value={3}>Completed</option>
                <option value={4}>Cancelled</option>
                <option value={5}>All</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Start Date"
                name="startdate"
                onChange={onChange}
                value={formData.startdate}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="End Date"
                name="enddate"
                onChange={onChange}
                value={formData.enddate}
              />
            </Form.Group>

            <Button type="submit" className="mb-2">
              Search
            </Button>
            {errorMessage && (
              <Alert
                className="mt-3"
                variant={
                  errorMessage === "Data add successfully"
                    ? "success"
                    : "danger"
                }
              >
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
      <Card className="mt-5" style={{ width: "45rem" }}>
        <Card.Body>
          <Card.Title>Search Result</Card.Title>
          {selectedOption === "Task" &&
            tasks &&
            tasks.map((task, id) => (
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
                </Card.Body>
              </Card>
            ))}
          {selectedOption === "Activity" &&
            activities &&
            activities.map((activity, id) => (
              <Card style={{ width: "35rem" }} key={id}>
                <Card.Body>
                  <Card.Title>
                    <Badge className="me-3" bg="secondary">
                      {id + 1}
                    </Badge>
                    {activity.title}
                  </Card.Title>
                  <Card.Text>{activity.description}</Card.Text>
                  <Button variant="primary" href={`/activity/${activity.id}`}>
                    View Task
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Search;
