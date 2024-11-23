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

const contacts = [
    {
      id: 1,
      name: "John Doe",
      time: "2:30 PM",
      profilePic: "https://via.placeholder.com/40",
      lastMessage: "Hey, how's it going?",
    },
    {
      id: 2,
      name: "Jane Smith",
      time: "1:45 PM",
      profilePic: "https://via.placeholder.com/40",
      lastMessage: "Let's catch up soon!",
    },
    {
      id: 3,
      name: "Alice Johnson",
      time: "12:10 PM",
      profilePic: "https://via.placeholder.com/40",
      lastMessage: "Sent a new photo.",
    },
    {
      id: 4,
      name: "Bob Martin",
      time: "11:30 AM",
      profilePic: "https://via.placeholder.com/40",
      lastMessage: "Looking forward to the weekend!",
    },
  ];

const Contacts = () => {
  return (
    <div className="w-96 text-xl min-h-screen border-r-2 border-gray-700">
      <div className="contacts-heading flex justify-between items-center border-b-2 px-5 py-5 border-gray-700">
        <h1 className="text-xl">Chats</h1>
        
        <div className="flex items-center">
          {/* New Chat Button */}
          <Tooltip content={"New Chat"}>
            <FontAwesomeIcon icon={faSquarePlus} className="mr-4 cursor-pointer" />
          </Tooltip>
          
          {/* Ellipsis Menu Button */}
          <MenuRoot>
            <MenuTrigger asChild className="border-none">
              <Button variant="outline">
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

      <div className="contacts-list text-slate-500 w-full">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact flex py-4 px-4  border-b border-gray-700 items-center hover:bg-gray-800">
            <div className="contact-image w-12 h-12 mr-4">
              <img
                src={contact.profilePic}
                alt={contact.name}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="contact-info w-full">
              <h4 className=" text-gray-300">{contact.name}</h4>
              <div className="flex justify-between text-sm text-gray-500">
                <p>{contact.lastMessage}</p>
                <p>{contact.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
