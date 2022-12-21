import { FormInterface } from "../../../shared/modal/Common/interface";
import { handleCss } from "../../../shared/helper";
import Alert from "@/components/Common/Error/Alert";
import { FormEvent } from "react";

const defaultFormCss = "p-6 h-1/2 flex flex-col items-start justify-center";

const Form = (props: FormInterface) => {
  const { onSubmit, className, children, error } = props;
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form
      onSubmit={submitForm}
      className={handleCss(defaultFormCss, className)}
    >
      {error && <Alert message={error.message} />}
      {children}
    </form>
  );
};

export default Form;
