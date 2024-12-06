import React, { useContext } from 'react';
import { Avatar, Box } from '@chakra-ui/react'; // Import Chakra UI components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChatContext } from '../../../context/ChatProvider';

const UserListItem = (props) => {
  const { contact, handleFunction } = props;
  const { user } = useContext(ChatContext); 
  

  return (
    <Box
      onClick={handleFunction}
      display="flex" 
      cursor="pointer"
      alignItems="center"
      justifyContent={"space-between"}
      px={3}
      py={2}
      mb={2}
      borderRadius="lg" 
      border="2px solid"
      borderColor="pink"
       className="bg-gradient-to-r from-pink/75 to-blue/75"
    >
      
      <div className="flex  items-center">
      <img alt="image" src={contact.profilePic} className='h-8 w-8 rounded-full mr-2'/> 
      <div className="flex-col">
        <div className="text-white h-full text-md">{contact.name}</div>
        
        <div className="bio text-xs">{contact.bio}</div>
      </div>
      </div>
      <div className="text-md p-1 px-2 rounded-full bg-pink/75 hover:bg-gray-light border-2 border-slate-500 hover:border-pink">
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </Box>
  );
}

export default UserListItem;
