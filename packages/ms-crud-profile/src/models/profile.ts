import mongoose, {Schema, Document, Model} from "mongoose";


export interface IProfile extends Document {
    name: string,
    lastName: String,
    phoneNo: String,
    email: String,
    address: String
}

const ProfileSchema: Schema =  new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNo: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    address: {type: String, required: true}
});

export const ProfileModel: Model<IProfile> = mongoose.model<IProfile>("Profile", ProfileSchema)