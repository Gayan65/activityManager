import axios from "axios";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
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
} from "@fortawesome/free-solid-svg-icons";

const CreateActivity = () => {
    //DECLARE ACTIVITY TYPE
    type ActivityType = {
        id: number;
        name: string;
    };

    //FORM DATA ONCE PAGE LOAD (only for task and NO TAGS INVOLVED!)
    const defaultFormData = {
        title: "",
        description: "",
        url: "",
        startdate: "",
        enddate: "",
        status: 1,
        activitytype: "",
        tags: "",
    };

    //-------------FORM DATA SET TO THE STATE-----------------
    const [formData, setFormData] = useState(defaultFormData); // FORM DATA
    const [activityTypeData, setActivityTypeData] = useState<
        ActivityType[] | null
    >(null); // ACTIVITY TYPE DATA
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
        if (!formData.activitytype) {
            setErrorMessage("Please select an activity type");
            return;
        }
        //ADD A HANDLER FOR CHECK START DATE NO CHECK YET
        if (formData.startdate > formData.enddate) {
            setErrorMessage("Please check the start date");
            return;
        }

        //Making a query string
        const data = qs.stringify(formData);
        console.log(formData);
        //Calling axios to send the data to api
        axios
            .post("http://localhost:4000/activity/create", data)
            .then((response) => {
                console.log(response.data);
                //Update the notification table
                const notification = {
                    activityId: response.data.activity.id,
                    status: "created",
                };
                const notificationData = qs.stringify(notification);
                axios
                    .post(
                        "http://localhost:4000/notification/activity",
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
            .get("http://localhost:4000/activitytype/all")
            .then((response) => {
                setActivityTypeData(
                    response.data.activityTypes as ActivityType[]
                );
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
                                Create an Activity
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
                            <div className="row">
                                <div className="col-md-6">
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
                                        {/* ACTIVITY NAME START */}
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Add the Title"
                                            name="title"
                                            onChange={onChange}
                                            value={formData.title}
                                            required
                                        />
                                    </div>
                                    {/* ACTIVITY NAME END */}

                                    {/* URL START */}
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
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Add reference URL"
                                            name="url"
                                            onChange={onChange}
                                            value={formData.url}
                                        />
                                    </div>
                                    {/* URL END */}

                                    {/* ACTIVITY DESCRIPTION START */}

                                    <div className="form-group input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text create">
                                                {" "}
                                                <FontAwesomeIcon
                                                    icon={faAlignLeft}
                                                    className="bi bi-list-task list-view "
                                                    style={{
                                                        fontSize: " 20px",
                                                        paddingLeft: "10px",
                                                    }}
                                                />{" "}
                                            </span>
                                        </div>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Add Description"
                                            name="description"
                                            onChange={onChange}
                                            value={formData.description}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* ACTIVITY DESCRIPTION END */}

                                {/* ACTIVITY STAR DATE START */}
                                <div className="col-md-6">
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
                                    {/* ACTIVITY START DATE END */}

                                    {/* ACTIVITY END DATE START */}
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
                                    {/* ACTIVITY END DATE END */}
                                    {/* ACTIVITY TYPE CHOICE START */}
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
                                            name="activitytype"
                                            value={formData.activitytype}
                                            onChange={onChange}
                                            required
                                        >
                                            <option value={""}>
                                                No Activity selected
                                            </option>
                                            {activityTypeData ? (
                                                activityTypeData.map(
                                                    (activitytype) => (
                                                        <option
                                                            key={
                                                                activitytype.id
                                                            }
                                                            value={
                                                                activitytype.id
                                                            }
                                                        >
                                                            {activitytype.name}
                                                        </option>
                                                    )
                                                )
                                            ) : (
                                                <option>
                                                    No active Activity Type
                                                    Selected
                                                </option>
                                            )}
                                        </Form.Control>
                                    </div>
                                    {/* ACTIVITY TYPE CHOICE END */}
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
                                </div>
                            </div>
                            {/* TAG END */}

                            <div className="row col-md-4 offset-md-4 mt-4">
                                <Button className="submit-Btn" type="submit">
                                    Create Activity
                                </Button>
                                {errorMessage && (
                                    <Alert
                                        className="mt-3"
                                        variant={
                                            errorMessage ===
                                            "Data Add successfully"
                                                ? "success"
                                                : "danger"
                                        }
                                    >
                                        {errorMessage}
                                    </Alert>
                                )}
                            </div>
                        </Form>
                    </>
                </div>
            </div>
        </div>
    );
};

export default CreateActivity;
