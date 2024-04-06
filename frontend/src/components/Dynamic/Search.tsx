import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";

const Search = () => {
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

  //HANDLING RADIO BUTTON EVENTS
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  //--------------HANDLE INPUT CHANGE-----------------
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevSate) => ({
      ...prevSate,
      [e.target.name]: e.target.value,
    }));
  };

  //ON SUBMIT HERE

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
