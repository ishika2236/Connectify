import React, { useState, useContext } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { PopoverBody } from '../../ui/popover';
import { ChatContext } from '../../../context/ChatProvider';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserListItem from '../UserAvatar/UserListItem';
import getUsers from '../../../services/getUsers';
import addUserToGroup from '../../../services/GroupChat/addUserToGroup';
import { toaster } from '../../ui/toaster';

const AddMemberPopUp = () => {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const { selectedChat, setSelectedChat } = useContext(ChatContext);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const selectUser = async (newMember) => {
    setSelectedMembers((members) => [...members, newMember]);
  };
  const AddMembers =async ()=>{
    setAdding(true);
    if(selectedMembers.length <=0)
    {
        toaster.create({
            title:'No user selected',
            description: 'Select users to be added',
            type: 'warning'
        })
        return;
        
    }
    const finalUsers = selectedMembers.filter((user)=> !selectedChat.users.some((chatUser) => chatUser._id === user._id));
    if(finalUsers.length === 0)
    {
        toaster.create({
            title:'No user',
            description: 'All selected users are already part of the group',
            type: 'error'
        })
        return;
    }
    try {
      console.log(finalUsers);
      
        const result = await addUserToGroup(selectedChat, finalUsers);
        console.log(result);
        setSelectedChat(result.updatedChat);

        toaster.create({
        title: 'Success',
        description: `${finalUsers.length} user(s) added to the group!`,
        type: 'success',
        });

        setSelectedMembers([]);
        setNames([]);
        
    } catch (error) {
        console.log(error);
        
    }
    setAdding(false);

  }

  const removeName = async (member) => {
    const newList = selectedMembers.filter((user) => user._id !== member._id);
    setSelectedMembers(newList);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await getUsers(name);
      setNames(response);
      console.log(names);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  return (
    <PopoverBody className="bg-gray-900 m-0 p-0 h-full w-full">
      <div className="p-4">
        <div className="flex mb-4">
          <Input
            className="border border-pink text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            onClick={(e) => {
              handleSearch(e);
            }}
            className="text-md bg-pink mx-2 p-1 h-10"
          >
            Go
          </Button>
        </div>
        <div className="p-4 border-b border-gray-800/50 flex flex-wrap flex-row gap-2 justify-center">
          {selectedMembers.length > 0 ? (
            selectedMembers.map((name, index) => (
              <div
                key={index}
                className="bg-gray-900/80 rounded-full px-3 py-1 flex items-center space-x-2 border border-gray-800/30"
              >
                <img
                  src={name.profilePic}
                  className="w-6 h-6 rounded-full transition-opacity duration-300 opacity-100"
                  alt=""
                />
                <span>{name.name}</span>
                <FontAwesomeIcon
                  onClick={() => removeName(name)}
                  icon={faXmark}
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                />
              </div>
            ))
          ) : (
            <div className="text-gray-400">No members selected</div>
          )}
        </div>
        <div>
          {names.length > 0 ? (
            <>
              {names.map((name, index) => (
                <div key={index} className='my-2'>
                  <UserListItem
                    contact={name}
                    handleFunction={() => selectUser(name)}
                  />
                </div>
              ))}
            </>
          ) : loading ? (
            <div>Searching! Hold on a second...</div>
          ) : null}
        </div>
      </div>
      <button className='bg-gradient-to-r w-[100%] bg-gradient-to-r from-[#3B82F6]/80 via-[#F472B6]/80 to-[#3B82F6]/80 text-white py-3 rounded-xl transition-all space-x-2 hover:shadow-lg hover:shadow-pink/20  flex items-center justify-center' onClick={()=>AddMembers()}><div >Add</div></button>
    </PopoverBody>
  );
};

export default AddMemberPopUp;
