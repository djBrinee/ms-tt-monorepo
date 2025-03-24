import express, {Request, Response} from 'express'
import { ProfileModel } from '../models/profile'
import { isValidProfile } from '../utils/validateProfile'
import jwt from 'jsonwebtoken'
import { veriryApiKey, basicAuth } from "../middleware/auth"

const router = express.Router();

router.use(veriryApiKey);
router.use(basicAuth);
// CREATE endpoint

router.post("/create", async (req: Request, res:Response): Promise<void> => {
    try {
        const profileData = req.body;
    
        // Validating input
    
        if(!isValidProfile(profileData)) {
            res.status(400).json({error: "Invalid profile data. All fields are required and must be string"});
            return;
        }
        
        const { email } = profileData; 
        const profileExists = await ProfileModel.findOne({ email });

        if (profileExists) {
            res.status(400).json({ error: "Profile email already exists, must be unique by email" });
            return;
        }

        // Creating mongo model and saving it
        const profile = new ProfileModel(profileData);
        await profile.save();
    
        // Generating token
        const token = jwt.sign({email: profile.email}, process.env.SECRET_KEY || 'secret_key', {expiresIn: '1h'});
    
        // Responding 201 if all is correct
        res.status(201).json({message: "Profile created successfully", token});
    } catch (error) {
        res.status(500).json({message: "Error creating file"});
    }
});

 // DELETE endpoint

router.delete("/delete", async(req: Request, res: Response): Promise<void> => {
    try{
        const { email } = req.body;

        if (!email) {
            res.status(400).json({message: "Email is required to delete profile"});
            return;
        }
        const deletedProfile = await ProfileModel.findOneAndDelete({email});
        if (!deletedProfile)
        {
            res.status(404).json({error: "Profile not found."});
            return;
        }

        res.status(200).json({message: "Profile deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting profile"});
    }
});

// Get by email endpoint
router.get("/get", async (req: Request, res: Response): Promise<void> => {
    try {
        // Validating inputs
        const { email } = req.query; 
        if (!email || typeof email !== "string") {
            res.status(400).json({ error: "Email is required as a query parameter" }); 
            return;
        }

        // Validating existance
        const profile = await ProfileModel.findOne({ email });
        if (!profile) {
            res.status(404).json({ error: "Profile not found" }); 
            return;
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: "Cannot get profile" });
    }
});


export default router;