const {Comment, validate, Reply} = require('../models/comment');
const express = require('express');
const router = express.Router();

//All endpoints and route handlers go here
router.get('/', async (req,res) => {
    try{
        const comments = await Comment.find();
        return res.send(comments);
    }catch(ex){
        return res.status(500).send(`InternalServerError:${ex}`);
    }});

router.get('/:videoID', async (req,res) => {
    try{
        const comments = await Comment.find({videoID: req.params.videoID});
        return res.send(comments);
    }catch(ex){
        return res.status(500).send(`InternalServerError:${ex}`);
    }});

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

router.put('/:id', async (req, res) => {
    try{
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                videoID: req.body.videoID,
                commentBody: req.body.commentBody,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
            },
            { new: true}
        );

        // if (!comment)
        //     return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

            await comment.save();

            return res.send(comment);        
    }catch (ex){
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const comment = await Comment.findByIdAndRemove(req.params.id);

        if(!comment)
            return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);

            return res.send(comment);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/reply', async (req,res) =>{
    try{
        const comment = await Comment.findById(req.body.commentID);
        if(!comment)
        return res.status(400).send(`The comment with id "${req.body.commentID}" does not exist.`);

        const reply = new Reply({
            replyBody: req.body.replyBody,
        });
        comment.replies.push(reply);
        await comment.save()

        return res.send(comment);
    }catch(ex){   
        return res.status(500).send(`InternalServerError:${ex}`);
    }});

    router.patch('/:id', async (req, res) => {
        try{    
            const comment = await Comment.findByIdAndUpdate(
                req.params.id, req.body, {new:true}
            );
            if (!comment)
                return res.status(400).send(`The comment with id "${req.params.id}" does not exist.`);
         
            return res.send(comment);        
        }catch (ex){
            return res.status(500).send(`Internal Server Error: ${ex}`);
        }
    });

module.exports = router;