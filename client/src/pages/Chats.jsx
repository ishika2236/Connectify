import React from 'react'
import Sidebar from '../components/custom/Sidebar'
import Contacts from '../components/custom/Contacts'
import Conversation from '../components/custom/Conversation'

const Chats = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar className="w-64" />

      <Contacts className="w-96 z-10 relative" />

      <Conversation className="flex-grow" />
    </div>
  )
}

export default Chats
