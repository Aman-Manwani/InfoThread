import React from 'react'
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
        },{upesert:true}
        );

        if(path === '/profile/edit'){
            revalidatePath(path);
        }
    } catch(error:any){
        console.log('Error updating user');
    }
} 