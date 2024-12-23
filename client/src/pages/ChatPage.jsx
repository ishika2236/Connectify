import React, { useState } from 'react'
import Sidebar from '../components/custom/Sidebar'
// import ContactsNew from '../components/custom/ContactsNew'
import ChatBox from '../components/custom/ChatBox'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import ContactsNew from '../components/custom/ContactsNew'


const ChatPage = () => {
    const {user } = useContext(ChatContext);
    const [refreshContact, setRefreshContact] = useState(false);
  return (
    <div className="w-[100%] flex">
        {user && <Sidebar/>}
        <Box m={0} display="flex" justifyContent={"space-between"} w="100%" h="91.5vh" p="10px">
            {user && <ContactsNew refreshContact={refreshContact}/>}
            {user && <ChatBox refreshContact={refreshContact} setRefreshContact={setRefreshContact}/>}
        </Box>
        

    </div>
  )
}

export default ChatPage