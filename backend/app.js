import express from "express";
import dotenv from "dotenv";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
    return res.json({ "Hello": "World" });
})

const start = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    if (connection) {
        console.log("Connected to MongoDB");
    } else {
        console.log("Failed to connect to MongoDB");
    }
    server.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port")}`);
        console.log("Hi this is Rida Patil, welcome to the server!");
    });
}

start();