import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import TestModel, { TestDocument } from "../models/test.model";
import QuestionModel from "../models/question.model";
import { headers } from '../utils/headers';
import csv from "csvtojson";
import config from "config";


export async function createTest(input: DocumentDefinition<Omit<TestDocument, "createdAt" | "updatedAt">>) {
  //create test
  let quiz: any[] = [];
  const testCreate = await TestModel.create(input);

  //csv to json and store a in database
  await csv({ headers: headers }).fromFile(config.get("fileBasePath") + input.file.filename)
    .on('data', async (data: any) => {

      const fileDatatoString = data.toString();
      const questionStringToObj = JSON.parse(fileDatatoString);
      quiz.push({ ...questionStringToObj, setId: testCreate._id });

    });

  await QuestionModel.insertMany(quiz);
  return testCreate;
}


export async function testDetails(query: FilterQuery<TestDocument>, options: QueryOptions = { lean: true }) {

  const question = await TestModel.findOne(query, {}, options);
  const quizs = await QuestionModel.find({ where: { setId: query.setId } });
  return { question, quizs };

};