const Comment = require('../models/comment');
const express = require('express');
const router = express.Router();

//All endpoints and route handlers go here
router.post('/',async(req,res)=>{
    try{
        const Comment = newComment({
            VideoID: {type: String, required: true},
            commentBody: {type: String, required: true},
            likes: {type: Number, default: 0},
            dislikes: {type: Number, default: 0},
            replies: [replySchema]
        });
        awaitproduct.save();

        returnres.send(product);

    }catch(ex){
        returnres.status(500).send(`InternalServerError:${ex}`);
    }});

module.exports = router;