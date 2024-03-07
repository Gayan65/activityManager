import React from "react";
import { useParams } from "react-router-dom";

const ActivityDetail = () => {
    const params = useParams();
    return (
        <div>
            Activity Detail Page
            <p>id is {params.id}</p>
        </div>
    );
};

export default ActivityDetail;
