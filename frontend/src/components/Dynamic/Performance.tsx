import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Performance = () => {
  //DEFINE THE TASK OBJ
  interface TasksPerformance {
    createTask: number;
    completedTask: number;
    onGoingTask: number;
    canceledTask: number;
  }

  const options = {};
  const [taskPerformance, setTaskPerformance] =
    useState<TasksPerformance | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/task/performance/task")
      .then((response) => {
        setTaskPerformance(response.data as TasksPerformance);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = {
    labels: ["New", "In Process", "Completed", "Canceled"],
    datasets: [
      {
        data: [
          taskPerformance?.createTask,
          taskPerformance?.onGoingTask,
          taskPerformance?.completedTask,
          taskPerformance?.canceledTask,
        ],
        backgroundColor: ["#4b80bd", "#1d2a57", "#1f7d0f", "#6e1505"],
      },
    ],
  };

  return (
    <>
      Performance
      <div>
        {taskPerformance && (
          <div>
            <Doughnut data={data} options={options}></Doughnut>
          </div>
        )}
      </div>
    </>
  );
};

export default Performance;
