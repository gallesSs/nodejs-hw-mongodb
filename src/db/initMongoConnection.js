import { env } from "../utils/env.js";
import mongoose from "mongoose";

export const initMongoConnection = async () => {
    try {
        const url = env("MONGODB_URL");
        const db = env("MONGODB_DB");

        // Строка подключения без дополнительных данных
        const mongoUri = `${url}/${db}?retryWrites=true&w=majority&appName=${db}`;

        await mongoose.connect(mongoUri);

        console.log("Mongo connection successfully established!");
    } catch (error) {
        console.log("Error while setting up mongo connection", error);
        throw error;
    }
};
