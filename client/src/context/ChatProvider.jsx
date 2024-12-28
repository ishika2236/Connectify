import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../services/getUserInfo';

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat,setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      const currentPath = window.location.pathname;
      if(!token)
      {if (currentPath !== '/signup' && currentPath !== '/login') {
        navigate('/login'); // Default to /login if the path is not valid
      }
      return;

      }
      

      try {
        
        const userInfo = await getUserInfo(token);
        
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to fetch user info', error);
        navigate('/auth');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;