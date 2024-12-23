import express from 'express'
import dotenv from 'dotenv'
import cookieParse from 'cookie-parser'
import cors from 'cors'
import connectMongoDB from './db/connectMongoDB.js'

import {v2 as cloudinary} from 'cloudinary';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cakeRoutes from './routes/cake.route.js';
import orderRoutes from './routes/order.route.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({limit:"10mb"})); // parse req.body
app.use(express.urlencoded({extended: true})) // to parse from data urlencoded

app.use(cookieParse());

app.get("/", (req, res) => {
    res.json("Nhi co ny roi nhe.");
})

app.use("/api/user", userRoutes); // user routes
app.use("/api/auth", authRoutes);
app.use("/api/cake", cakeRoutes);
app.use("/api/order", orderRoutes);


app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
})


