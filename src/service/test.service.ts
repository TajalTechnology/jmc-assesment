import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TestModel, { TestDocument } from "../models/test.model";
import QuestionModel, { QuestionDocument } from "../models/question.model";
import { headers } from '../utils/headers';
import csv from "csvtojson";

export async function createTest(
  input: DocumentDefinition<
    Omit<TestDocument, "createdAt" | "updatedAt">
  >
) {
  //create test
  const testCreate = await TestModel.create(input);

  const orginalPath = `/home/taj/Desktop/Testing-Express-REST-API/uploads/${input.file.filename}`;
  let quiz: any[] = [];

  //csv to json and store a in database
  await csv({ headers: headers }).fromFile(orginalPath).on('data', async (data: any) => {
    const fileDatatoString = data.toString();
    const questionStringToObj = JSON.parse(fileDatatoString);
    quiz.push({ ...questionStringToObj, setId: testCreate._id });

  });

  await QuestionModel.insertMany(quiz);

  return testCreate;
}

export async function testDetails(
  query: FilterQuery<TestDocument>,
  options: QueryOptions = { lean: true }
) {

  const question = await TestModel.findOne(query, {}, options);
  const quizs = await QuestionModel.find({ where: { setId: query.setId } });

  // console.log(details);
  return { question, quizs };
}

// export async function findAndUpdateProduct(
//   query: FilterQuery<ProductDocument>,
//   update: UpdateQuery<ProductDocument>,
//   options: QueryOptions
// ) {
//   return ProductModel.findOneAndUpdate(query, update, options);
// }

// export async function deleteProduct(query: FilterQuery<ProductDocument>) {
//   return ProductModel.deleteOne(query);
// }
