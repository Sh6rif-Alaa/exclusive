import mongoose from "mongoose";
import env from "../config/config.service";

export const connectDB = async (): Promise<void> => {
    try {
        console.log("DB URI EXISTS:", !!env.DB_URI_ONLINE);

        const conn = await mongoose.connect(env.DB_URI_ONLINE, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log("Mongo Connected");
        console.log("DB Name:", conn.connection.name);
        console.log("Host:", conn.connection.host);

    } catch (error) {
        console.error("Mongo Error =>", error);
    }
}