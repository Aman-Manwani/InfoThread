"use server"
import { connectToDB } from '../mongoose'
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
  }

export async function updateUser({
    userId,
    bio,
    name,
    path,
    username,
    image,
  }: Params): Promise<void> {
    try{

        connectToDB();
        
        const updatedUser = {
            name: name,
            bio: bio,
            image: image,
            username: username.toLowerCase(),
            onboarded: false,
        }

        await User.findOneAndUpdate(
            { id: userId },
            updatedUser,
            { upsert: true }
        );

        if(path === '/profile/edit'){
            revalidatePath(path);
        }
    } catch(error:any){
        console.log('Error updating user', error.message);
    }
} 

export async function fetchUser(userId:String){
    try{
        connectToDB();
        const user = await User.findOne({id: userId});
        return user;
    } catch(error:any){
        throw new Error('Error fetching user', error.message);
    }
}