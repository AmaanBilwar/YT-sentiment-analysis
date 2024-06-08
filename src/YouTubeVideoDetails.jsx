import React, { useState } from 'react';
import.meta.env.VITE_API_KEY

const YouTubeVideoDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState(null);

  

  const videoId = 'cWWu5IjMuEU';

  const getVideoDetails = () => {
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${import.meta.env.VITE_API_KEY }`;


    // console.log(import.meta.env.VITE_REACT_KEY);

    fetch(videoUrl)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          setVideoDetails(data.items[0]);
          setError(null);
        } else {
          setVideoDetails(null);
          setError('No video details found.');
        }
      })
      .catch(error => {
        setVideoDetails(null);
        setError('An error occurred while fetching video details.');
        console.error('Error:', error);
      });
  };



  return (
    <div>
      <button onClick={getVideoDetails}>Get Video Details</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {videoDetails && (
        <div>
          <h3>Video Title: {videoDetails.snippet.title}</h3>
          <p>Video Description: {videoDetails.snippet.description}</p>
          <p>View Count: {videoDetails.statistics.viewCount}</p>
          <p>Like Count: {videoDetails.statistics.likeCount}</p>
        </div>
      )}
    </div>
  );
};

export default YouTubeVideoDetails;
