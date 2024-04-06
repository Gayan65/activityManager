import React from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

const Search = () => {
  return (
    <Container className="mt-5">
      <Card style={{ width: "45rem" }}>
        <Card.Body>
          <Card.Title>Search here</Card.Title>
          <Form.Check
            inline
            label="Activity"
            name="group1"
            type="radio"
            id="radio1"
          />
          <Form.Check
            inline
            label="Task"
            name="group1"
            type="radio"
            id="radio2"
          />
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSelect">
              <Form.Label>Select your Activity</Form.Label>
              <Form.Control as="select">
                <option>New</option>
                <option>In Process</option>
                <option>Completed</option>
                <option>Cancelled</option>
                <option>All</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" placeholder="Start Date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" placeholder="End Date" />
            </Form.Group>

            <Button type="submit" className="mb-2">
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Search;
