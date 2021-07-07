const mongoose = require('mongoose')

const PostChema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
})
const Post = mongoose.model('post',PostChema)

module.exports = Post