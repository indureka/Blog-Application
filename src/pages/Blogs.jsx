
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../components/SearchFilter";


const Blogs = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      
      <SearchFilter user={user} />
    </div>
  );
};

export default Blogs;


