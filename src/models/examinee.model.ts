import mongoose from "mongoose";

export interface ExamineeDocument extends mongoose.Document {
    ip: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
};

const examineeSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    username: { type: String, required: true }
},
    { timestamps: true });

const ExamineeModel = mongoose.model<ExamineeDocument>("Examinee", examineeSchema);
export default ExamineeModel;
