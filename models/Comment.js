const {Schema, model} = require('mongoose')

const Comment = new Schema({
    post:{type: Schema.Types.ObjectId, ref: 'Post', required: true},
    user:{type: Schema.Types.ObjectId, ref: 'User', required: true},
    text:{type: String, required: true},
    date:{type: Date, required: true}
})

module.exports = model('Comment', Comment)