import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faPhoneVolume, faPodcast, faGear } from '@fortawesome/free-solid-svg-icons'; 
import { Tooltip } from "../../components/ui/tooltip"

const Sidebar = () => {
    const SidebarItems = [
        { icon: faMessage, content: "messages" },
        { icon: faPhoneVolume, content: "calls" },
        { icon: faPodcast, content: "status" },
    ];
    
    return (
        <div className="sidebar min-h-screen border-r-2 border-slate-600 w-16 text-center pt-6 bg-slate-900 flex flex-col text-gray-200">
            {SidebarItems.map((item, index) => (
                <div key={index} className="sidebar-item text-xl mb-5">
                    <Tooltip content={item.content}>
                        <FontAwesomeIcon icon={item.icon} />
                    </Tooltip>
                </div>
            ))}
            <div className="sidebar-footer mt-auto text-xl mb-5 flex flex-col items-center">
                <Tooltip content={"settings"}>
                    <FontAwesomeIcon icon={faGear} />
                </Tooltip>
                <div className="sidebar-profile-photo mt-4">
                    <img src=".default.png" alt="Profile" className="rounded-full w-6 h-6" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
