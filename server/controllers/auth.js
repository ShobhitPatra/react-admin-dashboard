import bcryptjs from "bcryptjs";
import User from "../models/User.js";

import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    if (!email || !name || !password || !confirmPassword) {
      res.status(400).json({ msg: "Please fill all the feilds" });
    }

    if (password !== confirmPassword) {
      res.status(400).json({ msg: "passowrds does not match" });
    }

    const existingUser = await User.findOne({
      email, // This can be simplified to just `email` as well
    });

    if (existingUser) {
      res.status(400).json({ msg: "email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = generateTokenAndSetCookie(newUser.id, res);

      res.status(200).json({
        msg: "Signed up successfully",
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
        token,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller ...........");
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: "Please fill in all the feilds" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ msg: "email does not exist" });
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ msg: "password is incorrect" });
    }

    const token = generateTokenAndSetCookie(user?.id || "", res);

    res.status(200).json({
      msg: "Logged in successfully",
      userId: user?.id,
      email: user?.email,
      name: user?.name,
      token,
    });
  } catch (error) {
    console.log("error in login controller ...........");
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ id: userId });
    if (!user) {
      res.status(400).json({ msg: "user not found " });
    }

    res.status(200).json({
      userId: user?.id,
      name: user?.name,
      email: user?.email,
    });
  } catch (error) {
    console.log("error in getMe controller ...........");
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
