import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const CreateTask = () => {
  //FORM DATA ONCE PAGE LOAD (only for task and NO TAGS INVOLVED!)
  const defaultFormData = {
    name: "",
    content: "",
    startdate: "",
    enddate: "",
    activityid: "",
    status: 1,
    tags: "",

    //NOTE! - tags are being handled by separate special API it add all the task details as well as tags info simultaneously!
  };

  //FORM DATA SET TO THE STATE
  const [formData, setFormData] = useState(defaultFormData);

  //HANDLE INPUT CHANGE
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

  //HANDLE FORM SUBMIT
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    setFormData(defaultFormData);
  };

  return (
    <Container className="mt-5">
      <Card style={{ width: "35rem" }}>
        <Card.Body>
          <Card.Title>Task Create </Card.Title>
          <Form method="POST" onSubmit={(e) => onSubmit(e)}>
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
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
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
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateTask;
