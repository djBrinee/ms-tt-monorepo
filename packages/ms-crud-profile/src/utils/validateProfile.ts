    import { IProfile } from "../models/profile";

    export const isValidProfile = (data: any): data is IProfile => {
        return (
            typeof data == "object" && 
            data !== null &&
            typeof data.name == "string" &&
            typeof data.lastName == "string" &&
            typeof data.phoneNo == "string" &&
            typeof data.email == "string" &&
            typeof data.address == "string" 
        );
    }