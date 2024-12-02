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
module.exports = {getUsers};