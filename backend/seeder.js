import dotenv from "dotenv";
import User from './models/User.js'
import PostModel from "./models/Post.js";
import postData from "./data/posts.js";
import connectDB from "./config/db.js";
import colors from "colors";
import userData from "./data/users.js";


dotenv.config();

connectDB();

const importData = async () => {
    try {
        await PostModel.deleteMany();
        await User.deleteMany();
        const createdUsers = []; 
        for (const user of userData) {
            const newUser = new User({
                username: user.email.split('@')[0],
                email: user.email,
                password: user.password,
            });
            const savedUser = await newUser.save(); 
            createdUsers.push(savedUser);
        }
        const samplePosts = postData.map((post, index) => {
            const userIndex = index % createdUsers.length;
            const author = createdUsers[userIndex];
            return {
                ...post,
                author: { _id: author._id, username: author.username, email: author.email }, 
            };
        });
        await PostModel.insertMany(samplePosts);
        console.log('Data Imported Successfully!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    }
};


const destroyData = async () => {
    try {
        await PostModel.deleteMany();
        await User.deleteMany();
        
        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}


// console.log(process.argv[0]);

if(process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}
