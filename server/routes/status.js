const express = require('express');
const router = express.Router();
const {addStatus} = require('../controllers/status');
const upload = require('../utils/multerConfig');

router.post('/add', upload.array('files', 10), (req, res, next) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded Files:', req.files);
    next();
}, addStatus);

module.exports = router;