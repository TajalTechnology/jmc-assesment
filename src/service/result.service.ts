import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import QuestionModel from "../models/question.model";
import ResultModel, { ResultDocument } from "../models/result.model";
import ExamineeModel from "../models/examinee.model";
import ip from "ip";
import e from "express";

export async function createResult(input: DocumentDefinition<Omit<ResultDocument, "createdAt" | "updatedAt">>) {



  let answers = input.answers;
  let correctAnswer = [];
  let wrongAnswer = [];
  let score = 0;
  let rank = 1;
  let testId = input.testId;

  let exminee = await ExamineeModel.findOne({ where: { ip: ip.address() } });

  const findResultSheet = await ResultModel.findOne({
    $and: [
      { endTime: { $gt: new Date() } },
      { isSubmit: false },
      { testId: testId },
      { examineeId: exminee._id }
    ]
  });


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

  if (!findResultSheet) {
    return { message: 'Please start your exam ' };
  } else {

    if (findResultSheet.endTime >= new Date()) {
      // return
      const update = await ResultModel.findOneAndUpdate({ _id: findResultSheet._id }, {
        $set: {
          answers,
          correctAnswer, wrongAnswer, score, rank, isSubmit: true
        },
        // {new: true}
      }, { new: true }).exec();
      return update;
    }
    // return await ResultModel.create({ answers, correctAnswer, wrongAnswer, score, rank });
    // console.log('Your result start')
  }
  // 61c213012132066254632a0a

  // let autoGenarateUsername = '_' + Math.random().toString(36).substr(2, 9);
  // if (!exminee) exminee = await ExamineeModel.create({ ip: ip.address(), username: autoGenarateUsername });
  // return await ResultModel.create({ answers, correctAnswer, wrongAnswer, score, rank, testId, examineeId: exminee._id });

};

export async function startResult(input: DocumentDefinition<Omit<ResultDocument, "createdAt" | "updatedAt">>) {
  let startTime = new Date();

  var endTime = new Date();
  endTime.setTime(startTime.getTime() + (30 * 60 * 1000));

  let exminee = await ExamineeModel.findOne({ where: { ip: ip.address() } });
  let autoGenarateUsername = '_' + Math.random().toString(36).substr(2, 9);
  if (!exminee) exminee = await ExamineeModel.create({ ip: ip.address(), username: autoGenarateUsername });
  let examineeId = exminee._id;

  input = { ...input, startTime, endTime, examineeId };

  const findContinueTest = await ResultModel.findOne({
    $and: [
      { endTime: { $gt: startTime } },
      { isSubmit: false }
    ]
  });
  let message;
  if (findContinueTest) {
    message = `Your test is running till: ${endTime}`;
  } else {
    const startResult = await ResultModel.create(input);
    message = `Your test is start from now:${startTime}`;
  }

  return message;

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
