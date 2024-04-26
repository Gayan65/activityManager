import React, { useState } from "react";
import qs from "qs";
import axios from "axios";
import { Form, Button, Card, Container, Alert, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPenToSquare,
    faLink,
    faAlignLeft,
    faCalendar,
    faCalendarCheck,
    faCircleCheck,
    faTag,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Search = () => {
    //DEFINE THE TASK OBJ
    interface Task {
        id: number;
        name: string;
        content: string;
        enddate: string;
        statustype: number;
    }

    //DEFINE THE TASK OBJ
    interface Activity {
        id: number;
        title: string;
        description: string;
        enddate: string;
        statustype: number;
    }

    //FORM DATA ONCE PAGE LOAD
    const defaultFormData = {
        name: "",
        status: 1,
        startdate: "",
        enddate: "",
    };

    //-------------FORM DATA SET TO THE STATE-----------------
    const [formData, setFormData] = useState(defaultFormData); // FORM DATA
    const [selectedOption, setSelectedOption] = useState<string>("Activity"); //STATE FOR RADIO BUTTONS
    const [errorMessage, setErrorMessage] = useState("");
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const [activities, setActivities] = useState<Activity[] | null>(null);

    //HANDLING RADIO BUTTON EVENTS
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
        console.log(event.target.value);
    };

    //--------------HANDLE INPUT CHANGE-----------------
    const onChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData((prevSate) => ({
            ...prevSate,
            [e.target.name]: e.target.value,
        }));
    };

    //--------------HANDLE FORM SUBMIT-------------------
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //ADD A HANDLER FOR CHECK START DATE NO CHECK YET
        if (formData.startdate > formData.enddate) {
            setErrorMessage("Please check the date fields");
            return;
        }

        //Making a query string
        const data = qs.stringify(formData);

        //Calling axios to send the data to api
        console.log(formData);
        setErrorMessage("Data add successfully");
        if (selectedOption === "Task") {
            axios
                .post("http://localhost:4000/task/search", data)
                .then((response) => {
                    console.log(response);
                    if (response.data.success) {
                        setTasks(response.data.tasks as Task[]);
                    } else {
                        setTasks(null);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            axios
                .post("http://localhost:4000/activity/search", data)
                .then((response) => {
                    console.log(response);
                    if (response.data.success) {
                        setActivities(response.data.Activities as Activity[]);
                    } else {
                        setTasks(null);
                    }
                })
                .catch((err) => console.log(err));
        }

        setFormData(defaultFormData);

        //THE ERROR MESSAGE WILL BE GONE IN 3S
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    };

    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                <div className="content">
                    <>
                        <div className="mainHeader">
                            <h1>
                                Search
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="bi bi-list-task list-view "
                                    style={{
                                        fontSize: "25px",
                                        paddingLeft: "10px",
                                    }}
                                />
                            </h1>
                        </div>

                        <Form method="POST" onSubmit={onSubmit}>
                            <label>Select Option</label>
                            <br></br>
                            <Form.Check
                                inline
                                label="Activity"
                                name="group1"
                                type="radio"
                                id="radio1"
                                value="Activity"
                                checked={selectedOption === "Activity"}
                                onChange={handleRadioChange}
                            />
                            <Form.Check
                                inline
                                label="Task"
                                name="group1"
                                type="radio"
                                id="radio2"
                                value="Task"
                                checked={selectedOption === "Task"}
                                onChange={handleRadioChange}
                            />
                            <div className="form-group input-group mb-2 mt-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text create">
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="bi bi-list-task list-view "
                                            style={{
                                                fontSize: " 18px",
                                                paddingLeft: "5px",
                                            }}
                                        />{" "}
                                    </span>
                                </div>
                                <Form.Control
                                    type="text"
                                    className="mb-2"
                                    placeholder="Title"
                                    onChange={onChange}
                                    name="name"
                                    value={formData.name}
                                />
                            </div>
                            <label>Select Status</label>
                            <div className="form-group input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text create">
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={faLink}
                                            className="bi bi-list-task list-view "
                                            style={{
                                                fontSize: " 20px",
                                                paddingLeft: "5px",
                                            }}
                                        />{" "}
                                    </span>
                                </div>
                                <Form.Control
                                    as="select"
                                    name="status"
                                    onChange={onChange}
                                    value={formData.status}
                                >
                                    <option value={1}>New</option>
                                    <option value={2}>In Process</option>
                                    <option value={3}>Completed</option>
                                    <option value={4}>Cancelled</option>
                                    <option value={5}>All</option>
                                </Form.Control>
                            </div>
                            <label>Start Date</label>
                            <div className="form-group input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text create">
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={faCalendar}
                                            className="bi bi-list-task list-view "
                                            style={{
                                                fontSize: " 20px",
                                                paddingLeft: "10px",
                                            }}
                                        />{" "}
                                    </span>
                                </div>
                                <Form.Control
                                    type="date"
                                    placeholder="Start Date"
                                    name="startdate"
                                    onChange={onChange}
                                    value={formData.startdate}
                                />
                            </div>
                            <label>End Date</label>
                            <div className="form-group input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text create">
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={faCalendarCheck}
                                            className="bi bi-list-task list-view "
                                            style={{
                                                fontSize: " 20px",
                                                paddingLeft: "10px",
                                            }}
                                        />{" "}
                                    </span>
                                </div>
                                <Form.Control
                                    type="date"
                                    placeholder="End Date"
                                    name="enddate"
                                    onChange={onChange}
                                    value={formData.enddate}
                                />
                            </div>{" "}
                            <div className="row col-md-4 offset-md-4 mt-4">
                                <Button type="submit" className="submit-Btn">
                                    Search
                                </Button>
                            </div>
                            {errorMessage && (
                                <Alert
                                    className="mt-3"
                                    variant={
                                        errorMessage === "Data add successfully"
                                            ? "success"
                                            : "danger"
                                    }
                                >
                                    {errorMessage}
                                </Alert>
                            )}
                        </Form>
                    </>

                    <div className="search-result mt-5">
                        <h2 className="search-header">Search Result</h2>

                        <ol className="activity-lists">
                            {selectedOption === "Task" &&
                                tasks &&
                                tasks.map((task, id) => (
                                    <li className="activity-listing" key={id}>
                                        <>
                                            <h3>
                                                <Badge bg="secondary">
                                                    {id + 1}
                                                </Badge>
                                                {task.name}
                                            </h3>
                                        </>
                                        <p>{task.content}</p>
                                        <div className="view-task">
                                            <button>
                                                {" "}
                                                <Button
                                                    variant="secondary custom"
                                                    href={`/task/${task.id}`}
                                                >
                                                    View Task
                                                </Button>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ol>

                        <ol className="activity-lists">
                            {selectedOption === "Activity" &&
                                activities &&
                                activities.map((activity, id) => (
                                    <li className="activity-listing" key={id}>
                                        <>
                                            <h3>
                                                <Badge
                                                    className="me-3"
                                                    bg="secondary"
                                                >
                                                    {id + 1}
                                                </Badge>
                                                {activity.title}
                                            </h3>
                                            <p>{activity.description}</p>
                                            <div className="view-task">
                                                <button>
                                                    <Button
                                                        variant="secondary custom"
                                                        href={`/activity/${activity.id}`}
                                                    >
                                                        View Task
                                                    </Button>
                                                </button>
                                            </div>
                                        </>
                                    </li>
                                ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
