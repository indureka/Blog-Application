const express=require('express');
const router=express.Router();
const authenticate=require('../middlewears/authMiddlewears.cjs');

const {createBlog, getAllBlogs, filteredBlogs, updateBlog, deleteBlog}=require('../controllers/blogController.cjs');

router.post('/createBlog',authenticate, createBlog);
router.get('/getAllBlogs',getAllBlogs);
router.get('/filteredBlogs',filteredBlogs);
router.put('/updateBlog/:id',authenticate, updateBlog);
router.delete('/deleteBlog/:id',authenticate, deleteBlog);

module.exports=router;