import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import profileRoutes from './routes/profileRoutes'

// Cleaner server file: just for middleware and set up

dotenv.config();

// initializing app

const app = express();
app.use(express.json());
app.use(cors());

// Using router

app.use('/profile', profileRoutes)

// and defining port Starting server
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`get-profile microservice running on port: ${port}`));




