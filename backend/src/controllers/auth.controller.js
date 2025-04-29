import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  // res.send("Signup Route");
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(401).json("Please add all fields");
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json("Password length should be minimum 6 characters");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Email already exists, please use different email" });
    }
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https:avatar.iran.liara.run/public/${idx}.png`;
    const newUser = new User.create({
      email,
      password,
      fullName,
      profilePic: randomAvatar,
    });
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60,
      httpOnly: true, //prevent XSS attacks
      sameSite: "strict", //prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  res.send("Login Route");
};

export const logout = (req, res) => {
  res.send("Logout Route");
};
