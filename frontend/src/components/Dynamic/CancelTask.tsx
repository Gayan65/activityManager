import axios from "axios";
import React, { useState } from "react";
import { Card, Accordion, Form, Button, Alert } from "react-bootstrap";

// Define the prop types for the component
interface CancelTaskProps {
  id: number;
}

const CancelTask: React.FC<CancelTaskProps> = ({ id }) => {
  //FORM DATA ONCE PAGE LOAD
  const defaultFormData = {
    status: null,
  };

  //-------------FORM DATA SET TO THE STATE-----------------
  const [formData, setFormData] = useState(defaultFormData); // FORM DATA

  //--------------HANDLE FORM SUBMIT-------------------
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(id);
    //Calling axios to send the data to api
    /*
    axios
      .delete(`http://localhost:4000/task/cancelUpdate/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
*/
    setFormData(defaultFormData);
  };
  return (
    <div>
      {/* DELETE TASK VIEW START*/}
      <Card style={{ width: "18rem" }} className="mt-5">
        <Card.Body>
          <Form method="PUT" onSubmit={onSubmit}>
            <Button variant="warning" type="submit">
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {/* DELETE TASK VIEW END*/}
    </div>
  );
};

export default CancelTask;
