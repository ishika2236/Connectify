const express = require('express');
const http = require('http');
require('dotenv').config();
const { dbConnection } = require('./utils/dbConnection');
const path = require('path');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const messageRoutes = require('./routes/message');
const statusRoutes = require('./routes/status');
const callRoutes = require('./routes/call');
const authMiddleware = require('./middleware/authMiddleware');
const {PeerServer} = require('peer');


const app = express();

const server = http.createServer(app);


dbConnection();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const peerServer = PeerServer({
  port: 9000,
  path: '/peerjs'
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow CORS for the frontend
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173", // Ensure the origin matches your frontend URL
    methods: ["GET", "POST"]
  }
});
const socketUserMapping ={}
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

    // socket.on('joinVideoChat', (roomId, userId) => {
    //   if (!roomId || !userId) {
    //     console.log("Invalid roomId or userId");
    //     return;
    //   }
    
    //   // Map the user to the socket ID
    //   socketUserMapping[socket.id] = userId;
    
    //   socket.join(roomId);
    
    //   const room = io.sockets.adapter.rooms.get(roomId); 
    //   if (room) {
    //     room.forEach((socketId) => {
    //       if (socketId === socket.id) 
    //       {
    //         socket.emit("add-peer", {
    //           peerId: socketId,
    //           createOffer: true,
    //           userId: socketUserMapping[socketId]
    //         });
    //         return;

    //       }
    
    //       // Notify other users about the new peer
    //       io.to(socketId).emit("add-peer", {
    //         peerId: socket.id,
    //         createOffer: false,
    //         userId
    //       });
    
          
         
    //     });
    //   }
    // });
    // socket.on("relayIce",({peerId, icecandidate})=>{
    //   io.to(peerId).emit("iceCandidate",{
    //     peerId: socket.id,
    //     icecandidate
    //   })
    // })

    // socket.on("relay_sdp", ({peerId, sessionDescription})=>{
    //   io.to(peerId).emit("sessionDescription",{
    //     peerId: socket.id,
    //     sessionDescription
    //   })
    // })
    
    socket.on("new message", (newMessageRecieved) => {
      console.log(newMessageRecieved);
      
      const chat = newMessageRecieved.chat;
      if (!chat.users) return console.log("chat.users not defined.");
    
      chat.users.forEach((user) => {
        if (user._id === newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
    const leaveRoom =({roomId})=>{
      const {rooms} = socket;

      Array.from(rooms).forEach(roomId=>{
        const clients = Array.from(io.socketa.adapter.rooms.get(roomId))||[];
        clients.forEach((clientId)=>{
          io.to(clientId).emit("removePeer", {
            peerId: socket.id,
            userId: socketUserMapping[socket.id].id,
          })
          socket.emit("removePeer",{
            peerId: clientId,
            userId:  socketUserMapping[clientId].id,
          })
        })
        socket.leave(roomId);
        
      })
     delete socketUserMapping[socket.id];

    }
    socket.on('leave',leaveRoom);
    

    socket.on('typing', (room)=>{
      socket.in(room).emit('typing');
    })
    socket.on('stop typing', (room)=>{
      socket.in(room).emit('stop typing');
    })
    socket.on('start video-call', (roomId, signalData)=>{
        const room = roomId;
        if(!room.users)return console.log("room.users not defined");
        
        room.users.forEach((user)=>{
          if(user)
          socket.in(user._id).emit("video-call started", signalData);
        })
    })
  })
})

app.use('/api', loginRoutes);
app.use('/api/user',authMiddleware, userRoutes);
app.use('/api/chat',authMiddleware,chatRoutes);
app.use('/api/message', authMiddleware, messageRoutes);
app.use('/api/status', authMiddleware, statusRoutes);


const PORT = process.env.PORT || 5000; 
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
