"use server"
import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {

  if (!process.env.MONGODB_URL) {
    console.log("Missing MongoDB URL");
  } 

  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {

    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

    isConnected = true; 
    console.log("MongoDB connected");
  } catch (error:any) {
    console.log('MongoDB connection error: ',error.message);
  }
};