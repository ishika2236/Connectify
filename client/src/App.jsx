import { Result } from 'postcss'
import React from 'react'
import {Routes, Route}  from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './components/custom/Login'


const App = () => {
  return (
    <div className='px-0 md:px-0 lg:px-0 sm:px-0 min-h-screen '>
      
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App