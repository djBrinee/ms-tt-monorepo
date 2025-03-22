import express, { Request, Response }  from "express"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import jwt from 'jsonwebtoken'


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI || "mongo://localhost:27017/profiles")
    .then(() => console.log("Mongo DB started succesfully"))
    .catch((err) => console.log(`There was an error starting mongo: ${err}`))


const profileSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    phoneNo: String,
    email: {type: String, unique: true},
    address: String 
})


const Profile = mongoose.model("Profile", profileSchema)

// POST: Create endpoint

app.post("/create-profile", async (req: Request, res: Response) => {
    try {
        const profile = new Profile(req.body);
        await profile.save();

        // Generating token
        const token = jwt.sign({email: profile.email}, process.env.SECRET_KEY || "secret", {expiresIn: "1h"})

        res.status(201).json({message: "Profile created successfully", token})
    }
    catch (error) {
        res.status(500).json({message: "There was an error creating profile"})
    }
});

// DELETE: Delete profile endpoint

app.delete("/delete-profile", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) 
        res.status(400).json({ error: "Email is required" });
  
      const deletedProfile = await Profile.findOneAndDelete({ email });
      if (!deletedProfile) 
        res.status(404).json({ error: "Profile not found" });
      
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting profile" });
    }
  });


const port = process.env.PORT || 3002;
app.listen(port, () => console.log("ms profile-crud is running on port 3002"));