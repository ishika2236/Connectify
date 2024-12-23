const express = require('express');
const http = require('http');
require('dotenv').config();
const { dbConnection } = require('./utils/dbConnection');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const messageRoutes = require('./routes/message')
const authMiddleware = require('./middleware/authMiddleware');


const app = express();

const server = http.createServer(app);


dbConnection();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors:{
    origin: "http://localhost:5173"
  }
})
io.on("connection",(socket)=>{
  console.log("connected to socket.io");

  socket.on('setup',(userData)=>{
    if(userData)
    {
      console.log(userData._id);
      socket.join(userData._id);
    }
    

   
    
    socket.emit("connection");
    socket.on('join room',(room)=>{
      socket.join(room);
      console.log(`User joined room: ${room}`);
    })

    socket.on("new message", (newMessageRecieved) => {
      const chat = newMessageRecieved.chat;
      if (!chat.users) return console.log("chat.users not defined.");
    
      chat.users.forEach((user) => {
        if (user._id === newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
    

    socket.on('typing', (room)=>{
      socket.in(room).emit('typing');
    })
    socket.on('stop typing', (room)=>{
      socket.in(room).emit('stop typing');
    })
  })
})

app.use('/api', loginRoutes);
app.use('/api/user',authMiddleware, userRoutes);
app.use('/api/chat',authMiddleware,chatRoutes);
app.use('/api/message', authMiddleware, messageRoutes);


const PORT = process.env.PORT || 5000; 
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
