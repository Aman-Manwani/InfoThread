import mongoose from 'mongoose'
import { unique } from 'next/dist/build/utils';

const userSchema = new mongoose.Schema({
    id: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
    }],
    communities:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Community'
    }]
});

const User = mongoose.model("User", userSchema);

export default User;
