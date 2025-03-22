import express, { Request, Response } from "express";
import { ProfileModel } from "../models/profile";

const router = express.Router();


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
        console.error("Error retrieving profile:", error);
        res.status(500).json({ error: "Cannot get profile" });
    }
});

export default router;
