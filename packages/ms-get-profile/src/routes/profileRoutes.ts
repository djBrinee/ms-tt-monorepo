import express, { Request, Response } from "express";
import { getProfileFromCrudService } from "../services/crudService";
import { basicAuth } from "../middleware/auth"


const router = express.Router();

router.use(basicAuth);

// GET endpoint by email
router.get("/get", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.query;
        if (!email || typeof email !== "string") {
            res.status(400).json({message: "Email is required as query parameter"});
            return;
        }
        const profile = await getProfileFromCrudService(email);
        if (!profile) {
            console.log(profile)
            res.status(404).json({message: "Profile wasn't found"});
            return;
        }
        res.status(200).json(profile);
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "Profile not found") {
            res.status(404).json({message: "Profile wasn't found"});
        } else {
            res.status(500).json({message: "Unknown server error"})
        }
    }
});

export default router;
