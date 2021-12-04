import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import QuestionModel, { QuestionDocument } from "../models/question.model";

export async function createQuestion(
  input: DocumentDefinition<Omit<QuestionDocument, "createdAt" | "updatedAt">>
) {
  const similarQuestion = await QuestionModel.findOne({ question: input.question });
  if (similarQuestion) return false;
  return await QuestionModel.create(input);
}

export async function findQuestion(
  query: FilterQuery<QuestionDocument>,
  options: QueryOptions = { lean: true }
) {
  const question = await QuestionModel.findOne(query, {}, options);
  return question;
}

export async function findAndUpdateQuestion(
  query: FilterQuery<QuestionDocument>,
  update: UpdateQuery<QuestionDocument>,
  options: QueryOptions
) {
  const findOneAndUpdate = await QuestionModel.findOneAndUpdate({_id:query.questionId}, update, options);
  return findOneAndUpdate;
}

// export async function deleteProduct(query: FilterQuery<ProductDocument>) {
//   return ProductModel.deleteOne(query);
// }
