import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const SearchFilter = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const res = await axios.get(`${backendUrl}/blogs/getAllBlogs`);

      // const res = await axios.get("http://localhost:5000/blogs/getAllBlogs");
      const data = res.data;
      setBlogs(data);

      const authorList = [...new Set(data.map((b) => b.author))];
      const categoryList = [...new Set(data.map((b) => b.category))];
      setAuthors(authorList);
      setCategories(categoryList);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const handleFilter = async () => {
    try {
      let query = "";
      if (selectedAuthor) query += `author=${selectedAuthor}&`;
      if (selectedCategory) query += `category=${selectedCategory}`;

      // const res = await axios.get(
      //   `http://localhost:5000/blogs/filteredBlogs?${query}`
      // );

      const res = await axios.get(`${backendUrl}/blogs/filteredBlogs?${query}`);


      setBlogs(res.data);
    } catch (err) {
      console.error("Error filtering blogs:", err);
    }
  };

  return (




   <div className="p-4 bg-white shadow-md mb-6">
  <h3 className="text-xl font-semibold mb-4 text-gray-700">Explore by Author or Category</h3>

  <div className="flex flex-wrap items-center gap-4">
    <div className="flex flex-col sm:flex-row sm:items-center">
      <label className="mr-2 font-medium text-gray-600">Author:</label>
      <select
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
        className="border border-gray-300 px-3 py-1"
      >
        <option value="">All</option>
        {authors.map((author) => (
          <option key={author}>{author}</option>
        ))}
      </select>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center">
      <label className="mr-2 font-medium text-gray-600">Category:</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-gray-300 px-3 py-1"
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
    </div>

    <button
      onClick={handleFilter}
      className="bg-blue-600 text-white px-4 py-1 hover:bg-blue-700 transition"
    >
      Apply Filter
    </button>
  </div>

  <hr className="my-4 border-white" />

{blogs.length === 0 ? (
  <p>No blogs found.</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {blogs.map((blog) => (
      <BlogCard key={blog._id} blog={blog} user={user} />
    ))}
  </div>
)}

</div>
  
  );
};

export default SearchFilter;
