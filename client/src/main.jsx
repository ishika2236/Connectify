import { StrictMode } from 'react'
import { Provider } from "./components/ui/provider.jsx"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from './context/ChatProvider.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider>
    <ChatProvider>
    <App />
    </ChatProvider>
  </Provider>
 
   
  </BrowserRouter>,
)
