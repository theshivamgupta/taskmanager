import { useEffect, useState } from "react";
import { database, storage } from "../firebase";
import { useAuth } from "./AuthContext";

export default function useStorage({ file, type }) {
  const [error, setError] = useState(null);
  const [link, setLink] = useState(null);
  const { currentUser } = useAuth();
  useEffect(() => {
    const storageRef = storage.ref(file.name);
    storageRef.put(file).on(
      "state_changed",
      async (snap) => {},
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        database.tasks.add({
          type: type,
          task: url,
          userId: currentUser.uid,
          history: [{ data: "Task created", createdAt: new Date() }],
          assignedTo: null,
          assignedBy: null,
          status: "TO DO",
          createdAt: database.getCurrentTimestamp(),
        });
        setLink(url);
      }
    );
  }, [file, currentUser, type]);

  return { link, error };
}
