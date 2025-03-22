import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"


dotenv.config();

// initializing app

const app = express();
app.use(express.json());
app.use(cors());


// Connecting to MongoDb


mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/profiles")
    .then(() => console.log("Mongo successfully connected"))
    .catch((err) => console.log(`An error occurred: ${err}`))



// Defining object

const profileObject = {
    name: String,
    lastName: String,
    email: String,
    phoneNo: String,
    address: String
}

// Defining schema with mongoose
const profileSchema = new mongoose.Schema(profileObject);

// Creating Model
const Profile = mongoose.model("Profile", profileSchema);


// Creating get endpoint

app.get("/get-profile", async(req, res) => {
    const { email } = req.query;
    if (!email) {
        res.status(400).json({error: "Email's required"});
    }

    const profile = await Profile.findOne({email}); 
    if(!profile) {
        res.status(404).json({error: "User not found"});
    }

    res.status(200).json(profile);
});


// Starting server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`get-profile microservice running on port: ${port}`));




