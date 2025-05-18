import {useState, useEffect} from 'react';        
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const EditBlog=()=>{
    const {id}=useParams();
    const navigate=useNavigate();

    const [title, setTitle]=useState('');
    const [category, setCategory]=useState('');
    const [author, setAuthor]=useState('');
    const [content, setContent]=useState('');
    const [image, setImage]=useState('');


    useEffect(() => {
    const fetchBlog = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/blogs/getAllBlogs",
        const res = await axios.get(`${backendUrl}/blogs/getAllBlogs`,


             {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        );
        const blog = res.data.find((b) => b._id === id);
        setTitle(blog.title);
        setCategory(blog.category);
        setAuthor(blog.author);
        setContent(blog.content);
        setImage(blog.image);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

    const handleUpdate=async(e)=>{
        e.preventDefault();
        try {
            const blogData={title, category, author, image};
            const token=localStorage.getItem("token");
            // const res=await axios.put(`http://localhost:5000/blogs/updateBlog/${id}`,blogData, {

            const res = await axios.put(`${backendUrl}/blogs/updateBlog/${id}`, blogData, {
                headers: {
                    Authorization:`Bearer ${token}`,
                }

            });
            alert("Blog updated successfully!");
            navigate("/myBlogs");
        } catch (err) {
            console.error(err);
            alert("update failed");
        }
    }

    return (
        <>

        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Blog</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>

     
        </>
    )
}

export default EditBlog;