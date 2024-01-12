const mongoose=require('mongoose');
const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id ,role:'user'}, 'myKey', { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("req.body ",req.body);
    console.log("req.file ",req.file);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profile: req.file ? `${req.file.filename}` : null,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } 
    console.log(user);
    res.status(200).json(user);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const editUserById=async(req,res)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'internal server error'});
  }
}
module.exports={
    login,
    register,
    getUserById,
    editUserById
  }