
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus, faCamera } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import {
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
  } from "./../ui/popover"
import AddStatus from './AddStatus'
const Status = () => {
    const [recentUpdates, setRecentUpdates] = useState([]);
    const [viewedUpdates, setviewedUpdates] = useState([]);

  return (
    <div className='w-full h-screen flex flex-col  bg-gradient-to-b from-black via-gray-950 to-black relative'>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,192,203,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,255,0.1),transparent_40%)] pointer-events-none"></div>
        {/* heading */}
        <div className="p-4 border-b border-gray-800/20 backdrop-blur-sm bg-black/40 relative z-10">
            <h2 className='text-2xl font-bold bg-gradient-to-r from-gray-200 via-pinkNew to-blue bg-clip-text text-transparent'>Status</h2>
        </div>
        {/* add status button */}
        <PopoverRoot>
            <PopoverTrigger>
            <div className="p-4 relative z-20">
                <div className="w-full bg-gradient-to-r from-gray-500/10 via-pinkNew/5 to-blueNew/10 hover:from-gray-500/20 hover:via-pink-500/10 hover:to-blue-500/20 rounded-2xl p-4 flex items-center space-x-3 transition-all duration-300 backdrop-blur-md shadow-lg shadow-gray-500/10 hover:shadow-pinkNew/10">
                    <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-400 via-pinkNew to-blue p-0.5">
                            <img src="" alt="" className='rounded-full w-full h-full object-cover transition-opacity duration-300 opacity-100'/>
                            
                        </div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-r from-pink to-blue rounded-full flex items-center justify-center border-2 border-black shadow-lg">
                            <FontAwesomeIcon icon={faPlus}className='text-sx text-black'></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="text-left">
                        <p className='font-semibold text-gray-200'>Add Status</p>
                        <p className='text-xs text-pinkNew'>Share your updates</p>
                    </div>
                    
                </div>
            </div>

            </PopoverTrigger>
            <AddStatus/>
        </PopoverRoot>
        
        {recentUpdates.length > 0? (
            <>
                <div className="p-4 border-b border-gray-800/20 backdrop-blur-md bg-black/30 relative z-10">
                    <div className="text-sm font-semibold text-gray-300 mb-4">Recent Updates</div>
                    <div className="space-y-4">
                        {recentUpdates.map((status, index)=>(
                            <>
                            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-500/5 via-pinkNew/5 to-blue/5 hover:from-gray-500/10 hover:via-pinkNew10 hover:to-blue/10 transition-all duration-300 backdrop-blur-md">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full ring-2 ring-pinkNew/70 p-0.5 animate-pulse">
                                        <img src={status?.user.profilePic || null} alt="" srcset="" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-pinkNew to-blue rounded-full border-2 border-black shadow-lg"></div>

                                </div>
                                <div className="">
                                    <p className='font-semibold text-gray-200'>{status?.user.name}</p>
                                    <p className='text-xs text-pinkNew'>{status?.createdAt}</p>

                                </div>
                            </div>

                            </>
                        ))}
                    </div>

                </div>
            </>

        ):(
            <>
            </>
        )}
        {viewedUpdates.length > 0? (
            <>
                <div className="p-4 flex-1 relative z-10">
                    <div className="text-sm font-semibold text-gray-300 mb-4">Viewed Updates</div>
                    <div className="space-y-4">
                        {viewedUpdates.map((status, index)=>(
                            <>
                            <div className="flex items-center space-x-3 opacity-75 p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-500/5 hover:via-pinkNew/5 hover:to-blue/5 transition-all duration-300">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full ring-2 ring-gray-600/30 p-0.5">
                                        <img src={status?.user.profilePic || null} alt="" srcset="" className='rounded-full w-full h-full object-cover transition-opacity duration-300 opacity-100' />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-pinkNew to-blue rounded-full border-2 border-black shadow-lg"></div>

                                </div>
                                <div className="">
                                    <p className='font-semibold text-gray-200'>{status?.user.name}</p>
                                    <p className='text-xs text-gray-400'>{status?.createdAt}</p>

                                </div>
                            </div>

                            </>
                        ))}
                    </div>

                </div>
            </>

        ):(
            <>
            </>
        )}


    </div>
  )
}

export default Status