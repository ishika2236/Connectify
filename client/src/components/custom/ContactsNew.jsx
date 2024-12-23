import React from 'react'
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatProvider';
import { Toaster, toaster } from "../ui/toaster"
import fetchChats from '../../services/fetchChats';
import { useState, useEffect } from 'react';
import NewGroupChat from './NewGroupChat';
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
import { faEllipsisV, faSearch, faUserGroup } from '@fortawesome/free-solid-svg-icons';
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

const ContactsNew = ({refreshContact}) => {
    const {user,selectedChat, setSelectedChat, chats, setChats} = useContext(ChatContext);
  
  
  
  const fetchChat = async() =>{
    try {
      const chatData = await fetchChats();
      console.log(chatData);
      
      setChats(chatData);
      console.log(chats);
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
  }, [refreshContact])
  
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
    <div className='h-screen bg-gradient-to-b from-gray-800/5 via-blue/5 via-pinkNew/5 to-purpleDark/5'>
        <div className="w-144  p-6 relative">
            <div className="flex items-center justify-between">
                <h1 className='text-2xl font-bold bg-gradient-to-r from-gray-200 via-pinkNew to-gray-400 bg-clip-text text-transparent animate-gradient'>Chats</h1>
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
                <PopoverRoot>
                    <PopoverTrigger>
                    <Tooltip content={"New Group Chat"}>
                        <FontAwesomeIcon icon={faUserGroup} className="mr-4 cursor-pointer text-white-off hover:text-pink" />
                    </Tooltip>
                    </PopoverTrigger>
                    {/* <PopoverContent>
                        <PopoverBody>
                        <PopoverTitle />
                        </PopoverBody>
                    </PopoverContent> */}
                    <NewGroupChat/>

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
            <div className="border-b border-gray-800/50 p-4 relative">
                    <div className="relative">
                        <Input type='text' 
                            placeholder='Search Users...'
                            className='w-full bg-gray-800/50 rounded-xl px-4 py-3 pl-12 focus:outline-none focus-ring ring-pink/30 transition-all placeholder-gray-500 backdrop-blur-sm'
                        > </Input>
                        <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500'></FontAwesomeIcon>
                    </div>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                    {chats.length > 0 && <div>
                        {chats.length > 0? (
                        chats.map((chat, index) => (
                        <div key={index}  onClick={(e)=> {selectChat(chat)}} className="flex items-center justify-between p-3 hover:bg-gray-800/30 rounded-xl transition-all cursor-pointer group backdrop-blur-sm hover:shadow-lg hover:shadow-pinkNew/10">
                            <div className="w-12 h-11 rounded-full bg-gradient-to-r from-gray-600 to-pink p-0.5">
                            <img
                                src={chat.users[1].profilePic}
                                alt={chat.chatName}
                                className="rounded-full w-full h-full object-cover transition-opacity duration-300 opacity-100"
                            />
                            </div>
                            <div className="contact-info w-full mx-3">
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
                        </div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactsNew