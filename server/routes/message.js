const express =  require('express');
const router = express.Router();
const {sendMessage , allMessages} = require('../controllers/message')
const upload = require('../utils/multerConfig')
router.post('/',upload.single('file'), sendMessage);
router.get('/:chatId', allMessages);

module.exports = router;