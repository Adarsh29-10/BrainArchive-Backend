import { Schema, model, Document  } from 'mongoose';

interface IUser extends Document  {
    auth0Id: string;
    email: string;
    name?: string;
}

const userSchema = new Schema<IUser>(
    {
        auth0Id: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address',
            ],
        },
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

 export const User = model<IUser>('User', userSchema);
