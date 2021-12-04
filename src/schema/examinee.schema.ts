import { object, number, string, TypeOf } from "zod";
const payload = {
  body: object({
    ip: string({
      required_error: "Title is required",
    }),
    username: string({
      required_error: "Description is required",
    }).min(120, "Description should be at least 120 characters long"),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};
// x
export const createExamineeSchema = object({
  ...payload,
});

// export const updateProductSchema = object({
//   ...payload,
//   ...params,
// });

// export const deleteProductSchema = object({
//   ...params,
// });

// export const getProductSchema = object({
//   ...params,
// });

export type CreateExamineeInput = TypeOf<typeof createExamineeSchema>;
// export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
// export type ReadProductInput = TypeOf<typeof getProductSchema>;
// export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
