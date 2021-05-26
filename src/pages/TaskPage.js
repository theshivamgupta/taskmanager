import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { useParams } from "react-router";
import NavbarComponent from "../components/Navbar";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";

const statuses = ["TO DO", "DOING", "DONE"];

export default function TaskPage() {
  const [userList, setUserList] = useState([]);
  const [taskDetails, setTaskDetails] = useState();
  const [progress, setProgress] = useState("");
  const [assignUsername, setAssignUsername] = useState("");
  const { taskId } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    database.users.orderBy("createdAt", "desc").onSnapshot((snap) => {
      let document = [];
      snap.forEach((doc) => {
        document.push({ ...doc.data(), id: doc.id });
      });
      setUserList(document);
      console.log(document);
    });
    database.tasks
      .doc(taskId)
      .get()
      .then((snapshot) => setTaskDetails(snapshot.data()));
  }, [taskId]);

  function handleAssign(event) {
    event.preventDefault();
    database.tasks.doc(taskId).update({
      assignedTo: assignUsername,
      history: [{createdAt: new Date(), data: `Assigned to ${assignUsername}`}, ...taskDetails.history]
    });
  }

  function handleStatus(event) {
    event.preventDefault();
    database.tasks.doc(taskId).update({
        status: progress,
        history: [{createdAt: new Date(), data: `Status changed to ${progress}`}, ...taskDetails.history]
      });
  }

  return (
    <div>
      <NavbarComponent />
      <div className="p-5">
        <Card>
          <Card.Header as="h5">Task</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
            <div className="d-flex">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Status
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {statuses.map((status, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setProgress(status)}
                    >
                      {status}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Assign To
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {userList.map((user, index) => (
                    <Dropdown.Item
                      key={user?.id}
                      onClick={() => setAssignUsername(user?.username)}
                    >
                      {user?.username}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="danger" onClick={handleAssign}>
                Assign
              </Button>
              <Button variant="primary" onClick={handleStatus}>
                Change Status
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
