const express = require('express')
const router = express.Router();

const {
    createUser, 
    loginUser,
    logoutUser
} = require('../controllers/user')

router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/register').post(createUser)

module.exports = router