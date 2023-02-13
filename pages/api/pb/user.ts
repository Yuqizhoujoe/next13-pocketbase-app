import { apiHandler } from "../../../server/helper";
import { NextApiHandler } from "next";
import _ from "lodash";
import createHttpError from "http-errors";
import { createUser } from "../../../server/pb/query/user";

const createUserHandler: NextApiHandler = async (req, res) => {
  const signUpForm = _.get(req, "body", {});
  const { email, password, passwordConfirm } = signUpForm;

  if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(passwordConfirm))
    throw new createHttpError.BadRequest(
      "Email, Password and passwordConfirm are required"
    );

  const data = await createUser({ ...signUpForm });
  res.status(200).json({
    message: "Create user successfully",
    data,
  });
};

export default apiHandler({
  POST: createUserHandler,
});
