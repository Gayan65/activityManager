import axios from "axios";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const CreateActivity = () => {
  //DECLARE ACTIVITY TYPE
  type ActivityType = {
    id: number;
    name: string;
  };

  //FORM DATA ONCE PAGE LOAD (only for task and NO TAGS INVOLVED!)
  const defaultFormData = {
    title: "",
    description: "",
    url: "",
    startdate: "",
    enddate: "",
    status: 1,
    activitytype: "",
    tags: "",
  };

  //-------------FORM DATA SET TO THE STATE-----------------
  const [formData, setFormData] = useState(defaultFormData); // FORM DATA
  const [activityTypeData, setActivityTypeData] = useState<
    ActivityType[] | null
  >(null); // ACTIVITY TYPE DATA
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
    if (!formData.activitytype) {
      setErrorMessage("Please select an activity type");
      return;
    }
    //ADD A HANDLER FOR CHECK START DATE NO CHECK YET
    if (formData.startdate > formData.enddate) {
      setErrorMessage("Please check the start date");
      return;
    }

    //Making a query string
    const data = qs.stringify(formData);
    console.log(formData);
    //Calling axios to send the data to api
    axios
      .post("http://localhost:4000/activity/create", data)
      .then((response) => {
        console.log(response.data);
        //Update the notification table
        const notification = {
          activityId: response.data.activity.id,
          status: "created",
        };
        const notificationData = qs.stringify(notification);
        axios
          .post("http://localhost:4000/notification/activity", notificationData)
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
      .get("http://localhost:4000/activitytype/all")
      .then((response) => {
        setActivityTypeData(response.data.activityTypes as ActivityType[]);
      })
      .catch((err) => console.log(err));
  }, [errorMessage]);

  return (
    <Container className="mt-5">
      <Card style={{ width: "35rem" }}>
        <Card.Body>
          <Card.Title>Activity Create </Card.Title>
          <Form method="POST" onSubmit={onSubmit}>
            {/* ACTIVITY NAME START */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                onChange={onChange}
                value={formData.title}
                required
              />
            </Form.Group>
            {/* ACTIVITY NAME END */}

            {/* URL START */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL"
                name="url"
                onChange={onChange}
                value={formData.url}
              />
            </Form.Group>
            {/* URL END */}

            {/* ACTIVITY DESCRIPTION START */}
            <Form.Group className="mb-3" controlId="formBasicContent">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Description"
                name="description"
                onChange={onChange}
                value={formData.description}
                required
              />
            </Form.Group>
            {/* ACTIVITY DESCRIPTION END */}

            {/* ACTIVITY STAR DATE START */}
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
            {/* ACTIVITY START DATE END */}

            {/* ACTIVITY END DATE START */}
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
            {/* ACTIVITY END DATE END */}

            {/* ACTIVITY TYPE CHOICE START */}
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Select your Activity</Form.Label>
              <Form.Control
                as="select"
                name="activitytype"
                value={formData.activitytype}
                onChange={onChange}
                required
              >
                <option value={""}>No Activity selected</option>
                {activityTypeData ? (
                  activityTypeData.map((activitytype) => (
                    <option key={activitytype.id} value={activitytype.id}>
                      {activitytype.name}
                    </option>
                  ))
                ) : (
                  <option>No active Activity Type Selected</option>
                )}
              </Form.Control>
            </Form.Group>
            {/* ACTIVITY TYPE CHOICE END */}
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
              Create
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

export default CreateActivity;
