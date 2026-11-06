import httpStatus from "http-status";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Username and password are required" });
    }
    try {
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        if(await bcrypt.compare(password, user.password)) {
            let token = crypto.randomBytes(32).toString('hex');

            user.token = token;
            await user.save();
            
            return res.status(httpStatus.OK).json({ message: "Login successful", token });
        }

        
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Internal server error: ${error.message}` });
        
    }
}

const register = async (req, res) => {
    const { name, username, password } = req.body;


    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User created successfully" });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Internal server error: ${error.message}` });
    }
    
}

export { login, register };
