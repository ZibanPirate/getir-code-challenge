import { ErrorRequestHandler, RequestHandler } from "express";
import { ValidationError, validate } from "class-validator";

import { GeneralResponse } from "../../types";
import { plainToClass } from "class-transformer";

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
      next(errors);
    } else {
      req.body = output;
      next();
    }
  };
};

/**
 * Middleware for handling validation error, and properly display the errors in the response
 * @param err error from validation middleware
 * @param req Express request object
 * @param res Express response object
 * @param next Express Next object
 */
export const validationError: ErrorRequestHandler<
  Record<string, unknown>,
  GeneralResponse,
  unknown
> = (err: ValidationError[], req, res, next) => {
  if (err instanceof Array && err[0] instanceof ValidationError) {
    res
      .status(400)
      .json({
        code: 400,
        msg: Object.values(err[0].constraints || {}).join(", "),
      })
      .end();
  } else {
    next(err);
  }
};
