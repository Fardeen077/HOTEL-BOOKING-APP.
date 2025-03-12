import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routers/auth.js"
import usersRoute from "./api/routers/users.js"
import hotelsRoute from "./api/routers/hotels.js"
import roomsRoute from "./api/routers/rooms.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({
    path: './.env'
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected MongoDB!!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB is disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("mongoDB is connected");
});

// app.get("/", (req, res) => {
//     res.send("Hello");
// })

// middleware

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.listen(process.env.PORT || 8000, () => {
    connectDB()
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
});