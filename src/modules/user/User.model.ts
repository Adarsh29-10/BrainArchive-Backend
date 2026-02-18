import { Schema, model, Document  } from 'mongoose';

interface IUser extends Document  {
    auth0Id: string;
    email: string;
    name?: string;
    picture?: string;
}

const userSchema = new Schema<IUser>(
    {
        auth0Id: { type: String, required: true, unique: true, },
        email: { type: String, required: false, },
        name: { type: String, },
        picture: { type: String, },
    },
    { timestamps: true, }
);

 export const User = model<IUser>('User', userSchema);
