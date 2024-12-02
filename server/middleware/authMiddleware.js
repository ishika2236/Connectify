const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization )
    {
        
        try{
            token = req.headers.authorization.split(' ')[1];
            
            const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            req.user = User.findById(decodedUser._id).select("-password");
            next();

        }
        catch(error)
        {
            res.status(401).json({error: "User not authenticated"});

        }
    }
})
module.exports = authMiddleware;