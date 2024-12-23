const asyncHandler = require('express-async-handler');
const Status = require('../models/statusSchema');

const addStatus = asyncHandler(async (req, res) => {
    console.log(req.files);
    const { caption } = req.body; 
    
    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error("No image or video received in backend");
    }

    const mediaFiles = req.files.map((file) => {
        const fileType = file.mimetype.startsWith('image') ? 'image' : 'video';
        return {
            url: file.path,
            type: fileType,
        };
    });

    const newStatus = new Status({
        userId: req.user._id, // Ensure `req.user` is set correctly via middleware
        media: mediaFiles,
        caption: caption || "",
    });

    const savedStatus = await newStatus.save();

    res.status(201).json({
        message: 'Status uploaded successfully',
        status: savedStatus,
    });
});

module.exports = { addStatus };
