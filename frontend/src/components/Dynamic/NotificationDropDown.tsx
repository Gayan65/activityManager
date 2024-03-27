import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

interface Props {
  updateNotificationCount: (count: number) => void;
}

const NotificationDropDown: React.FC<Props> = ({ updateNotificationCount }) => {
  //DEFINE NOTIFICATION STRUCTURE
  interface Notification {
    id: number;
    taskId: number;
    activityId: number;
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
        updateNotificationCount(response.data.notifications.length);
      })
      .catch((err) => console.log(err));
  }, [updateNotificationCount]);
  return (
    <div>
      {notifications ? (
        notifications.map((notification, i) =>
          notification.name ? (
            <Dropdown.Item key={i} href="#/action-1">
              {notification.name} task has {notification.status}.
            </Dropdown.Item>
          ) : (
            <Dropdown.Item key={i} href="#/action-1">
              {notification.title} activity has {notification.status}.
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
