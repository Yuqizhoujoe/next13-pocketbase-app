import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

// CORS Solution 1
export const nextCorsMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
};

// CORS Solution 2
const cors = Cors({
  methods: ["POST", "GET", "HEAD", "PATCH", "PUT"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export async function runCorsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
