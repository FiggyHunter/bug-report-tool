import { getUserByEmail } from "../services/user.dao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const register = async (req, res) => {
  /*  
#swagger.tags = ['User']
#swagger.description = 'Mock backend to register a user.' 
*/
  const { password, ...data } = req.body;

  if (await getUserByEmail(data.email))
    return res.status(400).json({ error: "User already exists!" });

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const user = new User({ ...data, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Server Exception: User was not created" });
  }
};

export const login = async (req, res) => {
  /*  
#swagger.tags = ['User']
#swagger.description = 'Mock backend to login a user.' 
*/
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found!" });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.TOKEN_EXPIRATION_DURATION.toString(),
          }
        );
        res.status(200).json({ message: "Logged in!", token });
        return;
      }
    }
    res.status(401).json({ error: "Invalid Credentials" });
  } catch (error) {
    res.status(500).json({ error: "Server Exception: Login failed" });
  }
};
