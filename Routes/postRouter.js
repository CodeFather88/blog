const Router = require('express')
const controller = require('../Controllers/postController')
const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')


router.post('/', authMiddleware ,controller.createpost)
router.post('/deletePost/:id', authMiddleware,controller.deletePost)
router.post('/updatePost/:id', authMiddleware,controller.updatePost)
router.post('/createcomment/:id', authMiddleware ,controller.createcomment)
router.post('/deleteComment/:id', authMiddleware,controller.deleteComment)
router.post('/updateComment/:id', authMiddleware,controller.updateComment)
router.post('/like/:id', authMiddleware,controller.like)
router.post('/unlike/:id', authMiddleware,controller.unlike)
router.get('/', controller.getPosts)
router.get('/getMyPosts',authMiddleware, controller.getMyPosts)
router.get('/:id', controller.getOne)



module.exports = router