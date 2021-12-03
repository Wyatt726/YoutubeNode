const mongoose = require("mongoose");
const Joi = require('joi');

const replySchema = new mongoose.Schema({
    replyBody: {type: String, required: true}
})

const commentSchema = new mongoose.Schema({
    videoID: {type: String, required: true},
    commentBody: {type: String, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    replies: [replySchema]

})

const Comment = mongoose.model('Comment', commentSchema)
const Reply = mongoose.model('Reply', replySchema)

function validateComment(comment) {
    const schema = Joi.object ({
        videoID: Joi.string().min(4).max(100).required(),
        commentBody: Joi.string().min(2).max(100).required(),
        likes: Joi.number(),
        dislikes: Joi.number(),
        replies: Joi.string().min(2).max(100)    
    })
    return schema.validate(comment)
}

module.exports = {
    Comment: Comment,
    Reply: Reply,
    commentSchema: commentSchema,
    validate: validateComment
}

