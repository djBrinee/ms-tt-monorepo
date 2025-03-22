import mongoose, {Schema, Document, Model} from "mongoose";


export interface IProfile extends Document {
    name: string,
    lastName: String,
    phoneNo: String,
    email: String,
    address: String
}

const ProfileSchema: Schema =  new Schema({
    name: {type: String, require: true},
    lastName: {type: String, require: true},
    phoneNo: {type: String, require: true},
    email: {type: String, require: true, unique:true},
    address: {type: String, require: true}
});

export const ProfileModel: Model<IProfile> = mongoose.model<IProfile>("Profile", ProfileSchema)