import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const NotificationDropDown = () => {
  //DEFINE NOTIFICATION STRUCTURE
  interface Notification {
    id: number;
    taskId: number;
    activityId: number;
    status: string;
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
      {notifications &&
        notifications.map((notification, i) => (
          <Dropdown.Item key={i} href="#/action-1">
            {notification.status}
          </Dropdown.Item>
        ))}
    </div>
  );
};

export default NotificationDropDown;
