import { Method } from "axios";
import { NextApiHandler } from "next";

export interface ResponseInterface {
  message: string;
  data?: any;
}

export interface ErrorOptionInterface {
  method?: string;
}

// Shape of the response when an error is thrown
interface ErrorResponse {
  error: {
    message: string;
    err?: any; // Sent for unhandled errors reulting in 500
  };
  status?: number; // Sent for unhandled errors reulting in 500
}

export type ApiMethodHandlers = {
  [index in Uppercase<Method>]?: NextApiHandler;
};
