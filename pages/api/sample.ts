import { NextApiRequest, NextApiResponse } from "next";
import { HTTP_METHODS } from "../../shared/common/constant";
import {
  CommonError,
  errorHandler,
  Exception,
} from "../../server/errorHandling";
import { runCorsMiddleware } from "../../server/interceptor";
import { ResponseInterface } from "../../shared/modal/api/interface";

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response: ResponseInterface = {
      message: "Fetch Successfully",
      data: "Sample",
    };

    return res.status(200).json(response);
  } catch (e) {
    if (e instanceof Error)
      throw new Exception(CommonError.OTHER_ERROR, e.message);
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {}

async function controllers(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case HTTP_METHODS.GET:
      await get(req, res);
      break;
    case HTTP_METHODS.POST:
      await post(req, res);
      break;
    default:
      throw new Exception(
        CommonError.METHOD_NOT_ALLOW,
        `Method ${method} not allowed!`
      );
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCorsMiddleware(req, res);

  try {
    await controllers(req, res);
  } catch (e) {
    if (e instanceof Exception) errorHandler(e, req, res);
  }
}
