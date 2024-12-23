import React, { useEffect, useContext, useState } from 'react';
import { ChatContext } from './../../../context/ChatProvider';
import { Box, Text, Input } from '@chakra-ui/react';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl } from '@mui/material';
import sendMessage from '../../../services/sendMessage';
import fetchMessages from '../../../services/fetchMessages';
import ScrollableChat from '../ScrollableChat';
import io from 'socket.io-client';
const ENDPOINT = import.meta.env.VITE_API_URL;
import { useRef } from 'react';

const ChatArea = ({ refreshContact, setRefreshContact, setShowSettings }) => {
  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    const socket = io(ENDPOINT);
    socketRef.current = socket;
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));

    return () => {
      // Clean up socket on unmount
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (selectedChat) {
        try {
          setLoading(true);
          const result = await fetchMessages(selectedChat._id);
          setMessages(result);
          setLoading(false);
          socketRef.current.emit('join room', selectedChat._id);
        } catch (error) {
          console.error("Error fetching messages:", error.message);
          setLoading(false);
        }
      }
    };

    fetchChatMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('message recieved', (newMessageRecieved) => {
        if (!selectedChat || selectedChat._id !== newMessageRecieved.chat._id) {
          // Give notification
        } else {
          setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
        }
      });
    }

    // Clean up the listener
    return () => {
      socketRef.current?.off('message recieved');
    };
  }, [selectedChat]);
  

  const sendMessageHandler = async (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMessage) {
      try {
        const response = await sendMessage(newMessage, selectedChat._id);
        setNewMessage("");
        setMessages((prevMessages) => [...prevMessages, response]);
        socketRef.current.emit("new message", response);
      } catch (error) {
        console.error("Failed to send the message", error.message);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (

    <Box w="100%" display="flex" flexDirection="column" className='h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950'>
      {!selectedChat ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          className="text-white bg-gray-900"
        >
          <Text fontSize="xl" pb={3} fontFamily="Work sans">
            Welcome to Connectify! Click on a user to start chatting...
          </Text>
        </Box>
      ) : (
        <>
          <div class="relative inset-0 z-0 w-[100%]">
          <div class="absolute top-20 left-20 w-72 h-72 bg-blue/20 rounded-full filter blur-3xl"></div>
          <div class="absolute top-80 left-80 w-72 h-72 bg-pink/15 rounded-full filter blur-3xl"></div>
        </div>
          {/* Header Section */}
          <Box
            fontSize={{ base: '28px', md: '30px' }}
            px={4}
            py={3}
            className='bg-gray-900 border border-b-blue/50 border-l-blue/50 border-t-pinkNew/50 border-r-pinkNew/50'
            color="white"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            boxShadow="lg"
            zIndex={10}
            h="10%" 
          >

            <div className="flex gap-4 items-center">
              <img
                src={selectedChat.isGroupChat ? selectedChat.picUrl : selectedChat.users[1]?.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <Text>{selectedChat.chatName || "User"}</Text>
            </div>
            <FontAwesomeIcon
              icon={faGear}
              onClick={() => setShowSettings(true)}
              className="cursor-pointer text-white text-lg"
            />
          </Box>

          {/* Chat Body */}
          <Box flex="1" h="50%" className='relative'>
            <div className="messages" style={{  maxHeight: 'calc(100vh - 180px)' }}>
              {loading ? (
                <>Loading Chat! Calm your horses...</>
              ) : (
                <ScrollableChat messages={messages} />
              )}
            </div>
          </Box>

          {/* Input Section */}
          <Box h="5%" w={'100%'}  className="p-2 pl-10">
          <FormControl fullWidth>
            <Input
              variant="filled"
              placeholder="Type a message..."
              onChange={typingHandler}
              onKeyDown={sendMessageHandler}
              value={newMessage}
              className="w-full absolute bottom-3 bg-gray-800 border border-b-pinkNew border-r-pinkNew border-t-blue border-l-blue"
            />
          </FormControl>

          </Box>
        </>
      )}
    </Box>
  );
};

export default ChatArea;
