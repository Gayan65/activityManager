import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Spinner,
  ListGroup,
  Card,
  Button,
  Stack,
  Badge,
} from "react-bootstrap";

const ActivityPage = () => {
  //DEFINE THE ACTIVITY OBJ
  interface Activity {
    id: number;
    title: string;
    description: string;
    enddate: string;
    tagnames: string[];
    statustype: number;
  }

  const [allActivities, setAllActivities] = useState<Activity[] | null>(null);
  const [loader, setLoader] = useState(true);

  // Function to format enddate
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format as per your requirements
  };

  //CALLING APIS ONCE PAGE LOADED
  useEffect(() => {
    //(GETTING ALL ACTIVITIES AND SET IT TO STATE)
    axios
      .get("http://localhost:4000/activity/all")
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setAllActivities(response.data.activities as Activity[]);
          setLoader(false);
        } else {
          setAllActivities(null);
          setLoader(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {/* MAP THE EXISTING ACTIVITIES, NEW ACTIVITIES */}
      Activity Manage Page
      {/* ALL ACTIVITY VIEW START*/}
      <Card style={{ width: "45rem" }}>
        <Card.Body>
          <Card.Title>All Activities</Card.Title>
          {allActivities && allActivities.length > 0 ? (
            <ListGroup>
              {allActivities.map((activity, id) => (
                <Card key={id}>
                  <Card.Body>
                    <Card.Title>{activity.title}</Card.Title>
                    <Card.Text>{activity.description}</Card.Text>
                    <Button variant="primary" href={`/activity/${activity.id}`}>
                      View Activity
                    </Button>
                    <Stack direction="horizontal" className="mt-2" gap={2}>
                      {activity.tagnames &&
                        activity.tagnames.map((tag, tagId) => (
                          <Badge key={tagId} pill bg="secondary">
                            {tag}
                          </Badge>
                        ))}
                      Due on {formatDate(activity.enddate)}
                    </Stack>
                  </Card.Body>
                </Card>
              ))}
            </ListGroup>
          ) : (
            <p>No tasks available.</p>
          )}
          {loader && <Spinner animation="border" />}
        </Card.Body>
      </Card>
      {/* ALL ACTIVITY VIEW END*/}
    </Container>
  );
};

export default ActivityPage;
