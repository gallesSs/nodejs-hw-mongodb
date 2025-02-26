import { env } from "../utils/env.js";
import mongoose from "mongoose";

export const initMongoConnection = async () => {
    try {
        const db = env("MONGODB_DB");
        const name = env("MONGODB_USER");
        const password = env("MONGODB_PASSWORD");

const mongoUri = `mongodb+srv://${name}:${password}@cluster0.y7kxx.mongodb.net/${db}?retryWrites=true&w=majority`;

        await mongoose.connect(mongoUri);

        console.log("Mongo connection successfully established!");
    } catch (error) {
        console.log("Error while setting up mongo connection", error);
        throw error;
    }
};
