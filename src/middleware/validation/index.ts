import { RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

// Because all type information is erased in the compiled
// JavaScript, we can use this clever structural-typing
// work-around enabled by TypeScript to pass in a class
// to our middleware.
type Constructor<T> = { new (): T };

/**
 * Generic function that returns a validation middleware
 * @param dto Class to get validation from
 */
export const validateMw = <T>(dto: Constructor<T>): RequestHandler => {
  return async (req, res, next) => {
    const output = plainToClass(dto, req.body);

    const errors = await validate(output);
    if (errors.length > 0) {
      res
        .status(400)
        .json({
          code: 400,
          msg: errors[0].constraints
            ? Object.values(errors[0].constraints).join(", ")
            : errors[0].property,
        })
        .end();
    } else {
      req.body = output;
      next();
    }
  };
};
