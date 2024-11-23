import { Result } from 'postcss'
import React from 'react'
import {Routes, Route}  from 'react-router-dom'
import Chats from './pages/Chats'

const App = () => {
  return (
    <div className='px-0 md:px-0 lg:px-0 sm:px-0 min-h-screen bg-gradient-to-b from-slate-950 to-black'>
      
      <Routes>
        <Route path='/' element={<Chats/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App