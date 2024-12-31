import React from 'react'
import Sidebar from '../components/custom/Sidebar'
import ContactsNew from '../components/custom/ContactsNew'
import { Container , Box} from '@chakra-ui/react'
import ChatBox from '../components/custom/ChatBox'

const HomePage = () => {
  return (
    <Container margin={0} maxH={'xl'} maxW={'xl'} padding={0}>
    <Box 
      display='flex'
      alignItems="flex-start" 
      height="100vh" 
      width="100vw"
      overflow={'hidden'}
      margin={0}
      padding={0}
    >
   
      <Sidebar className="w-64" />

      <ContactsNew className="w-96 z-10 relative" />

      {/* <Conversation className="flex-grow" /> */}
      <ChatBox />
      
    </Box>
    
    </Container>
  )
}

export default HomePage
