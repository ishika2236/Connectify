import { Result } from 'postcss'
import React from 'react'
import {Routes, Route}  from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './components/custom/Login'
import ChatPage from './pages/ChatPage'
import StatusPage from './pages/StatusPage'
import CallPage from './pages/CallPage'


const App = () => {
  return (
    <div className='p-0 md:p-0 lg:p-0 sm:p-0 min-h-screen h-fit bg-gray-900 '>
      
      <Routes>
        <Route path='/' element={<ChatPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/status' element = {<StatusPage/>} ></Route>
        <Route path='/calls' element= {<CallPage/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App