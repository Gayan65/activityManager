import axios from "axios";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { Card, Form, Button, Alert } from "react-bootstrap";

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/task/${id}`)
      .then((response) => {
        console.log(response.data.task[0].status);
        setFormData({ status: response.data.task[0].status });
      })
      .catch((err) => console.log(err));
  }, [message, id]);

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
        setMessage(response.data.message);
      })
      .catch((err) => console.log(err));

    setFormData(defaultFormData);

    //THE ERROR MESSAGE WILL BE GONE IN 3S
    setTimeout(() => {
      setMessage("");
    }, 3000);
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
              disabled={
                formData.status === 3 || formData.status === 4 ? true : false
              }
            >
              Cancel
            </Button>
          </Form>
          {message && <Alert variant="warning">{message}</Alert>}
        </Card.Body>
      </Card>
      {/* DELETE TASK VIEW END*/}
    </div>
  );
};

export default CancelTask;
