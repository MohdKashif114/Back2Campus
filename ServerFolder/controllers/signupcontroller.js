import mongoose from "mongoose";
import Alumni from "../models/Alumni.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export const signupcontroller = async (req, res) => {
  const {
    username,
    password,
    name,
    batch,
    branch,
    jobtitle,
    location,
    college,
    email,
  } = req.body;

  console.log("Received signup for:", username);

  try {
    const existingUser = await Alumni.findOne({ UserName: username });

    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const saltRounds = 10;
    const hashedpw = await bcrypt.hash(password, saltRounds);

    const newUser = new Alumni({
      UserName: username,
      Password: hashedpw,
      Email: email,
      Name: name,
      Batch: batch,
      Branch: branch,
      Jobtitle: jobtitle,
      Location: location,
      College: college,
    });

    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);

    const token = jwt.sign({ id: username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      maxAge: 1 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Signup successful, cookie created",
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during signup",
    });
  }
};
