import {useState} from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const CreateBlog=()=>{
    const [title, setTitle]=useState('');
    const [category, setCategory]=useState('');
    const [author, setAuthor]=useState('');
    const [content, setContent]=useState('');
    const [image, setImage]=useState('');

    const handleCreate=async(e)=> {
        e.preventDefault(e);
        const blogData={title, category, author, content, image};
        try {
            const token=localStorage.getItem("token");
            // const res=await axios.post("http://localhost:5000/blogs/createBlog",blogData, {

            const res = await axios.post(`${backendUrl}/blogs/createBlog`, blogData, {
                headers: {
                    "Authorization":`Bearer ${token}` 
                }
            });
            alert("Blog created successfully!");
            // clear form
            setTitle('');
            setCategory('');
            setContent('');
            setImage('');
            setAuthor('');
        } catch (err) {
            console.error(err);
            alert("Error creating blog");
        }
        
    }

    return (
        <>


        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Blog</h2>

      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          className="w-full border border-gray-300 px-4 py-2 rounded-md resize-none"
        ></textarea>

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Create Blog
        </button>
      </form>
    </div>
           
        </>
    )
}

export default CreateBlog;