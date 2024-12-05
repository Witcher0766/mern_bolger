import dotenv from "dotenv";
import User from './models/User.js'
import PostModel from "./models/Post.js";
import postData from "./data/posts.js";
import user from "./data/users.js";
import connectDB from "./config/db.js";
import colors from "colors";


dotenv.config();

connectDB();

const importData = async () => {
    try {
        await PostModel.deleteMany();
        await User.deleteMany();

        const createUsers = await User.insertMany(user);
        const postUser = createUsers[0]._id;

        const samplePosts = postData.map((post) => {
            return {...post, user: postUser};
        });
        await Product.insertMany(samplePosts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}


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
