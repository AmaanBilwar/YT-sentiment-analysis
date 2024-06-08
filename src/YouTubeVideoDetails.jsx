import React, { useState } from 'react';

const YouTubeVideoDetails = () => {
  const [videoId, setVideoId] = useState('');
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  const getVideoDetails = async () => {
    if (!videoId) {
      alert('Please enter a video ID');
      return;
    }

    setLoading(true);
    setError(null);
    setVideoDetails(null);

    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;

    try {
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setVideoDetails(data.items[0]);
      } else {
        setError('No video details found.');
      }
    } catch (error) {
      console.error('Error fetching video details:', error);
      setError('An error occurred while fetching video details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        placeholder="Enter YouTube Video ID"
      />
      <button onClick={getVideoDetails} disabled={loading}>
        {loading ? 'Loading...' : 'Get Video Details'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {videoDetails && (
        <div>
          <h3>Video Title: {videoDetails.snippet.title}</h3>
          <p>Video Description: {videoDetails.snippet.description}</p>
          <p>View Count: {videoDetails.statistics?.viewCount}</p> 
          <p>Like Count: {videoDetails.statistics?.likeCount}</p>
        </div>
      )}
    </div>
  );
};

export default YouTubeVideoDetails;

