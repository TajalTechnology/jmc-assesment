import { Request, Response } from "express";
import { CreateTestInput, UpdateTestInput, ReadTestInput } from "../schema/test.schema";
import { createTest, testDetails } from "../service/test.service";
// examinee
export async function createTestHandler(
  req: Request,
  res: Response
) {

  const userId = res.locals.user._id;
  const body = req.body;
  const filePath = req.file.path;
  const file = req.file
  const test = await createTest({ ...body, testCreator: userId, filePath: filePath, file });

  return res.send(test);
}

// export async function updateProductHandler(
//   req: Request<UpdateProductInput["params"]>,
//   res: Response
// ) {
//   const userId = res.locals.user._id;

//   const productId = req.params.productId;
//   const update = req.body;

//   const product = await findProduct({ productId });

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   if (String(product.user) !== userId) {
//     return res.sendStatus(403);
//   }

//   const updatedProduct = await findAndUpdateProduct({ productId }, update, {
//     new: true,
//   });

//   return res.send(updatedProduct);
// }

export async function getTestHandler(
  req: Request<ReadTestInput["params"]>,
  res: Response
) {

  const setId = req.params.testId;
  const testDetail = await testDetails({ setId });

  return res.send(testDetail);
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
