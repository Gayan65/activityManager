import axios from "axios";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPenToSquare,
    faAlignLeft,
    faCalendar,
    faCalendarCheck,
    faCircleCheck,
    faTag,
} from "@fortawesome/free-solid-svg-icons";
const CreateTask = () => {
    //DECLARE ACTIVITY TYPE
    type Activity = {
        id: number;
        title: string;
    };
    //FORM DATA ONCE PAGE LOAD (only for task and NO TAGS INVOLVED!)
    const defaultFormData = {
        name: "",
        content: "",
        startdate: "",
        enddate: "",
        activityid: "",
        status: 1,
        tags: "",
    };

    //-------------FORM DATA SET TO THE STATE-----------------
    const [formData, setFormData] = useState(defaultFormData); // FORM DATA
    const [activityData, setActivityData] = useState<Activity[] | null>(null); // ACTIVITY DATA
    const [errorMessage, setErrorMessage] = useState("");

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

        // Check if activityid is selected
        if (!formData.activityid) {
            setErrorMessage("Please select an activity");
            return;
        }
        //ADD A HANDLER FOR CHECK START DATE NO CHECK YET
        if (formData.startdate > formData.enddate) {
            setErrorMessage("Please check the start date");
            return;
        }

        //Making a query string
        const data = qs.stringify(formData);

        //Calling axios to send the data to api
        axios
            .post("http://localhost:4000/task/create", data)
            .then((response) => {
                console.log(response.data);
                //Update the notification table
                const notification = {
                    taskId: response.data.task.id,
                    status: "created",
                };
                const notificationData = qs.stringify(notification);
                axios
                    .post(
                        "http://localhost:4000/notification/task",
                        notificationData
                    )
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

        setErrorMessage("Data Add successfully");

        setFormData(defaultFormData);

        //THE ERROR MESSAGE WILL BE GONE IN 3S
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    };

    //--------------GET API DATA ONCE LOAD THE PAGE-----------------------
    useEffect(() => {
        //GET CURRENT ACTIVITIES FOR FETCHING THE DROPDOWN UNDER ACTIVITIES IN THE FORM
        axios
            .get("http://localhost:4000/activity/current/all")
            .then((response) => {
                setActivityData(response.data.activities as Activity[]);
            })
            .catch((err) => console.log(err));
    }, [errorMessage]);

    return (
        <div className="page-wrapper">
            <div className="content-wrapper">
                <div className="content">
                    <>
                        <div className="mainHeader">
                            <h1>
                                Add a Task
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="bi bi-list-task list-view "
                                    style={{
                                        fontSize: "25px",
                                        paddingLeft: "10px",
                                    }}
                                />
                            </h1>
                        </div>
                        <Form method="POST" onSubmit={onSubmit}>
                            {/* TASK NAME START */}
                            <div className="form-group input-group mb-2 mt-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text create">
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="bi bi-list-task list-view "
                                            style={{
                                                fontSize: " 20px",
                                                paddingLeft: "10px",
                                            }}
                                        />{" "}
                                    </span>
                                </div>
                                <Form.Control
                                    type="text"
                                    placeholder="Add Task Title"
                                    name="name"
                                    onChange={onChange}
                                    value={formData.name}
                                    required
                                />
                            </div>
                            {/* TASK NAME END */}
                            {/* TASK CONTENT START */}
                            <div className="form-group input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text create">
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={faAlignLeft}
                                            className="bi bi-list-task list-view "
                                            style={{
                                                fontSize: " 20px",
                                                paddingLeft: "5px",
                                            }}
                                        />{" "}
                                    </span>
                                </div>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Add Content"
                                    name="content"
                                    onChange={onChange}
                                    value={formData.content}
                                    required
                                />
                            </div>
                            {/* TASK CONTENT END */}
                            {/* TASK STAR DATE START */}
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
                                    required
                                />
                            </div>
                            {/* TASK START DATE END */}
                            {/* TASK END DATE START */}
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
                                    value={formData.enddate}
                                    name="enddate"
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            {/* TASK END DATE END */}
                            {/* TASK ACTIVITY CHOICE START */}
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text create">
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className="bi bi-list-task list-view "
                                            style={{
                                                fontSize: " 25px",
                                                paddingLeft: "5px",
                                            }}
                                        />{" "}
                                    </span>
                                </div>
                                <Form.Control
                                    as="select"
                                    name="activityid"
                                    value={formData.activityid}
                                    onChange={onChange}
                                    required
                                >
                                    <option value={""}>
                                        No Activity selected
                                    </option>
                                    {activityData
                                        ? activityData.map((activity) => (
                                              <option
                                                  key={activity.id}
                                                  value={activity.id}
                                              >
                                                  {activity.title}
                                              </option>
                                          ))
                                        : null}
                                </Form.Control>
                            </div>
                            {/* TASK ACTIVITY CHOICE END */}
                            {/* TAG START */}
                            <div className="form-group input-group mt-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text create">
                                        <FontAwesomeIcon
                                            icon={faTag}
                                            className="bi bi-list-task list-view "
                                            style={{
                                                fontSize: " 25px",
                                                paddingLeft: "5px",
                                            }}
                                        />{" "}
                                    </span>
                                </div>
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    placeholder="Tags"
                                    name="tags"
                                    onChange={onChange}
                                    value={formData.tags}
                                />
                            </div>
                            {/* TAG END */}{" "}
                            <div className="row col-md-4 offset-md-4 mt-4">
                                <Button className="submit-Btn" type="submit">
                                    Submit
                                </Button>
                            </div>
                            {errorMessage && (
                                <Alert
                                    className="mt-3"
                                    variant={
                                        errorMessage === "Data Add successfully"
                                            ? "success"
                                            : "danger"
                                    }
                                >
                                    {errorMessage}
                                </Alert>
                            )}
                        </Form>
                    </>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;
