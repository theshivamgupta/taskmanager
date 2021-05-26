import React from "react";
import { Container } from "react-bootstrap";
import AddTask from "../components/AddTask";
import NavbarComponent from "../components/Navbar";

const Dashboard = () => {
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
