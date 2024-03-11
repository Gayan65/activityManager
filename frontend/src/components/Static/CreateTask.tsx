import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const CreateTask = () => {
  return (
    <Container className="mt-5">
      <Card style={{ width: "35rem" }}>
        <Card.Body>
          <Card.Title>Task Create </Card.Title>
          <Form>
            {/* TASK NAME START */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            {/* TASK NAME END */}

            {/* TASK CONTENT START */}
            <Form.Group className="mb-3" controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Content" />
            </Form.Group>
            {/* TASK CONTENT END */}

            {/* TASK STAR DATE START */}
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" placeholder="Start Date" />
            </Form.Group>
            {/* TASK START DATE END */}

            {/* TASK END DATE START */}
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" placeholder="End Date" />
            </Form.Group>
            {/* TASK END DATE END */}

            {/* TASK ACTIVITY CHOICE START */}
            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Select your Activity</Form.Label>
              <Form.Control as="select">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </Form.Control>
            </Form.Group>
            {/* TASK ACTIVITY CHOICE END */}
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
