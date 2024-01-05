const Post = require('../models/post')
const Comment = require('../models/comment')
const Like = require('../models/like')

exports.postBlog = async (req, res) => {
    try {
        const {title, description} = req.body
        const response = await Post.create({title, description})
        res.status(200).json({
            success: true, data: response, message: "Blog Created Successfully"
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}

exports.createComment = async(req,res) => {
    try{
        const {post,user,body} = req.body
        const comment = new Comment({
            post,user,body
        })
        const saveComment = await comment.save()

        // find post by id and then store comment id
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{comments:saveComment.id}},{new:true})
            .populate("comments")   // actual comments in response
            .exec()

        res.json({
            post:updatedPost
        })

    }catch(e){
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}

exports.createLike = async(req,res) =>{
    try{
        const {post,user} = req.body
        const like = new Like({
            post,user
        })
        const savedLike = await like.save(like)
        console.log("Before update post");
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:savedLike.id}},{new:true})
            .populate("likes")   // actual likes in response
            .exec()

        res.json({
            post:updatedPost
        })

    }catch(e){
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}

exports.createUnLike = async(req,res) =>{
    try{
        const {post,like} = req.body
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like})

        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true})
            .populate("likes")   // actual likes in response
            .exec()

        res.json({
            post:updatedPost
        })

    }catch(e){
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}

exports.getAllPost = async(req,res) => {
    try{
        const posts = await Post.find().populate("likes").populate("comments").exec()
        //likes and comments are arrays in the Post model
        res.json(posts)
    }catch(error){
        console.error(e)
        res.status(500).json({
            success: false, data: "Internal Server Error", message: e
        })
    }
}