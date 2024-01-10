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
    res.status(200).json({ token, userId: user._id }); // Include userId in the response
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  
const register = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with profile image URL
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profile: req.file ? `${req.file.filename}` : null,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logout=async(req,res)=>{
  res.clearCookie('jwtToken');

  res.json({ message: 'Logout successful' });
}

const getUserById = async (req, res) => {
  try {
    // Fetch user data from the database by ID
    console.log("I am inside getUserById");
    console.log(req.params);
    const user = await User.findById(req.params.userId);
    console.log(user);
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
module.exports={
    login,
    logout,
    register,
    getUserById
  }