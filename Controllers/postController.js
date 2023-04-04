const Post = require('../models/Post')
 
const {validationResult} = require('express-validator')
const {secret} = require('../config')
const User = require('../models/User')


class postController{
    async createpost(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка добавления поста"})
            }
            
            const {title, text} = req.body
            const {...user} = req.user
            const userId = {...user}.id
            
            
            
            console.log()
            const post = new Post({title,text, likes:0,user:userId})
            await post.save()
            return res.json({message: "Пост был добавлен",userId})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'ОШИБКА ДОБАВЛЕНИЯ НАХУЙ'})
        }
    }

    async getPosts(req, res){
        try{
            const posts = await Post.find()
            res.json(posts)
            
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка какая-то'})
        }
    }

    async getMyPosts(req, res){
        try{
            const user = req.user
            const userId = {...user}.id
            const myPosts = await Post.find({user:userId})
             
            res.json({message:'ебаный пиздец',  myPosts})
            
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка какая-то'})
        }
    }
}

module.exports = new postController()