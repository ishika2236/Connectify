import React, { useContext, useState, useEffect } from 'react';
import { ChatContext } from '../../context/ChatProvider';
import { Toaster, toaster } from "../ui/toaster";
import fetchChats from '../../services/fetchChats';
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
import { faEllipsisV, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@chakra-ui/react';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import SearchContact from './SearchContact';
import { Input } from '@chakra-ui/react';

const ContactsNew = ({ refreshContact }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = useContext(ChatContext);

  const fetchChat = async () => {
    try {
      const chatData = await fetchChats();
      setChats(chatData);
    } catch (error) {
      toaster.create({
        title: 'Error fetching the chat',
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchChat();
  }, [refreshContact]);

  const selectChat = async (chat) => {
    await setSelectedChat(chat);
  };

  const getChatName = (chat) => {
    if (chat.isGroupChat) {
      return chat.chatName;
    }
    const otherUser = chat.users.find((u) => u._id !== user._id);
    return otherUser ? otherUser.name : "Unknown User";
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-950/50 via-blue/5 to-black/50 text-[0.875rem]">
      <div className="w-[30rem] h-full flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[1.5rem] font-bold bg-gradient-to-r from-gray-200 via-pinkNew to-gray-400 bg-clip-text text-transparent animate-gradient">
            Chats
          </h1>
          <div className="flex items-center">
            {/* New Chat Button */}
            <PopoverRoot>
              <PopoverTrigger>
                <Tooltip content={"New Chat"}>
                  <FontAwesomeIcon icon={faSquarePlus} className="mr-4 cursor-pointer text-white-off hover:text-pink" />
                </Tooltip>
              </PopoverTrigger>
              <SearchContact />
            </PopoverRoot>
            <PopoverRoot>
              <PopoverTrigger>
                <Tooltip content={"New Group Chat"}>
                  <FontAwesomeIcon icon={faUserGroup} className="mr-4 cursor-pointer text-white-off hover:text-pink" />
                </Tooltip>
              </PopoverTrigger>
              <NewGroupChat />
            </PopoverRoot>
            {/* Ellipsis Menu Button */}
            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="outline" className="hover:bg-gray-600 focus:ring-2 focus:ring-gold">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem asChild value="Settings">
                  <a href="/settings" target="_blank" rel="noreferrer">Settings</a>
                </MenuItem>
                <MenuItem asChild value="New Group">
                  <a href="/new-group" target="_blank" rel="noreferrer">New Group</a>
                </MenuItem>
                <MenuItem asChild value="Starred Messages">
                  <a href="/starredMessages" target="_blank" rel="noreferrer">Starred Messages</a>
                </MenuItem>
                <MenuItem asChild value="Logout">
                  <a href="/logout" target="_blank" rel="noreferrer">Logout</a>
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </div>
        </div>
        {/* Search Input */}
        <div className="border-b border-gray-800/50 mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search Users..."
              className="w-full bg-gray-800/50 rounded-xl px-4 py-2 pl-12 focus:outline-none focus:ring ring-pink/30 transition-all placeholder-gray-500 backdrop-blur-sm text-[0.875rem]"
            />
            <FontAwesomeIcon icon={faSquarePlus } className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Chats List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => selectChat(chat)}
                  className="flex items-center justify-between p-3 hover:bg-gray-800/30 rounded-xl transition-all cursor-pointer group backdrop-blur-sm hover:shadow-lg hover:shadow-pinkNew/10 text-[0.875rem]"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-pink p-0.5">
                    <img
                      src={chat.users[1].profilePic}
                      alt={chat.chatName}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="contact-info w-full mx-3 flex items-center">
                    <h4 className="text-white-off text-sm">{getChatName(chat)}</h4>
                    <div className="flex justify-between text-xs text-gray-400">
                      <p>{chat.lastMessage}</p>
                      <p>{chat.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No chats found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsNew;
