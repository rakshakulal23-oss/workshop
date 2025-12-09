const User = require("../models/user");


// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name||!email||!password) {
      return res.status(404).json({
        success: false,
        message: "name,email and password required",
      });
    }



    // Create new user
    const user = new User({
      name,
      email,
      password,
    });


    // Save user to database
    const savedUser = await user.save();


    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();


    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;


    const user = await User.findById(id);


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    


    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password }
    );


    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;


    const deletedUser = await User.findByIdAndDelete(id);


    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

    




module.exports = {
  createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};

