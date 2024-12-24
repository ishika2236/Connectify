const asyncHandler = require('express-async-handler');
const Status = require('../models/statusSchema');
const Chat = require('../models/chatModel')

const addStatus = asyncHandler(async (req, res) => {
    // console.log(req.files);
    const { caption } = req.body; 
    
    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error("No image or video received in backend");
    }

    const mediaFiles = req.files.map((file) => {
        const fileType = file.mimetype.startsWith('image') ? 'image' : 'video';
        return {
            url:  `uploads/${file.filename}`,
            type: fileType,
        };
    });

    const newStatus = new Status({
        userId: req.user._id,
        media: mediaFiles,
        caption: caption || "",
    });

    const savedStatus = await newStatus.save();

    res.status(201).json({
        message: 'Status uploaded successfully',
        status: savedStatus,
    });
});
const fetchStatus = async (req, res) => {
    const userId = req.user._id;
    // console.log(userId);
    
    try {
        const chats = await Chat.find({ users: userId }).lean();
        // console.log(chats);
        
        const chatUserIds = chats
            .flatMap(chat => chat.users)
            .filter(userId => userId.toString() !== userId);
        console.log(chatUserIds);
        
        const statuses = await Status.find({
            userId: { $in: chatUserIds }
        })
            .populate('userId', 'name profilePic')
            .lean();
        console.log(statuses);
        
        const processedStatuses = statuses.map(status => {
            const isViewed = Array.isArray(status.viewedBy)
                ? status.viewedBy.some(view => view.viewerId?.toString() === userId)
                : false; 
            return { ...status, isViewed };
        });

        res.status(200).json({ statuses: processedStatuses });
    } catch (error) {
        console.error('Error fetching statuses:', error);
        res.status(500).json({ message: 'Error fetching statuses', error });
    }
};

module.exports = { addStatus, fetchStatus };
