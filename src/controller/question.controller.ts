import { Request, Response } from "express";
import { CreateQuestionInput, UpdateQuestionInput } from "../schema/question.schema";
import {
  createQuestion, findQuestion, findAndUpdateQuestion
} from "../service/question.service";
import csv from "csvtojson";
import { headers } from '../utils/headers';
import QuestionModel, { QuestionDocument } from "../models/question.model";

export async function createQuestionHandler(
  req: Request,
  res: Response
) {
  try {

    console.log(req.file);
    const orginalPath = `/home/taj/Desktop/Testing-Express-REST-API/uploads/${req.file.filename}`;
    let quiz: any[] = [];
    await csv({
      headers: headers
    }).fromFile(orginalPath)
      .on('data', async (data: any) => {

        const fileDatatoString = data.toString();
        const questionStringToObj = JSON.parse(fileDatatoString);
        quiz.push(questionStringToObj);

      });

    await QuestionModel.insertMany(quiz);


    console.log(quiz);

    const question = await createQuestion(req.body);
    return res.send(question);
  } catch (error) {
    console.log(error)
  }
}

export async function updateQuestionHandler(
  req: Request<UpdateQuestionInput["params"]>,
  res: Response
) {

  try {
    const questionId = req.params.questionId;
    const update = req.body;

    const question = await findQuestion({ questionId });

    if (!question) {
      return res.sendStatus(404);
    }

    const updatedQuestion = await findAndUpdateQuestion({ questionId }, update, {
      new: true,
    });
    console.log(updatedQuestion)
    return res.send(updatedQuestion);

  } catch (error) {

  }
}


// export async function getProductHandler(
//   req: Request<UpdateProductInput["params"]>,
//   res: Response
// ) {
//   const productId = req.params.productId;
//   const product = await findProduct({ productId });

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   return res.send(product);
// }

// export async function deleteProductHandler(
//   req: Request<UpdateProductInput["params"]>,
//   res: Response
// ) {
//   const userId = res.locals.user._id;
//   const productId = req.params.productId;

//   const product = await findProduct({ productId });

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   if (String(product.user) !== userId) {
//     return res.sendStatus(403);
//   }

//   await deleteProduct({ productId });

//   return res.sendStatus(200);
// }
