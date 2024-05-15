import mongoose from 'mongoose'

let isConnected = false;

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    if(isConnected) {
        console.log('Using existing connection');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;

        console.log('connected to DB');
    } catch(error) {
        console.log('Error connecting to DB', error);
    }
}