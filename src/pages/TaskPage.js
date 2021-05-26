import React, { useEffect, useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { useParams } from "react-router";
import NavbarComponent from "../components/Navbar";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";

export default function TaskPage() {
  const [userList, setUserList] = useState([]);
  const { taskId } = useParams();
  const { currentUser } = useAuth();
  useEffect(() => {
    database.users
    //   .where("email", "!=", currentUser.email)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let document = [];
        snap.forEach((doc) => {
          document.push({ ...doc.data(), id: doc.id });
        });
        setUserList(document);
        console.log(document);
      });
  }, []);

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
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
