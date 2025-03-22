import express, { Request, Response } from "express";
import { getProfileFromCrudService } from "../services/crudService";

const router = express.Router();


// Get by email endpoint
router.get("/get", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.query;
        if (!email || typeof email !== "string") {
            res.status(400).json({error: "Email is required as query parameter"});
            return;
        }
        const profile = await getProfileFromCrudService(email);
        res.status(200).json(profile);

    } catch (error) {
        res.status(500).json({error: "Fail to retrieve profile"});
    }
});

export default router;
