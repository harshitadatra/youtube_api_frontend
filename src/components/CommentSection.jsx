import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/comment/${videoId}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [videoId]);

  const handleSubmit = () => {
    axios.post(`${API_URL}/comment/add`, { videoId, text })
      .then((res) => setComments([...comments, res.data]))
      .catch((err) => console.error(err));
    setText("");
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/comment/${id}`)
      .then(() => setComments(comments.filter(c => c._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleSubmit}>Comment</button>

      <ul>
        {comments.map((c) => (
          <li key={c._id}>
            {c.text} <button onClick={() => handleDelete(c._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
