const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already have an account" });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate token for the new user
  const token = generateToken(user._id);

  // Send response with token
  res.status(201).json({
    message: "Registered successfully!",
    token,  // JWT token
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: "Login successfully!",
      token,  // JWT token
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid Email and Password" });
  }
};
