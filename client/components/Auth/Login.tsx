import Form from "../Common/Form/Form";
import Input from "../Common/Form/Input";
import { useState } from "react";
import Button, { buttonStyle } from "../Common/Button/Button";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";

const loginForm: { email: string; password: string; valid: boolean } = {
  email: "",
  password: "",
  valid: true,
};

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState(loginForm);

  const handleSignupBtnClick = async () => {
    await router.push("/auth/signup");
  };

  const handleLoginFormSubmit = async () => {
    await signIn("pocketbase", {
      email: form.email,
      password: form.password,
      redirect: true,
    });
  };

  const handleEmailChange = (email: string, isUsernameValid: boolean) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        email,
        valid: isUsernameValid,
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

  return (
    <div className="login_form_container w-full">
      <Form
        onSubmit={handleLoginFormSubmit}
        className="w-96 p-6 h-1/2 flex flex-col items-start justify-center"
      >
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          initialValue={form.email}
          handleChange={handleEmailChange}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          initialValue={form.password}
          handleChange={handlePasswordChange}
          required
        />
        <div className="signup_form_button_container flex flex-row mt-10">
          <Button
            label="Login"
            type="submit"
            btnDivClassName={buttonStyle.ButtonContainerNoMargin}
          />
          <Link href="/auth/signup">
            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Sign up
            </a>
          </Link>
        </div>
      </Form>
    </div>
  );
}
