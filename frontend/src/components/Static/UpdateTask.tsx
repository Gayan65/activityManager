import axios from "axios";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const UpdateTask = () => {
  //USE NAVIGATE TO DIRECT TO THE ERROR PAGE
  const navigate = useNavigate();
  //USE PARAMS TO FETCH THE ID FOR AXIOS CALL
  const params = useParams();

  //FORM DATA ONCE PAGE LOAD (only for task and NO TAGS INVOLVED!)
  const defaultFormData = {
    name: "",
    content: "",
    startdate: "",
    enddate: "",
    activityid: "",
    status: "",
    tags: "",
  };

  //DECLARE ACTIVITY TYPE
  type Activity = {
    id: number;
    title: string;
  };

  //DECLARE STATUS TYPE
  type Status = {
    id: number;
    title: string;
  };

  //-------------FORM DATA SET TO THE STATE-----------------
  const [formData, setFormData] = useState(defaultFormData); // FORM DATA
  const [activityData, setActivityData] = useState<Activity[] | null>(null); // ACTIVITY DATA
  const [statusData, setStatusData] = useState<Status[] | null>(null); // ACTIVITY DATA
  const [errorMessage, setErrorMessage] = useState("");

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
    console.log(data);
    //Calling axios to send the data to api
    axios
      .patch(`http://localhost:4000/task/update/${params.id}`, data)
      .then((response) => {
        console.log(response.data);
        //Update the notification table
        const notification = {
          taskId: response.data.task.id,
          status: "updated",
        };
        const notificationData = qs.stringify(notification);
        axios
          .post("http://localhost:4000/notification/task", notificationData)
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    setErrorMessage("Data Updated successfully");

    //THE ERROR MESSAGE WILL BE GONE IN 3S
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  useEffect(() => {
    //GET TASK DETAIL FROM THE API
    axios
      .get(`http://localhost:4000/task/${params.id}`)
      .then((response) => {
        const taskData = response.data.task[0];
        // Convert the date format from API to match "yyyy-MM-dd"
        const startDate = new Date(taskData.startdate)
          .toISOString()
          .split("T")[0];
        const endDate = new Date(taskData.enddate).toISOString().split("T")[0];
        // Update the formData with the converted dates
        setFormData({
          ...taskData,
          startdate: startDate,
          enddate: endDate,
        });
        console.log(taskData);
      })
      .catch((err) => navigate("/error"));

    //GET ACTIVITY DETAIL FROM THE API
    axios
      .get("http://localhost:4000/activity/all")
      .then((response) => {
        setActivityData(response.data.activities as Activity[]);
      })
      .catch((err) => console.log(err));

    //GET STATUS DETAIL FROM THE API
    axios
      .get("http://localhost:4000/status/active")
      .then((response) => {
        setStatusData(response.data.status as Status[]);
      })
      .catch((err) => console.log(err));
  }, [navigate, params.id]);

  return (
    <Container>
      <Card style={{ width: "35rem" }}>
        <Card.Body>
          <Card.Title>Update Task</Card.Title>
          <Container>
            {formData && (
              <Form method="PATCH" onSubmit={onSubmit}>
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
                    {activityData ? (
                      activityData.map((activity) => (
                        <option key={activity.id} value={activity.id}>
                          {activity.title}
                        </option>
                      ))
                    ) : (
                      <option>No active Activities</option>
                    )}
                  </Form.Control>
                </Form.Group>
                {/* TASK ACTIVITY CHOICE END */}

                {/* STATUS CHOICE START */}
                <Form.Group className="mb-3" controlId="formBasicSelect">
                  <Form.Label>Status of your task</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={formData.status}
                    onChange={onChange}
                    required
                  >
                    {statusData ? (
                      statusData.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.title}
                        </option>
                      ))
                    ) : (
                      <option>No Status found</option>
                    )}
                  </Form.Control>
                </Form.Group>
                {/* STATUS CHOICE END */}

                {/* TAG START */}
                <Form.Group className="mb-3" controlId="formBasicContent">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Tags"
                    name="tags"
                    onChange={onChange}
                    value={
                      Array.isArray(formData.tags)
                        ? formData.tags.join(", ").replace(/#/g, "")
                        : formData.tags
                    }
                  />
                </Form.Group>
                {/* TAG END */}
                <Button variant="primary" type="submit">
                  Save
                </Button>
                {errorMessage && (
                  <Alert
                    className="mt-3"
                    variant={
                      errorMessage === "Data Updated successfully"
                        ? "success"
                        : "danger"
                    }
                  >
                    {errorMessage}
                  </Alert>
                )}
              </Form>
            )}
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateTask;
