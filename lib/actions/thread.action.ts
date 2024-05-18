import Thread from "../models/thread.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: String,
    author: String,
    communityId: String | null,
    path: String,
}

export async function createThread({text, author, communityId, path}: Params) {
    
    connectToDB();

    const createThread = await Thread.create(
        text,
        author,
        community: null,
    );

    const res = await fetch('/api/thread', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text, author, communityId, path}),
    });

    return res.json();
}