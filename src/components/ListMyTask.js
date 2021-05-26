import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ListMyTask({task}) {
  return (
    <Link to={`/t/${task?.id}`}>
      <Card>
        <Card.Body>{task?.task}</Card.Body>
      </Card>
    </Link>
  );
}
