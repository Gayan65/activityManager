import axios from "axios";
import React, { useState, useEffect } from "react";

const Performance = () => {
  //DEFINE THE TASK OBJ
  interface TasksPerformance {
    taskCreated: number;
    taskCompleted: number;
    onGoingTasks: number;
  }

  const [taskPerformance, setTaskPerformance] =
    useState<TasksPerformance | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/task/performance/task")
      .then((response) => {
        setTaskPerformance(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>Performance</div>;
};

export default Performance;
