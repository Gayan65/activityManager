import axios from "axios";
import Performance from "../Dynamic/Performance";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import { Spinner, Button, Badge, Stack, ProgressBar } from "react-bootstrap";

const Home = () => {
    //DEFINE THE TASK OBJ
    interface Task {
        id: number;
        name: string;
        content: string;
        tagnames: string[];
        enddate: string;
        statustype: number;
    }

    // Function to format enddate
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Adjust format as per your requirements
    };

    const [activeTasks, setActiveTasks] = useState<Task[] | null>(null);
    const [loader, setLoader] = useState(true);

    //CALLING APIS ONCE PAGE LOADED
    useEffect(() => {
        //(GETTING ALL ACTIVE TASKS AND SET IT TO STATE)
        axios
            .get("http://localhost:4000/task/active")
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data);
                    setActiveTasks(response.data.tasks as Task[]);
                    setLoader(false);
                } else {
                    setActiveTasks(null);
                    setLoader(false);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                <div className="content">
                    <div className="mainHeader">
                        <h1>Dashboard</h1>
                    </div>

                    <div className="row">
                        <div className="col-xl-8 col-sm-6 activity-card">
                            {" "}
                            <div className="mainHeader">
                                <h1>
                                    Current Tasks{" "}
                                    <FontAwesomeIcon
                                        icon={faList}
                                        className="bi bi-list-task list-view "
                                        style={{ fontSize: "25px" }}
                                    />
                                </h1>
                            </div>
                            <ol className="activity-lists">
                                <div className="container">
                                    <div className="row">
                                        {/* CURRENT TASKS VIEW START*/}

                                        {activeTasks &&
                                        activeTasks.length > 0 ? (
                                            <>
                                                {activeTasks.map((task, id) => (
                                                    <li
                                                        className="activity-listing"
                                                        key={id}
                                                    >
                                                        <>
                                                            <h3>
                                                                <Badge bg="secondary">
                                                                    {id + 1}
                                                                </Badge>
                                                                {task.name}
                                                            </h3>
                                                            <p>
                                                                {task.content}
                                                            </p>
                                                            <div className="view-task">
                                                                <button>
                                                                    {" "}
                                                                    <Button
                                                                        variant="secondary custom"
                                                                        href={`/task/${task.id}`}
                                                                    >
                                                                        <span>
                                                                            View
                                                                            Task
                                                                        </span>
                                                                    </Button>
                                                                </button>
                                                            </div>

                                                            <Stack
                                                                direction="horizontal"
                                                                className="mt-2"
                                                                gap={2}
                                                            >
                                                                {task.tagnames &&
                                                                    task.tagnames.map(
                                                                        (
                                                                            tag,
                                                                            tagId
                                                                        ) => (
                                                                            <Badge
                                                                                className="tags"
                                                                                key={
                                                                                    tagId
                                                                                }
                                                                                pill
                                                                            >
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </Badge>
                                                                        )
                                                                    )}
                                                                <span className="due-date  badge rounded-pill bg-primary">
                                                                    {" "}
                                                                    Due on{" "}
                                                                    {formatDate(
                                                                        task.enddate
                                                                    )}
                                                                </span>
                                                            </Stack>
                                                        </>
                                                        <ProgressBar
                                                            className="status-Bar"
                                                            variant={
                                                                task.statustype ===
                                                                1
                                                                    ? "secondary custombar"
                                                                    : task.statustype ===
                                                                      2
                                                                    ? "primary custombar"
                                                                    : task.statustype ===
                                                                      3
                                                                    ? "success"
                                                                    : task.statustype ===
                                                                      4
                                                                    ? "danger"
                                                                    : "default"
                                                            }
                                                            now={
                                                                task.statustype ===
                                                                1
                                                                    ? 20
                                                                    : task.statustype ===
                                                                      2
                                                                    ? 50
                                                                    : task.statustype ===
                                                                      3
                                                                    ? 100
                                                                    : task.statustype ===
                                                                      4
                                                                    ? 100
                                                                    : 100
                                                            }
                                                        />
                                                    </li>
                                                ))}
                                            </>
                                        ) : (
                                            <p>No active tasks available.</p>
                                        )}
                                        {loader && (
                                            <Spinner animation="border" />
                                        )}
                                    </div>
                                </div>
                            </ol>
                        </div>
                        <div className="col-xl-4 col-md-12">
                            {/* CURRENT TASKS VIEW ENDS*/}
                            {/* PERFORMANCE VIEW */} <Performance />{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
