import jwt from "jsonwebtoken";

const generateToken = (id,email) => {
  const token = jwt.sign({ userId: id, userEmail: email}, process.env.JWT_SECRET, {
    // expiresIn: "30min",
  });
  return token;
};

export default generateToken;
