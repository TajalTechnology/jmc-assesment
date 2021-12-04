import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import QuestionModel from "../models/question.model";
import ResultModel, { ResultDocument } from "../models/result.model";
import ExamineeModel, { ExamineeDocument } from "../models/examinee.model";
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

    let question = await QuestionModel.findOne({ _id: answers[i]._id });
    if (!question) continue;

    let answer = answers[i].answer

    if (!answer || !id) continue;


    if (answers[i].answer === question.answer) {
      score = score + 1;
      correctAnswer.push({ id, answer })
    } else {
      wrongAnswer.push({ id, answer })
    }

  };
  let userIp = ip.address();
  let exminee = await ExamineeModel.findOne({ where: { ip: userIp } });
  let autoGenarateUsername = '_' + Math.random().toString(36).substr(2, 9);
  if (!exminee) exminee = await ExamineeModel.create({ ip: userIp, username: autoGenarateUsername });
  const exmineeId = exminee._id;
  return await ResultModel.create({ answers, correctAnswer, wrongAnswer, score, rank, testId, examineeId: exmineeId });
};

export async function findResult(
  query: FilterQuery<ResultDocument>,
  options: QueryOptions = { lean: true }
) {
  const result = await ResultModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateResult(
  query: FilterQuery<ResultDocument>,
  update: UpdateQuery<ResultDocument>,
  options: QueryOptions
) {
  const findOneAndUpdate = await ResultModel.findOneAndUpdate({ _id: query.questionId }, update, options);
  return findOneAndUpdate;
}

// export async function deleteProduct(query: FilterQuery<ProductDocument>) {
//   return ProductModel.deleteOne(query);
// }
