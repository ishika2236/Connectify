const express = require('express');
const router = express.Router();
const{updateCallHistory, updateCallStatus, getCallHistory} = require('../controllers/call');
const { ssrModuleExportsKey } = require('vite/runtime');

router.post('/updateHistory', updateCallHistory);
router.post('/updateStatus', updateCallStatus);
router.get('/getCallHistory', getCallHistory);

module.exports = router;