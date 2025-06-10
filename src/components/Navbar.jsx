import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar=()=>{
    const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

    return (
        <>

        <nav className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50"
        style={{
    boxShadow: "0 2px 4px -1px rgba(0,0,0,0.1)" 
  }}
  >

          <div className="flex items-center gap-4">

            <i className="fa-solid fa-blog text-blue-600"></i>

            <h1 className="text-xl font-bold text-blue-600">
        <Link to="/">Blogify</Link>
      </h1>
          </div>
      

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Blogs
            </Link>
            <Link
              to="/createBlog"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Create
            </Link>
            <Link
              to="/myBlogs"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              My Blogs
            </Link>
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-3 py-1 hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>

        
        </>
    )
}

export default Navbar;
