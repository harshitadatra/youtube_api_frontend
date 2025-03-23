import React, { useEffect, useState } from "react";
import axios from "axios";
// import { FaEdit, FaSave } from "react-icons/fa"; // Import edit and save icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
const API_URL = import.meta.env.VITE_API_URL;



const VideoDetails = ({ videoId }) => {
  const [video, setVideo] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/video/${videoId}`)
      .then((res) => {
        setVideo(res.data);
        setNewTitle(res.data.title);
      })
      .catch((err) => console.error(err));
  }, [videoId]);

  const updateTitle = () => {
    axios.post(`${API_URL}/video/update-title`, { videoId, newTitle })
      .then((res) => {
        setVideo(res.data);  // Update UI with new title
        setIsEditing(false); // Disable input field after saving
      })
      .catch((err) => console.error(err));
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <h2>Video Details</h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>

      {/* Editable Title Section */}
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <button onClick={updateTitle} style={{ marginLeft: "5px" }}>
               {/* Save Icon */}
               <FontAwesomeIcon icon={faSave} />

            </button>
          </>
        ) : (
          <>
            <h3 style={{ marginRight: "10px" }}>{video.title}</h3>
            <button onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}

               
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;
