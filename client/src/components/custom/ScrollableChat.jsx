import React, { useEffect, useRef } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatProvider';
import { Tooltip } from '../ui/tooltip';
import { Text } from '@chakra-ui/react';

const ScrollableChat = ({ messages }) => {
  const { user, selectedChat } = useContext(ChatContext);
  const endOfMessages = useRef(null); // Reference to scroll to the end

  const isSameSender = (messages, message, i, userId) => {
    return (
      i < messages.length - 1 &&
      messages[i + 1]?.sender?._id !== message?.sender?._id &&
      message?.sender?._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[i]?.sender?._id !== userId
    );
  };

  function formatTimeToHrMin(mongooseTime) {
    const date = new Date(mongooseTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Scroll to the bottom when messages change
  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getMediaUrl = (mediaUrl) => {
    // Replace frontend URL (localhost:5173) with backend URL (localhost:8080)
    if (mediaUrl && mediaUrl.startsWith('http://localhost:5173')) {
      return mediaUrl.replace('http://localhost:5173', 'http://localhost:8080');
    }
    return mediaUrl;
  };

  return (
    <div className="overflow-auto">
      <ScrollableFeed>
      
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${
                message?.sender?._id === user._id ? 'justify-end' : ''
              }`}
            >
              {/* Show image only for non-user messages */}
              {message?.sender?._id !== user._id &&
                (isSameSender(messages, message, index, user._id) ||
                  isLastMessage(messages, index, user._id)) && (
                  <Tooltip label={message?.sender?.name} placement="bottom-start" hasArrow>
                    <div>
                      <img
                        src={`${import.meta.env.VITE_API_URL}${message?.sender?.profilePic}`}
                        alt="Sender Profile"
                        className="w-10 h-10 rounded-full my-2"
                      />
                      {selectedChat.isGroupChat && message?.sender?._id !== user._id && (
                        <div className="text-lg text-gray-200 ">{message?.sender?.name}</div>
                      )}
                    </div>
                  </Tooltip>
                )}

              {message?.sender?._id !== user._id &&
                !(isSameSender(messages, message, index, user._id) ||
                  isLastMessage(messages, index, user._id)) && <div className="w-8 h-8" />}

              <span
                className={`px-3 rounded-2xl rounded-br-none shadow-xl flex-col pt-2 my-2 ${
                  message?.sender?._id === user._id
                    ? 'ml-auto bg-gradient-to-r from-blue/70  to-pink/70 text-white hover:shadow-blue/20'
                    : 'bg-gradient-to-r from-gray-800 to-blue/10 text-gray-300'
                }`}
              >
                <Text>{message?.content}</Text>
                {message?.media && (
                  <a href={`${import.meta.env.VITE_API_URL}${message.media}`} target="_blank" rel="noopener noreferrer">
                    {message?.mediaType?.startsWith('image/') ? (
                      <img src={`${import.meta.env.VITE_API_URL}${message.media}`} alt="file" style={{ maxWidth: '250px', maxHeight: '250px' }} />
                    ) : (
                      <Text>Download {message?.mediaType}</Text>
                    )}
                  </a>
                )}
              </span>
            </div>
          ))}
        <div ref={endOfMessages} />
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
