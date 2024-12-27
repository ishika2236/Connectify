const express = require('express');
const { getUsers, userInfo, updateInfo } = require('../controllers/user/user');
const upload = require('../utils/multerConfig');
const router = express.Router();


router.get("/getUsers", getUsers);
router.get("/userInfo", userInfo);
router.post("/updateInfo",upload.single('profileUrl'), updateInfo);


module.exports = router;