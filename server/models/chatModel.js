const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
    {
        chatName: {type: String, trim: true, required:true},
        isGroupChat: {type: Boolean, default: false},
        users:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        },
        groupAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        description:{ type:String, trim: true},
        picURL : {type: String,
            default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',}
        
    },
    {
       timestamps: true     
    }   
);
const Chat = mongoose.model('Chat', chatModel);
module.exports = Chat;
