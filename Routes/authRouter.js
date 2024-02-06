const Router = require('express')
const controller = require('../Controllers/authController')
const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')



router.post('/registration',[
    check('username', 'Неподходящее имя пользователя').notEmpty(),
    check('password', 'Неподходящий пароль').isLength({min: 4, max: 10})
] ,controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)
router.get('/myProfile', authMiddleware, controller.myProfile)




module.exports = router
