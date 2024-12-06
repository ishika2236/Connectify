import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from "../ui/tooltip";
import { Button } from "../../components/ui/button";
import { Box } from '@chakra-ui/react';
import { Toaster, toaster } from "../ui/toaster"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import { useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Input } from "@chakra-ui/react"
import sendMessage from '../../services/sendMessage';
import { ChatContext } from '../../context/ChatProvider';
import fetchMessages from '../../services/fetchMessages';
import './Conversation.css'
import ScrollableChat from './ScrollableChat';


const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const {user, selectedChat, setSelectedChat} = useContext(ChatContext);

  const sendMessageHandler = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        console.log(selectedChat);
  
        const response = await sendMessage(newMessage, selectedChat._id);
        setNewMessage("");
        console.log(response);
  
        // Append the new message directly to the messages array
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
    const fetchChatMessages = async () => {
      if (selectedChat) {
        try {
          setLoading(true);
          const result = await fetchMessages(selectedChat._id);
          console.log(result); 
          setMessages(result);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching messages:", error.message);
          toaster.create({
            title: "Failed to fetch messages",
            description: error.message,
            status: "error",
            isClosable: true,
          });
          setLoading(false);
        }
      }
    };
  
    fetchChatMessages();
  }, [selectedChat]);
  
  const typingHandler = (e) =>{
    setNewMessage(e.target.value);

  }

  return (
    <div className="bg-gray-dark w-full h-full">
      <div className="conversation-banner flex items-center justify-between px-5 py-5 border-b border-gray-vlight bg-gray-medium">
        
        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <div className="profile-photo w-10 h-10 bg-gray-500 rounded-full overflow-hidden">
            <img src="https://via.placeholder.com/40" alt="Profile" className="object-cover w-full h-full" />
          </div>
          <div className="name text-gray-200">
            
            <h2 className="text-lg font-semibold">{selectedChat? selectedChat.chatName: "user"}</h2>
          </div>
        </div>
        
        {/* Menu Icon Section */}
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
      {/* <div className="messaging">
        {loading?(
          <Box className=" flex width-full h-96 items-center justify-center">
            <Spinner/>
            Please be patient! Messages are still being loaded.
           </Box>
        ):( 
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message-item">
                {msg.content}
              </div>
            ))}
            <Box >
              <Input className="bg-gray-700 h-12" onKeyDown={sendMessageHandler} isRequired mt={3}
              variant={'filled'}
              placeholder='Enter your message'
              onChange={typingHandler}
              value = {newMessage}
              />
            </Box>
           
          </div>
        )}
      </div> */}
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
      <div className="input-box-container">
        <Input
          className="bg-gray-700 h-12 p-2 border rounded-md border-gray-medium z-10"
          onKeyDown={sendMessageHandler}
          isRequired
          mt={3}
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
