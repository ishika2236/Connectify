import React, { useEffect, useRef } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatProvider';
import { Tooltip } from '../ui/tooltip';

const ScrollableChat = ({ messages }) => {
  const { user } = useContext(ChatContext);
  const endOfMessages = useRef(null); // Reference to scroll to the end

  const isSameSender = (messages, message, i, userId) => {
    return (
      i < messages.length - 1 &&
      messages[i + 1].sender._id !== message.sender._id &&
      message.sender._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[i].sender._id !== userId
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

  return (
    <div  className="overflow-auto">
      <ScrollableFeed>
        {messages &&
          messages.map((message, index) => (
            <div
              key={message._id}
              className={`flex items-start space-x-2 ${
                message.sender._id === user._id ? 'justify-end' : ''
              }`}
            >
              {/* Show image only for non-user messages */}
              {message.sender._id !== user._id &&
                (isSameSender(messages, message, index, user._id) ||
                  isLastMessage(messages, index, user._id)) && (
                  <Tooltip label={message.sender.name} placement="bottom-start" hasArrow>
                    <img
                      src={message.sender.profilePic}
                      alt="Sender Profile"
                      className="w-10 h-10 rounded-full my-2"
                    />
                  </Tooltip>
                )}

              {message.sender._id !== user._id &&
                !(isSameSender(messages, message, index, user._id) ||
                  isLastMessage(messages, index, user._id)) && <div className="w-8 h-8" />}

              <span
                className={`p-3 rounded-2xl rounded-br-none shadow-xl flex-col mb-2 ${
                  message.sender._id === user._id
                    ? 'ml-auto bg-gradient-to-r from-blue/70  to-pink/70 text-white hover:shadow-blue/20'
                    : 'bg-gradient-to-r from-gray-800 to-blue/10 text-gray-300'
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
        <div ref={endOfMessages} /> 
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
