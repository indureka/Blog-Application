const User=require('../models/User.cjs');
const Blog=require('../models/Blog.cjs');


// get blogs
const getAllBlogs=async(req,res)=>{
    try {
    const blogs = await Blog.find().populate('userId');
    return res.status(200).json(blogs);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
}

// filter blogs
const filteredBlogs=async(req,res)=>{
    try{
        const {category, author}=req.query;

        const filter={};
        if(category) {
            filter.category=category;
        }
        if(author) {
            filter.author=author;
        }

        const blogs=await Blog.find(filter).populate('userId');
        return res.status(200).json(blogs);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
};

// create blog
const createBlog=async(req,res)=>{
    const {title, category, author, content, image}=req.body;
    try {

    const newBlog=await Blog.create({
        title,
        category,
        author,
        content,
        image, 
        userId: req.user.id
    });
    console.log('req.user:', req.user);
    return res.status(201).json({message: "Blog created successfully", blog: newBlog});
} catch (err) {
    console.error(err);
    return res.status(500).json({message:"Server error"});
}
}

// update blog
const updateBlog=async(req,res)=>{
    try {
        const {id} = req.params;
        const blog=await Blog.findById(id);
        if(!blog) {
            return res.status(404).json({message:"Blog not found"});
        }
        console.log(blog.userId, req.user.id);
        if(blog.userId.toString() !== req.user.id) {
            return res.status(401).json({message:"Unauthorized to update this blog"});
        }
        const updatedBlog=await Blog.findByIdAndUpdate(id, req.body, {new: true});
        return res.status(200).json({message:"Blog updated successfully", blog: updatedBlog});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Server Error"})
    }
};

// delete blog
const deleteBlog=async(req,res)=>{
    try {
        const {id} = req.params;
        const blog=await Blog.findById(id);
        if(!blog) {
            return res.status(404).json({message:"Blog not found"});
        }
        if(blog.userId.toString() !== req.user.id) {
            return res.status(401).json({message:"Unauthorized to delete this blog"});
        }   
        await Blog.findByIdAndDelete(id);
        return res.status(200).json({message:"Blog deleted successfully"});
        } catch (err) {
            console.error(err);
            return res.status(500).json({message:"Server error"});
        }
    }

    module.exports = { getAllBlogs, filteredBlogs, createBlog, updateBlog, deleteBlog };


