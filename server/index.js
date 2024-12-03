const express = require('express');
const http = require('http');
require('dotenv').config();
const { dbConnection } = require('./utils/dbConnection');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat')
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


app.use('/api', loginRoutes);
app.use('/api/user',authMiddleware, userRoutes);
app.use('/api/chat',authMiddleware,chatRoutes);


const PORT = process.env.PORT || 5000; 
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
