import React, { useContext, useState } from 'react';
import { useWebRtc } from '../hooks/useWebRtc';
import { ChatContext } from '../../context/ChatProvider';

const VideoChat = () => {
    const { user, selectedChat } = useContext(ChatContext); // selectedChat should be roomId
    const { clients, provideMedia, setAudioRef, startCapture } = useWebRtc(selectedChat); 
    const [joined, setJoined] = useState(false); // Track call join status

    const handleJoinCall = async () => {
        try {
            await provideMedia(); // Start capturing media
            setJoined(true); // Mark the user as joined
        } catch (error) {
            console.error("Error joining the call:", error);
        }
    };

    return (
        <div className="video-chat-container">
            <h2>Video Chat</h2>
            {!joined ? (
                <div className="join-call-container">
                    <button className="join-call-btn" onClick={handleJoinCall}>
                        Join Call
                    </button>
                </div>
            ) : (
                <div className="participants-container">
                    {clients && clients.length === 0 ? (
                        <p>No participants in the call yet.</p>
                    ) : (
                        clients.map((client) => (
                            <div key={client.id} className="participant-card">
                                <audio
                                    ref={(instance) => setAudioRef(instance, client.id)}
                                    controls
                                    autoPlay
                                ></audio>
                                <h4>{client.name || 'Anonymous'}</h4>
                                <p>Status: {client.status || 'Connected'}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default VideoChat;
