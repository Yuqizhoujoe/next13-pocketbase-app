import { ApiMethodHandlers } from "../shared/modal/api/interface";
import { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { newErrorHandler } from "./errorHandling";
import { runCorsMiddleware } from "./interceptor";

export function apiHandler(handler: ApiMethodHandlers) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await runCorsMiddleware(req, res);

      const method = req.method
        ? (req.method.toUpperCase() as keyof ApiMethodHandlers)
        : null;

      if (!method) {
        throw new createHttpError.MethodNotAllowed(
          `No method specified on path ${req.url}`
        );
      }

      const methodHandler = handler[method];
      if (!methodHandler) {
        throw new createHttpError.MethodNotAllowed(
          `Method ${req.method} not allowed on path ${req.url}`
        );
      }

      await methodHandler(req, res);
    } catch (err) {
      newErrorHandler(err, res);
    }
  };
}
