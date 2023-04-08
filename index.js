const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./Routes/authRouter')
const postRouter = require('./Routes/postRouter')
const PORT = process.env.PORT || 5000
const app = express()




app.use(express.json())
app.use('/auth', authRouter)
app.use('/posts', postRouter)
 



const start = async() => {
    try{
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.cfdw8xs.mongodb.net/auth_roles?retryWrites=true&w=majority')  
        app.listen(PORT, ()=> console.log('server started on ',PORT))
    }
    catch(e){
        console.log(e)
    }
}



start()