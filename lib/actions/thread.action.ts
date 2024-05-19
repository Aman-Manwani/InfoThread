"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: String,
    author: String,
    communityId: String | null,
    path: String,
}

export async function createThread({text, author, communityId, path}: Params) {
    
    try{
        connectToDB();
    
        const createThread = await Thread.create(
            text,
            author,
            community: null,
        );
    
        console.log(createThread);
    
        await User.findByIdAndUpdate(author, {
            $push :  {threads: createThread._id}
        });
    
        revalidatePath(path);
    }catch(e){
        console.log(e);
    }

}