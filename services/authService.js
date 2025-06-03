const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
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
