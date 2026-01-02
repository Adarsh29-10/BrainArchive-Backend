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
            required: false,
            validate: {
                validator: function (v: string) {
                if (!v) return true;
                return /^\S+@\S+\.\S+$/.test(v);
                },
                message: "Invalid email",
            },
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
