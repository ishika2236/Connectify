import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Tooltip } from "../../components/ui/tooltip";
import { Button } from "../../components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@chakra-ui/react';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "./../ui/popover"
import SearchContact from './SearchContact';
import { Input } from '@chakra-ui/react';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatProvider';
import { Toaster, toaster } from "../ui/toaster"
import fetchChats from '../../services/fetchChats';
import { useState, useEffect } from 'react';



// const contacts = [
//   { id: 1, name: "John Doe", time: "2:30 PM", profilePic: "https://via.placeholder.com/40", lastMessage: "Hey, how's it going?" },
//   { id: 2, name: "Jane Smith", time: "1:45 PM", profilePic: "https://via.placeholder.com/40", lastMessage: "Let's catch up soon!" },
//   { id: 3, name: "Alice Johnson", time: "12:10 PM", profilePic: "https://via.placeholder.com/40", lastMessage: "Sent a new photo." },
//   { id: 4, name: "Bob Martin", time: "11:30 AM", profilePic: "https://via.placeholder.com/40", lastMessage: "Looking forward to the weekend!" },
// ];

const Contacts = () => {
  const {user,selectedChat, setSelectedChat, chats, setChats} = useContext(ChatContext);
  
  
  
  const fetchChat = async() =>{
    try {
      const chatData = await fetchChats();
      console.log(chatData);
      
      setChats(chatData);
      // console.log(chats);
    } catch (error) {
      toaster.create({
        title: 'Error fetching the chat',
        description: error.message,
        status: "error",
        isClosable: true
      })
    }
      
  }
  useEffect(() => {
    fetchChat();
  }, [])
  
  const selectChat =async (chat) =>{
    await setSelectedChat(chat);
    
  }
  const getChatName = (chat) => {
    if (chat.isGroupChat) {
      return chat.chatName;
    }
    // For one-on-one chats, find the other user's name
    const otherUser = chat.users.find((u) => u._id !== user._id);
    return otherUser ? otherUser.name : "Unknown User";
  };

  return (
    <div className="w-160 text-xl min-h-screen border-r-2 border-gray-700 bg-gray-medium">
      <div className="contacts-heading flex justify-between items-center border-b px-5 py-5 border-gray-vlight">
        <h1 className="text-xl text-white-off">Chats</h1>
        <div className="flex items-center">
          {/* New Chat Button */}
          <PopoverRoot>
            <PopoverTrigger>
              <Tooltip content={"New Chat"}>
                <FontAwesomeIcon icon={faSquarePlus} className="mr-4 cursor-pointer text-white-off hover:text-pink" />
              </Tooltip>
            </PopoverTrigger>
              {/* <PopoverContent>
                <PopoverBody>
                  <PopoverTitle />
                </PopoverBody>
              </PopoverContent> */}
              <SearchContact/>

          </PopoverRoot>
          

          {/* Ellipsis Menu Button */}
          <MenuRoot>
            <MenuTrigger asChild className="border-none">
              <Button variant="outline" className="hover:bg-gray-600 focus:ring-2 focus:ring-gold">
                <FontAwesomeIcon icon={faEllipsisV} />
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem asChild value="Settings">
                <a href="http://localhost:5173/settings" target="_blank" rel="noreferrer">Settings</a>
              </MenuItem>
              <MenuItem asChild value="New Group">
                <a href="http://localhost:5173/new-group" target="_blank" rel="noreferrer">New Group</a>
              </MenuItem>
              <MenuItem asChild value="Starred Messages">
                <a href="http://localhost:5173/starredMessages" target="_blank" rel="noreferrer">Starred Messages</a>
              </MenuItem>
              <MenuItem asChild value="Logout">
                <a href="http://localhost:5173/logout" target="_blank" rel="noreferrer">Logout</a>
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
      </div>
        <div className="search-input m-5 mt-5  ">
          <input placeholder='Search Chat' className='bg-gray-light w-full h-14 p-2 border border-gray-light rounded-lg'/>
        </div>
      <div className="contacts-list w-full">
        {chats.length > 0? (
        chats.map((chat, index) => (
          <div key={index}  onClick={(e)=> {selectChat(chat)}} className="contact flex py-4 px-4 border-b border-gray-light items-center hover:bg-gray-light transition-colors duration-200">
            <div className="contact-image w-12 h-12 mr-4">
              <img
                src={chat.profilePic}
                alt={chat.chatName}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="contact-info w-full">
              <h4 className="text-white-off">{getChatName(chat)}</h4>
              <div className="flex justify-between text-sm text-gray-400">
                <p>{chat.lastMessage}</p>
                <p>{chat.time}</p>
              </div>
            </div>
          </div>
        ))):
        (
          <div className=""> No chats found</div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
