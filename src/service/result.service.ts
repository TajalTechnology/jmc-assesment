import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import QuestionModel from "../models/question.model";
import ResultModel, { ResultDocument } from "../models/result.model";
import ExamineeModel from "../models/examinee.model";
import ip from "ip";

export async function createResult(input: DocumentDefinition<Omit<ResultDocument, "createdAt" | "updatedAt">>) {

  let answers = input.answers;
  let correctAnswer = [];
  let wrongAnswer = [];
  let score = 0;
  let rank = 1;
  let testId = input.testId;


  for (let i = 0; i < answers.length; i++) {
    let id = answers[i]._id;

    let question = await QuestionModel.findOne({ _id: id });
    if (!question) continue;

    let answer = answers[i].answer
    if (!answer || !id) continue;

    if (answers[i].answer === question.answer) {
      score = score + 1;
      correctAnswer.push({ id, answer })
    } else { wrongAnswer.push({ id, answer }) };

  };

  let exminee = await ExamineeModel.findOne({ where: { ip: ip.address() } });
  let autoGenarateUsername = '_' + Math.random().toString(36).substr(2, 9);
  if (!exminee) exminee = await ExamineeModel.create({ ip: ip.address(), username: autoGenarateUsername });
  return await ResultModel.create({ answers, correctAnswer, wrongAnswer, score, rank, testId, examineeId: exminee._id });

};


export async function findResult(query: FilterQuery<ResultDocument>, options: QueryOptions = { lean: true }) {
  const result = await ResultModel.findOne(query, {}, options);
  return result;
}


export async function findAndUpdateResult(
  query: FilterQuery<ResultDocument>,
  update: UpdateQuery<ResultDocument>,
  options: QueryOptions) {

  const findOneAndUpdate = await ResultModel.findOneAndUpdate({ _id: query.questionId }, update, options);
  return findOneAndUpdate;

};
