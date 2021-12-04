import mongoose from "mongoose";
import { TestDocument } from "./test.model";

export interface QuestionDocument extends mongoose.Document {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    setId: TestDocument["_id"];
    createdAt: Date;
    updatedAt: Date;
}

const questionSchema = new mongoose.Schema(
    {
        question: { type: String, required: true },
        optionA: { type: String, required: true },
        optionB: { type: String, required: true },
        optionC: { type: String, required: true },
        optionD: { type: String, required: true },
        answer: { type: String, required: true },
        setId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    },
    {
        timestamps: true,
    }
);

const QuestionModel = mongoose.model<QuestionDocument>("Question", questionSchema, 'questions');

export default QuestionModel;
