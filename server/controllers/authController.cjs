const User=require('../models/User.cjs');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// Sign Up Controller

const signup=async(req,res)=>{
    const {name, email, password} = req.body;
    try {
        // check user exists or not
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }

        // Hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        // create one
        const user=await User.create({
            email,
            name,
            password:hashedPassword
        });
        return res.status(201).json({meassage:"User craeted successfully"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
};


// Login Controller

const login=async(req,res)=>{
    const {email, password} = req.body;
    try {
        // check user exists or not
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"User does not exists"});
        }
        // check password
        const isMatch=await bcrypt.compare(password, userExist.password);
        console.log(password, userExist.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password"});
        }
        // create token if credentials matched
        const token=jwt.sign({id:userExist._id}, process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.status(200).json({message:"Login successful", token,
            //add

             user: {
                _id: userExist._id,
                name: userExist.name,
                email: userExist.email
            }
    });
    } catch(err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
}

module.exports={ signup, login };