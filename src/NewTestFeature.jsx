import React, { useState } from 'react';

const YouTubeVideoDetails = () => {
  const [videoLink, setVideoLink] = useState('');
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  const getVideoIdFromLink = (link) => {
    // Extract video ID from YouTube video link
    const url = new URL(link);
    const params = new URLSearchParams(url.search);
    return params.get('v');
  };

  const getVideoDetails = async () => {
    if (!videoLink) {
      alert('Please enter a YouTube video link');
      return;
    }

    setLoading(true);
    setError(null);
    setVideoDetails(null);

    const videoId = getVideoIdFromLink(videoLink);
    if (!videoId) {
      setError('Invalid YouTube video link');
      setLoading(false);
      return;
    }

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
      <div  className='pt-6 flex justify-center align-center' >
      <input className='w-1/2 p-1 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
        type="text"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        placeholder="Enter YouTube Video Link"
      />
    </div>
    <div className='flex justify-center align-center pt-4'>
      <button className=' flex items-center bg-sky-500 hover:bg-sky-700 rounded-full p-3 ' onClick={getVideoDetails} disabled={loading}>
        {loading ? 'Loading...' : 'Get Video Details'}
      </button>
    </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {videoDetails && (
        
 
        <div>
          <h3 className='text-center pt-8 pb-3'>Video Title: {videoDetails.snippet.title}</h3>
          <p className='text-center p-4'>Video Description: {videoDetails.snippet.description}</p>
          <p className='text-center p-2'>View Count: {videoDetails.statistics?.viewCount}</p>
          <p className='text-center p-2'>Like Count: {videoDetails.statistics?.likeCount}</p>
        </div>
      )}
    </div>
  );
};

export default YouTubeVideoDetails;
