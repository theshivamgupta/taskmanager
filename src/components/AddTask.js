import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";

export default function AddTask() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    database.tasks.add({
      task: task,
      userId: currentUser.uid,
      history: [{data: "Task created", createdAt: new Date()}],
      assignedTo: null,
      assignedBy: null,
      createdAt: database.getCurrentTimestamp()
    });
    setTask("");
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                required
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
