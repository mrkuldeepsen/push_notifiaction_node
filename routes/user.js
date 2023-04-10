const express = require('express')
const router = express.Router()
const {register, pushNotifications} = require('../controllers/user')

router.post('/register',register)
router.post('/subscribe', pushNotifications)

module.exports = router