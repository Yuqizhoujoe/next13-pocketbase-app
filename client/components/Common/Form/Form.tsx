import { FormInterface } from "../../../../shared/modal/Common/interface";
import { handleCss } from "../../../../lib/helper";
import Alert from "../Error/Alert";
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
      className={`form_component ${handleCss(defaultFormCss, className)}`}
    >
      {error && <Alert message={error.message} />}
      {children}
    </form>
  );
};

export default Form;
