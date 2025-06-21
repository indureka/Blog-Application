import {Link} from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BlogCard=({blog, user})=>{  
    
      const handleDelete = async () => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(
        `${backendUrl}/blogs/deleteBlog/${blog._id}`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      alert("Deleted");
      window.location.reload(); 
    } catch (err) {
      console.error("Delete error", err);
    }
  };

const isOwner =
    user &&
    (blog.userId === user._id ||
      (typeof blog.userId === "object" && blog.userId._id === user._id));



  
  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown date";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

    return (

<div className="border border-gray-300 shadow-sm p-4 mb-6 w-full max-w-2xl mx-auto bg-white">
  <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>

  <p className="text-sm text-gray-600 mb-1">
    <span className="font-medium">Category:</span> {blog.category}
  </p>

  <p className="text-sm text-gray-600 mb-1">
    <span className="font-medium">Author:</span> {blog.author}
  </p>

    
      <p className="text-sm text-gray-500 mb-3 italic">
        Posted on: {formatDate(blog.createdAt)}
      </p>

  <p className="text-gray-700 mb-3">
    {blog.content.slice(0, 100)}...
  </p>

  {blog.image && (
    <div className="mb-3">
      <img
        src={blog.image}
        alt="blog"
        className="w-full h-48 object-cover border border-gray-200"
      />
    </div>
  )}

  {isOwner && (
    <div className="flex gap-3 mt-4">
      <Link
        to={`/editBlog/${blog._id}`}
        className="px-4 py-1 bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        className="px-4 py-1 bg-red-600 text-white text-sm hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  )}
</div>

  );
};

export default BlogCard;
