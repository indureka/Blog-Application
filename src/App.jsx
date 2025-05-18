import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import MyBlogPost from "./pages/MyBlogPost";
import EditBlog from "./pages/EditBlog";
import Blogs from "./pages/Blogs";

function App() {


  return (
    <>
     
     <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/myBlogs" element={<MyBlogPost />} />
        <Route path="/editBlog/:id" element={<EditBlog />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
