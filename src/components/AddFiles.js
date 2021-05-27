import React from "react";
import { Alert } from "react-bootstrap";
import useStorage from "../Context/useStorage";

export default function AddFiles({ file, type }) {
  const { error } = useStorage({ file, type });

  return <Alert>{error}</Alert>;
}
