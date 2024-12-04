const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel')
const getContacts = async (req, res)=>{
    try {
        
        let users =await User.find().limit(10);
        res.status(200).json({users});
    } catch (error) {
        res.status(500).error("Internal error occured");
    }
    
}
const getUsers = asyncHandler(async(req, res) => {
    const keyword = req.query.search ? 
    {
        $or:[
            {name: {$regex: req.query.search, $options: "i"}},
            {email: {$regex: req.query.search, $options: "i"}},
        ]
    }: {};
    const users = await User.find(keyword).find({_id:  {$ne: req.user._id}});
    res.send(users);
    

}) 
const userInfo = asyncHandler(async(req,res) => {
    if(!req.user)
    {
        return res.status(400);
        throw new Error("User not found");
    }
    res.status(200).send(req.user);
})
module.exports = {getUsers, userInfo};