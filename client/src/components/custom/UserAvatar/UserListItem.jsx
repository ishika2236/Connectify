import React, { useContext } from 'react';
import { Avatar, Box } from '@chakra-ui/react'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChatContext } from '../../../context/ChatProvider';

const UserListItem = (props) => {
  const { contact, handleFunction } = props;
  const { user } = useContext(ChatContext); 
  

  return (
    <Box
      onClick={handleFunction}
      w={"full"}
      display="flex" 
     
    >
      <div className="flex justify-between w-full items-center px-2 h-full text-gray-300">
        <div className=" flex items-center ">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 via-pink to-blue-500 p-0.5 hover:shadow-lg hover:shadow-pink/20">
            <img alt="image" src={`${import.meta.env.VITE_API_URL}${contact.profilePic}`} className='rounded-full w-full h-full object-cover transition-opacity duration-300 opacity-100'/> 
          </div>
          <div className="px-4">
            <h4 className='font-semibold text-sm'>{contact.name}</h4>
            <p className='text-xs'>{contact.bio}</p>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full border-2 border-gray-700 group-hover:border-pink transition-all group-hover:shadow-lg group-hover:shadow-pink/20"></div>
      </div>
      
    </Box>
  );
}

export default UserListItem;
