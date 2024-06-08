import { useState } from "react";
import axios from "axios";


const TranscribeVideo = () => {
    const [url,setUrl] = useState('');
    const [transcript,setTranscript] = useState('');

    const handleTranscription = async () => {
        try {
            const response = await axios.post('http://localhost:5000/transcribe', {
                url
            });
            setTranscript(response.data.transcript);
        } catch (error) {
            console.error('Error transcribing video:', error);
        }
    };

    return (
        <div>
        <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
        />
        <button onClick={handleTranscription}>Transcribe Video</button>
            {transcript && <p>Transcription: {transcript}</p>}
        </div>
      );
}


export default TranscribeVideo;