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

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();
  
    const skipAmount = (pageNumber - 1) * pageSize;
  
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children", 
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image", 
        },
      });
  
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    }); 
  
    const posts = await postsQuery.exec();
  
    const isNext = totalPostsCount > skipAmount + posts.length;
  
    return { posts, isNext };
  }