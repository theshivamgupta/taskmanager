import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddTask from "../components/AddTask";
import ListMyTask from "../components/ListMyTask";
import NavbarComponent from "../components/Navbar";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";

const Dashboard = () => {
  const [mytask, SetMyTask] = useState([]);
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
        console.log(document);
      });
  }, [currentUser]);

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="d-flex align-items-center">
          <AddTask />
        </div>
        <div className="p-4">
        <h1>My Task</h1>
        <hr/>
          {mytask.map((task) => (
            <div key={task?.id}>
                <ListMyTask task={task}/>

              </div>
          ))}
          <div className='p-4'></div>
          <h1>Assigned Task</h1>
          <hr/>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
