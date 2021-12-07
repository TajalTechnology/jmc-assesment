import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface TestDocument extends mongoose.Document {
    testName: string;
    duration: number;
    questionLimit: number;
    testCreator: UserDocument["_id"];
    filePath: string;
    createdAt: Date;
    updatedAt: Date;
}

const testSchema = new mongoose.Schema(
    {
        testName: { type: String, required: true },
        duration: { type: Number, required: true },
        questionLimit: { type: Number, required: true },
        testCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        filePath: { type: String, required: true },
    },
    { timestamps: true }
);

const TestModel = mongoose.model<TestDocument>("Test", testSchema);
export default TestModel;
