import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MyBlogs=()=>{
    const [myBlogs,setMyBlogs] = useState([]);
    const [user, setUser] = useState(null);
  const navigate = useNavigate();

    useEffect(()=>{

        const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchBlogs(parsedUser.email);
    }
  }, []);


        const fetchBlogs=async()=>{
            try {
                const token=localStorage.getItem("token");

                const res = await axios.get(`${backendUrl}/blogs/getAllBlogs`, {
                    headers:
                    {
                        Authorization:`Bearer ${token}`
                    }
                });
                const userId = JSON.parse(localStorage.getItem("user"))._id;
                
                const myBlogs = res.data.filter(blog => {
        const blogUserId = typeof blog.userId === 'object' ? blog.userId._id : blog.userId;
        return blogUserId === userId;
      });
                setMyBlogs(myBlogs);
            } catch (err) {
                console.error(err);
            }
        };
        
    return (
        <>

        <div className="px-4 py-6">
  <h2 className="text-2xl font-semibold mb-6 text-center">My Blogs</h2>
  
  {myBlogs.length === 0 ? (
    <p className="text-center text-gray-500">No blogs found.</p>
  ) : (
    <div className="space-y-6">
      {myBlogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} user={user} />
      ))}
    </div>
  )}
</div>


        </>
    )

}

export default MyBlogs;
