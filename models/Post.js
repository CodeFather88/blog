const {Schema, model} = require('mongoose')

const Post = new Schema({
    title: {type: String, required: true},
    text:{type: String, required: true},
    likes:{type: Number, default:0},
    user:{type: Schema.Types.ObjectId, ref: 'User', required: false}
})

module.exports = model('Post', Post)