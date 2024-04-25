import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Static/Home";
import TasksPage from "./components/Static/TasksPage";
import Performance from "./components/Static/Performance";
import ActivityPage from "./components/Static/ActivityPage";
import ActivityDetail from "./components/Dynamic/ActivityDetail";
import Error from "./components/Static/Error";
import TaskDetail from "./components/Dynamic/TaskDetail";
import NavBar from "./components/Dynamic/NavBar";
import CreateTask from "./components/Static/CreateTask";
import UpdateTask from "./components/Static/UpdateTask";
import CreateActivity from "./components/Static/CreateActivity";
import UpdateActivity from "./components/Static/UpdateActivity";
import Search from "./components/Dynamic/Search";
import SideBar from "./components/Static/SideBar";
import MainBody from "./components/Static/MainBody";

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <SideBar />
                <MainBody />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/tasks" element={<TasksPage />}></Route>
                        <Route
                            path="/performance"
                            element={<Performance />}
                        ></Route>
                        <Route
                            path="/activities"
                            element={<ActivityPage />}
                        ></Route>
                        <Route path="/search" element={<Search />}></Route>
                        <Route
                            path="/activity/:id"
                            element={<ActivityDetail />}
                        ></Route>
                        <Route
                            path="/task/:id"
                            element={<TaskDetail />}
                        ></Route>
                        <Route
                            path="/create/task"
                            element={<CreateTask />}
                        ></Route>
                        <Route
                            path="/updateTask/:id"
                            element={<UpdateTask />}
                        ></Route>
                        <Route
                            path="/create/activity"
                            element={<CreateActivity />}
                        ></Route>
                        <Route
                            path="/updateActivity/:id"
                            element={<UpdateActivity />}
                        ></Route>
                        <Route path="/error" element={<Error />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
