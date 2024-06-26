import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const NotificationDropDown = () => {
    //DEFINE NOTIFICATION STRUCTURE
    interface Notification {
        id: number;
        taskid: number;
        activityid: number;
        status: string;
        name: string;
        title: string;
    }

    //SET STATES
    const [notifications, setNotifications] = useState<Notification[] | null>(
        null
    );

    //API CALL VIA USE_EFFECT
    useEffect(() => {
        axios
            .get("http://localhost:4000/notification/all")
            .then((response) => {
                console.log(response.data.notifications);
                setNotifications(response.data.notifications as Notification[]);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            {notifications ? (
                notifications.map((notification, i) =>
                    notification.name ? (
                        <Dropdown.Item
                            className="notification-items"
                            key={i}
                            href={`/task/${notification.taskid}`}
                        >
                            {notification.name} task has {notification.status}.
                        </Dropdown.Item>
                    ) : (
                        <Dropdown.Item
                            key={i}
                            href={`/activity/${notification.activityid}`}
                        >
                            {notification.title} activity has{" "}
                            {notification.status}.
                        </Dropdown.Item>
                    )
                )
            ) : (
                <Dropdown.Item>No any notifications</Dropdown.Item>
            )}
        </div>
    );
};

export default NotificationDropDown;
