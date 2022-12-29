import { NextApiRequest, NextApiResponse } from "next";
import {
  ApiMethodHandlers,
  ErrorOptionInterface,
  ResponseInterface,
} from "../shared/modal/api/interface";
import { HTTP_CODES } from "../shared/common/constant";

import createHttpError from "http-errors";

export const CommonError = {
  METHOD_NOT_ALLOW: "METHOD_NOT_ALLOW",
  NOT_FOUND: "NOT_FOUND",
  OTHER_ERROR: "OTHER_ERROR",
};

export class Exception extends Error {
  public id: string;

  constructor(id: string, message: string) {
    super(message);
    this.id = id;
    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, Exception.prototype);
  }
}

export interface ExceptionInterface {
  id: string;
  message?: string;
}

export const errorMessageHandler = (
  name: string,
  option?: ErrorOptionInterface
) => {
  switch (name) {
    case CommonError.METHOD_NOT_ALLOW:
      const { method } = { ...option };
      return `METHOD ${method} Not Allowed!`;
    default:
      return `Error!`;
  }
};

export const errorHandler = (
  err: Exception,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req;
  const { id, message } = err;

  let errorMessage: string = message;
  let response: ResponseInterface = { message: errorMessage };

  switch (id) {
    case CommonError.METHOD_NOT_ALLOW:
      errorMessage = errorMessageHandler(CommonError.METHOD_NOT_ALLOW, {
        method,
      });
      response = { message: errorMessage };
      res.status(HTTP_CODES.METHOD_NOT_ALLOW).json(response);
      break;

    case CommonError.NOT_FOUND:
      res.status(HTTP_CODES.NOT_FOUND).json(response);
      break;

    default:
      res.status(HTTP_CODES.SOMETHING_WENT_WRONG).json(response);
  }
};

export const newErrorHandler = (err: unknown, res: NextApiResponse) => {
  // errors with statusCode >= 500 should not be exposed
  if (createHttpError.isHttpError(err) && err.expose) {
    // handle all error thrown by http-errors module
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
      },
    });
  } else {
    //default to 500 server error
    console.error(err);
    return res.status(500).json({
      error: { message: "Internal Server Error", err },
      status: createHttpError.isHttpError(err) ? err.statusCode : 500,
    });
  }
};
