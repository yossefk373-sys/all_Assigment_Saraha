import mongoose from "mongoose";

const connectDB = async () => 
    {
        await mongoose.connect("mongodb://localhost:27017/All_Assigment",{serverSelectionTimeoutMS: 5000})
        try {
            console.log("connected to db successfully ")

        } catch (error) {
            console.log("error connecting to db: ")
        }
    }
    export default connectDB;