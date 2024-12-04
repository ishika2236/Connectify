const express = require('express');
const { getUsers, userInfo } = require('../controllers/user/user');
const router = express.Router();


router.get("/getUsers", getUsers);
router.get("/userInfo", userInfo);

module.exports = router;