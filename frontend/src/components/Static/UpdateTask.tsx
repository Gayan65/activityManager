import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const UpdateTask = () => {
  //USE PARAMS TO FETCH THE ID FOR AXIOS CALL
  const params = useParams();

  //FORM DATA ONCE PAGE LOAD (only for task and NO TAGS INVOLVED!)
  const defaultFormData = {
    name: "",
    content: "",
    startdate: "",
    enddate: "",
    activityid: "",
    status: 1,
    tags: "",
  };

  //DECLARE ACTIVITY TYPE
  type Activity = {
    id: number;
    title: string;
  };

  const onChange = () => {};

  //-------------FORM DATA SET TO THE STATE-----------------
  const [formData, setFormData] = useState(defaultFormData); // FORM DATA
  const [activityData, setActivityData] = useState<Activity[] | null>(null); // ACTIVITY DATA
  useEffect(() => {
    //GET TASK DETAIL FROM THE API
    axios
      .get(`http://localhost:4000/task/${params.id}`)
      .then((response) => {
        const taskData = response.data.task[0];
        // Convert the date format from API to match "yyyy-MM-dd"
        const startDate = new Date(taskData.startdate)
          .toISOString()
          .split("T")[0];
        const endDate = new Date(taskData.enddate).toISOString().split("T")[0];
        // Update the formData with the converted dates
        setFormData({
          ...taskData,
          startdate: startDate,
          enddate: endDate,
        });
        console.log(taskData);
      })
      .catch((err) => console.log(err));

    //GET ACTIVITY DETAIL FROM THE API
    axios
      .get("http://localhost:4000/activity/all")
      .then((response) => {
        setActivityData(response.data.activities as Activity[]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {formData && (
        <Form method="POST">
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
              <option value={""}>No Activity selected</option>
              {activityData ? (
                activityData.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.title}
                  </option>
                ))
              ) : (
                <option>No active Activities</option>
              )}
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
      )}
    </Container>
  );
};

export default UpdateTask;
