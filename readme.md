# Connectify: Chat Application

## Overview
**Connectify** is a real-time chat application designed to provide seamless communication with features like real-time messaging, ephemeral status updates, and video calling. Built with modern web technologies, it emphasizes security, scalability, and a user-friendly experience. The application caters to both individual and group communications, making it ideal for personal and professional use.

## Features
### 1. Real-Time Messaging
- Instantaneous text communication.
- Multimedia support for images, videos, and files.
- Read receipts and chat history storage.

### 2. Ephemeral Status Updates
- Post text, image, or video updates.
- Status visibility settings for privacy.
- Updates expire after 24 hours.

### 3. Video Calling
- High-quality audio and video calls using WebRTC.
- Support for both one-on-one and group calls.
- In-call features like mute, video toggle, and call end options.

### 4. User Management
- Secure user registration and login with JWT.
- Customizable profiles with images and bios.
- Contact synchronization and group management.

### 5. Notifications
- Push notifications for new messages, calls, or status updates.

### 6. Scalability and Performance
- Supports a large number of concurrent users.
- Efficient real-time updates using WebSocket connections.

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB Atlas account.
- AWS account for hosting and storage.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ishika2236/connectify.git
   ```
2. Navigate to the project directory:
   ```bash
   cd connectify
   ```
3. Install dependencies for both backend and frontend:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```
4. Set up environment variables:
   - Create `.env` files for both the backend and frontend.
   - Backend `.env` example:
     ```env
     MONGO_URI=your-mongodb-uri
     JWT_SECRET=your-secret-key
     AWS_ACCESS_KEY_ID=your-access-key-id
     AWS_SECRET_ACCESS_KEY=your-secret-access-key
     ```
5. Start the application:
   - Backend:
     ```bash
     cd server
     npm start
     ```
   - Frontend:
     ```bash
     cd client
     npm run dev
     ```

## API Endpoints
### Authentication
- `POST /auth/register`: User registration.
- `POST /auth/login`: User login.

### Messaging
- `POST /api/message`: Send a message.
- `GET /api/message/:chatId`: Fetch message history for a chat.

### Chat Management
- `POST /api/chat/group/create`: Create a group chat.
- `POST /api/chat/group/addMember`: Add a member to a group.

### Status Updates
- `POST /api/status/add`: Upload a status update.
- `GET /api/status/fetch`: Fetch status updates.

## Deployment
### Infrastructure
- **Backend and Frontend Hosting**: AWS EC2 instances.
- **Static File Storage**: AWS S3 for images and other media.
- **Database**: MongoDB Atlas for scalable data management.

## Future Enhancements
1. **AI/ML Integration**
   - Smart reply and message prediction.
   - Sentiment analysis for messages.
2. **Cross-Platform Support**
   - Mobile apps for iOS and Android.
   - Desktop apps for Windows and macOS.
3. **Enhanced Security**
   - End-to-end encryption for messages.
   - Multi-factor authentication for user accounts.
4. **Additional Features**
   - Push notifications.
   - Message reactions and voice messages.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.


## Acknowledgments
We extend our heartfelt gratitude to **Vaibhav Sir** for his guidance, inspiration, and constructive suggestions throughout the development of this project.

