"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { ThreadValidation } from "../validations/thread";
import { Console } from "console";

interface Params {
    text: String,
    author: String,
    communityId: String | null,
    path: String,
}

export async function createThread({text, author, communityId, path}: Params) {
    
    try{
        connectToDB();
        
        const ThreadStruct = {
            text: text,
            author: author,
            community: communityId,
        }

        const createThread = await Thread.create(ThreadStruct);
        
        await User.findByIdAndUpdate(author, {
            $push :  {threads: createThread._id}
        });
    
        revalidatePath(path);
    }catch(e){
        console.log(e);
    }

}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {

    try{

        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        const threads = await Thread.find({
            parentId: { $in: [null, undefined]}
        })
        .sort({createdAt: -1})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path: 'author', model: User})
        .populate({
            path: 'children', 
            populate: {
                path: 'author',
                model: User
            }
        });

        console.log(threads);



    }catch(e){
        console.log(e);
    }
}