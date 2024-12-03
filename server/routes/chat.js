const express = require('express');
const router = express.Router();
const {accessChats, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup} = require('./../controllers/chat')

router.post('/',accessChats);
router.get('/', fetchChats);
router.post('/group/create', createGroupChat);
router.post('/group/rename', renameGroupChat);
router.post('/group/addMember', addToGroup);
router.post('/group/removeMember', removeFromGroup);
module.exports = router;