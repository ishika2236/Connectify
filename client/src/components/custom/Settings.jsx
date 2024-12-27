import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faBell, faCamera, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    PopoverRoot,
    PopoverTrigger} from '../ui/popover'
import EditSettings from "./EditSettings";
import logout from "../../services/logout";
import Sidebar from "./Sidebar";

const Settings = () => {
    




  const { user } = useContext(ChatContext);
  const [isPushEnabled, setIsPushEnabled] = useState(false); 

  useEffect(() => {
    console.log(user);
  }, [user]);

  // Toggle function
  const handleToggle = () => {
    setIsPushEnabled((prevState) => !prevState);
  };

  return (
    <div className="flex">
        <Sidebar/>
    <div className="bg-gray-900/90 backdrop-blur-lg  overflow-hidden shadow-2xl w-full animate-scale-in z-10 relative border-1 border-gray-800">
        

        <div className="relative h-48">
        <PopoverRoot>
              <PopoverTrigger>
                  <button className="py-2 px-3 absolute top-10 right-10 border-1 border-gray-700 bg-gradient-to-r from-pinkNew  to-blue text-white z-50">Edit</button>
              </PopoverTrigger>
              <EditSettings/>
          </PopoverRoot>
  
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-pinNew/20 to-blueNew opacity-30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/20 via-pinkNew/10 to-blue/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-blue via-pinkNew/50 to-blue p-0.5 shadow-lg shadow-pinkNew/10">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${user?.profilePic}`}
                    alt=""
                    className="w-full h-full rounded-2xl"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink/80 to-blue w-8 h-8 rounded-xl flex items-center justify-center shadow-lg border-2 border-gray-900 hover:from-pink/80 hover:to-blue transition-colors">
                  <FontAwesomeIcon icon={faCamera} className="text-md text-white" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                <p className="text-gray-400">{user?.bio}</p>
              </div>
            </div>
          </div>
        </div>
        {/* settings content */}
        <div className="p-6 space-y-8 relative z-10">
          {/* info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-300 via-pinkNew to-blue bg-clip-text text-transparent">
              Account
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl hover:bg-gray-800/50 transition-all cursor-pointer border-1 border-gray-700/30">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon className="text-pinkNew" icon={faAt} />
                  <div>
                    <div className="font-medium text-white">Username</div>
                    <div className="text-sm text-gray-400">{user?.name}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl hover:bg-gray-800/50 transition-all cursor-pointer border-1 border-gray-700/30">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue" />
                <div className="flex flex-col">
                  <p className="text-lg text-white">Email</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-xl font-semibold bg-gradient-to-r from-gray-300 via-pinkNew to-blue bg-clip-text text-transparent">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border-1 border-gray-700/30">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faBell} className="text-pinkNew" />
                    <div>
                      <div className="text-md text-white">Push Notification</div>
                      <div className="text-sm text-gray-400">
                        Get notified about new messages
                      </div>
                    </div>
                  </div>
                  {/* Toggle Button */}
                  <div
                    className={`w-12 h-6 rounded-full relative cursor-pointer shadow-lg ${
                      isPushEnabled
                        ? "bg-gradient-to-r from-pinkNew to-blue"
                        : "bg-gray-600"
                    }`}
                    onClick={handleToggle}
                  >
                    <button
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        isPushEnabled ? "right-1" : "left-1"
                      }`}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Logout */}
          <button onClick={()=>logout()} className="w-full py-4 bg-gray-800/50 hover:bg-gray-700 rounded-xl transition-all text-pinkNew hover:text-red-500 font-medium border-1 border-gray-700/30 hover:border-red/30">
          <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Settings;
