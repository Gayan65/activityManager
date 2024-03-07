import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Static/Home";
import TasksPage from "./components/Static/TasksPage";
import Performance from "./components/Static/Performance";
import Notifications from "./components/Static/Notifications";
import ActivityPage from "./components/Static/ActivityPage";
import ActivityDetail from "./components/Dynamic/ActivityDetail";

function App() {
    return (
        <div className="App">
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
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
