import React from "react";
import { Card } from "react-bootstrap";

export default function ListComment({ comment }) {
  return (
    <Card className="m-3">
      <Card.Header>{comment?.email}</Card.Header>
      <Card.Body>{comment?.content}</Card.Body>
    </Card>
  );
}
