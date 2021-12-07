import mongoose from "mongoose";
import { TestDocument } from "./test.model";
import { ExamineeDocument } from "./examinee.model";

export interface ResultDocument extends mongoose.Document {

    correctAnswer: string[];
    wrongAnswer: string[];
    answers: string[];
    score: number;
    rank: number;
    testId: TestDocument["_id"];
    examineeId: ExamineeDocument["_id"];
    createdAt: Date;
    updatedAt: Date;
}

const resultSchema = new mongoose.Schema(
    {
        correctAnswer: { type: Array },
        wrongAnswer: { type: Array },
        answers: { type: Array, required: true },
        score: { type: Number, required: true },
        rank: { type: Number, required: true },
        testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
        examineeId: { type: mongoose.Schema.Types.ObjectId, ref: "Examinee" },
    },
    { timestamps: true }
);

const ResultModel = mongoose.model<ResultDocument>("Result", resultSchema);
export default ResultModel;
