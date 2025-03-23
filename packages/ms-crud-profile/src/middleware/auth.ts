import {Request, Response, NextFunction} from "express"

export const veriryApiKey = (req:Request, res:Response, next: NextFunction) => {
    try {
        const reqAPIKey = req.headers['x-api-key'] as string;
        const envAPIKey = process.env.API_KEY || "";
    
        if (!reqAPIKey || reqAPIKey.trim() !==  envAPIKey.trim()) {
            res.status(403).json({error: "Invalid api key"})
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({error: "Server couldn't read API KEY"})
    }
};