import React from 'react';
import './VideoBackground.css'; // Import the CSS file for styling

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src="./videoBackground.mp4" type="video/mp4" />
        {/* Add more <source> tags for different video formats if needed */}
      </video>
      {/* Add other content or components you want to overlay on the video */}
    </div>
  );
};

export default VideoBackground;
