import { Request, Response } from "express";
import { CreateResultInput, UpdateQuestionInput } from "../schema/result.schema";
import {
  createResult, findResult, findAndUpdateResult
} from "../service/result.service";
import { findQuestion } from "../service/question.service";
import QuestionModel, { QuestionDocument } from "../models/question.model";


export async function createResultHandler(
  req: Request<{}, {}, CreateResultInput["body"] >,
  res: Response
) {
  try {
    const question = await createResult(req.body);
    return res.send(question);
  } catch (error) {
    console.log(error)
  }
}

export async function updateesultHandler(
  req: Request<UpdateQuestionInput["params"]>,
  res: Response
) {

  try {
    const questionId = req.params.resultd;
    const update = req.body;

    const question = await findResult({ questionId });

    if (!question) {
      return res.sendStatus(404);
    }

    const updatedQuestion = await findAndUpdateResult({ questionId }, update, {
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
