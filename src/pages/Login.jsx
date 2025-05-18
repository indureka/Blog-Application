import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Login=()=>{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [user, setUser]=useState(null);

    const navigate = useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
        // const res=await axios.post("http://localhost:5000/auth/login", {

        const res = await axios.post(`${backendUrl}/auth/login`, {
            email,
            password,
        });
        localStorage.setItem("token", res.data.token);
        
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user); 
        alert("Login Successful!");
        navigate("/");

    } catch(err) {
        console.log("login failed", err);
    }
    };

    return (
        <>

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  </div>

        </>
    )
}

export default Login;