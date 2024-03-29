import axios from "axios";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const CreateTask = () => {
  //DECLARE ACTIVITY TYPE
  type Activity = {
    id: number;
    title: string;
  };
  //FORM DATA ONCE PAGE LOAD (only for task and NO TAGS INVOLVED!)
  const defaultFormData = {
    name: "",
    content: "",
    startdate: "",
    enddate: "",
    activityid: "",
    status: 1,
    tags: "",
  };

  //-------------FORM DATA SET TO THE STATE-----------------
  const [formData, setFormData] = useState(defaultFormData); // FORM DATA
  const [activityData, setActivityData] = useState<Activity[] | null>(null); // ACTIVITY DATA
  const [errorMessage, setErrorMessage] = useState("");

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

    // Check if activityid is selected
    if (!formData.activityid) {
      setErrorMessage("Please select an activity");
      return;
    }
    //ADD A HANDLER FOR CHECK START DATE NO CHECK YET
    if (formData.startdate > formData.enddate) {
      setErrorMessage("Please check the start date");
      return;
    }

    //Making a query string
    const data = qs.stringify(formData);

    //Calling axios to send the data to api
    axios
      .post("http://localhost:4000/task/create", data)
      .then((response) => {
        console.log(response.data);
        //Update the notification table
        const notification = {
          taskId: response.data.task.id,
          status: "created",
        };
        const notificationData = qs.stringify(notification);
        axios
          .post("http://localhost:4000/notification/task", notificationData)
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    setErrorMessage("Data Add successfully");

    setFormData(defaultFormData);

    //THE ERROR MESSAGE WILL BE GONE IN 3S
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  //--------------GET API DATA ONCE LOAD THE PAGE-----------------------
  useEffect(() => {
    //GET CURRENT ACTIVITIES FOR FETCHING THE DROPDOWN UNDER ACTIVITIES IN THE FORM
    axios
      .get("http://localhost:4000/activity/current/all")
      .then((response) => {
        setActivityData(response.data.activities as Activity[]);
      })
      .catch((err) => console.log(err));
  }, [errorMessage]);

  return (
    <Container className="mt-5">
      <Card style={{ width: "35rem" }}>
        <Card.Body>
          <Card.Title>Task Create </Card.Title>
          <Form method="POST" onSubmit={onSubmit}>
            {/* TASK NAME START */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                onChange={onChange}
                value={formData.name}
                required
              />
            </Form.Group>
            {/* TASK NAME END */}

            {/* TASK CONTENT START */}
            <Form.Group className="mb-3" controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Content"
                name="content"
                onChange={onChange}
                value={formData.content}
                required
              />
            </Form.Group>
            {/* TASK CONTENT END */}

            {/* TASK STAR DATE START */}
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Start Date"
                name="startdate"
                onChange={onChange}
                value={formData.startdate}
                required
              />
            </Form.Group>
            {/* TASK START DATE END */}

            {/* TASK END DATE START */}
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="End Date"
                value={formData.enddate}
                name="enddate"
                onChange={onChange}
                required
              />
            </Form.Group>
            {/* TASK END DATE END */}

            {/* TASK ACTIVITY CHOICE START */}
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Select your Activity</Form.Label>
              <Form.Control
                as="select"
                name="activityid"
                value={formData.activityid}
                onChange={onChange}
                required
              >
                <option value={""}>No Activity selected</option>
                {activityData
                  ? activityData.map((activity) => (
                      <option key={activity.id} value={activity.id}>
                        {activity.title}
                      </option>
                    ))
                  : null}
              </Form.Control>
            </Form.Group>
            {/* TASK ACTIVITY CHOICE END */}
            {/* TAG START */}
            <Form.Group className="mb-3" controlId="formBasicContent">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Tags"
                name="tags"
                onChange={onChange}
                value={formData.tags}
              />
            </Form.Group>
            {/* TAG END */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {errorMessage && (
              <Alert
                className="mt-3"
                variant={
                  errorMessage === "Data Add successfully"
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
    </Container>
  );
};

export default CreateTask;
