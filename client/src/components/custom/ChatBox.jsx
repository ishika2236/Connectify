import React from 'react'
import {ChatContext} from '../../context/ChatProvider'
import {Box} from '@chakra-ui/react'
import { useContext } from 'react'
import ChatArea from './ChatComponents/ChatArea'
import { useState } from 'react'
import ChatSettings from './ChatComponents/ChatSettings'
import { useEffect } from 'react'
import { io } from 'socket.io-client'


const ChatBox = ({refreshContact, setRefreshContact}) => {
    const ENDPOINT = import.meta.env.VITE_API_URL;
    const {user, selectedChat} = useContext(ChatContext);
    const [showSettings, setShowSettings] = useState(false);
    
    
    
  return (
    <Box d={{base:selectedChat  ? "flex":"none", md:"flex"}}
        alignItems={"center"}
        flexDir={"column"}
        p={3}
        w={{base: "100%", md:  "68%"}} 
        bg={"black"}
        margin={0}
        minHeight={'screen'}
        height={'fit-content'}
    >
        {showSettings?(
            <>
            {selectedChat && <ChatSettings setShowSettings = {setShowSettings} showSettings={showSettings} />}
            
            </>
        ):(
            <><ChatArea refreshContact={ refreshContact} setRefreshContact = {setRefreshContact} setShowSettings={setShowSettings} /></>
        )}
        
    </Box>
  )
}

export default ChatBox