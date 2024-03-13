import React from "react";
import { Card, Accordion, Form, Button } from "react-bootstrap";

// Define the prop types for the component
interface DeleteTaskProps {
  id: number;
  title: string;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ id, title }) => {
  return (
    <div>
      {/* DELETE TASK VIEW START*/}
      <Card style={{ width: "18rem" }} className="mt-5">
        <Card.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Delete Task</Accordion.Header>
              <Accordion.Body>
                Danger Zone: Please type the task tile as "{title}" to delete
                this task.
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicTaskTile">
                    <Form.Control
                      type="text"
                      placeholder="Task title"
                      required
                    />
                  </Form.Group>
                  <Button variant="danger" type="submit">
                    Delete
                  </Button>
                </Form>
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
