import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Define the prop types for the component
interface EditTaskProps {
  id: number;
}

const EditNavigator: React.FC<EditTaskProps> = ({ id }) => {
  const navigate = useNavigate();

  //HANDLE ONCLICK EVENT
  const handleClick = () => {
    navigate(`/updateTask/${id}`);
  };
  return (
    <div className="mt-5">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Button variant="success" onClick={handleClick}>
            Edit
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditNavigator;
