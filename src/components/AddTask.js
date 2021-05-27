import React, { useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";
import AddFiles from "./AddFiles";

export default function AddTask() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
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
      type: "text",
      task: task,
      userId: currentUser.uid,
      history: [{ data: "Task created", createdAt: new Date() }],
      assignedTo: null,
      assignedBy: null,
      status: "TO DO",
      createdAt: database.getCurrentTimestamp(),
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
            <input
              type="file"
              ref={imageRef}
              style={{ display: "none" }}
              onChange={(e) => {
                e.preventDefault();
                setImage(e.target.files[0]);
              }}
            />
            <input
              type="file"
              ref={videoRef}
              style={{ display: "none" }}
              onChange={(e) => {
                e.preventDefault();
                setVideo(e.target.files[0]);
              }}
            />
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                videoRef.current.click();
              }}
            >
              Video
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                e.preventDefault();
                imageRef.current.click();
              }}
            >
              Image
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {image && <AddFiles file={image} type={"image"} />}
      {video && <AddFiles file={video} type={"video"} />}
    </>
  );
}
