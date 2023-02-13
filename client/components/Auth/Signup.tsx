import Form from "../Common/Form/Form";
import Input from "../Common/Form/Input";
import { useState } from "react";
import Button, { buttonStyle } from "../Common/Button/Button";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { userSignup } from "../../apis/user";
import { UserSignUpFormInterface } from "../../../shared/modal/data/interface";
import { QUERIES } from "../../../shared/common/constant";
import Link from "next/link";

const signUpForm: UserSignUpFormInterface = {
  name: "",
  username: "",
  password: "",
  passwordConfirm: "",
  email: "",
  valid: true,
};

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState(signUpForm);

  const signupMutation = useMutation({
    mutationKey: [QUERIES.CREATE_NFT],
    mutationFn: () => userSignup({ ...form }),
    onSuccess: async () => {
      await router.replace("/auth/login");
    },
  });

  const handleLoginBtnClick = async () => {
    await router.push("/auth/login");
  };

  const handleNameChange = (name: string, isNameValid: boolean) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        name,
        valid: isNameValid,
      };
    });
  };

  const handleUsernameChange = (username: string, isUsernameValid: boolean) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        username,
        valid: isUsernameValid,
      };
    });
  };

  const handleEmailChange = (email: string, isEmailValid: boolean) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        email,
        valid: isEmailValid,
      };
    });
  };

  const handlePasswordChange = (password: string, isPasswordValid: boolean) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        password,
        valid: isPasswordValid,
      };
    });
  };

  const handleConfirmedPasswordChange = (
    passwordConfirm: string,
    isPasswordConfirmedValid: boolean
  ) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        passwordConfirm,
        valid: isPasswordConfirmedValid,
      };
    });
  };

  const handleSignupFormSubmit = () => {
    signupMutation.mutate();
  };

  return (
    <div className="signup_form_container w-full">
      <Form
        className="w-96 p-6 h-1/2 flex flex-col items-start justify-center"
        onSubmit={handleSignupFormSubmit}
      >
        <Input
          label="Name"
          type="text"
          name="name"
          id="name"
          handleChange={handleNameChange}
          required
        />
        <Input
          label="Username"
          type="text"
          name="username"
          id="username"
          handleChange={handleUsernameChange}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          handleChange={handleEmailChange}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          handleChange={handlePasswordChange}
          required
        />
        <Input
          label="Confirmed Password"
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          handleChange={handleConfirmedPasswordChange}
          validate={(passwordConfirm) => passwordConfirm === form.password}
          required
        />
        <div className="signup_form_button_container flex flex-row gap-10 mt-10">
          <Button
            label="Sign up"
            type="submit"
            btnDivClassName={buttonStyle.ButtonContainerNoMargin}
          />
          <Link href="/auth/login">
            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Login
            </a>
          </Link>
        </div>
      </Form>
    </div>
  );
}
