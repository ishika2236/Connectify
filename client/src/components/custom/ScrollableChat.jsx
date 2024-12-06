import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatProvider';
import { Tooltip } from '../ui/tooltip';

const ScrollableChat = ({ messages }) => {
  const { user } = useContext(ChatContext);

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

  return (
    <div>
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
                      className="w-8 h-8 rounded-full"
                    />
                  </Tooltip>
                )}

              
              {message.sender._id !== user._id &&
                !(isSameSender(messages, message, index, user._id) ||
                  isLastMessage(messages, index, user._id)) && <div className="w-8 h-8" />}

            
              <span
                className={`bg-blue/75 rounded-lg px-3 py-1 max-w-xs my-1 flex-col ${
                  message.sender._id === user._id ? 'ml-auto bg-pink/75 text-white' : ''
                }`}
              >
                {message.content}
                 
              </span>
              {/* <div className="text-sm text-gray-vlight my-1">
              {message.sender._id !== user._id &&
                !(isSameSender(messages, message, index, user._id) ||
                  isLastMessage(messages, index, user._id)) && <div className="w-8 h-8" />}
               <div className="">
               {formatTimeToHrMin(message.createdAt)}
               </div> */}
                {/* </div> */}
            
            </div>
          ))}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollableChat;
