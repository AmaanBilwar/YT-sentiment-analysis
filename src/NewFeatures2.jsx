import React, { useState } from 'react';

const YouTubeComments = () => {
  const [videoLink, setVideoLink] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  const getVideoIdFromLink = (link) => {
    try {
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
      return params.get('v');
    } catch {
      return null;
    }
  };

  const getComments = async (pageToken = '') => {
    const videoId = getVideoIdFromLink(videoLink);
    if (!videoId) {
      setError('Invalid YouTube video link');
      return;
    }

    setLoading(true);
    setError(null);

    const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&pageToken=${pageToken}`;

    try {
      const response = await fetch(commentsUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setComments((prevComments) => [...prevComments, ...data.items]);
        setNextPageToken(data.nextPageToken);
      } else if (!pageToken) {
        setError('No comments found.');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('An error occurred while fetching comments.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        placeholder="Enter YouTube Video Link"
      />
      <button onClick={() => getComments()} disabled={loading}>
        {loading ? 'Loading...' : 'Get Comments'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {comments.length > 0 && (
        <div>
          <h3>Comments</h3>
          {comments.map((item, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{item.snippet.topLevelComment.snippet.authorDisplayName}:</strong> {item.snippet.topLevelComment.snippet.textDisplay}
              </p>
            </div>
          ))}
          {nextPageToken && (
            <button onClick={() => getComments(nextPageToken)} disabled={loading}>
              {loading ? 'Loading...' : 'Load More Comments'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default YouTubeComments;
