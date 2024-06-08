// import React, { useState } from 'react';

// const YouTubeComments = () => {
//     const [videoId, setVideoId] = useState('');
//     const [comments, setComments] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const apiKey = import.meta.env.VITE_API_KEY;

//     const getComments = async () => {
//         setLoading(true);
//         setError(null);
//         setComments([]);

//         if (!videoId) {
//             alert('Please enter a video ID');
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             if (data.items && data.items.length > 0) {
//                 setComments(data.items);
//             } else {
//                 setComments([]);
//             }
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//             setError('Error fetching comments');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <input
//                     type="text"
//                     id="videoId"
//                     value={videoId}
//                     onChange={(e) => setVideoId(e.target.value)}
//                     placeholder="Enter YouTube Video ID"
//                 />
//                 <button onClick={getComments} disabled={loading}>
//                     {loading ? 'Loading...' : 'Get Comments'}
//                 </button>
//                 <div id="comments">
//                     {error && <p>{error}</p>}
//                     {comments.length === 0 && !loading && <p>No comments found</p>}
//                     {comments.map((comment) => {
//                         const commentText = comment.snippet.topLevelComment.snippet.textDisplay;
//                         const author = comment.snippet.topLevelComment.snippet.authorDisplayName;
//                         return (
//                             <div key={comment.id} className="comment">
//                                 <p><strong>{author}</strong>: {commentText}</p>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default YouTubeComments;
