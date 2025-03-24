import axios, {AxiosError} from "axios"
import dotenv from 'dotenv'

// Need to call env variables in this file
dotenv.config();

const CRUD_SERVICE_URL = process.env.CRUD_SERVICE_URL || "http://localhost:3002"
const API_KEY = process.env.API_KEY || "";
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;
const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME;

// Method to call ms crud-profile using axios
export const getProfileFromCrudService = async (email: string) => {
    try {
        // Calling db info directly from the other microservice
        const authToken = Buffer.from(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`).toString("base64");
        const response = await axios.get(`${CRUD_SERVICE_URL}/profile/get`, {
            params : {email},
            headers : {"x-api-key": API_KEY, "Authorization" : `Basic ${authToken}`},
        })
        return response.data;
        
        
    } catch (error: unknown) {
        // Validating error
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
    
          if (status === 404) {
            throw new Error("Profile not found");
          }
    
          console.error("Axios error:", status, error.message);
          throw new Error("Internal server error");
        }
    
        throw new Error("Unexpected error occurred");
    }
};
