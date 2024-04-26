import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Button, Stack, Badge, ProgressBar } from "react-bootstrap";

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
        <div className="page-wrapper">
            <div className="content-wrapper">
                <div className="content">
                    <div className="mainHeader">
                        <h1>
                            All Activities
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

                    <ol className="activity-lists">
                        <div className="container">
                            <div className="row">
                                {/* MAP THE EXISTING ACTIVITIES, NEW ACTIVITIES */}
                                {/* ALL ACTIVITY VIEW START*/}
                                <>
                                    {allActivities &&
                                    allActivities.length > 0 ? (
                                        <>
                                            {allActivities.map(
                                                (activity, id) => (
                                                    <li
                                                        className="activity-listing"
                                                        key={id}
                                                    >
                                                        <>
                                                            <h3>
                                                                <Badge bg="secondary">
                                                                    {id + 1}
                                                                </Badge>
                                                                {activity.title}
                                                            </h3>
                                                            <p>
                                                                {
                                                                    activity.description
                                                                }
                                                            </p>

                                                            <div className="view-task">
                                                                <button>
                                                                    <Button
                                                                        variant="secondary custom"
                                                                        href={`/activity/${activity.id}`}
                                                                    >
                                                                        View
                                                                        Activity
                                                                    </Button>
                                                                </button>
                                                            </div>
                                                            <Stack
                                                                direction="horizontal"
                                                                className="mt-2"
                                                                gap={2}
                                                            >
                                                                {activity.tagnames &&
                                                                    activity.tagnames.map(
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
                                                                    )}{" "}
                                                                <span className="due-date  badge rounded-pill bg-primary">
                                                                    Due on{" "}
                                                                    {formatDate(
                                                                        activity.enddate
                                                                    )}
                                                                </span>
                                                            </Stack>
                                                        </>
                                                        <ProgressBar
                                                            className="status-Bar"
                                                            variant={
                                                                activity.statustype ===
                                                                1
                                                                    ? "secondary custombar"
                                                                    : activity.statustype ===
                                                                      2
                                                                    ? "primary custombar"
                                                                    : activity.statustype ===
                                                                      3
                                                                    ? "success custombar"
                                                                    : activity.statustype ===
                                                                      4
                                                                    ? "danger custombar"
                                                                    : "default"
                                                            }
                                                            now={
                                                                activity.statustype ===
                                                                1
                                                                    ? 20
                                                                    : activity.statustype ===
                                                                      2
                                                                    ? 50
                                                                    : activity.statustype ===
                                                                      3
                                                                    ? 100
                                                                    : activity.statustype ===
                                                                      4
                                                                    ? 100
                                                                    : 100
                                                            }
                                                        />
                                                    </li>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <p>No tasks available.</p>
                                    )}
                                    {loader && <Spinner animation="border" />}
                                </>
                                {/* ALL ACTIVITY VIEW END*/}
                            </div>
                        </div>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default ActivityPage;
