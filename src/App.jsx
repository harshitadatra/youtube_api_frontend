import React, { useState } from "react";
import VideoDetails from "./components/VideoDetails";
import CommentSection from "./components/CommentSection";

const App = () => {
  const [videoId, setVideoId] = useState("");

  return (
    <div>
      <h1>YouTube Video Manager</h1>
      
      {/* Input box to update Video ID */}
      <input
        type="text"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        placeholder="Enter YouTube Video ID"
      />
      
      {/* Render only if a valid ID is entered */}
      {videoId && (
        <>
          <VideoDetails videoId={videoId} />
          <CommentSection videoId={videoId} />
        </>
      )}
    </div>
  );
};

export default App;
