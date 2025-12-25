import mongoose from 'mongoose'

export const CONNECT_DB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("MONGODB CONNECTED SUCCESSFULLY..")
    }
    catch(error){
        console.log(`MONGODB CONNECTION ERROR`, error);
    }
}

 