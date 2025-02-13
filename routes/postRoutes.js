const express=require('express');
const router=express.Router();
const {createPost,updatePost,deletePost,getallPost}=require('../controllers/postController');


router.post('/post/create',createPost);
router.put('/post/:id',updatePost);
router.delete('/post/:id',deletePost);
router.get('/post',getallPost);


module.exports=router;