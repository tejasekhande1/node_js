const express = require('express')
const router = express.Router()

const {postBlog,createComment,getAllPost,createLike,createUnLike} = require('../controllers/blogsService')

router.post("/post", postBlog)
router.post("/post/comment",createComment)
router.get("/post",getAllPost)
router.post("/post/like",createLike)
router.post("/post/unlike",createUnLike)

module.exports = router