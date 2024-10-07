import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password:string;
    createdAt: Date; 
    updatedAt: Date; 
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true }
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
