const bcrypt = require("bcryptjs"); // 1. Cambiamos a bcryptjs
const jwt = require("jsonwebtoken");
// 2. Usamos el nombre que pusimos en Vercel: JWT_SECRET
const secretKey = process.env.JWT_SECRET;
const User = require("../models/Users");

exports.authenticate = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return null;
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey);
    return token;
  } catch (error) {
    throw error;
  }
};

exports.register = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};
