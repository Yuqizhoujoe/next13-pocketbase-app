import { ApiMethodHandlers } from "../shared/modal/api/interface";
import { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { newErrorHandler } from "./errorHandling";
import { runCorsMiddleware } from "./interceptor";
import nextConnect, { NextConnect } from "next-connect";
import cors from "cors";

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
export function nextConnectConfig(): NextConnect<
  NextApiRequest,
  NextApiResponse
> {
  const apiRoute = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
      res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
  apiRoute.use(cors());
  return apiRoute;
}
