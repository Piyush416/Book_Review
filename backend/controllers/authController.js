import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json({success:"false", message: "User already exists" });

    // Hasing Password using bcrypt
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // this will return newData entry which was store in db
    const user = await User.create({ name, email, password: hashPassword });
    res.status(201).json({
      success:"true",
      name: user.name,
      email: user.email,
      message: "Successfully Register"
    });
  } catch (err) {
    res.status(500).json({success:"false",message: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if(!user) res.status(404).json({success:"false", message:"Invalid Email"})

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        success:"true",
        name: user.name,
        email: user.email,
        token: generateToken(user._id, user.email),
        currUserId: user._id,
        message: 'Login SuccessFully'
      });
    } 
    else {
      res.status(401).json({success:"false", message: "Invalid password" });
    }
  } catch (err) {
    res.status(500).json({success:"false",message: err.message });
  }
};
