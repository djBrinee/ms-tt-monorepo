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

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {

    // Basic authorization with base64 encoding

    // Getting headers and validating the value
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.status(401).json({message: 'Authorization required'})
        return;
    }

    // Splitting and getting username and pass, then validating
    const base64 = authHeader.split(" ")[1];
    const [username, password] = Buffer.from(base64, "base64").toString('ascii').split(':')

    if (
        username === process.env.BASIC_AUTH_USERNAME &&
        password === process.env.BASIC_AUTH_PASSWORD
    ) {
        return next();
    }

    res.status(403).json({message: 'invalid credentials'})

};