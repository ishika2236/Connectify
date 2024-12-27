const asyncHandler = require('express-async-handler');
const Status = require('../models/statusSchema');
const Chat = require('../models/chatModel')


const addStatus = asyncHandler(async (req, res) => {
    const captions = req.body.captions; 
    const files = req.files; 
    const captionsArray = Array.isArray(captions) ? captions : [captions];

    if (!files || files.length === 0) {
        res.status(400);
        throw new Error("No files received");
    }

    if (captionsArray && files.length !== captionsArray.length) {
        res.status(400);
        throw new Error("Number of captions and files must match");
    }

    const mediaFiles = files.map((file, index) => {
        const fileType = file.mimetype.startsWith('image') ? 'image' : 'video';
        return {
            url: `uploads/${file.filename}`, 
            type: fileType,
            caption: captionsArray[index] || "", 
        };
    });

    
    let existingStatus = await Status.findOne({ userId: req.user._id });

    if (existingStatus) {
        
        existingStatus.media = [...existingStatus.media, ...mediaFiles];
        const updatedStatus = await existingStatus.save();
        res.status(200).json({
            message: 'Media added to existing status',
            status: updatedStatus,
        });
    } else {
        
        const newStatus = new Status({
            userId: req.user._id,
            media: mediaFiles,
        });

        const savedStatus = await newStatus.save();

        res.status(201).json({
            message: 'Status uploaded successfully',
            status: savedStatus,
        });
    }
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
                ? status.viewedBy.some(view => view.viewerId.toString() === userId.toString())
                : false; 
            return { ...status, isViewed };
        });

        res.status(200).json({ statuses: processedStatuses });
    } catch (error) {
        console.error('Error fetching statuses:', error);
        res.status(500).json({ message: 'Error fetching statuses', error });
    }
};
const viewStatus = asyncHandler(async(req,res)=>{
    const statusId = req.params.statusId;
    const userId = req.user._id;
    console.log("statusId: ", statusId, "userId: ", userId);
    
    try {
        const statusEntry = await Status.findByIdAndUpdate(statusId, {
            $push: {viewedBy: {
                viewerId: userId
            }}
        }, {new: true});
        if(!statusEntry)
        {
            return res.status(400).json({error: "No such status exists."});
        }
       console.log(statusEntry)
        
        return res.status(202).json({message: `status viewed by user ${req.user.name}`});
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: 'Server error occured in updating status views details'})
    }
   

})

module.exports = { addStatus, fetchStatus , viewStatus};
