const {Comment, validate} = require('../models/comment');
const express = require('express');
const router = express.Router();

//All endpoints and route handlers go here
router.post('/', async (req,res) =>{
    try{
        const { error } = validate(req.body);
        if( error )
            return res.status(400).send(error);

        const comment = new Comment({
            videoID: req.body.videoID,
            commentBody: req.body.commentBody,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
        });
        await comment.save();

        return res.send(comment);

    }catch(ex){
        return res.status(500).send(`InternalServerError:${ex}`);
    }});

module.exports = router;