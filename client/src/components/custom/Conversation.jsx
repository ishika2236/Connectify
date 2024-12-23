import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from "../ui/tooltip";
import { Button } from "../../components/ui/button";
import { Box, Spinner, Input } from '@chakra-ui/react';
import { Toaster, toaster } from "../ui/toaster";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import sendMessage from '../../services/sendMessage';
import { ChatContext } from '../../context/ChatProvider';
import fetchMessages from '../../services/fetchMessages';
import './Conversation.css';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:8080";
let socket, selectedChatCompare;

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on("connection", () => setSocketConnected(true));
  }, [user]);

  const sendMessageHandler = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit('stop typing', selectedChat._id);
      try {
        const response = await sendMessage(newMessage, selectedChat._id);
        setNewMessage("");
        socket.emit("new message", response);
        setMessages((prevMessages) => [...prevMessages, response]);
      } catch (error) {
        toaster.create({
          title: 'Failed to send the message',
          description: error.message,
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    

    fetchChatMessages();
    selectedChatCompare = selectedChat;

    return () => {
      socket.off("message received");
    };
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // Give notification
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    return () => {
      socket.off("message received");
    };
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timer = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit('stop typing', selectedChat._id);
      }
    }, timer);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-black via-gray-900 to-black relative w-200 h-full">
    
      <div className="conversation-banner bg-gradient-to-r from-blue/1 via-blue/10 to-blue/1 flex items-center justify-between px-5 py-5 border-b border-blue">
        <div className="flex items-center space-x-3">
          <div className="profile-photo w-10 h-10 rounded-full overflow-hidden">
            <img src="https://via.placeholder.com/40" alt="Profile" className="object-cover w-full h-full" />
          </div>
          <div className="name">
            <h2 className="text-gray-300 text-xl font-bold">
              {selectedChat ? selectedChat.chatName : "User"}
            </h2>
          </div>
        </div>
        <div className="icons flex items-center space-x-3">
          <MenuRoot>
            <MenuTrigger asChild>
              <Button variant="outline" className="border-none text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faEllipsisV} />
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem asChild value="Settings">
                <a href="http://localhost:5173/settings" target="_blank" rel="noreferrer">
                  Settings
                </a>
              </MenuItem>
              <MenuItem asChild value="New Group">
                <a href="http://localhost:5173/new-group" target="_blank" rel="noreferrer">
                  New Group
                </a>
              </MenuItem>
              <MenuItem asChild value="Starred Messages">
                <a href="http://localhost:5173/starredMessages" target="_blank" rel="noreferrer">
                  Starred Messages
                </a>
              </MenuItem>
              <MenuItem asChild value="Logout">
                <a href="http://localhost:5173/logout" target="_blank" rel="noreferrer">
                  Logout
                </a>
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
      </div>
      <div className="messaging">
        {loading ? (
          <Box className="flex width-full h-96 items-center justify-center">
            <Spinner />
            Please be patient! Messages are still being loaded.
          </Box>
        ) : (
          <>
            <div className="messages">
              <ScrollableChat messages={messages} />
            </div>
            {isTyping && (
              <div>
                <video src="/Animation - 1733517092182.webm" autoPlay className="h-8 w-8"></video>
              </div>
            )}
            <div className="input-box-container shadow-inner border border-gray-800">
              <Input
                className="z-10 w-full bg-transparent focus:outline-none placeholder-gray-500 focus:placeholder-blue/75 transition-colors"
                onKeyDown={sendMessageHandler}
                isRequired
                mt={1}
                variant="filled"
                placeholder="Enter your message"
                onChange={typingHandler}
                value={newMessage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Conversation;
  