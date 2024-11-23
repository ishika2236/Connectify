import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from "../ui/tooltip";
import { Button } from "../../components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";

const Conversation = () => {
  return (
    <div className="bg-gradient-to-b from-slate-900 to slate-1000 w-full h-full">
      <div className="conversation-banner flex items-center justify-between px-5 py-5 border-b border-gray-700">
        
        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <div className="profile-photo w-10 h-10 bg-gray-500 rounded-full overflow-hidden">
            <img src="https://via.placeholder.com/40" alt="Profile" className="object-cover w-full h-full" />
          </div>
          <div className="name text-gray-200">
            <h2 className="text-lg font-semibold">John Doe</h2>
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
    </div>
  );
};

export default Conversation;
