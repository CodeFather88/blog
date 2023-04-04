const Router = require('express')
const controller = require('../Controllers/postController')
const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')


router.post('/createpost', authMiddleware ,controller.createpost)
 
router.get('/getPosts', controller.getPosts)
router.get('/getMyPosts',authMiddleware, controller.getMyPosts)


module.exports = router