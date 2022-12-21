import Form from "@/components/Common/Form/Form";
import BackButton from "@/components/Common/Button/BackButton";
import Button from "@/components/Common/Button/Button";
import Input from "@/components/Common/Form/Input";
import { useState } from "react";

const initialForm = {
  name: "",
  age: 0,
  money: 1000,
};

export default function () {
  const [form, setForm] = useState(initialForm);

  const handleSubmit = () => {
    console.log(form);
  };
  const handleNameChange = (name: string, isNameValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      name,
      valid: isNameValid,
    }));
  };
  const handleAgeChange = (age: number, isAgeValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      age,
      valid: isAgeValid,
    }));
  };
  const handleMoneyChange = (money: number, isMoneyValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      money,
      valid: isMoneyValid,
    }));
  };

  return (
    <div className="form_container h-screen w-1/2">
      <Form onSubmit={handleSubmit}>
        <BackButton />
        <Input
          type="text"
          name="name"
          id="name"
          required
          handleChange={handleNameChange}
          label="Name"
        />
        <Input
          type="number"
          name="age"
          id="age"
          required
          inputDivClassName="relative z-0 mt-6 w-2/3 group"
          handleChange={handleNameChange}
          label="Age"
        />
        <Input
          type="number"
          name="money"
          id="money"
          required
          label="Money"
          inputDivClassName="relative z-0 mt-6 w-2/3 group"
          initialValue={form.money}
          handleChange={handleMoneyChange}
          money
        />
        <Button type="submit" label="Submit" />
      </Form>
    </div>
  );
}
