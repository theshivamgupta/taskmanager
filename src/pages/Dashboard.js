import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import AddTask from "../components/AddTask";
import NavbarComponent from "../components/Navbar";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";

const Dashboard = () => {
  const {currentUser} = useAuth();

  useEffect(() => {
    database.tasks.where("userId","==",currentUser.uid).orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let document = [];
        snap.forEach(doc => {
          document.push({...doc.data(), id: doc.id})
        })
        console.log(document)
      })
  }, [currentUser])

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="d-flex align-items-center">
          <AddTask />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
