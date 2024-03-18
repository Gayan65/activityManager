import axios from "axios";
import React, { useState } from "react";
import qs from "qs";
import { Card, Accordion, Form, Button, Alert } from "react-bootstrap";

// Define the prop types for the component
interface CancelTaskProps {
  id: number;
  status: number;
}

const CancelTask: React.FC<CancelTaskProps> = ({ id, status }) => {
  //FORM DATA ONCE PAGE LOAD
  const defaultFormData = {
    status: status,
  };

  //-------------FORM DATA SET TO THE STATE-----------------
  const [formData, setFormData] = useState(defaultFormData); // FORM DATA

  //--------------HANDLE FORM SUBMIT-------------------
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Making a query string
    const data = qs.stringify(formData);

    //Calling axios to send the data to api
    axios
      .patch(`http://localhost:4000/task/cancelUpdate/${id}`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    setFormData(defaultFormData);
  };
  return (
    <div>
      {/* DELETE TASK VIEW START*/}
      <Card style={{ width: "18rem" }} className="mt-5">
        <Card.Body>
          <Form method="PATCH" onSubmit={onSubmit}>
            <Button
              variant="warning"
              type="submit"
              disabled={status === 3 || status === 4 ? true : false}
            >
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
