import React from "react";
import { Form, Button } from "react-bootstrap";

const Search = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          className="mb-2"
          id="inlineFormInput"
          placeholder="Name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Status</Form.Label>
        <Form.Control
          className="mb-2"
          id="inlineFormInput"
          placeholder="Status"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          className="mb-2"
          id="inlineFormInput"
          placeholder="Start Date"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          className="mb-2"
          id="inlineFormInput"
          placeholder="Start Date"
        />
      </Form.Group>

      <Button type="submit" className="mb-2">
        Search
      </Button>
    </Form>
  );
};

export default Search;
