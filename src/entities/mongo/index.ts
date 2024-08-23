import "colors";
import {Config} from "@src/config";
import mongoose from "mongoose"

const config: Config = new Config();

export const connectWithMongo = async (): Promise<any> => {
    mongoose.connect(config.MONGO_URI, {})
        .then(() => {
            console.log('MongoDB connected successfully'.yellow.bold);
        })
        .catch((err) => {
            console.error(`MongoDB connection error: ${err}`.red.bold,);
        });
};
