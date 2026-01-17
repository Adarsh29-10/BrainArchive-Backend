import { User } from "../models/User.model"
import { ApiError } from "../utils/ApiError"

export const userMeService = async (data: {
    auth0Id: string,
    email: string,
    name?: string
    picture?: string,
}) => {
    if(!data.auth0Id || !data.email){
        throw new ApiError(400, 'Invalid user data')
    }

    let user = await User.findOne({auth0Id: data.auth0Id})

    if (!user) {
        try {
            user = await User.create(data);
        } catch (e: any) {
            if (e.code === 11000) {
                user = await User.findOne({ auth0Id: data.auth0Id });
            } else {
                throw e;
            }
        }
    } else {
        user.email = data.email;
        user.name = data.name;
        user.picture = data.picture;
        await user.save();
    }

    return user;
}