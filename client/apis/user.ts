import { UserSignUpInterface } from "../../shared/modal/data/interface";
import axios from "../axios/instance";

const USER_URL = "/pb/user";

export const userSignup = ({
  email,
  passwordConfirm,
  password,
  username,
  name,
}: UserSignUpInterface) => {
  const data = {
    email,
    password,
    passwordConfirm,
    username,
    name,
  };
  return axios.post(USER_URL, data).then((res) => res.data);
};
