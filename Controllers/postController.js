const Post = require('../models/Post')
const Comment = require('../models/Comment')
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
            const post = new Post({title,text, likes:0,user:userId})
            await post.save()
            return res.json({message: "Пост был добавлен",userId})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка добавления поста'})
        }
    }




    async createcomment(req,res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка добавления комментария"})
            }
            const {text} = req.body
            const postId = req.params.id
            const {...user} = req.user
            const userId = {...user}.id
            const date = new Date() 
            const comment = new Comment({post:postId,user:userId,text,date}) 
            await comment.save()
            return res.json({message: "Пост был добавлен"})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка добавления комментария'})
        }
    }




    async getPostComments(req, res){
        try{
            const postId = "642c988889c2a32f38e84b7b"           
            const postComments = await Comment.find({post:postId})             
            res.json({postComments})           
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка какая-то'})
        }
    }




    async getPosts(req, res){
        try{
            const posts = await Post.find()
            res.json(posts)           
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка получения списка постов'})
        }
    }




    async getOne(req, res) {
        try{
            const postId = req.params.id            
            const post = await Post.findById(postId)
            const comments = await Comment.find({post:postId})
            return res.json({post, comments})
        }catch(e){      
            console.log(e)
            return res.json({message:"Ошибка получения поста"})
        }
    }



    async deletePost(req, res) {
        try{
            const postId = req.params.id  
            const post = await Post.findById(postId)
            const postUser = post.user
            const {...user} = req.user
            const userId = {...user}.id
            const userRole = {...user}.roles
            if(postUser==userId|'ADMIN' == userRole){
                await Post.findByIdAndDelete(postId)
                await Comment.deleteMany({post:postId})
                return res.json({message:"Пост удален"})
            }  
            else{
                return res.json({message:"Нельзя удалить чужие посты"})               
            }           
        }catch(e){      
            console.log(e)
            return res.json({message:"Ошибка удаления поста"})
        }
    }




    async updatePost(req, res) {
        try{
            const postId = req.params.id  
            const post = await Post.findById(postId)
            const postUser = post.user
            const {...user} = req.user
            const userId = {...user}.id
            const userRole = {...user}.roles
            const {title, text} = req.body
            
            if(postUser==userId|'ADMIN' == userRole){
                await Post.findByIdAndUpdate(postId,{title:title,text:text,})
                
                return res.json({message:"Пост обновлен"})
            }  
            else{
                return res.json({message:"Нельзя редактировать чужие посты"})               
            }           
        }catch(e){      
            console.log(e)
            return res.json({message:"Ошибка редактирования поста"})
        }
    }




    async deleteComment(req, res) {
        try{
            const commentId = req.params.id 
            const comment = await Comment.findById(commentId)
            const commentUser = comment.user
            const {...user} = req.user
            const userId = {...user}.id
            const userRole = {...user}.roles
            if(commentUser==userId|'ADMIN' == userRole){
                await Comment.deleteOne({_id:commentId})
                return res.json({message:"Коммент удален"})
            }
            else{
                return res.json({message:"Нельзя удалить чужие комментарии"})
            }        
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка получения комментария'})
        }
    }



    async updateComment(req, res) {
        try{
            const commentId = req.params.id  
            const comment = await Comment.findById(commentId)
            const commentUser = comment.user
            const {...user} = req.user
            const userId = {...user}.id
            const userRole = {...user}.roles
            const {text} = req.body
            
            if(commentUser==userId|'ADMIN' == userRole){
                await Comment.findByIdAndUpdate(commentId,{text:text,})
                
                return res.json({message:"Комментарий обновлен"})
            }  
            else{
                return res.json({message:"Нельзя редактировать чужие комментарии"})               
            }           
        }catch(e){      
            console.log(e)
            return res.json({message:"Ошибка редактирования комментария"})
        }
    }
    



    async getMyPosts(req, res){
        try{
            const user = req.user
            const userId = {...user}.id
            const myPosts = await Post.find({user:userId})            
            res.json({myPosts})           
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка получения списка моих постов'})
        }
    }

    

    async like(req,res){
        try{
            const postId = req.params.id
            const post = await Post.findById(postId)
            const likes = post.likes            
            await Post.findByIdAndUpdate(postId,{likes:likes+1})
            res.json({message: 'Лайк проставлен'})
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка проставления лайка'})
        }
        
    }



    async unlike(req,res){
        try{
            const postId = req.params.id
            const post = await Post.findById(postId)
            const likes = post.likes            
            if(likes!=0){
                await Post.findByIdAndUpdate(postId,{likes:likes-1})
                res.json({message: 'Лайк снят'})
            }
            else{
                res.json({message: 'Нельзя снять лайки, если их и так нет'})
            }
            
            
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Ошибка проставления лайка'})
        }
        
    }




}




module.exports = new postController()