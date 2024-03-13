import axios from "axios";
import React, { useState } from "react";
import { Card, Accordion, Form, Button, Alert } from "react-bootstrap";

// Define the prop types for the component
interface DeleteTaskProps {
  id: number;
  name: string;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ id, name }) => {
  //FORM DATA ONCE PAGE LOAD
  const defaultFormData = {
    name: "",
  };

  //-------------FORM DATA SET TO THE STATE-----------------
  const [formData, setFormData] = useState(defaultFormData); // FORM DATA
  const [errorMessage, setErrorMessage] = useState("");

  //--------------HANDLE INPUT CHANGE-----------------
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevSate) => ({
      ...prevSate,
      [e.target.name]: e.target.value,
    }));

    console.log(formData);
  };

  //--------------HANDLE FORM SUBMIT-------------------
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Checks the user typed task name correctly
    if (formData.name !== name) {
      setErrorMessage("Task title not match!");

      //THE ERROR MESSAGE WILL BE GONE IN 3S
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    //Calling axios to send the data to api
    axios
      .delete(`http://localhost:4000/task/delete/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    setFormData(defaultFormData);

    //THE ERROR MESSAGE WILL BE GONE IN 3S
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div>
      {/* DELETE TASK VIEW START*/}
      <Card style={{ width: "18rem" }} className="mt-5">
        <Card.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Delete Task</Accordion.Header>
              <Accordion.Body>
                Danger Zone: Please type the task tile as "{name}" to delete
                this task.
                <Form method="POST" onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicTaskTile">
                    <Form.Control
                      type="text"
                      placeholder="Task title"
                      required
                      name="name"
                      onChange={onChange}
                      value={formData.name}
                    />
                  </Form.Group>
                  <Button variant="danger" type="submit">
                    Delete
                  </Button>
                </Form>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      {/* DELETE TASK VIEW END*/}
    </div>
  );
};

export default DeleteTask;
