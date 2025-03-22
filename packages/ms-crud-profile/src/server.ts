import express from "express"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import profileRoutes from './routes/profileRoutes'

// Clean server file just for middleware and setup

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connecting Mongo DB
mongoose
    .connect(process.env.MONGO_URI || "mongo://localhost:27017/profiles")
    .then(() => console.log("Mongo DB started succesfully"))
    .catch((err) => console.log(`There was an error starting mongo: ${err}`))


// Using Profile routes
app.use('/profile', profileRoutes)

// Defining port & starting server
const port = process.env.PORT || 3002;
app.listen(port, () => console.log("ms profile-crud is running on port 3002"));