import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import fetchStatus from '../../services/fetchStatus';
import ViewStatus from './ViewStatus';
import { PopoverRoot , PopoverTrigger} from '@chakra-ui/react';
import AddStatus from './AddStatus';
import viewStatus from '../../services/viewStatus';
const Status = () => {
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [viewedUpdates, setViewedUpdates] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [showStatus, setShowStatus] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const [viewStatus, setViewStatus] = useState(false);
  

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };
  const handleViewStatusClose = ()=>{
    setShowStatus(false);
  }

  const handleViewStatus = async(status) => {
    
    setSelectedStatus(status);
    setShowStatus(true);
    try {
      const response = await viewStatus(status._id);
      console.log(response);
      
    } catch (error) {
      console.log("Error occured in handling status views: ", error);
      
    }
    
  };

  const closeStatus = () => {
    setShowStatus(false);
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetchStatus();
        console.log(response);

        if (response?.statuses) {
          setViewedUpdates(response.statuses.filter((status) => status.isViewed));
          setRecentUpdates(response.statuses.filter((status) => !status.isViewed));
        } else {
          console.warn('Statuses are undefined in the response.');
        }
      } catch (error) {
        console.log('Error occurred in fetching statuses');
      }
    };
    fetchStatuses();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-black/10 via-gray-900 to-black/40 relative " >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,192,203,0.05),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,255,0.1),transparent_40%)] pointer-events-none"></div>

      {/* Heading */}
      <div className="p-4 border-b border-gray-800/20 backdrop-blur-sm bg-black/40 relative z-10">
        <h2 className="text-2xl font-bold bg-gradient-to-b from-gray-200 via-pinkNew to-blue bg-clip-text text-transparent">Status</h2>
      </div>

      {/* Add status button */}
      
      <div className="p-4 relative" >
        <PopoverRoot>
         
          <div onClick={() => setIsPopoverOpen(true)} className="w-full bg-gradient-to-r from-gray-500/10 via-pinkNew/5 to-blueNew/10 hover:from-gray-500/20 hover:via-pink-500/10 hover:to-blue-500/20 rounded-2xl p-4 flex items-center space-x-3 transition-all duration-300 backdrop-blur-md shadow-lg shadow-gray-500/10 hover:shadow-pinkNew/10">
          <div className="relative flex">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-400 via-pinkNew to-blue p-0.5">
              <img src="" alt="" className="rounded-full w-full h-full object-cover transition-opacity duration-300 opacity-100" />
            </div>
            <PopoverTrigger>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-r from-pink to-blue rounded-full flex items-center justify-center border-2 border-black shadow-lg">
              <FontAwesomeIcon icon={faPlus} className="text-sx text-black"></FontAwesomeIcon>
            </div>
            </PopoverTrigger>
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-200">Add Status</p>
            <p className="text-xs text-pinkNew">Share your updates</p>
          </div>
        </div>

         
          {isPopoverOpen && <AddStatus onClose={handlePopoverClose} />}
        </PopoverRoot>
        
      </div>

      {/* Recent updates */}
      {recentUpdates.length > 0 && (
        <div className="p-4 border-b border-gray-800/20 backdrop-blur-md bg-black/30 relative z-10">
          <div className="text-sm font-semibold text-gray-300 mb-4">Recent Updates</div>
          <div className="space-y-4">
            {recentUpdates.map((status) => (
              <div className="flex flex-col" key={status._id}>
                <div
                  className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-500/5 via-pinkNew/5 to-blue/5 hover:from-gray-500/10 hover:via-pinkNew10 hover:to-blue/10 transition-all duration-300 backdrop-blur-md"
                  onClick={() => handleViewStatus(status)}
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full ring-2 ring-pinkNew/70 p-0.5 animate-pulse">
                      <img src={status?.userId?.profilePic || null} alt="" className="rounded-full w-full h-full object-cover transition-opacity duration-300 opacity-100" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">{status?.userId?.name}</p>
                    <p className="text-xs text-pinkNew">{status?.createdAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
       {/* Viewed updates */}
       {viewedUpdates.length > 0 && (
        <div className="p-4 border-b border-gray-800/20 backdrop-blur-md bg-black/30 relative z-10">
          <div className="text-sm font-semibold text-gray-300 mb-4">Viewed Updates</div>
          <div className="space-y-4">
            {viewedUpdates.map((status) => (
              <div className="flex flex-col" key={status._id}>
                <div
                  className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-500/5 via-pinkNew/5 to-blue/5 hover:from-gray-500/10 hover:via-pinkNew10 hover:to-blue/10 transition-all duration-300 backdrop-blur-md"
                  onClick={() => handleViewStatus(status)}
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full ring-2 ring-pinkNew/70 p-0.5 animate-pulse">
                      <img src={status?.userId?.profilePic || null} alt="" className="rounded-full w-full h-full object-cover transition-opacity duration-300 opacity-100" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">{status?.userId?.name}</p>
                    <p className="text-xs text-pinkNew">{status?.createdAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show status */}
      {showStatus && (
        <div className="" >
            <button onClick = {()=>closeStatus()}>
                <FontAwesomeIcon icon={faCross}  className='text-red text-lg' >
                    close
                </FontAwesomeIcon>
            </button>
            
          <div className="" onClick={(e) => e.stopPropagation()}>
          {showStatus &&   <ViewStatus status={selectedStatus} handleViewStatusClose= {handleViewStatusClose} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
