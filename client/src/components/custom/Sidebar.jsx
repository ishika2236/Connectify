import React from 'react'
import { useContext, useEffect } from 'react'
import { ChatContext } from '../../context/ChatProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faMessage, faPhoneVolume, faPodcast } from '@fortawesome/free-solid-svg-icons'
import { color } from 'framer-motion'

const Sidebar = () => {
    const {user, selectedChat, setSelectedChat} = useContext(ChatContext);
    useEffect(() => {
      console.log(user);
      
    }, [])
    const SidebarItems = [
        { icon: faMessage, content: "messages", color: 'blue' },
        { icon: faPhoneVolume, content: "calls", color:'purple' },
        { icon: faPodcast, content: "status" , color:'pink'},
    ];
    
  return (
    <div className='h-screen border-r border-gray-800/70 pt-15  py-10 px-5 bg-gradient-to-b from-gray-900/10 via-gray-800/10 to-purpleDark/5'>
        {/* user header */}
        <div className="p-4 flex flex-col items-center lg:items-start space-y-4 border-b border-gray-800/50 relative z-20">
        <div className="flex flex-col justify-center items-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-blue via-pink to-blue p-1 m-2 shadow-lg shadow-blue/20">
                <img src={user && user.profilePic} alt="" srcset="" className='rounded-full w-full h-full object-cover transition-opacity duration-300 opacity-100' />
            </div>
            <div className="hidden lg:block">
                <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue via-pinkNew to-pinkNew">{user && user.name}</h3>
                <p className="text-sm text-gray-400">{user && user.bio}</p>
            </div>
        </div>
        </div>
        <div className="flex-1 py-4 relative z-20 ">
                <ul>
                    {SidebarItems.map((item, index)=>(
                        <li key={index} className='relative px-4 my-5'>
                            <div className="flex items-center lg:space-x-3 py-2 px-4 rounded-xl bg-gradient-to-r from-blue/10 via-pinkNew/5 to-purpleLight/10 hover:from-blue/20 hover:via-pinkNew/10 hover:to-purpleLight/20 transition-all group backdrop-blur-sm shadow-lg shadow-blue/10">
                            <FontAwesomeIcon icon={item.icon} style={{color: item.color}}></FontAwesomeIcon>
                            <span className='hidden lg:block lg:mx-2'>{item.content}</span>

                            </div>
                        </li>
                    ))}
                </ul>
                <button className='p-4 z-20 mt-20 w-full flex items-center justify-center lg:justify-start lg:space-x-3 py-2 px-4 rounded-xl bg-gradient-to-r from-blue via-pinkNew to-purpleDark hover:from-blue hover:via-pink hover:to-purpleLight transition-all shadow-lg shadow-blue/20'><div>New Chat</div></button>
                <button  className='p-4 z-20 mt-5 w-full flex items-center justify-center lg:justify-start lg:space-x-3 py-2 px-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/60 transition-all backdrop-blur-sm'>
                    <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                    <div className="hidden lg:block text-gray-400">Settings</div>
                </button>
        </div>
    </div>

  )
}

export default Sidebar