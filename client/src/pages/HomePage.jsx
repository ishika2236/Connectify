import React from 'react'
import Sidebar from '../components/custom/Sidebar'
import Contacts from '../components/custom/Contacts'
import Conversation from '../components/custom/Conversation'
import { Container , Box} from '@chakra-ui/react'

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

      <Contacts className="w-96 z-10 relative" />

      <Conversation className="flex-grow" />
      
    </Box>
    
    </Container>
  )
}

export default HomePage
