import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>('User', userSchema);

export default User;