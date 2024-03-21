import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Define the prop types for the component
interface EditTaskProps {
  id: number;
}

const EditNavigatorActivity: React.FC<EditTaskProps> = ({ id }) => {
  const navigate = useNavigate();

  //HANDLE ONCLICK EVENT
  const handleClick = () => {
    navigate(`/updateActivity/${id}`);
  };
  return (
    <div className="mt-5">
      <Button variant="success" onClick={handleClick}>
        Edit
      </Button>
    </div>
  );
};

export default EditNavigatorActivity;
