const express = require('express');
const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel')
const User = require('../models/userModel')


const accessChats = asyncHandler(async(req,res) =>{
    const {userId }= req.body;
  
    if(!userId)
        {
            console.log("UserId param not sent with the request");
             res.status(400).json({error:"UserId param not sent with the request"});
        } 
    const isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}},
        ],
    }).populate("users", "-password").populate("latestMessage");
    const sender = await User.findById(userId);
    console.log(sender.name);
    
   
    
    const oldChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: '-password'
    });
    console.log(oldChat.length);
    
    if(oldChat.length > 0)
    {   
        res.send(isChat);
    }
    else{
        const chatData = {
            chatName:sender.name,
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400).json({error: "error creating chat"});
            
        }
    }
})
const fetchChats = asyncHandler(async(req, res)=>{
    try {
        const chats = Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
        .populate("users","-password")
        .populate("latestMessage")
        .populate("groupAdmin","-password")
        .sort({updatedAt: -1})
        .then(async(results)=>{
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "-password",
            })
            res.status(200).send(results);
        })
    } catch (error) {
        res.status(400).json({error: `Error fetching chats ${error.message}`})
    }
})

const createGroupChat = asyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name)
    {
        return res.status(400).json({error: "Please send all the required fields"});
    }
    const users = JSON.parse(req.body.users);
    if(users.length < 2)
    {
        return res.status(500).json({error: "Atleast 2 users are required to form a group chat."});
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(500).json({error: "Server error occured."});   
    }
})
const renameGroupChat = asyncHandler(async(req,res)=>{
    const {chatId, newChatName } = req.body;
    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                chatName: newChatName
            },
            {
                new: true
            }
        
        ).populate("users", "-password")
        .populate("groupAdmin", "-password")
        res.status(200).send(updatedChat);
    } catch (error) {
        res.status(500).json({error: `Server error occured ${error.message}`});  
    }
})
const addToGroup = asyncHandler(async(req,res)=>{
    const {chatId, userId} = req.body;
    if(!chatId || !userId)
    {
        res.status(400).json({error: "Please send all the fields"});
    }
    try {
        const updatedChat =await Chat.findByIdAndUpdate(chatId,
            {
                $push:{
                users : userId
                }
            },
        {new: true})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        if(!updatedChat)
        {
            res.status(400);
            throw new Error("Chat not found");
        }
        else{
        res.status(200).json({updatedChat});

        }

        // console.log(updatedChat);
        

    } catch (error) {
        return res.status(500).json({error: "Server error occured."});
    }
})

const removeFromGroup = asyncHandler(async(req,res)=>{
    const {chatId, userId} = req.body;
    if(!chatId || !userId)
    {
        res.status(400).json({error: "Please send all the fields"});
    }
    try {
        const updatedChat =await  Chat.findByIdAndUpdate(chatId,
            {
                $pull:{
                users : userId
                }
            },
        {new: true})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        if(!updatedChat)
        {
            res.status(400);
            throw new Error("Chat not found");
        }
        else{
        res.status(200).json({updatedChat});

        }

        // console.log(updatedChat);
        

    } catch (error) {
        return res.status(500).json({error: "Server error occured."});
    }
})
module.exports = {accessChats, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup};