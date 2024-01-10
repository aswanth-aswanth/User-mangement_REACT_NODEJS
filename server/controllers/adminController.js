const User = require('../models/userModel');
const Admin = require('../models/adminModel');
const jwt=require('jsonwebtoken');

// Get all users controller
const getAllUsers = async (req, res) => {
  try {
    console.log("executed");
    // Fetch all users from the database
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get user by ID controller
const getUserById = async (req, res) => {
  try {
    // Fetch user data from the database by ID
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create user controller
const createUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, password } = req.body;

    // TODO: Add validation and error handling for required fields

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update user controller
const updateUser = async (req, res) => {
  try {
    // TODO: Implement user update logic

    // Example: Update user by ID
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

// Delete user controller
const deleteUser = async (req, res) => {
  try {
    // TODO: Implement user deletion logic

    // Example: Delete user by ID
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
    // console.log(req.body);
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    // console.log(admin);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is valid
    const isPasswordValid=(password==admin.password);
    // const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ adminId: admin._id ,role:'admin'}, 'myKey', { expiresIn: '1h' });
    console.log("token : ",token);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, login };
