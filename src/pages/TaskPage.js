import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown, Form, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import NavbarComponent from "../components/Navbar";
import { useAuth } from "../Context/AuthContext";
import { database } from "../firebase";
import ListComment from "../components/ListComment";

const statuses = ["TO DO", "DOING", "DONE"];

export default function TaskPage() {
  const [userList, setUserList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [taskDetails, setTaskDetails] = useState();
  const [progress, setProgress] = useState("");
  const [assignUsername, setAssignUsername] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [commentText, setCommentText] = useState("");
  const { taskId } = useParams();
  const { currentUser } = useAuth();
  // console.log(currentUser);
  useEffect(() => {
    database.users.orderBy("createdAt", "desc").onSnapshot((snap) => {
      let document = [];
      snap.forEach((doc) => {
        document.push({ ...doc.data(), id: doc.id });
      });
      setUserList(document);
      // console.log(document);
    });
    database.tasks
      .doc(taskId)
      .get()
      .then((snapshot) => setTaskDetails(snapshot.data()));

    database.comments
      .where("taskId", "==", taskId)
      .get()
      .then((doc) => {
        // console.log("doc", doc.docs[0].data());
        // email = doc.docs[0].data();
        let documents = [];
        doc.docs.forEach((comm) => {
          documents.push({ ...comm.data(), id: comm.id });
        });
        console.log(documents);
        setCommentList(documents);
      });
  }, [taskId]);

  function handleAssign(event) {
    event.preventDefault();
    database.users
      .where("username", "==", assignUsername)
      .get()
      .then((doc) => {
        // console.log("doc", doc.docs[0].data());
        // email = doc.docs[0].data();
        database.tasks.doc(taskId).update({
          assignedTo: {
            // username: assignUsername,
            email: doc.docs[0].data(),
          },
          history: [
            { createdAt: new Date(), data: `Assigned to ${assignUsername}` },
            ...taskDetails.history,
          ],
        });
      });
  }

  function handleStatus(event) {
    event.preventDefault();
    database.tasks.doc(taskId).update({
      status: progress,
      history: [
        { createdAt: new Date(), data: `Status changed to ${progress}` },
        ...taskDetails.history,
      ],
    });
    // window.location.reload();
  }

  function handleAddComment(e) {
    e.preventDefault();
    setTimeout(() => {
      database.comments.add({
        content: commentText,
        taskId: taskId,
        email: currentUser.email,
        createdAt: database.getCurrentTimestamp(),
      });
    }, 0);
  }

  return (
    <div>
      <NavbarComponent />
      <div className="p-5">
        <div className="p-3">
          <Button variant="success" onClick={() => setModalShow(true)}>
            History
          </Button>
        </div>
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
        <div className="p-3">
          <h1>Comments</h1>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Write your comment here...</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => {
                e.preventDefault();
                setCommentText(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="success" onClick={handleAddComment}>
            Post Comment
          </Button>
          {commentList?.map((comment) => (
            <div key={comment?.id}>
              <ListComment comment={comment} />
            </div>
          ))}
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        historylist={taskDetails?.history}
      />
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const { historylist } = props;
  // console.log("history", historylist);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {historylist?.map((history, index) => (
          <Card key={index}>
            <Card.Body>{history?.data}</Card.Body>
          </Card>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
