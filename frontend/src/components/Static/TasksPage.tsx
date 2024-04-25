import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Spinner,
    ListGroup,
    Card,
    Badge,
    Button,
    Stack,
    ProgressBar,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const TasksPage = () => {
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

    const [allTasks, setAllTasks] = useState<Task[] | null>(null);
    const [loader, setLoader] = useState(true);

    //CALLING APIS ONCE PAGE LOADED
    useEffect(() => {
        //(GETTING ALL TASKS AND SET IT TO STATE)
        axios
            .get("http://localhost:4000/task/all")
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    setAllTasks(response.data.tasks as Task[]);
                    setLoader(false);
                } else {
                    setAllTasks(null);
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
                        <h1>
                            All Tasks
                            <FontAwesomeIcon
                                icon={faList}
                                className="bi bi-list-task list-view "
                                style={{
                                    fontSize: "25px",
                                    paddingLeft: "10px",
                                }}
                            />
                        </h1>
                    </div>
                    {/* MAP THE EXISTING TASKS, NEW TASKS */}

                    {/* ALL TASKS VIEW START*/}
                    <ol className="activity-lists">
                        <div className="container">
                            <div className="row">
                                {allTasks && allTasks.length > 0 ? (
                                    <>
                                        {allTasks.map((task, id) => (
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
                                                    <p>{task.content}</p>

                                                    <div className="view-task">
                                                        <button>
                                                            <Button
                                                                variant="secondary custom"
                                                                href={`/task/${task.id}`}
                                                            >
                                                                View Task
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
                                                                        {tag}
                                                                    </Badge>
                                                                )
                                                            )}
                                                        <span className="due-date  badge rounded-pill bg-primary">
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
                                                        task.statustype === 1
                                                            ? "secondary custombar"
                                                            : task.statustype ===
                                                              2
                                                            ? "primary custombar"
                                                            : task.statustype ===
                                                              3
                                                            ? "success custombar"
                                                            : task.statustype ===
                                                              4
                                                            ? "danger custombar"
                                                            : "default"
                                                    }
                                                    now={
                                                        task.statustype === 1
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
                                    <p>No tasks available.</p>
                                )}
                                {loader && <Spinner animation="border" />}
                            </div>
                        </div>
                    </ol>
                    {/* ALL TASKS VIEW END*/}
                </div>
            </div>
        </div>
    );
};

export default TasksPage;
