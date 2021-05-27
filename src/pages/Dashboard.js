import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AddTask from "../components/AddTask";
import ListMyTask from "../components/ListMyTask";
import NavbarComponent from "../components/Navbar";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";

const Dashboard = () => {
  const [mytask, SetMyTask] = useState([]);
  const [assignedTask, setAssignedTask] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    database.tasks
      .where("userId", "==", currentUser.uid)
      .where("assignedTo", "==", null)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let document = [];
        snap.forEach((doc) => {
          document.push({ ...doc.data(), id: doc.id });
        });
        SetMyTask(document);
        // console.log("document", document);
      });
    database.tasks
      // .where("userId", "==", currentUser.uid)
      .where("assignedTo.email.email", "==", currentUser.email)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let document = [];
        snap.forEach((doc) => {
          document.push({ ...doc.data(), id: doc.id });
          // console.log(doc.data());
        });
        setAssignedTask(document);
        // console.log("document", document);
      });
  }, [currentUser]);

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(assignedTask);
          }}
        >
          Click
        </button>
        <div className="d-flex align-items-center">
          <AddTask />
        </div>
        <div className="p-4">
          <h1>My Task</h1>
          <hr />
          {mytask.map((task) => (
            <div key={task?.id}>
              <ListMyTask task={task} />
            </div>
          ))}
          <div className="p-4"></div>
          <h1>Assigned Task</h1>
          <hr />
          {assignedTask?.map((task) => (
            <div key={task?.id}>
              <ListMyTask task={task} />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
