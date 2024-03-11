import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Static/Home";
import TasksPage from "./components/Static/TasksPage";
import Performance from "./components/Static/Performance";
import Notifications from "./components/Static/Notifications";
import ActivityPage from "./components/Static/ActivityPage";
import ActivityDetail from "./components/Dynamic/ActivityDetail";
import Error from "./components/Static/Error";
import TaskDetail from "./components/Dynamic/TaskDetail";
import NavBar from "./components/Dynamic/NavBar";
import CreateTask from "./components/Static/CreateTask";

function App() {
    return (
        <div className="App">
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/tasks" element={<TasksPage />}></Route>
                    <Route
                        path="/performance"
                        element={<Performance />}
                    ></Route>
                    <Route
                        path="/notifications"
                        element={<Notifications />}
                    ></Route>
                    <Route
                        path="/activities"
                        element={<ActivityPage />}
                    ></Route>
                    <Route
                        path="/activity/:id"
                        element={<ActivityDetail />}
                    ></Route>
                    <Route path="/task/:id" element={<TaskDetail />}></Route>
                    <Route path="/create/task" element={<CreateTask />}></Route>
                    <Route path="/error" element={<Error />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
