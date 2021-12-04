import { Request, Response } from "express";
import { CreateTestInput, UpdateTestInput, ReadTestInput } from "../schema/test.schema";
import { testScores } from "../service/examinee.service";
// examinee

export async function myTestScoresHandler(
  req: Request,
  res: Response
) {

  // const setId = req.params.testId;
  const myScores = await testScores();
  // console.log(myScores.length)

  return res.send(myScores);
}

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
