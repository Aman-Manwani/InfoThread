"use server"
import { connectToDB } from '../mongoose'
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';

export async function updateUser(
    userId:String,
    username:String,
    name:String,
    bio:String,
    image:String,
    path: string,
) : Promise<void>{
    try{

        connectToDB();
        
        await User.findOneAndUpdate({id: userId}, {
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded: true,
        },{upsert:true}
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