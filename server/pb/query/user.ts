import pb from "../pb";
import { parseJSONAPIObject } from "../../../lib/helper";

const collection = pb.collection("users");

export const authWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await collection.authWithPassword(email, password);

  return parseJSONAPIObject(response);
};

export const createUser = async ({
  email,
  password,
  passwordConfirm,
  username,
  name,
}: {
  email: string;
  password: string;
  username: string;
  name: string;
  passwordConfirm: string;
}) => {
  const response = await collection.create({
    email,
    password,
    username,
    name,
    passwordConfirm,
  });
  return response;
};
