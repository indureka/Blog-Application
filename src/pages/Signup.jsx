import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const Signup = ()=> {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setpassword]=useState('');

    const navigate = useNavigate();

    // handle signup
    const handleSignup=async(e)=> {
        e.preventDefault();
        try {
            // const response=await axios.post("http://localhost:5000/auth/signup", {

            const response = await axios.post(`${backendUrl}/auth/signup`, {
                name,
                email, 
                password,
            });
            console.log(response.data);
            alert("Signup Successful!");
            navigate("/login");
        } catch (err) {
            console.log("Signup failed", err);
        }
    };


    return (
        <>

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
      onSubmit={handleSignup}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        Signup
      </h2>

      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

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
        onChange={(e) => setpassword(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Signup
      </button>
    </form>
  </div>

       
        
        </>
    )
}

export default Signup;