import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from "../components/CenteredContainer";
import { useAuth } from "../Context/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const [username, setUsername] = useState("");
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, createUserDocument } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const { user } = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      await createUserDocument(user, { username });
      history.push("/");
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/accounts/login">Log In</Link>
      </div>
    </CenteredContainer>
  );
}
