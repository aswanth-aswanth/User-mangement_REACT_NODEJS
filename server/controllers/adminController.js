const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');

const getAllUsers = async (req, res) => {
  try {
    // console.log("executed");
    const users = await User.find();
    res.status(200).json(users);
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
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("req-file : ",req.file);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profile:req.file?`${req.file.filename}`:null,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid=(password==admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin._id ,role:'admin'}, 'myKey', { expiresIn: '1h' });
    console.log("token : ",token);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, login };
