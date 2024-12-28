const express = require('express');
const router = express.Router();
const {accessChats, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup, deleteChat} = require('./../controllers/chat')
const upload = require('../utils/multerConfig')
router.post('/',accessChats);
router.get('/', fetchChats);
router.post('/group/create', upload.single('picUrl'), createGroupChat);
router.post('/group/rename', renameGroupChat);
router.post('/group/addMember', addToGroup);
router.post('/group/removeMember', removeFromGroup);
router.post('/delete',deleteChat);
module.exports = router;