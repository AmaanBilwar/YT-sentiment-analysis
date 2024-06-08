import React from 'react'

async function YoutubeComments(){

    const apiKey = import.meta.env.VITE_API_KEY;

    const videoId = document.getElementById('videoId').value;
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = '';

    if(!videoId){
        alert('Please enter a video ID');
        return;
    }
    
    try{
        const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
    
    const data = await response.json();

    if(data.items && data.items.length > 0){
        data.items.forEach(item => {
            const comment = comment.snippet.topLevelComment.snippet.textDisplay;
            const author = comment.snippet.topLevelComment.snippet.authorDisplayName;


            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `<p><strong>${author}</strong>: ${comment}</p>`;
        });
    } else {

        commentsDiv.innerHTML = `<p>No comments found</p>`;
    }
} catch (error) {
    console.error('Error fetching comments:', error);
    commentsDiv.innerHTML = `<p>Error fetching comments</p>`;
}
}

  return (
    <div>
      <div> 
        <input type="text" id='videoId' placeholder='Enter Youtube Video ID'/>
        <button onClick={YoutubeComments()}>Get Comments</button>
        <div id='comments'></div>
      </div>
    </div>
  )


export default YoutubeComments
