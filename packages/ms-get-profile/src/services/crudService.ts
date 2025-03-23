import axios from "axios"
import dotenv from 'dotenv'

// Need to call env variables in this file
dotenv.config();

const CRUD_SERVICE_URL = process.env.CRUD_SERVICE_URL || "http://localhost:3002"
const API_KEY = process.env.API_KEY || "";

// Method to call ms crud-profile using axios
export const getProfileFromCrudService = async (email: string) => {
    try {
        // Calling db info directly from the other microservice
        const response = await axios.get(`${CRUD_SERVICE_URL}/profile/get`, {
            params : {email},
            headers : {"x-api-key": API_KEY}
        })
        return response.data;
        
    } catch (error: any) {
        throw new Error("Cannot recieve from data profile");
    }
}